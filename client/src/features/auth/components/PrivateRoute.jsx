const PrivateRoute = ({ children, adminOnly = false, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // 🚨 NOT LOGGED IN
  if (!token) return <Navigate to="/login" replace />;

  if (!user) return <Navigate to="/login" replace />;

  const role = Number(user.role_id);

  // 🚨 Handle allowedRoles if provided
  if (allowedRoles.length > 0) {
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/home" replace />;
    }
  }
  // 🚨 Fallback to adminOnly check
  else if (adminOnly && role !== 1) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PrivateRoute;