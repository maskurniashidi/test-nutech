import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));

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
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
              </Suspense>
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
