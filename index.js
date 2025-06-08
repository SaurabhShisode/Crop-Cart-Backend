import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/userRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      origin.startsWith('http://localhost:') ||
      origin === 'https://crop-cart-rose.vercel.app'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ===== Routes =====
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/farmer', farmerRoutes); 

// ===== Root Status Check =====
app.get('/', (req, res) => {
  res.send('🌾 CropCart Backend API is running');
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
