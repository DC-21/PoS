import axios from "axios";
import moment from "moment-timezone";
import { useState, useEffect } from "react";

const Trans = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [currentDate] = useState(moment().format("DD-MM-YY"));
  const [amountToPay, setAmountToPay] = useState("");
  const [customerBalance, setCustomerBalance] = useState("");
  const [selectedAccountName, setSelectedAccountName] = useState("");
  const [IncomeGroup, setIncomeGroup] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedPayment_Type, setSelectedPayment_Type] = useState("");
  const [nextReceiptNo, setNextReceiptNo] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/customer-details?_limit=1000")
      .then((response) => {
        const data = response.data;
        console.log("Fetched data:", data);
        setUserDetails(data.customerData);
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get("http://localhost:3000/income-groupcodes").then((response)=>{
      const data = response.data;
      console.log("fetched codes:", data);
      setIncomeGroup(data.codes);
    }).catch((error)=>{
      console.log(error);
    });

    axios
      .get("http://localhost:3000/transactions/next-receiptno")
      .then((response) => {
        setNextReceiptNo(response.data.receiptno);
        console.log(nextReceiptNo);
      })
      .catch((error) => {
        console.error("Error fetching next receipt number:", error);
      });
  },[]);

  const handleAccountNameChange = (e) => {
    const accountName = e.target.value;
    setSelectedAccountName(accountName);
    setIncomeGroup(""); // Reset selected income group

    // Find the user details based on the selected account name
    const user = userDetails.find((user) => user.accountname === accountName);

    if (user) {
      // Make an API call to fetch the account number and account balance for the selected user
      axios
        .get(`http://localhost:3000/customer-details/${user.id}`)
        .then((response) => {
          const userData = response.data;
          // Update the input fields with the fetched data
          document.getElementById("description2").value = userData.customerNo || "";
          document.getElementById("description4").value = userData.balanceDueLCY || "";
          // Set the customerBalance state
          setCustomerBalance(userData.accountbalance || "");
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    } else {
      // If the selected account name is not found in the user details, reset the input fields
      document.getElementById("description2").value = "";
      document.getElementById("description4").value = "";
      setCustomerBalance("");
    }
  };
  const handleSubmit = () => {
    const accountName = document.getElementById("description3").value;

    // Find the user details based on the entered account name
    const user = userDetails.find((user) => user.accountname === accountName);

    if (user) {
      const updatedUser = {
        ...user,
        amounttopay: amountToPay !== "" ? amountToPay : null,
        accountbalance: customerBalance !== "" ? customerBalance : null,
      };

      axios
        .put(`http://localhost:3000/customer-details/${user.id}`, updatedUser)
        .then((response) => {
          console.log("User details updated successfully:", response.data);

          // Clear the input fields
          document.getElementById("description3").value = "";

          // Reset the states
          setAmountToPay("");
          setCustomerBalance("");

          // Retrieve the updated user details from the server
          axios
            .get("http://localhost:3000/customer-details")
            .then((response) => {
              setUserDetails(response.data);

              // Find the updated user details
              const updatedUserDetails = response.data.find(
                (user) => user.accountname === accountName
              );

              if (updatedUserDetails) {
                // Update the customer balance state
                setCustomerBalance(updatedUserDetails.accountbalance || "");
              }
            })
            .catch((error) => {
              console.log(error);
            });

          // Create a transaction object
          const transactionData = {
            transaction_date: currentDate,
            userDetailsId: user.id,
            amountpaid: amountToPay,
            description: selectedDescription,
            incomegroupcode: IncomeGroup,
            payment_type: selectedPayment_Type,
          };

          // Send a POST request to store the transaction details in the Transaction table
          axios
            .post("http://localhost:3000/transactions", transactionData)
            .then((response) => {
              console.log(
                "Transaction details posted successfully:",
                response.data
              );
              setSelectedDescription("");
              setIncomeGroup("");
              setSelectedPayment_Type("");
            })
            .catch((error) => {
              console.error("Error posting transaction details:", error);
            });
        })
        .catch((error) => {
          console.error("Error updating user details:", error);
        });
    }
  };

  return (
    <div>
      <div className="px-8 py-8">
        <form className="flex flex-col gap-4 w-full h-screen text-center">
          <div className="flex items-start w-full">
            <label htmlFor="no" className="w-1/2 text-start">
              Receipt No:
            </label>
            <input
              type=""
              id="description0"
              className="w-1/2 bg-slate-100 border border-gray-400"
              defaultValue={nextReceiptNo}
              readOnly
            />
          </div>
          <div className="flex items-start w-full">
            <label htmlFor="date" className="w-1/2 text-start">
              Date:
            </label>
            <input
              type=""
              id="date"
              className="w-1/2 bg-slate-100 border border-gray-400"
              defaultValue={currentDate}
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description1" className="w-1/2 text-start">
              Received from Account Type:
            </label>
            <input
              type="text"
              id="description1"
              placeholder="Account Type To Receive From"
              className="w-1/2 bg-slate-100 border border-gray-400"
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description3" className="w-1/2 text-start">
              Received from Account Name:
            </label>
            <select
              id="description3"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={selectedAccountName}
              onChange={handleAccountNameChange}
            >
              <option value="">Select An Account Name To Receive From</option>
              {userDetails.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>

          </div>
          <div className="w-full flex">
            <label htmlFor="description2" className="w-1/2 text-start">
              Received from Account No:
            </label>
            <input
              type="text"
              id="description2"
              placeholder="Account To Receive From"
              className="w-1/2 bg-slate-100 border border-gray-400"
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description4" className="w-1/2 text-start">
              Customer Account Balance:
            </label>
            <input
              type="text"
              id="description4"
              placeholder="Customer Account Balance"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={customerBalance}
              onChange={(e) => setCustomerBalance(e.target.value)}
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description5" className="w-1/2 text-start">
              Amount To Pay:
            </label>
            <input
              type="text"
              id="description5"
              placeholder="Input Amount To Pay"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={amountToPay}
              onChange={(e) => setAmountToPay(e.target.value)}
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description8" className="w-1/2 text-start">
              Payment Type:
            </label>
            <select
              id="description8"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={selectedPayment_Type}
              onChange={(e) => setSelectedPayment_Type(e.target.value)}
            >
              <option value="">Payment Type</option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="transfer">Transfer</option>
              <option value="visa">Visa</option>
            </select>
          </div>
          <div className="w-full flex">
            <label htmlFor="description6" className="w-1/2 text-start">
              Amount Tendered:
            </label>
            <input
              type="text"
              id="description6"
              placeholder="Amount Tendered"
              className="w-1/2 bg-slate-100 border border-gray-400"
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description7" className="w-1/2 text-start">
              Change:
            </label>
            <input
              type="text"
              id="description7"
              placeholder="Change"
              className="w-1/2 bg-slate-100 border border-gray-400"
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description8" className="w-1/2 text-start">
              Description:
            </label>
            <select
              id="description8"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={selectedDescription}
              onChange={(e) => setSelectedDescription(e.target.value)}
            >
              <option value="">Description</option>
              <option value="Water">Water</option>
              <option value="Electricity">Electricity</option>
              <option value="Transport">Transport</option>
            </select>
          </div>
          <div className="w-full flex">
            <label htmlFor="description9" className="w-1/2 text-start">
              Income Group Code:
            </label>
            <select
              id="description9"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={IncomeGroup}
              onChange={(e) => setIncomeGroup(e.target.value)}
            >
              <option value="">Income group</option>
              <option value="salary">Salary</option>
              <option value="wage">Wage</option>
            </select>
          </div>

          <div className="w-full flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-1/2 bg-indigo-500 text-white rounded-md py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Trans;