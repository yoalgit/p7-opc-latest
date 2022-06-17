import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Contexts
import { AuthProvider } from "./utils/context/AuthContext";

import { AxiosInterceptor } from "./utils/api/axiosConfig";

// Components
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileUpdate from "./pages/ProfileUpdate";
import MainHeader from "./components/Shared/Header";
import ProtectedRoutes from "./components/Shared/ProtectedRoutes";
import PrivateRoutes from "./components/Shared/PrivateRoutes";
import PageNotFound from "./pages/PageNotFound";

// Style
import GlobalStyle from "./utils/style/GlobalStyle";

function App() {
  return (
    <React.Fragment>
      <React.StrictMode>
        <AuthProvider>
          <AxiosInterceptor />
          <Router>
            <GlobalStyle />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route element={<ProtectedRoutes />}>
                <Route element={<MainHeader />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/profile/:userId" element={<Profile />} />
                  <Route element={<PrivateRoutes />}>
                    <Route
                      path="/profile/:userId/update"
                      element={<ProfileUpdate />}
                    />
                  </Route>
                  <Route path="/" element={<Navigate replace to="/home" />} />
                  <Route path="*" element={<PageNotFound />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </React.StrictMode>
    </React.Fragment>
  );
}

export default App;
