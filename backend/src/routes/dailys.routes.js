const { Router } = require("express");

const { auth } = require("../middlewares/auth.middleware");
const { user } = require("../middlewares/user.middleware");
const { team } = require("../middlewares/team.middleware");
const { userInTeam } = require("../middlewares/userInTeam.middleware");
const { isLeader } = require("../middlewares/isLeader.middleware");

const routes = Router();

const dailyController = require("../controllers/daily.controller");

routes.get(
  "/dailys/boards/:teamId/:userId",
  auth,
  user,
  team,
  userInTeam,
  dailyController.index
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

routes.delete(
  "/dailys/boards/:teamId/:boardId/:userId",
  auth,
  user,
  team,
  userInTeam,
  isLeader,
  dailyController.deleteBoard
);

module.exports = routes;
