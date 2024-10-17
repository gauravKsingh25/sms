// src/pages/StudentManagementPage.js
import React, { useContext } from "react";
import { StudentContext } from "../context/StudentContext"; // Import the context
import StudentForm from "../components/StudentForm";

const StudentManagementPage = () => {
  const { students, addStudent, deleteStudent } = useContext(StudentContext); // Use context

  const handleStudentCreated = (newStudent) => {
    addStudent(newStudent); // Add the new student to the context
  };

  // Function to calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="p-4">
      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        {" "}
        {/* Added container */}
        <h1 className="text-2xl mb-4 text-FFF5CD">Student Management</h1>
        <StudentForm onStudentCreated={handleStudentCreated} />
        <h2 className="text-xl mt-8 mb-4 text-FFF5CD">Existing Students</h2>
        <table className="min-w-full bg-gray-900 rounded-md shadow-md">
          {" "}
          {/* Changed background to gray-900 */}
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">Name</th>{" "}
              {/* Changed header background to gray-800 */}
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">Age</th>
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">Class ID</th>
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">Fees Status</th>
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student._id}
                className="hover:bg-gray-800 transition duration-200"
              >
                {" "}
                {/* Added hover effect */}
                <td className="border px-4 py-2 text-FFF5CD">
                  {student.name}
                </td>{" "}
                {/* Changed font color to FFF5CD */}
                <td className="border px-4 py-2 text-FFF5CD">
                  {calculateAge(student.dob)}
                </td>
                <td className="border px-4 py-2 text-FFF5CD">
                  {student.classId}
                </td>
                <td className="border px-4 py-2 text-FFF5CD">
                  {student.feesPaid ? "Paid" : "Not Paid"}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => deleteStudent(student._id)} // Call delete function on click
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

export default StudentManagementPage;
