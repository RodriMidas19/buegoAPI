const express = require("express");
const router = express.Router();
const auth = require("../config/auth");

const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const tokenController = require("../controllers/resettokenController");
const logoutController = require("../controllers/logoutController");
const userDataController = require("../controllers/getUserDataController");
const trainingController = require("../controllers/trainingController");
const consultasController = require("../controllers/consultasController");
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

//Training
router.get("/treinosNomeData/:nome/:data",trainingController.getTreinosNomeData)
router.get("/treinosNome/:nome",trainingController.getTreinosNome);
router.get("/treinosHD/:dia/:mes/:ano", trainingController.getTreinosHD);
router.get("/treinos", trainingController.getTreinos);
router.post("/training", auth.authenticateToken,trainingController.addTreino);
router.delete("/Dtraining", trainingController.DeleteTrain);

//Consultas
router.get("/consultas", consultasController.getConsultas);

router.post(
  "/consulta",
  auth.authenticateToken,
  consultasController.addConsultas
);
router.delete("/Dconsulta", consultasController.DeleteConsultas);

module.exports = router;
