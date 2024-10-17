import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherForm = ({ onTeacherCreated }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [salary, setSalary] = useState("");
  const [assignedClass, setAssignedClass] = useState("");
  const [classes, setClasses] = useState([]); // State to hold classes

  useEffect(() => {
    // Fetch preexisting classes
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/classes");
        setClasses(response.data); // Set classes state
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTeacher = {
      name,
      gender,
      dob,
      contactDetails,
      salary: Number(salary), // Convert salary to a number
      assignedClass,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/teachers",
        newTeacher
      );
      console.log("Teacher created:", response.data);
      onTeacherCreated(response.data); // Notify the parent component about the new teacher

      // Optionally reset the form
      setName("");
      setGender("");
      setDob("");
      setContactDetails("");
      setSalary("");
      setAssignedClass("");
    } catch (error) {
      console.error(
        "Error creating teacher:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-white text-xl mb-4">Add New Teacher</h2>

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
        <label className="block text-gray-300 mb-1">Salary</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
          className="w-full p-2 text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-1">Assigned Class</label>
        <select
          value={assignedClass}
          onChange={(e) => setAssignedClass(e.target.value)}
          required
          className="w-full p-2 text-black"
        >
          <option value="">Select a Class</option>
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

export default TeacherForm;
