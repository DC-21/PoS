import { useState, useEffect } from "react";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import useTransactionStore from "../Store";
import numberToWords from "number-to-words";
import jsPDF from "jspdf";

const TransactionsTable = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const updateClosedStatusInDB = useTransactionStore(
    (state) => state.updateClosedStatusInDB
  );

  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCheckboxChange = (transactionId) => {
    if (typeof transactionId === "number") {
      setSelectedTransactions((prevSelected) =>
        prevSelected.includes(transactionId)
          ? prevSelected.filter((id) => id !== transactionId)
          : [...prevSelected, transactionId]
      );
    }
  };

  const handleMarkAndSubmit = async () => {
    const numericSelectedTransactions = selectedTransactions.filter(
      (id) => typeof id === "number"
    );

    for (const transactionId of numericSelectedTransactions) {
      await updateClosedStatusInDB(transactionId);
    }

    const updatedTransactions = transactions.filter(
      (transaction) => !numericSelectedTransactions.includes(transaction.id)
    );

    useTransactionStore.setState({
      transactions: updatedTransactions,
    });

    setSelectedTransactions([]);
  };

const generatePDF = (transaction) => {
  const pdf = new jsPDF();
  const formattedAmountInWords = numberToWords.toWords(transaction.amount);
  const capitalizedAmountInWords = formattedAmountInWords
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  pdf.setFont("helvetica");
  pdf.setFontSize(10);

  pdf.line(10, 2, 200, 2);
  pdf.text(`Received: ${transaction.name}`, 10, 8);
  pdf.text(`Date: ${formattedDate}`, 130, 8);
  pdf.text(`Sum Of: ${capitalizedAmountInWords} Kwacha only`, 10,13);
  pdf.text(`Amount: ${transaction.amount}`, 130, 13);
  pdf.text(`Being: ${transaction.desc}`, 10,18);
  pdf.text(`Payment Type: ${transaction.pymt_type}`, 130, 18);
  pdf.text(`Reference No: ${transaction.desc}`, 10,23);
  pdf.text(`Account No: ${transaction.customer_no}`, 70,23);
  pdf.text(`Bill No: ${transaction.desc}`, 130,23);
  pdf.save("transaction.pdf");
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
          Open Receipts
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
        <button className="mt-4 text-center items-center bg-blue-900 hover:bg-blue-700 py-3 px-2 rounded text-white" onClick={handleMarkAndSubmit}>Submit Select</button>
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
                .filter((transaction) => !transaction.Post) // Only show transactions with Post state of true
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
                        onChange={() => handleCheckboxChange(transaction.id)}
                      />
                    </td>
                    <td>
        <button
          onClick={() => generatePDF(transaction)}
          className="mt-4 text-center items-center bg-blue-900 hover:bg-blue-700 py-2 px-2 rounded text-white"
        >
          Generate PDF
        </button>
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

export default TransactionsTable;
