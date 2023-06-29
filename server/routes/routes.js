const router = require("express").Router();
const Use = require('../models/Use');


router.get("/use", async (req, res) => {
    try {
      const users = await Use.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve users from the database" });
    }
  });

router.post('/use', async (req, res) => {
  try {
    const userData = req.body;

    const newUser = await Use.create(userData);

    res.status(200).json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'An error occurred during user creation.' });
  }
});

module.exports = router;
