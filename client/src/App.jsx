import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AdminHome from "./pages/admin/AdminHome";
import Transact from "./pages/admin/Transact";
import Transactions from "./pages/admin/Transactions";
import AdminProfile from "./pages/admin/AdminProfile";
import ClosedTransactionsTable from "./pages/admin/ClosedTransactionsTable";
import OpenTransactionsTable from "./pages/admin/OpenTransactionsTable";
import UserHome from "./pages/user/UserHome";
import UserTransact from "./pages/user/UserTransact";
import UserTransaction from "./pages/user/UserTransaction";
import UserClosedTransactions from "./pages/user/ClosedTransactions";
import UserOpenTransactions from "./pages/user/OpenTransactions";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserRole(userData.role);
    localStorage.setItem("userRole", userData.role); // Store user role in local storage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole"); // Remove user role from local storage
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      const storedUserRole = localStorage.getItem("userRole"); // Get stored user role
      setUserRole(storedUserRole);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" /> // Redirect to home if already logged in
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        {isLoggedIn && userRole === "admin" && (
          <Route
            path="/*" // Match all routes for admin
            element={
              <>
                {/* Add your admin routes here */}
                <AdminHome onLogout={handleLogout} />
                <Transact />
                <Transactions />
                <OpenTransactionsTable />
                <ClosedTransactionsTable />
                <AdminProfile />
              </>
            }
          />
        )}
        {isLoggedIn && userRole === "user" && (
          <Route
            path="/*" // Match all routes for user
            element={
              <>
                {/* Add your user routes here */}
                <UserHome />
                <UserTransact />
                <UserTransaction />
                <UserOpenTransactions />
                <UserClosedTransactions />
              </>
            }
          />
        )}
        {!isLoggedIn && (
          <Route path="/*" element={<Navigate to="/login" />} /> // Redirect to login if not logged in
        )}
      </Routes>
    </Router>
  );
};

export default App;
