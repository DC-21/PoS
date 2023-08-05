import { Link } from "react-router-dom";
import axios from "axios";

import { useState } from "react";

const Landing = () => {
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const handleCustomersUpdate = async () => {
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

  const handleIncomeGroupCodesUpdate = async () => {
    try {
      const response = await axios.get("http://localhost:3000/income-group-codes");
      const data = response.data;
      await axios.put("http://localhost:3000/income-group-codes", data);
      console.log("Customer data updated successfully.");

      setIsDataUpdated(true);
      setTimeout(() => {
        setIsDataUpdated(false);
      }, 5000);
    } catch (error) {
      console.error("Error updating customer data:", error);
    }
  };

  const handleGLAccountsUpdate = async () => {
    try {
      const response = await axios.get("http://localhost:3000/gl-accounts");
      const data = response.data;
      await axios.put("http://localhost:3000/gl-accounts", data);
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
    <div className="flex w-full justify-center items-center">
      <div className="bg-[#f5f6fa] h-screen flex flex-col w-full justify-center items-center">
        {isDataUpdated && (
          <div className="text-red-600 mb-[300px] font-bold text-2xl justify-center items-center w-full flex absolute">
            Customer data updated successfully.
          </div>
        )}
        <p className="text-blue-900 text-2xl">Welcome back</p>
        <p className="text-blue-800 text-xl mt-2">
          Kindly select what you want to do from the services listed below
        </p>
        <div className="mt-6 flex flex-col gap-6">
          <div className="justify-center gap-8 w-full flex">
            <Link
              to="/transact"
              className="px-6 py-4 w-[200px] h-[80px] bg-blue-900 hover:bg-blue-700 rounded text-white"
            >
              Issue A New Receipt
            </Link>
            <Link
              to="/table"
              className="px-6 py-4 w-[200px] h-[80px] bg-[#fe8267] hover:bg-[#fda18c] rounded text-white"
            >
              View All Open Receipts
            </Link>
          </div>
          <div className="justify-center gap-8 w-full flex">
            <button
              onClick={handleCustomersUpdate}
              className="px-6 py-4 w-[200px] h-[80px] bg-[#e74723] hover:bg-[#e7785f] rounded text-white"
            >
              Update Customers
            </button>
            <Link
              to="/table"
              className="px-6 py-4 w-[200px] h-[80px] bg-[#260c65] hover:bg-[#5938a7] rounded text-white"
            >
              View All Closed Receipts
            </Link>
          </div>
          <div className="justify-center gap-8 w-full flex">
            <button onClick={handleGLAccountsUpdate} className="px-6 py-4 w-[200px] h-[80px] bg-[#8927da] hover:bg-[#9c72be] rounded text-white">
              Update G/L Accounts
            </button>
            <button onClick={handleIncomeGroupCodesUpdate} className="px-6 py-4 w-[200px] h-[80px] bg-[#2b9c14] hover:bg-[#71c760] rounded text-white">
              Update Income Group codes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
