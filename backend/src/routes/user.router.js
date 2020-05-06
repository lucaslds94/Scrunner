const {Router} = require('express');

const routes = Router();

const userController = require('../controllers/user.controller');

routes.post('/', userController.index);

module.exports = routes;