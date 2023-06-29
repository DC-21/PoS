const express = require('express');
const bodyParser = require('body-parser');
const sequelize=require('./utils/db')

const app = express();


// Configure bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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
