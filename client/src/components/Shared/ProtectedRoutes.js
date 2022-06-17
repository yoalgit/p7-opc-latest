import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";

// Context
import { AuthContext } from "../../utils/context/AuthContext";

// If the user is authenticated, they have access to the protected routes
// Otherwise the are redirected to the authentication page
const ProtectedRoutes = ({ ...restofProps }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
