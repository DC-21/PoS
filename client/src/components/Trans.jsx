import React from "react";

const Trans = () => {
  return (
    <div className="flex w-full h-auto items-center px-10 py-10">
      <form className="gap-4 flex flex-col items-start justify-center text-center w-full">
        <div className="flex items-start w-full">
          <label htmlFor="no" className="w-1/2">
            No:
          </label>
          <input type="" id="no" className="w-1/2" placeholder="RCT-000813" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2">
            Date:
          </label>
          <input type="" id="date" className="w-1/2" placeholder="28-06-23" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="description1" className="w-1/2">
            Received from Account Type:
          </label>
          <input
            type=""
            id="description1"
            placeholder="Customer"
            className="w-1/2"
          />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2">
            Received from Account No:
          </label>
          <input type="" id="date" className="w-1/2" placeholder="10012034" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2">
            Received From Account Name
          </label>
          <input
            type=""
            id="date"
            className="w-1/2"
            placeholder="Mwila Martin"
          />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2">
            Customer Balance:
          </label>
          <input type="" id="date" className="w-1/2" placeholder="1111.23" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2">
            Amount To Pay:
          </label>
          <input type="" id="date" className="w-1/2" placeholder="0.00" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2">
            Amount Tendered:
          </label>
          <input type="" id="date" className="w-1/2" placeholder="0.00" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2">
            Change:
          </label>
          <input type="" id="date" className="w-1/2" placeholder="0.00" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2">
            Payment Type:
          </label>
          <input type="" id="date" className="w-1/2" placeholder="choose" />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="description2" className="w-1/2">
            Description
          </label>
          <input
            type=""
            id="description2"
            className="w-1/2"
            placeholder="Bill Payment"
          />
        </div>
        <div className="flex items-start w-full">
          <label htmlFor="date" className="w-1/2">
            Income Group Code:
          </label>
          <input type="" id="date" className="w-1/2" placeholder="choose" />
        </div>
      </form>
    </div>
  );
};

export default Trans;
