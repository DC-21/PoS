const router = require("express").Router();
const Use = require('../models/Use');

router.post('/user-details', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await Use.create(userData);
    res.status(200).json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'An error occurred during user creation.' });
  }
});

router.post('/receiptno', async (req, res) => {
  try {
    const { receiptnoData } = req.body;
    const newReceipt = await Use.create({ receiptnoData });
    res.status(200).json({ message: 'User created successfully!', user: newReceipt });
  } catch (error) {
    console.error('Error handling receiptno:', error);
    res.status(500).json({ message: 'An error occurred while handling receiptno.' });
  }
});

router.post('/accounttype', async (req, res) => {
  try {
    const { accountTypeData } = req.body;
    const newTypeData = await Use.create({ accountTypeData });
    res.status(200).json({ message: 'User created successfully!', user: newTypeData });
  } catch (error) {
    console.error('Error handling accounttype:', error);
    res.status(500).json({ message: 'An error occurred while handling accounttype.' });
  }
});

router.post('/accountno', async (req, res) => {
  try {
    const { accountNoData } = req.body;
    const newNoData = await Use.create({ accountNoData });
    res.status(200).json({ message: 'User created successfully!', user: newNoData });
  } catch (error) {
    console.error('Error handling accountno:', error);
    res.status(500).json({ message: 'An error occurred while handling accountno.' });
  }
});

router.post('/accountname', async (req, res) => {
  try {
    const { accountNameData } = req.body;
    const newName = await Use.create({ accountNameData });
    res.status(200).json({ message: 'User created successfully!', user: newName });
  } catch (error) {
    console.error('Error handling accountname:', error);
    res.status(500).json({ message: 'An error occurred while handling accountname.' });
  }
});

router.put('/accountbalance', async (req, res) => {
  try {
    const { amountToPayData } = req.body;

    // Get the current account balance
    const user = await Use.findOne({});
    const currentBalance = user.accountbalance || 0;

    // Calculate the updated balance
    const updatedBalance = currentBalance - amountToPayData;

    // Update the account balance
    user.accountbalance = updatedBalance;
    await user.save();

    res.status(200).json({ message: 'Account balance updated successfully!', user: user });
  } catch (error) {
    console.error('Error updating account balance:', error);
    res.status(500).json({ message: 'An error occurred during account balance update.' });
  }
});

router.put('/amounttopay', async (req, res) => {
  try {
    const { amountToPayData } = req.body;
    const newPay = await Use.create({ amountToPayData });
    res.status(200).json({ message: 'User created successfully!', user: newPay });
  } catch (error) {
    console.error('Error handling amounttopay:', error);
    res.status(500).json({ message: 'An error occurred while handling amounttopay.' });
  }
});

router.post('/paymenttype', async (req, res) => {
  try {
    const { paymentType } = req.body;
    const newType = await Use.create({ paymentType });
    res.status(200).json({ message: 'User created successfully!', user: newType });
  } catch (error) {
    console.error('Error handling paymenttype:', error);
    res.status(500).json({ message: 'An error occurred while handling paymenttype.' });
  }
});

router.post('/description', async (req, res) => {
  try {
    const { descriptionData } = req.body;
    const newDescription = await Use.create({ descriptionData });
    res.status(200).json({ message: 'User created successfully!', user: newDescription });
  } catch (error) {
    console.error('Error handling description:', error);
    res.status(500).json({ message: 'An error occurred while handling description.' });
  }
});

router.post('/incomegroupcode', async (req, res) => {
  try {
    const { groupData } = req.body;
    const newGroup = await Use.create({ groupData });
    res.status(200).json({ message: 'User created successfully!', user: newGroup });
  } catch (error) {
    console.error('Error handling incomegroupcode:', error);
    res.status(500).json({ message: 'An error occurred while handling incomegroupcode.' });
  }
});

module.exports = router;
