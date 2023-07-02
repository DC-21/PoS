import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 4,
  },
  headingContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  companyName: {
    flex: 1,
    fontSize: 10,
    marginBottom: 4,
  },
  receiptTitle: {
    fontSize: 10,
    marginBottom: 4,
  },
  label: {
    fontSize: 8,
    marginBottom: 3,
  },
  value: {
    fontSize: 8,
    marginBottom: 4,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
  },
  flexItem: {
    marginRight: 10,
    flexDirection: "row",
  },
  flexItems: {
    marginRight: 10,
    flexDirection: "row",
  },
});

const ReceiptDocument = ({ receiptData }) => (
  <Document>
    <Page size="A7" style={styles.page}>
      <View style={styles.headingContainer}>
        <Text style={styles.companyName}>Sacip Solutions Limited</Text>
      </View>
      <Text style={styles.receiptTitle}>Receipt</Text>

      <View style={styles.flexContainer}>
        <View style={styles.flexItem}>
          <Text style={styles.label}>Customer Name:</Text>
          <Text style={styles.value}>{receiptData.customerName}</Text>
        </View>
        <View style={styles.flexItems}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{receiptData.date}</Text>
        </View>
      </View>

      {receiptData.items.map((item, index) => (
        <View key={index} style={styles.flexContainer}>
          <View style={styles.flexItem}>
            <Text style={styles.label}>Item Name:</Text>
            <Text style={styles.value}>{item.name}</Text>
          </View>

          <View style={styles.flexItem}>
            <Text style={styles.label}>Quantity:</Text>
            <Text style={styles.value}>{item.quantity}</Text>
          </View>

          <View style={styles.flexItem}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>{item.price}</Text>
          </View>
        </View>
      ))}

      <View style={styles.flexContainer}>
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.value}>{receiptData.total}</Text>
      </View>
    </Page>
  </Document>
);

const ReceiptGenerator = () => {
  const receiptData = {
    customerName: "John Doe",
    date: "2023-07-02",
    items: [
      { name: "Item 1", quantity: 2, price: 10 },
      { name: "Item 2", quantity: 1, price: 20 },
    ],
    total: 40,
  };

  return (
    <div className="px-3 py-2 bg-blue-200">
      <PDFDownloadLink
        document={<ReceiptDocument receiptData={receiptData} />}
        fileName="receipt.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Generating PDF..." : "Download Receipt"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default ReceiptGenerator;
