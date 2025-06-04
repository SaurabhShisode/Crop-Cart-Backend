import Crop from '../models/Crops.js';
import Order from '../models/Order.js';

export const addCrop = async (req, res) => {
  const crop = await Crop.create({ ...req.body, farmer: req.user._id });
  res.json(crop);
};

export const getMyCrops = async (req, res) => {
  const crops = await Crop.find({ farmer: req.user._id });
  res.json(crops);
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ farmer: req.user._id }).populate('buyer', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

export const getEarnings = async (req, res) => {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const orders = await Order.find({ farmer: req.user._id, createdAt: { $gte: lastMonth } });
  const earnings = orders.reduce((sum, o) => sum + o.total, 0);
  res.json({ earnings });
};

export const getTotalSold = async (req, res) => {
  const orders = await Order.find({ farmer: req.user._id });
  const count = orders.reduce((sum, o) => sum + o.items.length, 0);
  res.json({ totalSold: count });
};

export const getAnalytics = async (req, res) => {
  const pipeline = [
    { $match: { farmer: req.user._id } },
    { $unwind: '$items' },
    {
      $group: {
        _id: { $month: '$createdAt' },
        totalSales: { $sum: '$items.quantity' },
        totalRevenue: { $sum: '$items.price' }
      }
    },
    { $sort: { '_id': 1 } }
  ];
  const data = await Order.aggregate(pipeline);
  res.json(data);
};

export const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    if (crop.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete this crop' });
    }

    await crop.deleteOne();
    res.json({ message: 'Crop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting crop' });
  }
};
