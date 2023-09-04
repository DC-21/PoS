import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../images/mulonga.png";
import axios from "axios";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve the JWT token from sessionStorage
    const token = sessionStorage.getItem("jwtToken");
  
    if (token) {
      // Set the JWT token as the default Authorization header for Axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      // Now you can make authenticated requests using Axios
  
      // For example, you can fetch the user's name using an authenticated request
      axios
        .get("http://localhost:3006/user-details")
        .then((response) => {
          // Assuming the response contains the user object
          const userData = response.data.user;
          console.log(userData); // Assuming the response contains user details
          const fullName = userData.full_name; // Access the full_name property
  
          // Now you can use fullName in your component
          setUserName(fullName);
  
          // Set loading to false since data has been loaded
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          // Set loading to false in case of an error
          setLoading(false);
        });
    }
  }, []);
  console.log("Loading:", loading);
  console.log("UserName:", userName);
    

  return (
    <div className="w-full sticky top-0 flex justify-center">
      <div className="px-4 gap-[50px] py-2 bg-[#260c65] w-full flex items-center justify-between">
        <Link to="/admin">
          <img
            className="md:w-[200px] md:h-[80px] rounded"
            src={logo}
            alt="logo"
          />
        </Link>
        <div className="flex gap-6">
          <Link to="/admin">
            <p className="text-lg bg-[#fe8267] w-[100px] text-center hover:bg-[#ee3d16] py-2 px-2 rounded text-white">
              Home
            </p>
          </Link>
          <Link to="/transactions">
            <p className="text-lg bg-[#fe8267] hover:bg-[#ee3d16] py-2 px-2 rounded text-white">
              Transactions
            </p>
          </Link>
        </div>
        <Link to="/profile" className="cursor-pointer flex flex-col">
          <svg viewBox="0 0 24 24" fill="white" height="3em" width="3em">
            <path d="M12 2A10.13 10.13 0 002 12a10 10 0 004 7.92V20h.1a9.7 9.7 0 0011.8 0h.1v-.08A10 10 0 0022 12 10.13 10.13 0 0012 2zM8.07 18.93A3 3 0 0111 16.57h2a3 3 0 012.93 2.36 7.75 7.75 0 01-7.86 0zm9.54-1.29A5 5 0 0013 14.57h-2a5 5 0 00-4.61 3.07A8 8 0 014 12a8.1 8.1 0 018-8 8.1 8.1 0 018 8 8 8 0 01-2.39 5.64z" />
            <path d="M12 6a3.91 3.91 0 00-4 4 3.91 3.91 0 004 4 3.91 3.91 0 004-4 3.91 3.91 0 00-4-4zm0 6a1.91 1.91 0 01-2-2 1.91 1.91 0 012-2 1.91 1.91 0 012 2 1.91 1.91 0 01-2 2z" />
          </svg>
          {loading ? (
            <span className="text-white">Loading...</span>
          ) : (
            <span className="text-white">{userName}</span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
