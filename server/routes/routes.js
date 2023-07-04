const router = require("express").Router();
const Use = require('../models/Use');

router.get('/user-details', async (req, res) => {
  try {
    const users = await Use.findAll();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'An error occurred while retrieving users.' });
  }
});

router.put('/user-details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userDetails = req.body;

    // Find the user by ID
    const user = await Use.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the user's account balance
    const updatedAmount = user.accountbalance - userDetails.amounttopay;
    user.accountbalance = updatedAmount;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User details updated successfully.', user: user });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ message: 'An error occurred while updating user details.' });
  }
});


module.exports = router;
