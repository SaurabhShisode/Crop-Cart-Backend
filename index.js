import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/userRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import ordersRoute from './routes/orderRoutes.js'; 
import './utils/orderStatusUpdater.js';  // <-- Import to start background job

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors({
  origin: ['http://localhost:3000', 'https://crop-cart-rose.vercel.app'],
  credentials: true,
}));
app.use(express.json());

// ===== Routes =====
app.use('/api/auth', authRoutes);
app.use('/crops', cropRoutes);
app.use('/api/orders', ordersRoute);

// ===== Status Route =====
app.get('/', (req, res) => {
  res.send('CropCart Backend API is running');
});

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});
