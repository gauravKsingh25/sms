import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Add for navigation
import ClassForm from "../components/ClassForm";

const ClassManagementPage = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  // Fetch classes from the API
  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/classes");
      setClasses(response.data); // Update the state with fetched classes
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // Handle class deletion
  const deleteClass = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/classes/${id}`);
      setClasses((prevClasses) =>
        prevClasses.filter((classItem) => classItem._id !== id)
      ); // Update the local state to reflect the deletion
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  useEffect(() => {
    fetchClasses(); // Fetch classes on page load
  }, []);

  // Navigate to class analytics page
  const goToClassAnalytics = (classId) => {
    navigate(`/class-analytics/${classId}`);
  };

  return (
    <div className="p-4">
      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl mb-4 text-FFF5CD">Class Management</h1>
        <ClassForm fetchClasses={fetchClasses} />
        <h2 className="text-xl mt-8 mb-4 text-FFF5CD">Existing Classes</h2>
        <table className="min-w-full bg-gray-900 rounded-md shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">Class Name</th>
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">Year</th>
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">
                Student Fees
              </th>
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr
                key={classItem._id}
                className="hover:bg-gray-800 transition duration-200"
              >
                <td
                  className="border px-4 py-2 text-FFF5CD cursor-pointer"
                  onClick={() => goToClassAnalytics(classItem._id)} // Add onClick to navigate
                >
                  {classItem.className}
                </td>
                <td className="border px-4 py-2 text-FFF5CD">
                  {classItem.year}
                </td>
                <td className="border px-4 py-2 text-FFF5CD">
                  {classItem.studentFees}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => deleteClass(classItem._id)} // Call delete function on click
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassManagementPage;
