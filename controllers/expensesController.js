const Class = require("../models/Class");
const Student = require("../models/Student"); // Importing Student model

const calculateTotalExpenses = async (req, res) => {
  try {
    // Get all classes
    const classes = await Class.find({});
    // Calculate total expenses from studentFees
    const totalExpenses = classes.reduce((acc, classData) => {
      return acc + classData.studentFees; // Add up fees
    }, 0);

    res.json({ total: totalExpenses }); // Send total back
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error calculating total expenses", error }); // Log error
  }
};

module.exports = { calculateTotalExpenses }; // Export the function
