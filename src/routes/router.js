const express = require("express");
const router = express.Router();
const auth = require("../config/auth");

const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const tokenController = require("../controllers/resettokenController");
const logoutController = require("../controllers/logoutController");
const userDataController = require("../controllers/getUserDataController");
//USER FUNC
router.post("/register", registerController.funcregister);
router.post("/login", loginController.loginController);
router.post("/token", tokenController.resetToken);
router.delete("/logout", auth.authenticateToken, logoutController.logout);
router.get(
  "/user",
  auth.authenticateToken,
  userDataController.UserDataController
);

module.exports = router;
