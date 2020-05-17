const {Router} = require('express');
// const { auth } = require('../middlewares/auth.middleware');
const routes = Router();

const sessionController = require('../controllers/session.controller');

routes.post('/login', sessionController.login);


module.exports = routes;