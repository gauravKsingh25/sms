const Teacher = require("../models/Teacher"); // Importing Teacher model

// GET all teachers
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({}); // Get all teachers
    res.json(teachers); // Send back teachers
  } catch (error) {
    res.status(500).json({ message: "Server error" }); // Log server error
  }
};

// GET total number of teachers
const getTotalTeachers = async (req, res) => {
  try {
    const totalTeachers = await Teacher.countDocuments(); // Count teachers
    res.json({ totalTeachers }); // Send total back
  } catch (error) {
    console.error("Error fetching total teachers:", error); // Log error
    res.status(500).json({ message: "Server error" });
  }
};

// POST create a new teacher
const createTeacher = async (req, res) => {
  const { name, gender, dob, contactDetails, salary, assignedClass } = req.body;

  try {
    const newTeacher = new Teacher({
      name,
      gender,
      dob,
      contactDetails,
      salary,
      assignedClass,
    });
    await newTeacher.save(); // Save new teacher
    res.status(201).json(newTeacher); // Respond with new teacher
  } catch (error) {
    res.status(400).json({ message: "Error creating teacher" }); // Log error
  }
};

// DELETE a teacher by ID
const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params; // Get teacher ID
    const deletedTeacher = await Teacher.findByIdAndDelete(id); // Try to delete

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" }); // Not found
    }

    res.status(200).json({ message: "Teacher deleted successfully" }); // Success
  } catch (error) {
    res.status(500).json({ message: "Server error" }); // Log server error
  }
};

// Export functions for use in other files
module.exports = {
  getTeachers,
  createTeacher,
  deleteTeacher,
  getTotalTeachers,
};
