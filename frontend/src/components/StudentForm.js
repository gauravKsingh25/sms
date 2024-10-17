import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentForm = ({ onStudentCreated }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [feesPaid, setFeesPaid] = useState(false); // Change to boolean
  const [classValue, setClassValue] = useState(""); // For class selection
  const [classes, setClasses] = useState([]); // Store fetched classes

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/classes"); // Update with your endpoint
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStudent = {
      name,
      gender,
      dob,
      contactDetails,
      feesPaid, // Use boolean value directly
      classId: classValue, // Use selected classId
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/students",
        newStudent
      );
      console.log("Student created:", response.data);
      onStudentCreated(response.data); // Update parent with new student
      // Optionally reset the form
      setName("");
      setGender("");
      setDob("");
      setContactDetails("");
      setFeesPaid(false); // Reset feesPaid to false
      setClassValue("");
    } catch (error) {
      console.error(
        "Error creating student:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-white text-xl mb-4">Add New Student</h2>

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="w-full p-2 text-black"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className="w-full p-2 text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Contact Details</label>
        <input
          type="text"
          value={contactDetails}
          onChange={(e) => setContactDetails(e.target.value)}
          required
          className="w-full p-2 text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Fees Paid</label>
        <input
          type="checkbox"
          checked={feesPaid}
          onChange={(e) => setFeesPaid(e.target.checked)} // Update feesPaid based on checkbox
          className="mr-2"
        />
        <span className="text-gray-300">Check if fees have been paid</span>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Class</label>
        <select
          value={classValue}
          onChange={(e) => setClassValue(e.target.value)}
          required
          className="w-full p-2 text-black"
        >
          <option value="">Select Class</option>
          {classes.map((classItem) => (
            <option key={classItem._id} value={classItem._id}>
              {classItem.className}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default StudentForm;
