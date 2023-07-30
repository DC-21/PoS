import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const navigation = useNavigate();

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

      // Simulate login request and delay for 2 seconds
      setTimeout(async () => {
        setLoading(false);
        setLoginMessage("Successful login!");

        // Call the onLogin function to indicate successful login
        onLogin();

        // Set the login state in sessionStorage
        sessionStorage.setItem("isLoggedIn", "true");

        // Navigate to the Home page upon successful login
        navigation("/");
      }, 2000);
    } catch (error) {
      console.error("Error in login request:", error);

      if (error.response) {
        // Error with response data from the server
        setLoginMessage(error.response.data.message || "An error occurred.");
      } else {
        // Other errors (e.g., network errors)
        setLoginMessage("An error occurred while processing your request.");
      }

      setLoading(false);
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
      <div className="items-center mx-auto justify-center bg-gray-100 border-2 border-bg-blue-400 rounded-[10px] w-[400px] h-[500px]">
        <p className="mt-5 text-center text-2xl">Login Please</p>
        <div className="w-full flex flex-col items-center justify-center h-auto">
          <div className="w-full flex flex-col justify-center items-center">
            <label className="mt-4" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="email"
              onChange={handleEmailChange}
              className="p-2 mb-4 mt-4 rounded"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <label className="mt-4" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={handlePasswordChange}
              className="p-2 mb-4 mt-4 rounded bg-white"
            />
          </div>
          {loginMessage && (
            <div className="text-center pt-4 text-red-500">
              <p>{loginMessage}</p>
            </div>
          )}
          <div className="text-center pt-6">
            {loading ? (
              <p>loading...</p>
            ) : (
              <button
                className="px-10 py-3 bg-[#00a536] rounded mt-8"
                onClick={handleLogin}
              >
                Login
              </button>
            )}
            <div className="w-full flex gap-4 mt-3 mb-3 justify-center">
              <p>Forgot Password?</p>
              <p>Create account</p>
            </div>
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
