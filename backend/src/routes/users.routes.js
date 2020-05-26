const { Router } = require('express');
const { auth } = require('../middlewares/auth.middleware');
const { user } = require("../middlewares/user.middleware");

const routes = Router();

const userController = require('../controllers/user.controller');

routes.post('/user', userController.store);

routes.put('/user/:userId', user, userController.disable);

module.exports = routes;