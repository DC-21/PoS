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
                  <p className="text-start flex-1">Transaction ID:</p>
                  <p className="text-start flex-1">{transaction.id}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-start flex-1">Receipt No:</p>
                  <p className="text-start flex-1">{transaction.rcptno}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-start flex-1">Date:</p>
                  <p className="text-start flex-1">{transaction.date}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-start flex-1">Customer No:</p>
                  <p className="text-start flex-1">{transaction.customer_no}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-start flex-1">Customer Name:</p>
                  <p className="text-start flex-1">{transaction.name}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-start flex-1">Opening Balance:</p>
                  <p className="text-start flex-1">K{transaction.opn_bal}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-start flex-1">Amount:</p>
                  <p className="text-start flex-1">K{transaction.amount}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-start flex-1">Amount Tendered</p>
                  <p className="text-start flex-1">K{transaction.amt_tnd}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-start flex-1">Change</p>
                  <p className="text-start flex-1">K{transaction.change}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-start flex-1">Closing Balance:</p>
                  <p className="text-start flex-1">K{transaction.clsn_bal}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-start flex-1">Description</p>
                  <p className="text-start flex-1">{transaction.desc}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-start flex-1">Payment Type</p>
                  <p className="text-start flex-1">{transaction.pymt_type}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-start flex-1">Income Group Code</p>
                  <p className="text-start flex-1">{transaction.code}</p>
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
