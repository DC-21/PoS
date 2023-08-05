import { useState, useEffect } from "react";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import useTransactionStore from "../Store";

const ClosedReceipts = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const updateClosedStatusInDB = useTransactionStore(
    (state) => state.updateClosedStatusInDB
  );

  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCheckboxChange = (transactionId) => {
    setSelectedTransactions((prevSelected) =>
      prevSelected.includes(transactionId)
        ? prevSelected.filter((id) => id !== transactionId)
        : [...prevSelected, transactionId]
    );
  };

  const handleMarkAndSubmit = async () => {
    for (const transactionId of selectedTransactions) {
      await updateClosedStatusInDB(transactionId);
    }

    // Update the local state of transactions
    const updatedTransactions = transactions.filter(
      (transaction) => !selectedTransactions.includes(transaction.id)
    );

    useTransactionStore.setState({
      transactions: updatedTransactions,
    });

    setSelectedTransactions([]);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/transactions")
      .then((response) => {
        const data = response.data;
        console.log("Fetched data:", data);
        const transactionsArray = data.Trans || [];
        useTransactionStore.setState({
          transactions: transactionsArray.reverse(),
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transaction data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-4 justify-center flex flex-col w-full">
      <div className="flex w-full gap-6 justify-center items-baseline mb-2">
        <h2 className="text-lg font-semibold mb-2 text-center">
          Transaction History
        </h2>
        <div className="mt-4 text-center items-center bg-blue-900 hover:bg-blue-700 py-3 px-2 rounded text-white">
          <ReactHTMLTableToExcel
            id="export-button"
            className="btn btn-primary"
            table="transactions-table"
            filename="transactions"
            sheet="sheet1"
            buttonText="Export to Excel"
          />
        </div>
        <button onClick={handleMarkAndSubmit}>Mark Selected and Submit</button>
      </div>
      <div className="overflow-x-auto">
        <table
          id="transactions-table"
          className="w-screen h-auto table-auto border-collapse border border-gray-300"
        >
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">
                Transaction ID
              </th>
              <th className="border border-gray-300 px-4 py-2">Receipt No</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Customer No</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Opening Balance
              </th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">
                Amount Tendered
              </th>
              <th className="border border-gray-300 px-4 py-2">Change</th>
              <th className="border border-gray-300 px-4 py-2">
                Closing Balance
              </th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Payment Type</th>
              <th className="border border-gray-300 px-4 py-2">Code</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="13"
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : (
              transactions
                .filter((transaction) => transaction.Post) // Only show transactions with Post state of true
                .map((transaction, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.rcptno}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.customer_no}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.opn_bal}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.amount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.amt_tnd}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.change}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.clsn_bal}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.desc}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.pymt_type}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {transaction.code}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(transactions.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClosedReceipts;
