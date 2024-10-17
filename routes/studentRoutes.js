const express = require("express"); // Import express
const {
  getStudents,
  createStudent,
  deleteStudent,
  getTotalStudents, // Import total students controller
  getUnpaidFees, // Import unpaid fees controller
} = require("../controllers/studentController"); // Import student controllers

const router = express.Router(); // Create router

// GET all students
router.get("/", getStudents); // Fetch all students

// GET total number of students
router.get("/total", getTotalStudents); // Fetch total students

// GET unpaid fees students
router.get("/unpaid-fees", getUnpaidFees); // Fetch unpaid fees students

// POST create a new student
router.post("/", createStudent); // Create new student

// DELETE a student by ID
router.delete("/:id", deleteStudent); // Delete student by ID

module.exports = router; // Export router
