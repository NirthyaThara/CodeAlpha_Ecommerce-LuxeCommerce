// src/auth/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // 🚨 NOT LOGGED IN → go login ONCE
  if (!token ) return <Navigate to="/login" replace />;

  // 🚨 NOT ADMIN trying to access admin pages → go home
  if (adminOnly && user.role_id !== 1) return <Navigate to="/home" replace />;

  return children;
};

export default PrivateRoute;