const { Router } = require("express");
const multer = require("multer");

const { auth } = require("../middlewares/auth.middleware");
const { user } = require("../middlewares/user.middleware");
const userController = require("../controllers/user.controller");
const {
  storeUserValidator,
  updateUserValidator,
} = require("../validators/user.validator");
const multerConfig = require("../config/multer");

const upload = multer(multerConfig);
const routes = Router();

routes.post("/user",  storeUserValidator, userController.store);

routes.put("/user/validate", userController.validate);

routes.put("/user/:userId", user, userController.disable);

routes.put(
  "/user/update/:userId",
  upload.single("image"),
  updateUserValidator,
  auth,
  user,
  userController.update
);



module.exports = routes;
