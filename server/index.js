const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/db');
const Use = require('./models/Use');
const useRouter = require('./routes/routes');
const cors = require("cors");

const app = express();

// Configure bodyParser //
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the router for the '/user' routes
app.use('/user', useRouter);

// Error handling middleware to protect server from crashing //
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message: message });
});

app.get('/user-details', async (req, res) => {
  try {
    const users = await Use.findAll();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'An error occurred while retrieving users.' });
  }
});

app.put('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    // Find the user by ID
    const user = await Use.findByPk(id);

    // Update the user details
    user.name = name;
    user.email = email;
    user.age = age;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User details updated successfully.' });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ message: 'An error occurred while updating user details.' });
  }
});

//section to Test the database connection //
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // section Synchronize models with the database //
    await sequelize.sync();

    // section to Start the server //
    app.listen(3000, () => {
      console.log('App listening on http://localhost:3000');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
