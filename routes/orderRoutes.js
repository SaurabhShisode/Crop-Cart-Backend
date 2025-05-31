
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); 

router.post('/', async (req, res) => {
  try {
    const { userId, name, email, address, items, total, tax, deliveryFee } = req.body;

    const newOrder = new Order({
      userId,
      name,
      email,
      address,
      items,
      total,
      tax,
      deliveryFee,
      placedAt: new Date(),
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

module.exports = router;
