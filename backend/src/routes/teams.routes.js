const { Router } = require('express');
const { auth } = require('../middlewares/auth.middleware');

const teamController = require('../controllers/team.controller');

const routes = Router();

routes.get('/teams/:userId', auth, teamController.index);

routes.get('/teams/details/:teamId/:userId', auth, teamController.details)

routes.post('/teams/create', auth, teamController.store);

routes.put('/teams/update/:teamId/:userId', auth, teamController.update);

routes.delete('/teams/delete/:teamId/:userId', auth, teamController.delete);

routes.delete('/teams', auth, teamController.exit);

module.exports = routes;
