const mongoose = require("mongoose"); // Import mongoose

// Define student schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name is required
  gender: { type: String, required: true }, // Gender is required
  dob: { type: Date, required: true }, // Date of birth is required
  contactDetails: { type: String, required: true }, // Contact details are required
  feesPaid: { type: Number, required: true }, // Fees paid amount is required
  classId: { type: String, required: true }, // Link to Class model
});

const Student = mongoose.model("Student", studentSchema); // Create model

module.exports = Student; // Export model
