const express = require("express"); // Import express
const {
  getClasses,
  createClass,
  deleteClass,
  getClassById,
  getTotalClasses,
  getStudentsByClassId, // Import function for fetching students
} = require("../controllers/classController"); // Import class controllers

const router = express.Router(); // Create router

// GET all classes
router.get("/", getClasses); // Fetch all classes

// GET class by ID
router.get("/:id", getClassById); // Fetch class by ID

// GET total number of classes
router.get("/total", getTotalClasses); // Fetch total classes

// GET students by class ID
router.get("/:id/students", getStudentsByClassId); // Fetch students in class

// POST create a new class
router.post("/", createClass); // Create new class

// DELETE a class by ID
router.delete("/:id", deleteClass); // Delete class by ID

module.exports = router; // Export router
