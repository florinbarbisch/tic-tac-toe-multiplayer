var mongoose = require('mongoose');
var SingleplayerGame = mongoose.model('SingleplayerGame');
var User = mongoose.model('User');

exports.getSingleplayerGamesController = function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    var query = { player: user };
    if(req.query.difficulty) {
      query.difficulty = req.query.difficulty;
    }
    if(req.query.status == 'Finished') {
      query.status = { $ne: 'Ongoing'};
    } else if (req.query.status) {
      query.status = req.query.status;
    }
    return Promise.all([
      SingleplayerGame.find(query)
        .populate('player')
        .sort({createdAt: 'desc'})
        .exec(),
        User.findById(req.payload.id),
    ]).then(function(results){
      var games = results[0];
      var user = results[1];

      return res.json({singleplayerGames: games.map(game => game.toJSONFor(user))});
    }).catch(next);
  }).catch(next);
}

exports.postSingleplayerGameController = function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }
    if (!req.body.difficulty) { return res.status(422).send({difficulty: "can't be blank"}); }

    var game = new SingleplayerGame();

    game.player = user;
    game.difficulty = req.body.difficulty;
    req.payload ? User.findById(req.payload.id) : null;

    return game.save().then(function(){
      console.log(game.player);
      return res.json({SingleplayerGame: game.toJSONFor(user)});
    });
  }).catch(next);
}


exports.getSingleplayerGameController = function(req, res, next) {
  return Promise.all([
    SingleplayerGame.findById({_id: req.game._id})
      .exec(),
  ]).then(function(results){
    return res.json({SingleplayerGame: results[0]});
  }).catch(next);
}

exports.moveSingleplayerGameController = function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }
    if (!req.body.cell && req.body.cell !== 0) { return res.status(422).send({cell: "can't be blank"}); }
    if (req.game.getBoard()[req.body.cell]) { return res.status(422).send({field: "already set"}); }
    if (req.game.getWinner()) { return res.status(422).send({game: "already finished"}); }

    return req.game.move(user, req.body.cell).then(function(){
      return res.json({SingleplayerGame: req.game.toJSONFor(user)});
    });
  }).catch(next);
}