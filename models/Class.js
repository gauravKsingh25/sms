const mongoose = require("mongoose"); // Import mongoose

// Define class schema
const classSchema = new mongoose.Schema({
  className: { type: String, required: true }, // Class name is required
  year: { type: Number, required: true }, // Year is required
  teacherId: { type: String, required: false }, // Teacher ID is optional
  studentFees: { type: Number, required: true }, // Fees are required
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // Reference to Student model
});

const Class = mongoose.model("Class", classSchema); // Create model

module.exports = Class; // Export model
