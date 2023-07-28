import axios from 'axios';
import { useState, useEffect } from 'react';

const Pos = () => {
  const [accountNames, setAccountNames] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [amountToPay, setAmountToPay] = useState('');
  const [customerBalance, setCustomerBalance] = useState('');
  const [selectedAccountName, setSelectedAccountName] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const [nextReceiptNo, setNextReceiptNo] = useState('');

  // Fetch account names from the database on component mount
  useEffect(() => {
    axios
      .get('http://localhost:3000/customers')
      .then((response) => {
        setAccountNames(response.data);
      })
      .catch((error) => {
        console.log('Error fetching account names:', error);
      });

    // Fetch the next receipt number
    axios
      .get('http://localhost:3000/transactions/next-receiptno')
      .then((response) => {
        setNextReceiptNo(response.data.receiptno);
      })
      .catch((error) => {
        console.error('Error fetching next receipt number:', error);
      });

    // Set the current date
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const handleAccountNameChange = (e) => {
    const name = e.target.value;
    setSelectedAccountName(name);
    setSelectedDescription(''); // Reset the selected description when account name changes
    const selectedCustomer = accountNames.find((customer) => customer.name === name);
    if (selectedCustomer) {
      setCustomerBalance(selectedCustomer.accountbalance || '');
    }
  };

  const handleSubmit = () => {
    // Perform the form submission and other actions here
    // ...
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
              type="text"
              id="description0"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={nextReceiptNo}
              readOnly
            />
          </div>
          <div className="flex items-start w-full">
            <label htmlFor="date" className="w-1/2 text-start">
              Date:
            </label>
            <input
              type="text"
              id="date"
              className="w-1/2 bg-slate-100 border border-gray-400"
              value={currentDate}
              readOnly
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
              readOnly
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
              {accountNames.map((customer) => (
                <option key={customer.id} value={customer.name}>
                  {customer.name}
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
              readOnly
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
            <label htmlFor="description9" className="w-1/2 text-start">
              Description:
            </label>
            <select
              id="description9"
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

          <div className="w-full flex justify-center">
            <button
              type="button"
              className="w-1/2 bg-indigo-500 text-white rounded-md py-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pos;
