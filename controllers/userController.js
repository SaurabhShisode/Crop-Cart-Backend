import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { getAuth } from 'firebase-admin/auth';
import admin from '../firebaseAdmin.js';

// Utility to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Register new user (generic)
export const registerUser = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Register User Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Register new farmer
export const registerFarmer = async (req, res) => {
  req.body.role = 'farmer';
  return registerUser(req, res); 
};

// Login user (Email & Password)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if user has a password (in case they signed up via OAuth)
    if (!user.password) {
      return res.status(400).json({ message: 'Please use the correct login method' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token and send response
    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login User Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Google Login
export const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = await getAuth().verifyIdToken(token);
    const { email, name } = decoded;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name: name || email.split('@')[0],
        email,
        role: 'user',
        password: '',
      });
      await user.save();
    }

    const jwtToken = generateToken(user);

    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Google Login Error:', error);
    res.status(401).json({ message: 'Invalid or expired Google token' });
  }
};

// Get current user info
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
