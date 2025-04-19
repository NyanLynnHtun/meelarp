// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import ReportPage from "./ReportPage";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";

// NavBar only for admin routes
function NavBar() {
  return (
    <nav className="bg-gray-800 text-gray-100 p-4 flex space-x-4">
      <NavLink
        to="/admin"
        className={({ isActive }) =>
          isActive ? 'underline text-blue-400' : 'hover:underline'
        }
      >Dashboard</NavLink>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? 'underline text-blue-400' : 'hover:underline'
        }
      >Report</NavLink>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReportPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <NavBar />
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}