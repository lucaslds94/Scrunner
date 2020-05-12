const {Router} = require('express');

const routes = Router();

const userController = require('../controllers/user.controller');

routes.post('/user', userController.store);
routes.put('/user/:id', userController.disable);

module.exports = routes;