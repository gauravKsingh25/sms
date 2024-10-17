const Student = require("../models/Student"); // Importing Student model

// GET all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students); // Return all students
  } catch (error) {
    res.status(500).json({ message: "Server error" }); // Log server error
  }
};

// GET total number of students
const getTotalStudents = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments(); // Count all students
    res.json({ totalStudents }); // Send total back
  } catch (error) {
    console.error("Error fetching total students:", error); // Log error
    res.status(500).json({ message: "Server error" });
  }
};

// GET unpaid fees students
const getUnpaidFees = async (req, res) => {
  try {
    const unpaidFeesStudents = await Student.find({ feesPaid: false }); // Find unpaid fees
    res.json(unpaidFeesStudents); // Return unpaid fees students
  } catch (error) {
    console.error("Error fetching unpaid fees students:", error); // Log error
    res.status(500).json({ message: "Server error" });
  }
};

// POST create a new student
const createStudent = async (req, res) => {
  const { name, gender, dob, contactDetails, feesPaid, classId } = req.body;

  try {
    const newStudent = new Student({
      name,
      gender,
      dob,
      contactDetails,
      feesPaid,
      classId,
    });
    await newStudent.save(); // Save new student
    res.status(201).json(newStudent); // Respond with new student
  } catch (error) {
    res.status(400).json({ message: "Error creating student" }); // Log error
  }
};

// DELETE a student by ID
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByIdAndDelete(id); // Try to delete student
    if (!student) {
      return res.status(404).json({ message: "Student not found" }); // Not found
    }
    res.json({ message: "Student deleted successfully" }); // Success
  } catch (error) {
    res.status(500).json({ message: "Server error" }); // Log server error
  }
};

// Export functions for use in other files
module.exports = {
  getStudents,
  createStudent,
  deleteStudent,
  getTotalStudents,
  getUnpaidFees,
};
