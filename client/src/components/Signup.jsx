import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const SignUp = ({ onSignUp }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");
  const navigation = useNavigate();

  const handleSignUp = async () => {
    try {
      setLoading(true);

      if (!fullName || !email || !phoneNumber || !password) {
        setSignupMessage("Please fill in all fields");
        setLoading(false);
        return;
      }

      const response = await axios.post("http://localhost:3006/signup", {
        fullName,
        email,
        phoneNumber,
        password,
      });

      if (response.status === 201) {
        setLoading(false);
        setSignupMessage("Sign up successful!");
        onSignUp();
        sessionStorage.setItem("isLoggedIn", "true");
        navigation("/");
      } else {
        setLoading(false);
        setSignupMessage("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error in signup request:", error);
      setLoading(false);
      setSignupMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="items-center mx-auto justify-center bg-blue-300 border-2 border-blue-400 rounded-lg w-96 p-8">
        <p className="text-center text-white font-bold text-2xl mb-4">Sign Up</p>
        <div className="flex flex-col space-y-4">
          <label className="text-white font-bold" htmlFor="full-name">
            Full Name
          </label>
          <input
            type="text"
            id="full-name"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-2 rounded"
          />

          <label className="text-white font-bold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="e.g., john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded"
          />

          <label className="text-white font-bold" htmlFor="phone-number">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone-number"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="p-2 rounded"
          />

          <label className="text-white font-bold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded"
          />

          {signupMessage && (
            <div className="text-red-500">{signupMessage}</div>
          )}

          <div className="text-center">
            {loading ? (
              <p>Creating your account...</p>
            ) : (
              <button
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};

export default SignUp;