import express from 'express';
import Crop from '../models/Crops.js'; 

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find(); 
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching crops' });
  }
});

export default router;
