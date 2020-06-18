const { Router } = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { user } = require("../middlewares/user.middleware");

const multer = require("multer");
const multerConfig = require("../config/multer");

const upload = multer(multerConfig);

const routes = Router();

const userController = require("../controllers/user.controller");

routes.post("/user", userController.store);

routes.put("/user/:userId", user, userController.disable);

routes.put(
  "/user/update/:userId",
  auth,
  user,
  upload.single("image"),
  userController.update
);

module.exports = routes;
