import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminHome from "./pages/AdminHome";
import Transact from "./pages/Transact";
import Transactions from "./pages/Transactions";
import SignUp from "./components/Signup";
import ClosedTransactionsTable from "./pages/ClosedTransactionsTable";
import OpenTransactionsTable from "./pages/OpenTransactionsTable";
import UserHome from './pages/UserHome'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserRole(userData.role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  const handleSignUp = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  if (isLoading) {
    return <p>Logging...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={
            isLoggedIn && userRole === "admin" ? (
              <AdminHome onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/user"
          element={
            isLoggedIn && userRole === "user" ? (
              <UserHome />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        <Route path="/transact" element={<Transact />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/open" element={<OpenTransactionsTable />} />
        <Route path="/closed" element={<ClosedTransactionsTable />} />
      </Routes>
    </Router>
  );
};

export default App;
