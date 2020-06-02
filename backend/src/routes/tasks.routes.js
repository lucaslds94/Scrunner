const { Router } = require("express");

const { auth } = require("../middlewares/auth.middleware");
const { user } = require("../middlewares/user.middleware");
const { team } = require("../middlewares/team.middleware");
const { userInTeam } = require("../middlewares/userInTeam.middleware");
const { isLeader } = require("../middlewares/isLeader.middleware");
const { isCollaborator } = require("../middlewares/isCollaborator.middleware");

const taskController = require('../controllers/task.controller');

const routes = Router();

routes.get(
  "/tasks/boards/:teamId/:userId",
  auth,
  user,
  team,
  userInTeam,
  isCollaborator,
  taskController.index
);

module.exports = routes;