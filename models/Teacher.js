const mongoose = require("mongoose"); // Import mongoose

// Define teacher schema
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name is required
  gender: { type: String, required: true }, // Gender is required
  dob: { type: Date, required: true }, // Date of birth is required
  contactDetails: { type: String, required: true }, // Contact details are required
  salary: { type: Number, required: true }, // Salary is required
  assignedClass: { type: String, required: true }, // Link to Class model
});

const Teacher = mongoose.model("Teacher", teacherSchema); // Create model

module.exports = Teacher; // Export model
