const express = require("express");
const router = express.Router();
const check_auth = require("../middleware/check-auth");
const dashboardController = require("../controllers/dashboard-controller");

router.post("/get-monthly-revenue",dashboardController.getTotalRevenueMonth);
router.get("/get-total-revenue",dashboardController.getTotalRevenue);
router.post("/get-monthly-users",dashboardController.getMonthlyUsers);
router.get("/get-total-users",dashboardController.getTotalUsers);
module.exports = router;