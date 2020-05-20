const { Router } = require('express');
const { auth } = require('../middlewares/auth.middleware');

const teamController = require('../controllers/team.controller');

const routes = Router();

routes.get('/teams/:id', auth, teamController.index);

routes.delete('/teams', auth, teamController.exit);

module.exports = routes;
