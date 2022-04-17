const express = require("express");
const router = express.Router();
const check_auth = require("../middleware/check-auth");
const userController = require("../controllers/user-controller");

router.post("/login", userController.login);
router.post("/register",userController.register);
router.post("/forget-password",userController.forgetPassword);
router.post("/validate-password",userController.validatePassword);
module.exports = router;
