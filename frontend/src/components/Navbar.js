import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white rounded-md shadow-lg">
      <ul className="flex space-x-4">
        <li className="group">
          <Link
            to="/"
            className="px-3 py-2 transition-all duration-300 ease-in-out rounded-md group-hover:bg-white group-hover:bg-opacity-30"
          >
            Home
          </Link>
        </li>
        <li className="group">
          <Link
            to="/teachers"
            className="px-3 py-2 transition-all duration-300 ease-in-out rounded-md group-hover:bg-white group-hover:bg-opacity-30"
          >
            Teachers
          </Link>
        </li>
        <li className="group">
          <Link
            to="/students"
            className="px-3 py-2 transition-all duration-300 ease-in-out rounded-md group-hover:bg-white group-hover:bg-opacity-30"
          >
            Students
          </Link>
        </li>
        <li className="group">
          <Link
            to="/classes"
            className="px-3 py-2 transition-all duration-300 ease-in-out rounded-md group-hover:bg-white group-hover:bg-opacity-30"
          >
            Classes
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
