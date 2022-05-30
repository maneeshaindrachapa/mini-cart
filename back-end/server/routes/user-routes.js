const express = require("express");
const router = express.Router();
const check_auth = require("../middleware/check-auth");
const userController = require("../controllers/user-controller");

router.post("/sign-in", userController.login);
router.post("/register", userController.register);
router.post("/forget-password", userController.forgetPassword);
router.post("/update-password", userController.updatePassword);

router.post("/me", userController.getProfileDetails);
module.exports = router;
