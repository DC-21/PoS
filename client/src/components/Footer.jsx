import { useNavigate } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleUpdate = async () => {
    try {
      // Send a GET request to fetch the latest customer data from the server
      const response = await axios.get("http://localhost:3000/customers");
      const data = response.data;

      // Send a PUT request to update customer data
      await axios.put("http://localhost:3000/customers", data);
      console.log("Customer data updated successfully.");
    } catch (error) {
      console.error("Error updating customer data:", error);
    }
  };

  return (
    <div className="w-full py-2 px-4 sticky top-0 flex justify-center">
      <div className="px-4 py-2 bg-slate-400 rounded-md w-full flex items-center justify-between">
        <button
          onClick={handleLogout}
          className="text-lg hover:bg-slate-200 py-2 px-2 rounded text-white bg-slate-600 hover:text-black"
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
    </div>
  );
};

export default Footer;
