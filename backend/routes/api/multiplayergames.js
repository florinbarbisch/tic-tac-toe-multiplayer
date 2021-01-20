var app = require('express');
var router = app.Router();
var mongoose = require('mongoose');
var MultiplayerGame = mongoose.model('MultiplayerGame');
var User = mongoose.model('User');
var auth = require('../auth');
var socketIO = require('socket.io');
const { use } = require('express/lib/application');

// Preload game on routes with ':game'
router.param('game', function(req, res, next, game) {
  MultiplayerGame.findOne({_id: game})
    .populate('player1')
    .populate('player2')
    .populate('movingPlayer')
    .then(function(game){
    if (!game) { return res.sendStatus(404); }
    req.game = game;
    return next();
  }).catch(next);
});

router.get('/opponents', auth.required, function(req, res, next) {
  User.findById(req.payload.id)
  .then(function(user) {
    var query = {};
    query = { $or: [{player1 : user }, {player2 : user }], winner: { $ne: 'Ongoing'} }
    return Promise.all([
      MultiplayerGame.find(query)
        .populate('player1')
        .populate('player2')
        .sort({createdAt: 'desc'})
        .exec(),
        user
    ]).then(function(results){
      var games = results[0];
      var user = results[1];

      var opponents = games.flatMap(games => [games.player1, games.player2]).filter(opponent => !user.equals(opponent));

      //distinct users
      const result = [];
      const map = new Map();
      for (const opponent of opponents) {
          if(!map.has(opponent._id.id)){
              map.set(opponent._id.id, true);    // set any value to Map
              result.push(opponent);
          }
      }
  
      return res.json({opponents: result.map(opponent => opponent.toJSONFor(user))});
    }).catch(next);
  }).catch(next);  
});


router.get('/', auth.required, function(req, res, next) {
  Promise.all([
    User.findById(req.payload.id),
    req.query.opponent ? User.findById(req.query.opponent) : null
  ]).then(function(results) {
    var user = results[0];
    var opponent = results[1];

    var query = {};

    if (opponent) {
      //query = { $or: [{player1: { $in: [user, opponents]} }, {player2: { $in: [user, opponents]} }] };
      query = { $and: [ { $or: [{player1 : user }, {player2 : user }]}, { $or: [{player1 : opponent }, {player2 : opponent }]}] }
    } else {
      query = { $or: [{player1 : user }, {player2 : user }] }
    }
    
    if (req.query.status === 'Finished') {
      query.winner = { $ne: 'Ongoing'};
    } else if (req.query.status) {
      query.winner = req.query.status;
    }
    return Promise.all([
      MultiplayerGame.find(query)
        .populate('player1')
        .populate('player2')
        .populate('movingPlayer')
        .sort({createdAt: 'desc'})
        .exec(),
        User.findById(req.payload.id),
    ]).then(function(results){
      var games = results[0];
      var user = results[1];

      return res.json({multiplayerGames: games.map(games => games.toJSONFor(user))});
    }).catch(next);
  }).catch(next);  
});

router.post('/', auth.required, function(req, res, next) {
  Promise.all([
    User.findById(req.payload.id),
    User.findById(req.body.opponent)
  ])
  .then(function(results){
    var user = results[0];
    var opponent = results[1];
    if (!user) { return res.sendStatus(401); }
    if (!req.body.inviteMode) { return res.status(422).send({inviteMode: "can't be blank"}); }
    if (req.body.inviteMode === 'select' && !opponent) {
      return res.status(422).send({opponent: "can't be blank"});
    }
    
    // if invite random don't create maybe

    var game = new MultiplayerGame();
    game.winner = 'Ongoing'
    game.player1 = user;
    game.movingPlayer = game.player1;

    if (req.body.inviteMode === 'select') {
      game.player2 = opponent;
    }


    return game.save().then(function(){
      console.log(game.player);
      return res.json({MultiplayerGame: game.toJSONFor(user)});
    });
  }).catch(next);
});

router.get('/:game', auth.required, function(req, res, next) {
  return Promise.all([
    User.findById(req.payload.id)
    .exec(),
  ]).then(function(results){
    var user = results[0];
    
    if (!req.game.player2 && !user.equals(req.game.player1)) {
      return req.game.setPlayer2(user).then(function(game){
        return res.json({MultiplayerGame: game.toJSONFor(user)})
      });
    } else {
      return res.json({MultiplayerGame: req.game.toJSONFor(user)});
    }
  }).catch(next);
});

router.post('/:game/move', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); } 
    if (!req.body.cell && req.body.cell !== 0) { return res.status(422).send({cell: "can't be blank"}); }
    if (!req.game.isValidMove(req.body.cell)) { return res.status(422).send({field: "already set"}); }
    if (!req.game.movingPlayer || !user.equals(req.game.movingPlayer)) { return res.status(422).send({not: "your turn"}); }
    if (req.game.winner !== 'Ongoing') { return res.status(422).send({game: "already finished"}); }
    
    return req.game.move(user, req.body.cell).then(function(){
      req.app.io.emit('gameUpdate', {MultiplayerGame: req.game.toJSONFor(req.game.movingPlayer)});
      return res.json({MultiplayerGame: req.game.toJSONFor(user)});
    });
  }).catch(next);
});

module.exports = router;
