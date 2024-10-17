// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TeacherManagementPage from "./pages/TeacherManagementPage";
import StudentManagementPage from "./pages/StudentManagementPage";
import ClassManagementPage from "./pages/ClassManagementPage";
import ClassAnalyticsPage from "./pages/ClassAnalyticsPage";
import HomePage from "./components/HomePage"; // Import the HomePage component
import Navbar from "./components/Navbar";
import { StudentProvider } from "./context/StudentContext"; // Import the context
import "./App.css";

const App = () => {
  return (
    <StudentProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />{" "}
            {/* Add the home page route */}
            <Route path="/teachers" element={<TeacherManagementPage />} />
            <Route path="/students" element={<StudentManagementPage />} />
            <Route path="/classes" element={<ClassManagementPage />} />
            <Route
              path="/class-analytics/:classId"
              element={<ClassAnalyticsPage />}
            />
          </Routes>
        </div>
      </Router>
    </StudentProvider>
  );
};

export default App;
