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

router.post('/accounttype', async (req, res) => {
    try {
        const {accountTypeData} = req.body;
        const newTYpeData = await Use.create({accountTypeData});
        res.status(200).json({ message: 'User created successfully!', user: newTYpeData });
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

  router.post('/accountno', async (req, res) => {
    try {
        const {accountNoData} = req.body;
        const newNoData = await Use.create({accountNoData});
        res.status(200).json({ message: 'User created successfully!', user: newNoData });
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

  router.post('/accountname', async (req, res) => {
    try {
        const {accountNameData} = req.body;
        const newName = await Use.create({accountNameData});
        res.status(200).json({ message: 'User created successfully!', user: newName });
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

  router.post('/accountbalance', async (req, res) => {
    try {
        const {accountBalanceData} = req.body;
        const newBalance = await Use.create({accountBalanceData});
        res.status(200).json({ message: 'User created successfully!', user: newBalance});
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

  router.post('/amounttopay', async (req, res) => {
    try {
        const {amountToPayData} = req.body;
        const newPay = await Use.create({amountToPayData});
        res.status(200).json({ message: 'User created successfully!', user: newPay });
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

  router.post('/paymenttype', async (req, res) => {
    try {
        const {paymentType} = req.body;
        const newType = await Use.create({paymentType});
        res.status(200).json({ message: 'User created successfully!', user: newType });
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

  router.post('/description', async (req, res) => {
    try {
        const {descriptionData} = req.body;
        const newDescription = await Use.create({descriptionData});
        res.status(200).json({ message: 'User created successfully!', user: newDescription });
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

  router.post('/incomegroupcode', async (req, res) => {
    try {
        const {groupData} = req.body;
        const newGroup = await Use.create({groupData});
        res.status(200).json({ message: 'User created successfully!', user: newGroup });
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

module.exports = router;
