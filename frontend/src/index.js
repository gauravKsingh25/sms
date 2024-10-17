import React from "react";
import ReactDOM from "react-dom/client"; // Update for React 18
import "./App.css";
import App from "./App";

// Get the root element from the DOM
const rootElement = document.getElementById("root");

// Create a React root for React 18+
const root = ReactDOM.createRoot(rootElement);

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
