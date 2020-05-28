const { Router } = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { user } = require("../middlewares/user.middleware");
const { isOwner } = require("../middlewares/isOwner.middleware");
const { isCollaborator } = require("../middlewares/isCollaborator.middleware");

const dashboardController = require("../controllers/dashboard.controller");

const routes = Router();

routes.get(
  "/dashboard/owner/:userId",
  auth,
  user,
  isOwner,
  dashboardController.indexOwner
);
routes.get(
  "/dashboard/collaborator/:userId",
  auth,
  user,
  isCollaborator,
  dashboardController.indexCollaborator
);

module.exports = routes;
