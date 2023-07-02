import React, { useState, useEffect } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
        const response = await fetch('/api/transaction'); // Assuming the API endpoint is /api/transaction
        const data = await response.json();

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

    // Generate the receipt as a PDF
    const MyDocument = () => (
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

    // Render the receipt as a PDF
    const pdfData = (
      <PDFViewer width="100%" height={500}>
        <MyDocument />
      </PDFViewer>
    );

    // Display or process the PDF data
    console.log(pdfData);
  };

  // ... Rest of the code
};

export default ReceiptGenerator;
