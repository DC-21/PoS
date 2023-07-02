import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
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
    <Page size="A5" style={styles.page}>
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
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user-details'); // Replace with your actual API endpoint
        const data = response.data;
        setReceiptData(data);
      } catch (error) {
        console.log('Error fetching receipt data:', error);
      }
    };

    fetchReceiptData();
  }, []);

  return (
    <div>
      {receiptData ? (
        <PDFDownloadLink document={<ReceiptDocument receiptData={receiptData} />} fileName="receipt.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Generating PDF...' : 'Download Receipt'
          }
        </PDFDownloadLink>
      ) : (
        <div>Loading receipt data...</div>
      )}
    </div>
  );
};

export default ReceiptGenerator;
