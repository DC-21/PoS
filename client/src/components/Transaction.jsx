import { useEffect, useState } from "react";
import axios from "axios";

const Transaction = () => {
  // Define Transactions state variable and its setter function
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/transactions")
      .then((response) => {
        const data = response.data;
        console.log("Fetched data:", data);
        const transactionsArray = data.Trans || [];
        setTransactions(transactionsArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full py-2 px-4 flex justify-center">
      {transactions.length > 0 ? (
        <div className="px-4 py-2 bg-slate-200 rounded-md w-full h-auto pb-6 pt-6 flex items-center justify-center">
          <ul className="flex flex-col gap-6 w-[400px] justify-center">
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <div className="w-full flex justify-between">
                  <p className="text-start flex-1">Receipt No:</p>
                  <p className="text-start flex-1">{transaction.rcptno}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-center">Date:</p>
                  <p>{transaction.date}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-center">Customer No:</p>
                  <p>{transaction.customer_no}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-center">Customer Name:</p>
                  <p>{transaction.name}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-center">Opening Balance:</p>
                  <p>K{transaction.opn_bal}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-center">Amount:</p>
                  <p>K{transaction.amount}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-center">Amount Tendered</p>
                  <p>K{transaction.amt_tnd}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-center">Change</p>
                  <p>K{transaction.change}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-center">Closing Balance:</p>
                  <p>K{transaction.clsn_bal}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-center">Description</p>
                  <p>{transaction.desc}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-center">Payment Type</p>
                  <p>{transaction.pymt_type}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-center">Income Group Code</p>
                  <p>{transaction.code}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="px-4 py-2 bg-slate-200 rounded-md w-full h-screen flex items-center justify-center">
          <p className="w-full text-center">
            All Transactions will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default Transaction;
