const express = require("express"); // Import express
const { calculateTotalRevenue } = require("../controllers/revenueController"); // Import revenue controller

const router = express.Router(); // Create router

// GET total revenue
router.get("/", calculateTotalRevenue); // Fetch total revenue

module.exports = router; // Export router
