const { Router } = require('express');
const { auth } = require('../middlewares/auth.middleware');
const { user } = require("../middlewares/user.middleware");

const dashboardController = require('../controllers/dashboard.controller');

const routes = Router();

routes.get('/dashboard/owner/:userId', auth, user, dashboardController.indexOwner);
routes.get('/dashboard/collaborator/:userId', auth, user, dashboardController.indexCollaborator);

module.exports = routes;