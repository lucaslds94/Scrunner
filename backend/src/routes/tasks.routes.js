const { Router } = require("express");

const { auth } = require("../middlewares/auth.middleware");
const { user } = require("../middlewares/user.middleware");
const { team } = require("../middlewares/team.middleware");
const { userInTeam } = require("../middlewares/userInTeam.middleware");
const { isLeader } = require("../middlewares/isLeader.middleware");
const { isCollaborator } = require("../middlewares/isCollaborator.middleware");
const { taskBoard } = require("../middlewares/taskBoard.middlware");
const { taskContent } = require("../middlewares/taskContent.middleware");

const taskController = require("../controllers/task.controller");

const routes = Router();

routes.get(
  "/tasks/boards/:teamId/:userId",
  auth,
  user,
  team,
  userInTeam,
  isCollaborator,
  taskController.boardsIndex
);

routes.get(
  "/tasks/contents/:teamId/:boardId/:userId",
  auth,
  user,
  team,
  userInTeam,
  isCollaborator,
  taskBoard,
  taskController.tasksIndex
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

routes.post(
  "/tasks/contents/:teamId/:boardId/:userId",
  auth,
  user,
  team,
  userInTeam,
  isCollaborator,
  taskBoard,
  taskController.storeContent
);

routes.delete(
  "/tasks/boards/:teamId/:boardId/:userId",
  auth,
  user,
  team,
  userInTeam,
  isCollaborator,
  isLeader,
  taskBoard,
  taskController.deleteBoard
);

routes.delete(
  "/tasks/contents/:teamId/:boardId/:contentId/:userId",
  auth,
  user,
  team,
  userInTeam,
  isCollaborator,
  taskBoard,
  taskContent,
  taskController.deleteContent
);

module.exports = routes;
