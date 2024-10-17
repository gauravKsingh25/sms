const Class = require("../models/Class");
const Student = require("../models/Student"); // Student model needed

// GET all classes
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find({});
    res.json(classes); // Return classes
  } catch (error) {
    console.error("Error fetching classes:", error); // Log error
    res.status(500).json({ message: "Server error" }); // Server issue
  }
};

// GET total number of classes
const getTotalClasses = async (req, res) => {
  try {
    const totalClasses = await Class.countDocuments(); // Count classes
    res.json({ totalClasses });
  } catch (error) {
    console.error("Error fetching total classes:", error); // Log error
    res.status(500).json({ message: "Server error" });
  }
};

// GET class by ID with details
const getClassById = async (req, res) => {
  try {
    const classDetails = await Class.findById(req.params.id)
      .populate("students") // Get students too
      .populate("teacherId"); // Get teacher info

    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" }); // Not found
    }

    res.json(classDetails); // Send class details
  } catch (error) {
    console.error("Error fetching class:", error); // Log error
    res.status(500).json({ message: "Server error" });
  }
};

// GET students by class ID
const getStudentsByClassId = async (req, res) => {
  try {
    const classId = req.params.id;
    const classData = await Class.findById(classId).populate("students"); // Get class with students

    if (!classData) {
      return res.status(404).json({ message: "Class not found" }); // Class missing
    }

    res.json(classData.students); // Return students
  } catch (error) {
    console.error("Error fetching students by class ID:", error); // Log error
    res.status(500).json({ message: "Server error" });
  }
};

// POST create a new class
const createClass = async (req, res) => {
  const { className, year, studentFees } = req.body;

  if (!className || year === undefined || studentFees === undefined) {
    return res.status(400).json({ message: "All fields are required" }); // Missing info
  }

  try {
    const newClass = new Class({ className, year, studentFees }); // Create class
    await newClass.save(); // Save it
    res.status(201).json(newClass); // Respond with new class
  } catch (error) {
    console.error("Error creating class:", error); // Log error
    res.status(400).json({ message: "Error creating class" });
  }
};

// DELETE a class by ID
const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClass = await Class.findByIdAndDelete(id); // Delete class
    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" }); // If not found
    }
    res.status(200).json({ message: "Class deleted successfully" }); // Success
  } catch (error) {
    console.error("Error deleting class:", error); // Log error
    res.status(500).json({ message: "Server error" });
  }
};

// Export all functions
module.exports = {
  getClasses,
  getClassById,
  createClass,
  deleteClass,
  getTotalClasses,
  getStudentsByClassId,
};
