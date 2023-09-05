import { useState, useEffect } from "react";
import axios from "axios";
import useTransactionStore from "../Store";
import numberToWords from "number-to-words";
import jsPDF from "jspdf";
import "jspdf-autotable";
import useUserStore from "../Userstore";
import companyLogo from "../images/mulonga.png";
import ReactHTMLTableToExcel from "../../node_modules/react-html-table-to-excel/src/ReactHTMLTableToExcel";

const TransactionsTable = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const updateClosedStatusInDB = useTransactionStore(
    (state) => state.updateClosedStatusInDB
  );

  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState({});

  const handleSelectAll = () => {
    const allTransactionIds = transactions.map((transaction) => transaction.id);
    setSelectedTransactions(allTransactionIds);
  };

  const handleMarkAll = () => {
    const allTransactionIds = transactions.map((transaction) => transaction.id);
    setSelectedTransactions(allTransactionIds);
  };

  const handleSubmit = async () => {
    if (selectedTransactions.length === 0) {
      alert("Please select transactions to submit.");
      return;
    }

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

    const currentDate = new Date().toISOString().slice(0, 10);
    const newDate = currentDate.replace("T", " ");
    const formattedDate = transaction.date.replace("T", " ").slice(0, 19);

    pdf.setFont("helvetica");

    pdf.setFontSize(8);
    const company = companyData[0];

    const logoWidth = 40;
    const logoHeight = 20;
    pdf.addImage(companyLogo, "PNG", 80, 8, logoWidth, logoHeight);

    pdf.setLineWidth(0.2);
    pdf.line(30, 26, 170, 26);
    pdf.setFontSize(11);
    pdf.text(`${company.Name}`, 52, 30);
    pdf.setFontSize(8);
    pdf.text(`${company.Address}`, 72, 34);
    pdf.text(`${company.Post_Address}`, 82, 40);
    pdf.text(`Email: ${company.Email}`, 110, 46);
    pdf.text(`Fax:`, 95, 46);
    pdf.text(`Tel: +260${company.Telephone}`, 55, 46);
    pdf.setFontSize(11);
    pdf.text(`OFFICIAL RECEIPT(DUPLICATE)`, 70, 53);
    pdf.setFontSize(11);
    pdf.text(`${transaction.rcptno}`, 145, 53);

    pdf.setLineWidth(0.4);
    pdf.line(30, 56, 170, 56);
    pdf.text(`Received:`, 30, 70);
    pdf.setFontSize(10);
    pdf.text(`${transaction.name}`, 60, 70);
    pdf.text(`Date: ${newDate}`, 130, 70);

    pdf.setFontSize(8);
    pdf.text(`Sum Of:`, 30, 77);
    pdf.setFontSize(10);
    pdf.text(`${capitalizedAmountInWords} Kwacha Only.`, 60, 77);
    pdf.setFontSize(8);
    pdf.text(`Amount: ${transaction.amount}`, 130, 77);

    pdf.setFontSize(8);
    pdf.text(`Being:`, 30, 85);
    pdf.text(`${transaction.desc}`, 60, 85);
    pdf.text(`Payment Type: ${transaction.pymt_type}`, 130, 85);

    pdf.text(`Reference No:`, 30, 93);

    pdf.text(`Account No: ${transaction.customer_no}`, 90, 93);
    pdf.text(`Bill No: ${transaction.desc}`, 130, 93);

    pdf.text(`Opening Balance:`, 30, 100);
    pdf.text(`${transaction.opn_bal}`, 60, 100);

    pdf.text(`Closing Balance: ${transaction.clsn_bal}`, 90, 100);
    pdf.text(`Time: ${formattedDate}`, 130, 100);

    pdf.text(`Issued By:`, 30, 107);
    pdf.text(`${transaction.servedby}`,60,107);

    // Create dotted lines for Signature
    pdf.text("Signature:", 30, 114);
    pdf.setDrawColor(0);
    pdf.setLineDashPattern([1, 1]);
    pdf.line(50, 114, 100, 114);

    pdf.text("Customers Signature:", 30, 121);
    pdf.setDrawColor(0);
    pdf.setLineDashPattern([1, 1]);
    pdf.line(60, 121, 100, 121);

    pdf.setLineDashPattern([]);

    pdf.setLineWidth(0.4);
    pdf.rect(130, 102, 36, 20);
    pdf.text("Official Stamp", 139, 112);

    pdf.line(30, 128, 170, 128);
    pdf.save("transaction.pdf");
  };

  const calculatePaymentTotals = (transactions) => {
    const paymentTotals = {};

    transactions.forEach((transaction) => {
      const paymentType = transaction.pymt_type;
      const amount = parseFloat(transaction.amount);

      if (!isNaN(amount)) {
        const capitalizedPaymentType =
          paymentType.charAt(0).toUpperCase() + paymentType.slice(1);

        if (paymentTotals[capitalizedPaymentType]) {
          paymentTotals[capitalizedPaymentType] += amount;
        } else {
          paymentTotals[capitalizedPaymentType] = amount;
        }
      }
    });

    return paymentTotals;
  };

  const generateTablePDF = () => {
    const doc = new jsPDF("landscape");

    doc.autoTable({
      html: "#transactions-table",
      theme: "grid",
    });

    const paymentTotals = calculatePaymentTotals(transactions);

    // Add payment totals section to the PDF
    let yPosition = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(13);
    doc.text("Payment Method Totals:", 13, yPosition);
    yPosition += 2;

    Object.keys(paymentTotals).forEach((paymentType) => {
      yPosition += 8;
      doc.text(
        `${paymentType}: k${paymentTotals[paymentType].toFixed(2)}`,
        13,
        yPosition
      );
    });

    doc.save("transactions_table.pdf");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3006/transactions")
      .then((response) => {
        const data = response.data;
        console.log("Fetched data:", data);
        const transactionsArray = data.Trans || [];
        const username = useUserStore.getState().userName; // Assuming you have a method to get the username
        console.log(username);
        // Filter transactions where servedBy is equal to the username
        const filteredTransactions = transactionsArray.filter((transaction) => {
          return transaction.servedby === username;
        });
  
        // Set the filtered transactions in useTransactionStore
        useTransactionStore.setState({
          transactions: filteredTransactions.reverse(),
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transaction data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3006/companies")
      .then((response) => {
        const data = response.data;
        console.log("company data:", data);
        setCompanyData(data);
      })
      .catch((error) => {
        console.error("Error fetching transaction data:", error);
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
        <button
          className="mt-4 text-center items-center bg-blue-900 hover:bg-blue-700 py-3 px-2 rounded text-white"
          onClick={handleMarkAll}
        >
          Mark All
        </button>
        <button
          className="mt-4 text-center items-center bg-blue-900 hover:bg-blue-700 py-3 px-2 rounded text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div className="mt-4 text-center items-center bg-blue-900 hover:bg-blue-700 py-3 px-2 rounded text-white">
          <button onClick={generateTablePDF} className="btn btn-primary">
            Generate PDF of Table
          </button>
        </div>
      </div>
      <div className="overflow-x-auto w-full flex">
        <table
          id="transactions-table"
          className="w-full h-auto table-auto border-collapse border border-gray-300"
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
                .filter((transaction) => !transaction.Post)
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
                      {transaction.date.replace("T", " ").slice(0, 19)}
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
                        checked={
                          selectedTransactions.length === transactions.length
                        }
                        onChange={handleSelectAll}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => generatePDF(transaction)}
                        className="mt-4 text-center items-center bg-blue-900 hover:bg-blue-700 py-2 px-2 rounded text-white"
                      >
                        Generate Receipt
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
