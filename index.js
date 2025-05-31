import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://crop-cart-frontend.onrender.com'],
  credentials: true,
}));

// JSON Parsing
app.use(express.json());

// ===== Routes =====
app.use('/api/auth', authRoutes);

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
