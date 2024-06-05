import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken, getRole } from "../utils/auth";

const ProtectedRoute = ({ requiredRole }) => {
  const token = getToken();
  const userRole = getRole();

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // return <Navigate to="/not-authorized" replace />;
    return <h1>{userRole}</h1>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
