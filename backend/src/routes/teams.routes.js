const { Router } = require('express');
const { auth } = require('../middlewares/auth.middleware');

const teamController = require('../controllers/team.controller');

const routes = Router();

routes.delete('/teams', auth, teamController.exit);

module.exports = routes;
