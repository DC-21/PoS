import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './pages/Home';
import Transact from './pages/Transact';
import Transactions from './pages/Transactions';
import SignUp from "./components/Signup";
import TransactionsTable from "./pages/TransactionsTable";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
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
          path="/"
          element={
            isLoggedIn ? (
              <Home onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/signup"
          element={<SignUp onSignUp={handleSignUp} />}
        />
        <Route path="/transact" element={<Transact/>}/>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/table" element={<TransactionsTable/>}/>
      </Routes>
    </Router>
  );
};

export default App;
