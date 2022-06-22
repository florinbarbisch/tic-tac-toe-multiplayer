var mongoose = require('mongoose');
var MultiplayerGame = mongoose.model('MultiplayerGame');
var User = mongoose.model('User');

exports.getOpponentsMutliplayerGameController = function(req, res, next) {
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
}

exports.getMutliplayerGamesController = function(req, res, next) {
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
}

exports.postMutliplayerGameController = function(req, res, next) {
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
    
    if (req.body.inviteMode === 'random') {
      MultiplayerGame.findOne({ openForRandom: true, player1: { $ne: user } })
          .populate('player1')
          .populate('player2')
          .populate('movingPlayer')
          .exec().then(function(game) {
            if (game) {
              return game.setPlayer2(user).then(function(){
                return res.json({MultiplayerGame: game.toJSONFor(user)});
              });
            } else {
              game = new MultiplayerGame();
              game.winner = 'Ongoing'
              game.player1 = user;
              game.movingPlayer = game.player1;
              game.openForRandom = true;
              return game.save().then(function(){
                return res.json({MultiplayerGame: game.toJSONFor(user)});
              });
            }
          });
    } else {
      var game = new MultiplayerGame();
      game.winner = 'Ongoing'
      game.player1 = user;
      game.movingPlayer = game.player1;

      if (req.body.inviteMode === 'select') {
        game.player2 = opponent;
      }
      return game.save().then(function(){
        return res.json({MultiplayerGame: game.toJSONFor(user)});
      });
    }
  }).catch(next);
}

exports.getMutliplayerGamesOpenForRandomController = function(req, res, next) {
  User.findById(req.payload.id).then(function(user) {
    if (!user) { return res.sendStatus(401); }

    MultiplayerGame.findOne({ openForRandom: true, player1: { $ne: user } })
    .populate('player1')
    .populate('player2')
    .populate('movingPlayer')
    .exec()
    .then(function(game) {
      return res.json({MultiplayerGame: game ? game.toJSONFor(user) : null});
    }).catch(next);
  }).catch(next);
}

exports.getMutliplayerGameController = function(req, res, next) {
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
}

exports.postMutliplayerGameMoveController = function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); } 
    if (!req.game.movingPlayer || !user.equals(req.game.movingPlayer)) { return res.status(422).send({not: "your turn"}); }
    if (!req.body.cell && req.body.cell !== 0) { return res.status(422).send({cell: "can't be blank"}); }
    if (req.game.getBoard()[req.body.cell]) { return res.status(422).send({field: "already set"}); }
    if (req.game.winner !== 'Ongoing') { return res.status(422).send({game: "already finished"}); }
    
    return req.game.move(user, req.body.cell).then(function(){
      req.app.io.emit('gameUpdate', {MultiplayerGame: req.game.toJSONFor(req.game.movingPlayer)});
      return res.json({MultiplayerGame: req.game.toJSONFor(user)});
    });
  }).catch(next);
}