const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Set status code
  res.status(statusCode); // Respond with status

  res.json({
    message: err.message, // Send error message
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // Send stack trace if not in production
  });
};

module.exports = errorHandler; // Export error handler
