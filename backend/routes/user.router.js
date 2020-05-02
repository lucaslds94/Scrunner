const {Router} = require('express');

const routes = Router();

const userController = require('../controllers/user.controller');

routes.get('/', userController.index);

module.exports = routes;