import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import ViewOnlyTournaments from "./components/ViewOnlyTournaments";
import AdminTournaments from "./components/AdminTournaments";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const handleLoginSuccess = (receivedToken: string, username: string) => {
    localStorage.setItem("token", receivedToken);
    localStorage.setItem("username", username);
    setToken(receivedToken);
  };

  const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewOnlyTournaments />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route
          path="/admin/tournaments"
          element={
            <PrivateRoute>
              <AdminTournaments />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
