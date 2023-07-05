import React from 'react';
import { Document, Page, Text, PDFDownloadLink } from '@react-pdf/renderer';

const Receipt = ({ transaction }) => {
  return (
    <div>
      <PDFDownloadLink
        document={
          <Document>
            <Page>
              <Text>Receipt Number: {transaction.receiptno}</Text>
              <Text>Date: {transaction.date}</Text>
              <Text>Account Name: {transaction.accountname}</Text>
              <Text>Account Type: {transaction.accounttype}</Text>
              <Text>Account Number: {transaction.accountno}</Text>
              <Text>Amount to Pay: {transaction.amounttopay}</Text>
              <Text>Account Balance: {transaction.accountbalance}</Text>
              <Text>Amount Tendered: {transaction.amounttendered}</Text>
              <Text>Change: {transaction.change}</Text>
              <Text>Description: {transaction.description}</Text>
              <Text>Income Group Code: {transaction.incomegroupcode}</Text>
            </Page>
          </Document>
        }
        fileName="receipt.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Loading...' : 'Download Receipt'
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Receipt;
