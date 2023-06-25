import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("accessToken");
  return isLoggedIn ? children : <Navigate to="/" replace={true} />;
}

function PublicRoute({ children }) {
  const isLoggedIn = localStorage.getItem("accessToken");
  return isLoggedIn ? <Navigate to="/dashboard" replace={true} /> : children;
}

export default App;
