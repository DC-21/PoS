import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");
  const navigation = useNavigate();

  const handleSignUp = async () => {
    try {
      setLoading(true);

      if (!full_name || !email || !phone_number || !password) {
        setSignupMessage("Please fill in all fields");
        setLoading(false);
        return;
      }

      const response = await axios.post("http://localhost:3006/signup", {
        full_name,
        email,
        phone_number,
        password,
      });

      if (response.status === 201) {
        setLoading(false);
        setSignupMessage("Sign up successful!");
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
      <div className="items-center mx-auto justify-center bg-[#260c65] rounded-lg w-96 p-8">
        <p className="text-center text-white font-bold text-2xl mb-4">Sign Up</p>
        <div className="flex flex-col space-y-4 w-full justify-center items-center">
          <label className="text-white font-bold" htmlFor="full-name">
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            placeholder="Enter your full name"
            value={full_name}
            onChange={(e) => setFull_name(e.target.value)}
            className="p-2 rounded"
          />

          <label className="text-white font-bold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="e.g., chola@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded"
          />

          <label className="text-white font-bold" htmlFor="phone-number">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone_number"
            placeholder="Enter your phone number"
            value={phone_number}
            onChange={(e) => setPhone_number(e.target.value)}
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
            <div className="text-white">{signupMessage}</div>
          )}

          <div className="text-center">
            {loading ? (
              <p>Creating your account...</p>
            ) : (
              <button
                className="px-4 py-2 bg-[#fe8267] hover:bg-[#ee3d16] text-white font-bold rounded"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            )}
          </div>
          <div className="w-full flex text-white gap-4 mt-3 mb-3 justify-center">
              <Link to='/login'>Login</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;