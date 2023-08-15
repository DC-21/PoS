import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment-timezone";

const Trans = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [currentDate] = useState(moment().format("DD/MM/YY"));
  const [selectedAccountType, setSelectedAccountType] = useState("");
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
  const [change, setChange] = useState("00.00");
  const [glaccounts, setGlaccounts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (selectedAccountType === "customer") {
      axios
        .get("http://localhost:3000/customer-details?_limit=1000")
        .then((response) => {
          const data = response.data;
          console.log("Fetched customer data:", data);
          setUserDetails(data.customerData);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (selectedAccountType === "accounts") {
      axios
        .get("http://localhost:3000/gl-accounts")
        .then((response) => {
          const data = response.data;

          if (Array.isArray(data)) {
            // Assuming the data is already an array of objects
            setGlaccounts(data);
            console.log(data);
          } else if (data && Array.isArray(data.data)) {
            // If data.data is the correct array
            setGlaccounts(data.data);
            console.log(data);
          } else {
            console.log("Invalid glaccounts data structure:", data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedAccountType]);

  useEffect(() => {
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
  }, []);

  const handleOpenPopup = () => {
    setShowPopup(true);
    setSearchText(""); // Clear search text when opening the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleSelectAccount = (accountName) => {
    setSelectedAccountName(accountName);
    handleClosePopup();
  };

  const filteredOptions =
    selectedAccountType === "customer"
      ? userDetails.filter((user) =>
          user.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : selectedAccountType === "accounts"
      ? glaccounts.filter((glaccount) =>
          glaccount.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

  //this section makes a request to find customer details based on the selected name. //
  useEffect(() => {
    if (selectedAccountName) {
      const user = userDetails.find(
        (user) => user.name === selectedAccountName
      );

      if (user) {
        setCustomerNo(user.customerNo || "");
        setBalanceDueLCY(user.balanceDueLCY || "");
      } else {
        setCustomerNo("");
        setBalanceDueLCY("");
      }
    }
  }, [selectedAccountName, userDetails]);

  // this section is responsible for calculating the change by taking the amount tendered minus amount to pay.
  const handleAmountTenderedChange = (e) => {
    const amountTenderedValue = e.target.value;
    setAmountTendered(amountTenderedValue);
  };

  useEffect(() => {
    const amountToPayValue = parseFloat(amountToPay) || 0;
    const amountTenderedNum = parseFloat(amountTendered) || 0;

    if (!isNaN(amountToPayValue) && !isNaN(amountTenderedNum)) {
      const calculatedChange = amountTenderedNum - amountToPayValue;
      setChange(calculatedChange.toFixed(2));
    } else {
      setChange("00.00");
    }
  }, [amountToPay, amountTendered]);

  const resetFields = () => {
    setAmountToPay("");
    setBalanceDueLCY("");
    setCustomerNo("");
    setSelectedAccountName("");
    setSelectedDescription("");
    setSelectedPaymentType("");
    setNextReceiptNo("");
    setSelectedIncomeGroup(null);
    setAmountTendered("");
    setChange("00.00");
  };

  const formattedDateForDB = moment(currentDate, "DD/MM/YY").format(
    "YYYY-MM-DD"
  );
  const handleSubmit = () => {
    const newBalanceDueLCY =
      parseFloat(balanceDueLCY) - parseFloat(amountToPay);
    setBalanceDueLCY(newBalanceDueLCY.toFixed(2));

    // this section prepares the data to be sent in the PUT request to update customer's balanceDueLCY and then make a put request //
    const customerUpdateData = {
      newBalanceDueLCY: newBalanceDueLCY,
    };

    axios
      .put(
        `http://localhost:3000/customer-details/${customerNo}`,
        customerUpdateData
      )
      .then((response) => {
        console.log("Customer balance updated successfully:", response.data);
      })
      .catch((error) => {
        console.log("Error updating customer balance:", error);
      });

    const transactionData = {
      rcptno: nextReceiptNo,
      date: formattedDateForDB,
      name: selectedAccountName,
      customer_no: customerNo,
      opn_bal: balanceDueLCY,
      clsn_bal: newBalanceDueLCY.toFixed(2),
      amount: amountToPay,
      amt_tnd: amountTendered,
      change: change,
      pymt_type: selectedPaymentType,
      desc: selectedDescription,
      code: selectedIncomeGroup ? selectedIncomeGroup.name : "",
    };

    axios
      .post("http://localhost:3000/transactions", transactionData)
      .then((response) => {
        console.log("Transaction created successfully:", response.data);
      })
      .catch((error) => {
        console.log("Error creating transaction:", error);
      });

    resetFields();
  };

  const updateReceiptNumber = () => {
    axios
      .get("http://localhost:3000/receiptno")
      .then((response) => {
        const { receiptNumber } = response.data;
        setNextReceiptNo(receiptNumber);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="px-8 py-8 w-full h-screen">
        <form className="flex flex-col gap-4 w-full text-center">
          <div className="flex items-start w-full">
            <label htmlFor="no" className="w-1/2 text-start">
              Receipt No:
            </label>
            <input
              type=""
              id="description0"
              className="w-1/2 bg-slate-100 border border-gray-400"
              defaultValue={nextReceiptNo}
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
            <select
              id="description"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={selectedAccountType}
              onChange={(e) => setSelectedAccountType(e.target.value)}
            >
              <option value="">Account Type</option>
              <option value="customer">Customer</option>
              <option value="accounts">G/L Accounts</option>
            </select>
          </div>
          <div className="w-full flex">
      <label htmlFor="description3" className="w-1/2 text-start">
        Received from Account Name:
      </label>
      <div className="w-1/2 bg-slate-100 border border-gray-400 relative">
        <div
          className="w-full h-full cursor-pointer"
          onClick={handleOpenPopup} // Show search popup on click
        >
          {selectedAccountName || "Select An Account Name To Receive From"}
        </div>
        {showPopup && (
          <div className="popup-overlay fixed inset-0 z-10 flex justify-center items-center">
            <div className="popup bg-white w-64 p-4 border rounded shadow">
              <input
                type="text"
                placeholder="Search Account Name"
                className="w-full bg-gray-100 border border-gray-400 p-2 rounded mb-2"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {filteredOptions.length > 0 ? (
                <div className="search-results max-h-40 overflow-y-auto">
                  {filteredOptions.map(option => (
                    <div
                      key={option.id || option.code}
                      className="result-item cursor-pointer px-2 py-1 hover:bg-gray-200 rounded"
                      onClick={() => handleSelectAccount(option.name)}
                    >
                      {option.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center mt-2 text-gray-500">No results found.</div>
              )}
              <button
                className="mt-2 bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

          <div className="w-full flex">
            <label htmlFor="description2" className="w-1/2 text-start">
              Received from Account No:
            </label>
            <input
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
                const selectedCode = incomeGroups.find(
                  (code) => code.name === e.target.value
                );
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
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="w-1/2 bg-blue-500 text-white rounded-md py-2 ml-4"
              onClick={updateReceiptNumber}
            >
              New
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Trans;
