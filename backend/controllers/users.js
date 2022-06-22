var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

exports.getUserController = function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
}

exports.getUsersController = function(req, res, next){
  Promise.all([
    User.findById(req.payload.id),
    User.find({_id: { $ne: req.payload.id } })
  ]).then(function(results){
    var currentUser = results[0];
    var users = results[1];
    if(!currentUser){ return res.sendStatus(401); }
    return res.json({users: users.map(user => user.toJSONFor(currentUser))});
  }).catch(next);
}

exports.postUserLoginController = function(req, res, next){
  if(!req.body.user.username){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
}

exports.postUserController = function(req, res, next){
  var user = new User();

  user.username = req.body.user.username;
  user.setPassword(req.body.user.password);

  user.save().then(function(){
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
}