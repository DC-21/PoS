import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/mulonga.png";
import axios from "axios";
const UserNavbar = () => {

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
        <Link to="/user">
          <img
            className="md:w-[200px] md:h-[80px] rounded"
            src={logo}
            alt="logo"
          />
        </Link>
        <div className="flex gap-6">
          <Link to="/user-transaction">
            <p className="text-lg bg-[#fe8267] hover:bg-[#ee3d16] py-2 px-2 rounded text-white">
              Transactions
            </p>
          </Link>
          <Link to="/user">
            <p className="text-lg bg-[#fe8267] hover:bg-[#ee3d16] py-2 px-2 rounded text-white">
              Home
            </p>
          </Link>
        </div>
        <div>{userName}</div>
      </div>
    </div>
  );
};

export default UserNavbar;
