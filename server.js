const express = require("express"); // Import express
const mongoose = require("mongoose"); // Import mongoose
const cors = require("cors"); // Import CORS
const dotenv = require("dotenv"); // Import dotenv
const teacherRoutes = require("./routes/teacherRoutes"); // Import teacher routes
const studentRoutes = require("./routes/studentRoutes"); // Import student routes
const classRoutes = require("./routes/classRoutes"); // Import class routes
const expensesRoutes = require("./routes/expensesRoutes"); // Import expenses routes
const revenueRoutes = require("./routes/revenueRoutes"); // Import revenue routes
const errorHandler = require("./middleware/errorHandler"); // Import error handler

dotenv.config(); // Load env variables

const app = express(); // Create app
const PORT = process.env.PORT || 5000; // Set port

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // To parse JSON bodies
app.use("/api/teachers", teacherRoutes); // Teacher routes
app.use("/api/students", studentRoutes); // Student routes
app.use("/api/classes", classRoutes); // Class routes
app.use("/api/expenses", expensesRoutes); // Expenses routes
app.use("/api/revenue", revenueRoutes); // Revenue routes

// Error Handling Middleware
app.use(errorHandler); // Handle errors

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI) // Connect to MongoDB
  .then(() => {
    console.log("MongoDB connected"); // Success message
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`); // Server running message
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error); // Log connection error
  });
