const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/db');

const app = express();

// Configure bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/use', require('./routes/routes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message: message });
});

app.get('/user', async (req, res) => {
    try {
      const users = await Use.findAll();
      console.log(users); // Display the users on the console
      res.status(200).json(users);
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ message: 'An error occurred while retrieving users.' });
    }
  });
  

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Synchronize models with the database
    await sequelize.sync();

    // Start the server
    app.listen(3000, () => {
      console.log('App listening on http://localhost:3000');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
