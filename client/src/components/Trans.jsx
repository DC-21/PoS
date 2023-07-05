import React, { useEffect, useState } from "react";
import axios from "axios";

const Trans = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [receiptNumber, setReceiptNumber] = useState("");
  const [amountToPay, setAmountToPay] = useState("");
  const [customerBalance, setCustomerBalance] = useState("");
  const [selectedAccountName, setSelectedAccountName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/user-details")
      .then((response) => {
        setUserDetails(response.data);
        const lastReceiptNumber = response.data[response.data.length - 1]?.receiptNumber || "";
        setReceiptNumber(lastReceiptNumber);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAccountNameChange = (e) => {
    const accountName = e.target.value;
    setSelectedAccountName(accountName);
    const user = userDetails.find((user) => user.accountname === accountName);
    
    document.getElementById("description0").value = user?.receiptno || "";
    document.getElementById("description1").value = user?.accounttype || "";
    document.getElementById("description2").value = user?.accountno || "";
    document.getElementById("description3").value = user?.accountname || "";
    document.getElementById("description4").value = user?.accountbalance || "";
    document.getElementById("description5").value = ""; // Set amountToPay to empty
    document.getElementById("description6").value = user?.amounttendered || "";
    document.getElementById("description7").value = user?.change || "";
    document.getElementById("description8").value = user?.description || "";
    document.getElementById("description9").value = user?.incomegroupcode || "";
  
    // Set the customerBalance state
    setCustomerBalance(user?.accountbalance || "");
  };
  

  const handleSubmit = () => {
    const accountName = document.getElementById("description3").value;
  
    // Find the user details based on the entered account name
    const user = userDetails.find((user) => user.accountname === accountName);
  
    if (user) {
      const updatedUser = {
        ...user,
        amounttopay: amountToPay !== "" ? amountToPay : null,
        accountbalance: customerBalance,
      };
  
      axios
        .put(`http://localhost:3000/user/user-details/${user.id}`, updatedUser)
        .then((response) => {
          console.log("User details updated successfully:", response.data);
  
          // Clear the input fields
          document.getElementById("description3").value = "";
          // Reset the states
          setAmountToPay(null);
          setCustomerBalance("");
        })
        .catch((error) => {
          console.error("Error updating user details:", error);
          // Handle the error and display an error message
        });
    }
  };
  

  return (
    <div>
      <div className="px-8 py-8">
        <form className="flex flex-col gap-4 w-full h-screen text-center">
          <div className="flex items-start w-full">
            <label htmlFor="no" className="w-1/2 text-start">
              Receipt No:
            </label>
            <input
              type=""
              id="description0"
              className="w-1/2 bg-slate-100 border border-gray-400"
              defaultValue={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
            />
          </div>
          <div className="flex items-start w-full">
            <label htmlFor="date" className="w-1/2 text-start">
              Date:
            </label>
            <input
              type=""
              id="date"
              className="w-1/2 bg-slate-100 border border-gray-400"
              defaultValue={currentDate}
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description3" className="w-1/2 text-start">
              Received from Account Name:
            </label>
            <select
              id="description3"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={selectedAccountName}
              onChange={handleAccountNameChange}
            >
              <option value="">Select An Account Name To Receive From</option>
              {userDetails.map((user) => (
                <option key={user.id} value={user.accountname}>
                  {user.accountname}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex">
            <label htmlFor="description1" className="w-1/2 text-start">
              Received from Account Type:
            </label>
            <input
              type="text"
              id="description1"
              placeholder="Customer"
              className="w-1/2 bg-slate-100 border border-gray-400"
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description2" className="w-1/2 text-start">
              Received from Account No:
            </label>
            <input
              type="text"
              id="description2"
              placeholder="Customer"
              className="w-1/2 bg-slate-100 border border-gray-400"
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description4" className="w-1/2 text-start">
              Customer Account Balance:
            </label>
            <input
              type="text"
              id="description4"
              placeholder="Customer"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={customerBalance}
              onChange={(e) => setCustomerBalance(e.target.value)}
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description5" className="w-1/2 text-start">
              Amount To Pay:
            </label>
            <input
              type="text"
              id="description5"
              placeholder="Customer"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={amountToPay}
              onChange={(e) => setAmountToPay(e.target.value)}
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description6" className="w-1/2 text-start">
              Amount Tendered:
            </label>
            <input
              type="text"
              id="description6"
              placeholder="Customer"
              className="w-1/2 bg-slate-100 border border-gray-400"
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description7" className="w-1/2 text-start">
              Change:
            </label>
            <input
              type="text"
              id="description7"
              placeholder="Customer"
              className="w-1/2 bg-slate-100 border border-gray-400"
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description8" className="w-1/2 text-start">
              Description:
            </label>
            <input
              type="text"
              id="description8"
              placeholder="Customer"
              className="w-1/2 bg-slate-100 border border-gray-400"
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description9" className="w-1/2 text-start">
              Income Group Code:
            </label>
            <input
              type="text"
              id="description9"
              placeholder="Customer"
              className="w-1/2 bg-slate-100 border border-gray-400"
            />
          </div>
          <div className="w-full flex">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-1/2 bg-indigo-500 text-white rounded-md py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Trans;
