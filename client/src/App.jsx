import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminHome from "./pages/admin/AdminHome";
import Transact from "./pages/admin/Transact";
import Transactions from "./pages/admin/Transactions";
import AdminProfile from './pages/admin/AdminProfile';
import ClosedTransactionsTable from "./pages/admin/ClosedTransactionsTable";
import OpenTransactionsTable from "./pages/admin/OpenTransactionsTable";
import UserHome from './pages/user/UserHome'
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
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
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
    return <p>Loading...</p>;
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
        <Route path="/transact" element={<Transact />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/open" element={<OpenTransactionsTable />} />
        <Route path="/closed" element={<ClosedTransactionsTable />} />
        <Route path="/profile" element={<AdminProfile/>}/>

        <Route path="/user-transact" element={<UserTransact/>}/>
        <Route path="/user-transaction" element={<UserTransaction/>}/>
        <Route path="user-open" element={<UserOpenTransactions/>}/>
        <Route path="user-closed" element={<UserClosedTransactions/>}/>
      </Routes>
    </Router>
  );
};

export default App;
