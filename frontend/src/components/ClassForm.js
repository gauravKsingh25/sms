import React, { useState } from "react";
import axios from "axios";

const ClassForm = ({ fetchClasses }) => {
  const [className, setClassName] = useState("");
  const [year, setYear] = useState("");
  const [studentFees, setStudentFees] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/classes", {
        className,
        year,
        studentFees,
      });
      fetchClasses(); // Refresh the class list after adding a new class
      setClassName("");
      setYear("");
      setStudentFees("");
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 bg-gray-800 rounded-lg p-4 shadow-md"
    >
      <h2 className="text-xl mb-4 text-FFF5CD">Add New Class</h2>
      <div className="mb-4">
        <label className="block text-FFF5CD mb-1">Class Name</label>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border border-gray-400 p-2 rounded w-full" // Input styling
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-FFF5CD mb-1">Year</label>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border border-gray-400 p-2 rounded w-full" // Input styling
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-FFF5CD mb-1">Student Fees</label>
        <input
          type="number"
          value={studentFees}
          onChange={(e) => setStudentFees(e.target.value)}
          className="border border-gray-400 p-2 rounded w-full" // Input styling
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" // Button styling
      >
        Add Class
      </button>
    </form>
  );
};

export default ClassForm;
