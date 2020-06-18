const { Router } = require("express");
const routes = Router();
const sessionController = require("../controllers/session.controller");

routes.post("/login", sessionController.login);

module.exports = routes;
