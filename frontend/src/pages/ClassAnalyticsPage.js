import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ClassAnalytics = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!classId) {
        console.error("Class ID is not defined");
        return; // Exit if classId is not set
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/classes/${classId}/students`
        );
        setStudents(response.data);
        setTotalStudents(response.data.length);
        countGenders(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [classId]);

  const countGenders = (students) => {
    const males = students.filter(
      (student) => student.gender === "Male"
    ).length;
    const females = students.filter(
      (student) => student.gender === "Female"
    ).length;
    const others = students.filter(
      (student) => student.gender === "Other"
    ).length;

    setMaleCount(males);
    setFemaleCount(females);
    setOtherCount(others);
  };

  const genderData = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        label: "Number of Students",
        data: [maleCount, femaleCount, otherCount],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-white text-xl mb-4">Class Analytics</h2>
      <div className="mb-4 text-gray-300">
        <h3>Total Students: {totalStudents}</h3>
      </div>
      <Bar data={genderData} />
    </div>
  );
};

export default ClassAnalytics;
