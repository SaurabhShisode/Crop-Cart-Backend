import express from 'express';
import {
  addCrop,
  getMyCrops,
  getMyOrders, 
  deleteCrop,
  getFarmerAnalytics
} from '../controllers/farmerController.js';
import { protect, requireFarmer } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, requireFarmer);

router.post('/crops', addCrop);
router.get('/crops', getMyCrops);

router.delete('/crops/:id', protect, requireFarmer, deleteCrop);

router.get('/orders', getMyOrders);
router.get('/analytics', protect, getFarmerAnalytics);
export default router;
