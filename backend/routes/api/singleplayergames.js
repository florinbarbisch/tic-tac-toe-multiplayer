var router = require('express').Router();
var mongoose = require('mongoose');
var singleplayergamesController = require('../../controllers/singleplayergames');
var SingleplayerGame = mongoose.model('SingleplayerGame');
var auth = require('../auth');

// Preload game on routes with ':game'
router.param('game', function(req, res, next, game) {
  SingleplayerGame.findOne({_id: game})
    .populate('player').then(function(game){
    if (!game) { return res.sendStatus(404); }

    req.game = game;

    return next();
  }).catch(next);
});

router.get('/', auth.required, singleplayergamesController.getSingleplayerGamesController);

router.post('/', auth.required, singleplayergamesController.postSingleplayerGameController);

router.get('/:game', auth.required, singleplayergamesController.getSingleplayerGameController);

router.post('/:game/move', auth.required, singleplayergamesController.moveSingleplayerGameController);

module.exports = router;
