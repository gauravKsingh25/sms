import React, { useEffect, useState } from "react";
import axios from "axios";
import TeacherForm from "../components/TeacherForm";

const TeacherManagementPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/classes");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`);
      setTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher._id !== id)
      );
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchClasses();
  }, []);

  const handleTeacherCreated = (newTeacher) => {
    setTeachers((prevTeachers) => [...prevTeachers, newTeacher]);
  };

  const getClassNameById = (classId) => {
    const foundClass = classes.find((classItem) => classItem._id === classId);
    return foundClass ? foundClass.className : "N/A";
  };

  return (
    <div className="container p-4">
      <h1 className="text-3xl mb-4 text-center text-B7E0FF">
        Teacher Management
      </h1>
      <TeacherForm onTeacherCreated={handleTeacherCreated} />
      <h2 className="text-2xl mt-8 mb-4 text-center text-FFF5CD">
        Existing Teachers
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-md shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">Name</th>
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">Gender</th>
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">
                Date of Birth
              </th>
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">Contact</th>
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">Salary</th>
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">
                Assigned Class
              </th>
              <th className="py-2 px-4 bg-gray-800 text-FFF5CD">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr
                key={teacher._id}
                className="hover:bg-gray-800 transition duration-200"
              >
                <td className="border px-4 py-2 text-FFF5CD">{teacher.name}</td>
                <td className="border px-4 py-2 text-FFF5CD">
                  {teacher.gender}
                </td>
                <td className="border px-4 py-2 text-FFF5CD">
                  {new Date(teacher.dob).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 text-FFF5CD">
                  {teacher.contactDetails}
                </td>
                <td className="border px-4 py-2 text-FFF5CD">
                  {teacher.salary}
                </td>
                <td className="border px-4 py-2 text-FFF5CD">
                  {getClassNameById(teacher.assignedClass)}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => deleteTeacher(teacher._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                  >
                    <img
                      src="https://img.icons8.com/ios-filled/20/ffffff/trash.png"
                      alt="Delete"
                    />
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

export default TeacherManagementPage;
