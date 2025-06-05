import express from 'express';
import {
  addCrop,
  getMyCrops,
  getEarnings,
  getTotalSold,
  getAnalytics,
  getMyOrders, 
  deleteCrop 
} from '../controllers/farmerController.js';
import { protect, requireFarmer } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, requireFarmer);

router.post('/crops', addCrop);
router.get('/crops', getMyCrops);
router.get('/earnings', getEarnings);
router.get('/total-sold', getTotalSold);
router.get('/analytics', getAnalytics);
router.delete('/crops/:id', protect, requireFarmer, deleteCrop);

router.get('/orders', getMyOrders);

export default router;
