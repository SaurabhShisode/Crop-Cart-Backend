
import express from 'express';
import Order from '../models/Order.js'; 
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Existing POST route to place order
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// New GET route to fetch orders for logged-in user
router.get('/user/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;

  // Check if userId matches logged-in user (security check)
  if (req.user.id !== userId) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

export default router;
