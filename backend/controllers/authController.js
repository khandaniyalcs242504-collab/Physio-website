const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const MAX_ADMINS = 2;

// Check if setup is still allowed (fewer than MAX_ADMINS accounts exist)
const checkSetup = async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    res.status(200).json({ setupNeeded: adminCount < MAX_ADMINS, adminCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new admin account (allowed until MAX_ADMINS is reached)
const setupAdmin = async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();

    if (adminCount >= MAX_ADMINS) {
      return res.status(400).json({ message: 'Maximum number of admin accounts reached.' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailPattern.test(username)) {
      return res.status(400).json({ message: 'Username must be a valid @gmail.com address' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one uppercase letter' });
    }

    if (!/[a-z]/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one lowercase letter' });
    }

    if (!/[0-9]/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one number' });
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one special character' });
    }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'This email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin account created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ token, username: admin.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  checkSetup,
  setupAdmin,
  login
};