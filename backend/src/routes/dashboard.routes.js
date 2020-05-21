const { Router } = require('express');
const { auth } = require('../middlewares/auth.middleware');

const dashboardController = require('../controllers/dashboard.controller');

const routes = Router();

routes.get('/dashboard/leader/:id', auth, dashboardController.indexLeader);

module.exports = routes;