import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import axios from 'axios';

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
    marginBottom: 10,
  },
});

const ReceiptDocument = ({ receiptData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>Receipt</Text>

      <Text style={styles.label}>Customer Name:</Text>
      <Text style={styles.value}>{receiptData.customerName}</Text>

      <Text style={styles.label}>Date:</Text>
      <Text style={styles.value}>{receiptData.date}</Text>

      <Text style={styles.heading}>Items Purchased:</Text>
      {receiptData.items.map((item, index) => (
        <View key={index}>
          <Text style={styles.label}>Item Name:</Text>
          <Text style={styles.value}>{item.name}</Text>

          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.value}>{item.quantity}</Text>

          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>{item.price}</Text>
        </View>
      ))}

      <Text style={styles.label}>Total:</Text>
      <Text style={styles.value}>{receiptData.total}</Text>
    </Page>
  </Document>
);

const ReceiptGenerator = () => {
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Simulating API/database call
    const fetchTransactionData = async () => {
      try {
        // Replace with your actual API/database call
        const response = await axios.get('http://localhost:3000/user-details'); // Assuming the API endpoint is /api/transaction
        const data = response.data;

        // Assuming the data is returned in the following format:
        const { customerName, date, items, total } = data;

        setCustomerName(customerName);
        setDate(date);
        setItems(items);
        setTotal(total);
      } catch (error) {
        console.log('Error fetching transaction data:', error);
      }
    };

    fetchTransactionData();
  }, []);

  const generateReceipt = () => {
    const receiptData = {
      customerName,
      date,
      items,
      total,
    };

    return (
      <PDFDownloadLink document={<ReceiptDocument receiptData={receiptData} />} fileName="receipt.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Generating PDF...' : 'Download Receipt'
        }
      </PDFDownloadLink>
    );
  };

  const receipt = generateReceipt();

  return (
    <div>
      {receipt}
    </div>
  );
};

export default ReceiptGenerator;
