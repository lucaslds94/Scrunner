const { Router } = require("express");

const { auth } = require("../middlewares/auth.middleware");
const { user } = require("../middlewares/user.middleware");
const { team } = require("../middlewares/team.middleware");
const { userInTeam } = require("../middlewares/userInTeam.middleware");

const routes = Router();

const dailyController = require("../controllers/daily.controller");

routes.get(
  "/dailys/:teamId/:userId",
  auth,
  user,
  team,
  userInTeam,
  dailyController.index
);

module.exports = routes;
