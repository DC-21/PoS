import React, { useEffect, useState } from "react";
import axios from "axios";

const Trans = () => {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user-details")
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {userDetails.map((value, key) => {
        return (
          <div key={key} className="px-8 py-8">
            <form className="flex flex-col gap-4 w-full h-screen text-center">
              <div className="w-full flex">
                <label htmlFor="description1" className="w-1/2 text-start">
                  Received from Account Type:
                </label>
                <input
                  type="text"
                  id="description1"
                  placeholder="Customer"
                  value={value.accounttype}
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
                  value={value.accountno}
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
                  value={value.accountname}
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
                  value={value.accountbalance}
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
                  value={value.amounttopay}
                  className="w-1/2 bg-slate-100 border border-gray-400"
                />
              </div>
              <div>{value.amounttendered}</div>
              <div>{value.change}</div>
              <div>{value.paymenttype}</div>
              <div>{value.description}</div>
              <div>{value.incomegroupcode}</div>
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default Trans;
