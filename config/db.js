const mongoose = require("mongoose");

// Trying to connect
const connectDB = async () => {
  try {
    // Use URI from .env
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Avoid warning
      useUnifiedTopology: true, // Another warning fix
    });
    // Connected! Log it
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Uh-oh. Log error
    console.error(`Error: ${error.message}`);
    // Can't go on, exit
    process.exit(1);
  }
};

// Export function
module.exports = connectDB;
