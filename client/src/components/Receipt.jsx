import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
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
  const receiptData = {
    customerName: 'John Doe',
    date: '2023-07-02',
    items: [
      { name: 'Item 1', quantity: 2, price: 10 },
      { name: 'Item 2', quantity: 1, price: 20 },
    ],
    total: 40,
  };

  return (
    <div className='px-3 py-2 bg-blue-200'>
      <PDFDownloadLink document={<ReceiptDocument receiptData={receiptData} />} fileName="receipt.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Generating PDF...' : 'Download Receipt'
        }
      </PDFDownloadLink>
    </div>
  );
};

export default ReceiptGenerator;
