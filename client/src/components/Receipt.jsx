import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import moment from 'moment';
import axios from 'axios';

const Receipt = () => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/transactions")
      .then((response) => {
        const transactions = response.data.Trans;
        console.log("transactions", transactions);
        setTransactionData(transactions);
      })
      .catch((error) => console.log(error));
  }, []);

  const generatePdf = async (transaction) => {
    const pdfOptions = {
      margin: 10,
      filename: 'transaction_receipt.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    const htmlContent = `
      <div>
        <h1>Transaction Receipt</h1>
        <p>Received: ${transaction.name}</p>
        <p>Date: ${moment(transaction.date).format('ddd MMM DD YYYY HH:mm:ss')}</p>
        <p>Sum of: ${transaction.amount} Kwacha</p>
        <p>Amount: ${transaction.amount}</p>
        <p>Being: ${transaction.desc}</p>
        <p>Payment Type: ${transaction.pymt_type}</p>
      </div>
    `;

    const pdf = await html2pdf().from(htmlContent).set(pdfOptions).outputPdf();

    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transaction_receipt.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {transactionData.length > 0 ? (
        <>
          <p>Transaction Details:</p>
          {transactionData.map((transaction, index) => (
            <div key={index}>
              <p>Name: {transaction.name}</p>
              <p>Amount: {transaction.amount}</p>
              <p>Date: {moment(transaction.date).format('MMM DD, YYYY')}</p>
              <p>Description: {transaction.desc}</p>
              <p>Payment Type: {transaction.pymt_type}</p>
              <button className='bg-blue-400' onClick={() => generatePdf(transaction)}>Generate PDF Receipt</button>
            </div>
          ))}
        </>
      ) : (
        <p>Loading transaction data...</p>
      )}
    </div>
  );
};

export default Receipt;
