var app = require('express');
var router = app.Router();
var mongoose = require('mongoose');
var MultiplayerGame = mongoose.model('MultiplayerGame');
var auth = require('../auth');
var multiplayergameController = require('../../controllers/multiplayergames');

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

router.get('/opponents', auth.required, multiplayergameController.getOpponentsMutliplayerGameController);


router.get('/', auth.required, multiplayergameController.getMutliplayerGamesController);

router.post('/', auth.required, multiplayergameController.postMutliplayerGameController);

router.get('/openForRandom', auth.required, multiplayergameController.getMutliplayerGamesOpenForRandomController);

router.get('/:game', auth.required, multiplayergameController.getMutliplayerGameController);

router.post('/:game/move', auth.required, multiplayergameController.postMutliplayerGameMoveController);

module.exports = router;
