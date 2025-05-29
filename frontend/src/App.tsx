import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const isAuth = !!localStorage.getItem("access_token");
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to={isAuth ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}
export default App;