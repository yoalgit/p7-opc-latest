import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Outlet } from "react-router";

// Context
import { AuthContext } from "../../utils/context/AuthContext";

const PrivateRoutes = ({ ...restofProps }) => {
  const { currentUser } = useContext(AuthContext);
  let { userId } = useParams();
  userId = parseInt(userId);

  // If the current user is the owner of the profile
  // they have access to the profile update page
  return currentUser.userId === userId ? (
    <Outlet />
  ) : (
    // otherwise they are redirected to the profile page
    <Navigate to={`/profile/${userId}`} />
  );
};

export default PrivateRoutes;
