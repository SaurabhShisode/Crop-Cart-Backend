import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/userRoutes.js';
import cropRoutes from './routes/cropRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors({
  origin: ['http://localhost:3000', 'https://crop-cart-rose.vercel.app'],
  credentials: true,
}));
app.use(express.json());
app.use('/crops', cropRoutes);

// ===== Routes =====
app.use('/api/auth', authRoutes);

// Add a simple root route for status check
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
