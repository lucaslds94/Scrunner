const { Router } = require("express");

const { auth } = require("../middlewares/auth.middleware");
const { user } = require("../middlewares/user.middleware");
const { team } = require("../middlewares/team.middleware");
const { board } = require("../middlewares/board.middleware");
const { userInTeam } = require("../middlewares/userInTeam.middleware");
const { isLeader } = require("../middlewares/isLeader.middleware");
const { isCollaborator } = require("../middlewares/isCollaborator.middleware");
const { dailyContent } = require("../middlewares/dailyContent.middleware");

const { storeContentValidator } = require("../validators/daily.validator");

const routes = Router();

const dailyController = require("../controllers/daily.controller");

routes.get(
  "/dailys/boards/:teamId/:userId",
  auth,
  user,
  team,
  userInTeam,
  isCollaborator,
  dailyController.index
);

routes.get(
  "/dailys/boards/contents/:teamId/:boardId/:userId",
  auth,
  user,
  team,
  userInTeam,
  board,
  isCollaborator,
  dailyController.indexContent
);

routes.post(
  "/dailys/boards/contents/:teamId/:boardId/:userId",
  storeContentValidator,
  auth,
  user,
  team,
  userInTeam,
  board,
  isCollaborator,
  dailyController.storeContent
);

routes.post(
  "/dailys/boards/:teamId/:userId",
  auth,
  user,
  team,
  userInTeam,
  isLeader,
  dailyController.store
);

routes.put(
  "/dailys/boards/contents/update/:boardId/:userId",
  storeContentValidator,
  auth,
  user,
  board,
  dailyController.updateContent
);

routes.delete(
  "/dailys/boards/:teamId/:boardId/:userId",
  auth,
  user,
  team,
  userInTeam,
  isLeader,
  board,
  dailyController.deleteBoard
);

routes.delete(
  "/dailys/boards/contents/:teamId/:boardId/:contentId/:userId",
  auth,
  user,
  team,
  userInTeam,
  board,
  dailyContent,
  dailyController.deleteContent
);

module.exports = routes;
