const express = require("express"); // Import express
const {
  getTeachers,
  createTeacher,
  deleteTeacher,
  getTotalTeachers, // Import total teachers controller
} = require("../controllers/teacherController"); // Import teacher controllers

const router = express.Router(); // Create router

// GET all teachers
router.get("/", getTeachers); // Fetch all teachers

// GET total number of teachers
router.get("/total", getTotalTeachers); // Fetch total teachers

// POST create a new teacher
router.post("/", createTeacher); // Create new teacher

// DELETE a teacher by ID
router.delete("/:id", deleteTeacher); // Delete teacher by ID

module.exports = router; // Export router
