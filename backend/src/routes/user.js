// routes/user.js

import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'Shivansh'; // fallback secret

// Sign-Up Route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || username.length < 4) {
      return res.status(400).json({ message: "Username must be at least 4 characters long" });
    }
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Remove manual hashing! Let pre-save do it
    const newUser = new User({ username, email, password });
    await newUser.save();

    return res.status(201).json({ message: "Sign-Up successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Log-In Route (username OR email)
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // STEP 1: यहां hashed password log करो
    console.log("Stored hash password:", existingUser.password);

    // STEP 2: bcrypt.compare करने के बाद log करो
    const isMatch = await bcrypt.compare(password, existingUser.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const authClaims = { username: existingUser.username, id: existingUser._id };
    const token = jwt.sign(authClaims, process.env.JWT_SECRET, { expiresIn: "2d" });

    return res.status(200).json({ id: existingUser._id, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;

