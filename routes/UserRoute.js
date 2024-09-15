const express = require('express');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  console.log(req.body);  // Log the request body to see if the data is coming in

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  try {
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: "User already exists" });

      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).json({ message: "User registered" });
  } catch (err) {
      console.error('Error during registration:', err);  // Log detailed error
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});




// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Input validation: Ensure both email and password are provided
  if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
          // Generic error message for security reasons
          return res.status(400).json({ message: "Invalid credentials" });
      }

      // Compare the provided password with the stored hashed password
      const isMatch= await user.isPasswordCorrect(password)
      if (!isMatch) {
          // Generic error message for security reasons
          return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create a JWT token for the logged-in user
      const token = jwt.sign(
          { id: user._id, name: user.name }, 
          process.env.JWT_SECRET || "chen chapak dam dam", 
          { expiresIn: '1h' }
      );

      // Send the token and the user's name as the response
      res.json({ token, name: user.name });

  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
});

// Verify Token middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET|| "chen chapak dam dam");
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(500).json({ message: "Failed to authenticate" });
    }
};

// Protected route to get user info
router.get('/me', verifyToken, (req, res) => {
    res.json({ name: req.user.name });
});

module.exports = router;
