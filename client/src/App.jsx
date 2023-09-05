import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AdminHome from "./pages/admin/AdminHome";
import Transact from "./pages/admin/Transact";
import AdminProfile from "./pages/admin/AdminProfile";
import ClosedTransactionsTable from "./pages/admin/ClosedTransactionsTable";
import OpenTransactionsTable from "./pages/admin/OpenTransactionsTable";
import UserHome from "./pages/user/UserHome";
import UserTransact from "./pages/user/UserTransact";
import UserClosedTransactions from "./pages/user/ClosedTransactions";
import UserOpenTransactions from "./pages/user/OpenTransactions";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserRole(userData.role);
    localStorage.setItem("userRole", userData.role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      const storedUserRole = localStorage.getItem("userRole");
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
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {isLoggedIn && userRole === "admin" && (
          <>
            <Route path="/admin" element={<AdminHome onLogout={handleLogout} />} />
            <Route path="/transact" element={<Transact />} />
            <Route path="/open" element={<OpenTransactionsTable />} />
            <Route path="/closed" element={<ClosedTransactionsTable />} />
            <Route path="/profile" element={<AdminProfile />} />
          </>
        )}

        {isLoggedIn && userRole === "user" && (
          <>
            <Route path="/user" element={<UserHome />} />
            <Route path="/user-transact" element={<UserTransact />} />
            <Route path="/user-open" element={<UserOpenTransactions />} />
            <Route path="/user-closed" element={<UserClosedTransactions />} />
          </>
        )}

        {!isLoggedIn && <Route path="/*" element={<Navigate to="/login" />} />}
        {isLoggedIn && <Route path="/*" element={<Navigate to="/login" />} />}
      </Routes>
    </Router>
  );
};

export default App;
