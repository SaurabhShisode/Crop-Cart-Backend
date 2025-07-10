import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/userRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js';
import recipeRoutes from './routes/recipeRoute.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://crop-cart-rose.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.options('*', cors());


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/recipes', recipeRoutes);


app.get('/', (req, res) => {
  res.send('🌾 CropCart Backend API is running');
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST'],
  },
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB connected');
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
