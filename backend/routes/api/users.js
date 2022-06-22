var router = require('express').Router();
var auth = require('../auth');
var userController = require('../../controllers/users');

router.get('/user', auth.required, userController.getUserController);

router.get('/users', auth.required, userController.getUsersController);

router.post('/users/login', userController.postUserLoginController);

router.post('/users', userController.postUserController);

module.exports = router;
