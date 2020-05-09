const {Router} = require('express');

const routes = Router();

const userController = require('../controllers/user.controller');

routes.post('/user', userController.store);
routes.delete('/user/:id', userController.delete);

module.exports = routes;