import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  // Initialization of authentification values
  const [currentUser, setCurrentUser] = useState(() => {
    // If a token is stored in the local storage
    if (token) {
      // we extract the user data from the decoded token and store it in the currentUser state
      const decoded = jwt_decode(token);
      return { userId: decoded.userId, role: decoded.role };
    }
    // If there is no token, currentUser is set to null
    return null;
  });

  // If there is a token, the user is authenticated
  const [isAuthenticated, setAuthenticated] = useState(() => {
    return token !== null;
  });

  // Persist context values on refresh
  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        const { userId, role } = jwt_decode(token);
        setCurrentUser({ userId, role });
        setAuthenticated(true);
      } else {
        setCurrentUser(null);
        setAuthenticated(false);
      }
    };
    checkToken();
  }, [setAuthenticated]);

  // Login user
  const login = (data) => {
    const { userId, role } = jwt_decode(data.token);

    localStorage.setItem("token", data.token);

    setAuthenticated(true);
    setCurrentUser({
      userId: userId,
      role: role,
    });
  };

  // Logout user
  const logout = () => {
    setAuthenticated(false);
    setCurrentUser(null);
    localStorage.clear();
  };

  // Values and functions provided by this AuthContext
  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
