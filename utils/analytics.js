// Placeholder utility for analytics like calculating fees and salaries
const calculateIncome = (classes) => {
  return classes.reduce((total, cls) => total + cls.fees, 0); // Calculate total fees
};

const calculateSalaryExpenses = (teachers) => {
  return teachers.reduce((total, teacher) => total + teacher.salary, 0); // Calculate total salaries
};

module.exports = {
  calculateIncome, // Export income calculation
  calculateSalaryExpenses, // Export salary expenses calculation
};
