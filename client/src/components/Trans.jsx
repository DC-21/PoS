import React, { useEffect, useState } from "react";
import axios from "axios";

const Trans = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [receiptNumber, setReceiptNumber] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/user-details")
      .then((response) => {
        setUserDetails(response.data);
        const lastReceiptNumber = response.data[response.data.length - 1]?.receiptNumber || "";
        setReceiptNumber(lastReceiptNumber);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
              id="no"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={receiptNumber}
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
              value={currentDate}
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description1" className="w-1/2 text-start">
              Received from Account Type:
            </label>
            <input
              type="text"
              id="description1"
              placeholder="Customer"
              value={userDetails[0]?.accounttype || ""}
              className="w-1/2 bg-slate-100 border border-gray-400"
            />
          </div>
          {/* Rest of your code */}
        </form>
      </div>
    </div>
  );
};

export default Trans;
