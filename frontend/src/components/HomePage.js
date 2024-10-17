import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faCalendarAlt,
  faUser,
  faChalkboardTeacher,
  faSchool,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HomePage = () => {
  const [studentsCount, setStudentsCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [classes, setClasses] = useState([]);
  const [unpaidStudents, setUnpaidStudents] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [showStudentList, setShowStudentList] = useState(false);
  const [showTeachersTable, setShowTeachersTable] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // New state to handle date picker
  const [selectedDate, setSelectedDate] = useState(new Date()); // New state to handle selected date

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, teachersRes, classesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/students"),
          axios.get("http://localhost:5000/api/teachers"),
          axios.get("http://localhost:5000/api/classes"),
        ]);

        setStudents(studentsRes.data);
        setStudentsCount(studentsRes.data.length);
        setTeachersCount(teachersRes.data.length);
        setClasses(classesRes.data);
        setTeachers(teachersRes.data);

        const unpaid = studentsRes.data.filter(
          (student) => student.feesPaid === 0
        );
        setUnpaidStudents(unpaid);

        const totalSalaries = teachersRes.data.reduce(
          (sum, teacher) => sum + (teacher.salary || 0),
          0
        );
        setTotalExpenses(totalSalaries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getClassName = (classId) => {
    const foundClass = classes.find((cls) => cls._id === classId);
    return foundClass ? foundClass.className : "Unknown Class";
  };

  // Toggle the date picker visibility
  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  return (
    <div className="container p-4">
      <h1 className="text-3xl mb-6 text-center">School Management Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Date Tile with Calendar Popup */}
        <div
          className="card flex justify-center items-center p-4 cursor-pointer"
          onClick={toggleDatePicker}
        >
          <FontAwesomeIcon icon={faCalendarAlt} size="3x" />
          <h2 className="text-xl mt-2">
            Date: {dayjs(selectedDate).format("D[th] MMMM")}
          </h2>
        </div>

        {/* DatePicker component that appears below the tile when clicked */}
        {isDatePickerOpen && (
          <div className="mt-2">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)} // Updates the selected date
              inline
            />
          </div>
        )}

        {/* Total Students Tile */}
        <div
          className="card flex justify-center items-center p-4 cursor-pointer"
          onClick={() => setShowStudentList(!showStudentList)}
        >
          <FontAwesomeIcon icon={faUser} size="3x" />
          <h2 className="text-xl mt-2">Total Students: {studentsCount}</h2>
        </div>

        {/* Total Teachers Tile */}
        <div
          className="card flex justify-center items-center p-4 cursor-pointer"
          onClick={() => setShowTeachersTable(!showTeachersTable)}
        >
          <FontAwesomeIcon icon={faChalkboardTeacher} size="3x" />
          <h2 className="text-xl mt-2">Total Teachers: {teachersCount}</h2>
        </div>

        {/* Total Classes Tile */}
        <div className="card flex justify-center items-center p-4">
          <FontAwesomeIcon icon={faSchool} size="3x" />
          <h2 className="text-xl mt-2">Total Classes: {classes.length}</h2>
        </div>

        {/* Unpaid Students Tile */}
        <div className="card p-4">
          <h2 className="text-xl">
            Unpaid Fees Students: {unpaidStudents.length}
          </h2>
          <table className="table mt-2">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              {unpaidStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{getClassName(student.classId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Expenses Tile */}
        <div className="card flex justify-center items-center p-4">
          <FontAwesomeIcon icon={faMoneyBillWave} size="3x" />
          <h2 className="text-xl mt-2">Total Expenses: ${totalExpenses}</h2>
        </div>

        {/* Bus Tile */}
        <div className="card flex justify-center items-center p-4">
          <FontAwesomeIcon icon={faBus} size="3x" />
          <h2 className="text-xl mt-2">Total Buses: 10</h2>
        </div>

        {/* Classes List */}
        <div className="card p-4">
          <h2 className="text-xl">Classes List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.map((cls) => (
              <div
                key={cls._id}
                className="cursor-pointer p-4 bg-[#E78F81] rounded hover:bg-blue-200 transition"
              >
                {cls.className}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Show Student List if toggled */}
      {showStudentList && (
        <div className="card mt-4">
          <h2 className="text-xl mb-2">List of Students</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{getClassName(student.classId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Show Teachers Table if toggled */}
      {showTeachersTable && (
        <div className="card mt-4">
          <h2 className="text-xl mb-2">Teachers and Assigned Classes</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Teacher Name</th>
                <th>Assigned Class</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td>{teacher.name}</td>
                  <td>{getClassName(teacher.assignedClass)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HomePage;
