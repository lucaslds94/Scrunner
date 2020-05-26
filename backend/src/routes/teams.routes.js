const { Router } = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { user } = require("../middlewares/user.middleware");

const teamController = require("../controllers/team.controller");

const routes = Router();

routes.get("/teams/:userId", auth, user, teamController.index);

routes.get(
  "/teams/details/:teamId/:userId",
  auth,
  user,
  teamController.details
);

routes.post("/teams/create", auth, teamController.store);

routes.post("/teams/entry", auth, teamController.entry);

routes.put("/teams/update/:teamId/:userId", auth, user, teamController.update);

routes.delete(
  "/teams/delete/:teamId/:userId",
  auth,
  user,
  teamController.delete
);

routes.delete("/teams", auth, teamController.exit);

module.exports = routes;
