const { Router } = require("express");

const { auth } = require("../middlewares/auth.middleware");
const { user } = require("../middlewares/user.middleware");
const { team } = require("../middlewares/team.middleware");
const { userInTeam } = require("../middlewares/userInTeam.middleware");
const { isCollaborator } = require("../middlewares/isCollaborator.middleware");
const { isOwner } = require("../middlewares/isOwner.middleware");

const teamController = require("../controllers/team.controller");
const {
  entryTeamValidator,
  storeTeamValidator,
  updateTeamValidator,
} = require("../validators/team.validator");

const routes = Router();

routes.get("/teams/:userId", auth, user, teamController.index);

routes.get(
  "/teams/details/:teamId/:userId",
  auth,
  user,
  team,
  userInTeam,
  teamController.details
);

routes.post(
  "/teams/create/:userId",
  storeTeamValidator,
  auth,
  user,
  teamController.store
);

routes.post(
  "/teams/entry/:userId",
  entryTeamValidator,
  auth,
  user,
  isCollaborator,
  teamController.entry
);

routes.put(
  "/teams/update/:teamId/:userId",
  updateTeamValidator,
  auth,
  user,
  team,
  isOwner,
  teamController.update
);

routes.delete(
  "/teams/delete/:teamId/:userId",
  auth,
  user,
  team,
  isOwner,
  userInTeam,
  teamController.delete
);

routes.delete(
  "/teams/exit/:teamId/:userId",
  auth,
  user,
  team,
  userInTeam,
  teamController.exit
);

module.exports = routes;
