import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";


const Trans = () => {

  const[userdetails, setUserDetails] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/user-details").then((response) => {
      setUserDetails(response.data);
    });
  }, []);

  return (
    <div className="flex w-full h-auto items-center px-10 py-10">
      <form className="gap-4 flex flex-col items-start justify-center text-center w-full">
        <div className="flex items-start w-full">
          <label htmlFor="no" className="w-1/2 text-start">
            No:
          </label>
          <input type="" id="no" className="w-1/2 bg-slate-100 border border-gray-400" placeholder="RCT-000813" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2 text-start">
            Date:
          </label>
          <input type="" id="date" className="w-1/2 bg-slate-100 border border-gray-400" placeholder="28-06-23" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="description1" className="w-1/2 text-start">
            Received from Account Type:
          </label>
          <input
            type=""
            id="description1"
            placeholder="Customer"
            className="w-1/2 bg-slate-100 border border-gray-400"
          />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2 text-start">
            Received from Account No:
          </label>
          <input type="" id="date" className="w-1/2 bg-slate-100 border border-gray-400" placeholder="10012034" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2 text-start">
            Received From Account Name
          </label>
          <input
            type=""
            id="date"
            className="w-1/2 bg-slate-100 border border-gray-400"
            placeholder="Mwila Martin"
          />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2 text-start">
            Customer Balance:
          </label>
          <input type="" id="date" className="w-1/2 bg-slate-100 border border-gray-400" placeholder="1111.23" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2 text-start">
            Amount To Pay:
          </label>
          <input type="" id="date" className="w-1/2 bg-slate-100 border border-gray-400" placeholder="0.00" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2 text-start">
            Amount Tendered:
          </label>
          <input type="" id="date" className="w-1/2 bg-slate-100 border border-gray-400" placeholder="0.00" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2 text-start">
            Change:
          </label>
          <input type="" id="date" className="w-1/2 bg-slate-100 border border-gray-400" placeholder="0.00" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2 text-start">
            Payment Type:
          </label>
          <input type="" id="date" className="w-1/2 bg-slate-100 border border-gray-400" placeholder="choose" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="description2" className="w-1/2 text-start">
            Description
          </label>
          <input
            type=""
            id="description2"
            className="w-1/2 bg-slate-100 border border-gray-400"
            placeholder="Bill Payment"
          />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2 text-start">
            Income Group Code:
          </label>
          <input type="" id="date" className="w-1/2 bg-slate-100 border border-gray-400" placeholder="choose" />
        </div>
      </form>
    </div>
  );
};

export default Trans;
