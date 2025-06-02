import express from 'express';
import Order from '../models/Order.js';
import { protect } from '../middleware/authMiddleware.js';  // <-- named import
import nodemailer from 'nodemailer';

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,      
    pass: process.env.EMAIL_PASSWORD,  
  },
});

router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: newOrder.email,
      subject: 'Order Confirmation - CropCart',
      html: `
        <h2>Thank you for your order, ${newOrder.name}!</h2>
        <p>Your order ID is <b>${newOrder._id}</b>.</p>
        <p><b>Delivery Address:</b> ${newOrder.address}</p>
        <p><b>Phone:</b> ${newOrder.phone}</p>
        <h3>Items:</h3>
        <ul>
          ${newOrder.items.map(item => 
            `<li>${item.name} — ${item.quantity} (${item.quantityInCart})</li>`).join('')}
        </ul>
        <p><b>Total:</b> ₹${newOrder.total}</p>
        <p>We will notify you once your order is shipped.</p>
        <p>Thanks for shopping with CropCart!</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Order confirmation email sent:', info.response);
      }
    });

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Use 'protect' middleware here instead of 'authMiddleware'
router.get('/user/:userId', protect, async (req, res) => {
  const { userId } = req.params;
  console.log('Decoded JWT user:', req.user);
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
