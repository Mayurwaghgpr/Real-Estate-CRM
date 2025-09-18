import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isLogin, logedInUser } = useSelector((state) => state.auth);

  // Not logged in
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles are defined and user's role isn't included
  if (allowedRoles.length > 0 && !allowedRoles.includes(logedInUser?.role)) {
    return <Navigate to="/unauthorized" replace />; // You can define this route
  }

  return children;
};

export default ProtectedRoute;
