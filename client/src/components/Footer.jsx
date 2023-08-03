import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customers");
      const data = response.data;
      await axios.put("http://localhost:3000/customers", data);
      console.log("Customer data updated successfully.");

      setIsDataUpdated(true);
      setTimeout(() => {
        setIsDataUpdated(false);
      }, 5000);
    } catch (error) {
      console.error("Error updating customer data:", error);
    }
  };

  return (
    <div className="w-full mt-4 sticky top-0 flex justify-center">
      <div className="px-4 py-2 bg-[#260c65] w-full flex items-center justify-between">
        <button
          onClick={handleLogout}
          className="text-lg bg-[#fe8267] hover:bg-[#ee3d16] py-2 px-2 rounded text-white"
        >
          Log Out
        </button>
        <button
          onClick={handleUpdate}
          className="text-lg hover:bg-slate-200 py-2 px-2 rounded text-white bg-slate-600 hover:text-black"
        >
          Update
        </button>
      </div>
      {isDataUpdated && (
        <div className="mt-4 text-black justify-center items-center w-full flex absolute">
          Customer data updated successfully.
        </div>
      )}
    </div>
  );
};

export default Footer;
