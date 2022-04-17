const express = require("express");
const router = express.Router();
const check_auth = require("../middleware/check-auth");
const userController = require("../controllers/user-controller");

router.post("/login", userController.login);
router.post("/register",userController.register);
module.exports = router;
