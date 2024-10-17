const Student = require("../models/Student"); // Importing Student model

const calculateTotalRevenue = async (req, res) => {
  try {
    // Get all students
    const students = await Student.find({});
    // Calculate total revenue from feesPaid
    const totalRevenue = students.reduce((acc, student) => {
      return acc + student.feesPaid; // Add up feesPaid
    }, 0);

    res.json({ total: totalRevenue }); // Send total revenue back
  } catch (error) {
    res.status(500).json({ message: "Error calculating total revenue", error }); // Log error
  }
};

module.exports = { calculateTotalRevenue }; // Export the function
