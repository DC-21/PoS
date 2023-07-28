import axios from "axios";
import moment from "moment-timezone";
import { useState, useEffect } from "react";

const Trans = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [currentDate] = useState(moment().format("DD-MM-YY"));
  const [amountToPay, setAmountToPay] = useState("");
  const [balanceDueLCY, setBalanceDueLCY] = useState("");
  const [customerNo, setCustomerNo] = useState("");
  const [selectedAccountName, setSelectedAccountName] = useState("");
  const [incomeGroups, setIncomeGroups] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const [nextReceiptNo, setNextReceiptNo] = useState("");
  const [selectedIncomeGroup, setSelectedIncomeGroup] = useState(null);
  const [amountTendered, setAmountTendered] = useState("");
  const [change, setChange] = useState("00.00"); // Default value is "00.00"

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

    axios
      .get("http://localhost:3000/income-groupcodes")
      .then((response) => {
        const data = response.data;
        console.log("Fetched codes:", data);
        setIncomeGroups(data.codes);
      })
      .catch((error) => {
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
  }, []);

  useEffect(() => {
    if (selectedAccountName) {
      // Find the user details based on the selected account name
      const user = userDetails.find((user) => user.name === selectedAccountName);

      if (user) {
        // Update the input fields with the fetched data
        setCustomerNo(user.customerNo || "");
        setBalanceDueLCY(user.balanceDueLCY || "");
      } else {
        // If the selected account name is not found in the user details, reset the input fields
        setCustomerNo("");
        setBalanceDueLCY("");
      }
    }
  }, [selectedAccountName, userDetails]);

  // Handle change for Amount Tendered
  const handleAmountTenderedChange = (e) => {
    const amountTenderedValue = e.target.value;
    setAmountTendered(amountTenderedValue);
  };

  // Recalculate change whenever amountToPay or amountTendered changes
  useEffect(() => {
    // Parse float values from input fields
    const amountToPayValue = parseFloat(amountToPay) || 0;
    const amountTenderedNum = parseFloat(amountTendered) || 0;

    // Calculate change only if both amountToPay and amountTendered have valid values
    if (!isNaN(amountToPayValue) && !isNaN(amountTenderedNum)) {
      const calculatedChange = amountTenderedNum - amountToPayValue;
      setChange(calculatedChange.toFixed(2));
    } else {
      // Otherwise, set the Change field to display two zeroes
      setChange("00.00");
    }
  }, [amountToPay, amountTendered]);



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
              onChange={(e) => setSelectedAccountName(e.target.value)}
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
              value={customerNo}
              onChange={(e) => setCustomerNo(e.target.value)}
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
              value={balanceDueLCY}
              onChange={(e) => setBalanceDueLCY(e.target.value)}
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
            <label htmlFor="description6" className="w-1/2 text-start">
              Amount Tendered:
            </label>
            <input
              type="text"
              id="description6"
              placeholder="Amount Tendered"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={amountTendered}
              onChange={handleAmountTenderedChange}
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
              value={change}
              readOnly
            />
          </div>
          <div className="w-full flex">
            <label htmlFor="description8" className="w-1/2 text-start">
              Payment Type:
            </label>
            <select
              id="description8"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={selectedPaymentType}
              onChange={(e) => setSelectedPaymentType(e.target.value)}
            >
              <option value="">Payment Type</option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="transfer">Transfer</option>
              <option value="visa">Visa</option>
            </select>
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
              value={selectedIncomeGroup ? selectedIncomeGroup.name : ""}
              onChange={(e) => {
                const selectedCode = incomeGroups.find((code) => code.name === e.target.value);
                setSelectedIncomeGroup(selectedCode);
              }}
            >
              <option value="">Income Group</option>
              {incomeGroups.map((code) => (
                <option key={code.id} value={code.name}>
                  {code.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full flex justify-center">
            <button
              type="button"
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