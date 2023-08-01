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
          <ul className="flex flex-col gap-6">
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <p>Customer No: {transaction.customer_no}</p>
                <p>Name: {transaction.name}</p>
                <p>Opening Balance:{transaction.opn_bal}</p>
                <p>Amount Paid:{transaction.amount}</p>
                <p>Amount Tendered:{transaction.amt_tnd}</p>
                <p>Change:{transaction.change}</p>
                <p>Closing Balance:{transaction.clsn_bal}</p>
                <p>Income Group Code:{transaction.code}</p>
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
