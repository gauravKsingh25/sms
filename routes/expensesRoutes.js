const express = require("express"); // Import express
const { calculateTotalExpenses } = require("../controllers/expensesController"); // Import expenses controller

const router = express.Router(); // Create router

// GET total expenses
router.get("/", calculateTotalExpenses); // Fetch total expenses

module.exports = router; // Export router
