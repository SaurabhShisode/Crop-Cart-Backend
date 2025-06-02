import express from 'express';
import Crop from '../models/Crops.js'; // Your MongoDB model for crops

const router = express.Router();

// GET /crops - return all crops
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find(); // fetch crops from database
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching crops' });
  }
});

export default router;
