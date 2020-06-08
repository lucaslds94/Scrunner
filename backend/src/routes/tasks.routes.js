const { Router } = require("express");

const { auth } = require("../middlewares/auth.middleware");
const { user } = require("../middlewares/user.middleware");
const { team } = require("../middlewares/team.middleware");
const { userInTeam } = require("../middlewares/userInTeam.middleware");
const { isLeader } = require("../middlewares/isLeader.middleware");
const { isCollaborator } = require("../middlewares/isCollaborator.middleware");
const { taskBoard } = require("../middlewares/taskBoard.middlware");

const taskController = require("../controllers/task.controller");

const routes = Router();

routes.get(
  "/tasks/boards/:teamId/:userId",
  auth,
  user,
  team,
  userInTeam,
  isCollaborator,
  taskController.indexBoards
);

routes.post(
  "/tasks/boards/:teamId/:userId",
  auth,
  user,
  team,
  userInTeam,
  isCollaborator,
  isLeader,
  taskController.storeBoard
);

routes.delete(
  "/tasks/boards/:teamId/:userId/:boardId",
  auth,
  user,
  team,
  userInTeam,
  isCollaborator,
  isLeader,
  taskBoard,
  taskController.deleteBoard
);

module.exports = routes;
