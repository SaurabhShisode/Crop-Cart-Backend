const express = require('express');
const router = express.Router();
const {
  addCrop,
  getMyCrops,
  getEarnings,
  getTotalSold,
  getAnalytics,
} = require('../controllers/farmerController');
const { protect, requireFarmer } = require('../middleware/authMiddleware');

router.use(protect, requireFarmer);

router.post('/crops', addCrop);
router.get('/crops', getMyCrops);
router.get('/earnings', getEarnings);
router.get('/total-sold', getTotalSold);
router.get('/analytics', getAnalytics);

module.exports = router;
