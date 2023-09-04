import { Link } from "react-router-dom";
import logo from "../images/mulonga.png";
import axios from 'axios'
import { useEffect } from "react";
import useUserStore from '../Userstore';

const UserNavbar = () => {
  const { userName, setUserName } = useUserStore();

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios
        .get("http://localhost:3006/user-details")
        .then((response) => {
          const userData = response.data.user;
          console.log(userData);
          const fullName = userData.full_name;

          setUserName(fullName);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);



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
        <a className="cursor-pointer flex flex-col items-center">
          <svg viewBox="0 0 24 24" fill="white" height="3em" width="3em">
            <path d="M12 2A10.13 10.13 0 002 12a10 10 0 004 7.92V20h.1a9.7 9.7 0 0011.8 0h.1v-.08A10 10 0 0022 12 10.13 10.13 0 0012 2zM8.07 18.93A3 3 0 0111 16.57h2a3 3 0 012.93 2.36 7.75 7.75 0 01-7.86 0zm9.54-1.29A5 5 0 0013 14.57h-2a5 5 0 00-4.61 3.07A8 8 0 014 12a8.1 8.1 0 018-8 8.1 8.1 0 018 8 8 8 0 01-2.39 5.64z" />
            <path d="M12 6a3.91 3.91 0 00-4 4 3.91 3.91 0 004 4 3.91 3.91 0 004-4 3.91 3.91 0 00-4-4zm0 6a1.91 1.91 0 01-2-2 1.91 1.91 0 012-2 1.91 1.91 0 012 2 1.91 1.91 0 01-2 2z" />
          </svg>
            <span className="text-white">{userName}</span>
        </a>
      </div>
    </div>
  );
};

export default UserNavbar;
