const router = require("express").Router();
const Use = require('../models/Use');

// Route: /user-details
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
        const userData = req.body;
        const newUser = await Use.create(userData);
        res.status(200).json({ message: 'User created successfully!', user: newUser });
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

  router.post('/accountno', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await Use.create(userData);
        res.status(200).json({ message: 'User created successfully!', user: newUser });
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

  router.post('/accountname', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await Use.create(userData);
        res.status(200).json({ message: 'User created successfully!', user: newUser });
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

  router.post('/accountbalance', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await Use.create(userData);
        res.status(200).json({ message: 'User created successfully!', user: newUser });
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

  router.post('/amounttopay', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await Use.create(userData);
        res.status(200).json({ message: 'User created successfully!', user: newUser });
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

  router.post('/paymenttype', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await Use.create(userData);
        res.status(200).json({ message: 'User created successfully!', user: newUser });
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

  router.post('/description', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await Use.create(userData);
        res.status(200).json({ message: 'User created successfully!', user: newUser });
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

  router.post('/incomegroupcode', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await Use.create(userData);
        res.status(200).json({ message: 'User created successfully!', user: newUser });
      } catch (error) {
      console.error('Error handling accounttype:', error);
      res.status(500).json({ message: 'An error occurred while handling accounttype.' });
    }
  });

module.exports = router;
