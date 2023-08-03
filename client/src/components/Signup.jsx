import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [loading]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (email === "" || password === "") {
        setLoginMessage("Please fill in the form");
        setLoading(false);
        return;
      }

      console.log("Sending login request to:", "http://localhost:3006/login");
      console.log("Request data:", { email, password });

      const response = await axios.post("http://localhost:3006/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Login successful
        setLoading(false);
        setLoginMessage("Successful login!");
        onLogin();
        sessionStorage.setItem("isLoggedIn", "true");
        navigation("/");
      } else {
        // Login failed
        setLoading(false);
        setLoginMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error in login request:", error);
      setLoading(false);
      setLoginMessage("invalid credentials.");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="items-center mx-auto justify-center bg-blue-300 border-2 border-bg-blue-400 rounded-[20px] w-[400px] h-[450px]">
        <p className="mt-5 text-center text-white font-bold text-2xl">Login Please</p>
        <div className="w-full flex flex-col items-center justify-center h-auto">
          <div className="w-full flex flex-col justify-center items-center">
            <label className="mt-4 text-white font-bold" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="email"
              value={email}
              onChange={handleEmailChange}
              className="p-2 mb-4 mt-4 rounded"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <label className="mt-4 text-white font-bold" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
              className="p-2 mb-4 mt-4 rounded bg-white"
            />
          </div>
          {loginMessage && (
            <div className="text-center pt-4 text-red-500">
              <p>{loginMessage}</p>
            </div>
          )}
          <div className="text-center">
            {loading ? (
              <p>logging...</p>
            ) : (
              <button
                className="px-8 py-2 bg-[#829ae7] text-white font-bold rounded mt-8 hover:bg-blue-600"
                onClick={handleLogin}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
