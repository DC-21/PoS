const router = require("express").Router();
router.post('/user', (req, res) => {
    // Access the posted JSON data
    const userData = req.body;
  
    // Perform any necessary operations with the user data
  
    console.log(userData); // Output the user data to the console
  
    // Send a response
    res.status(200).json({ message: 'User created successfully!' });
  });


module.exports= router;