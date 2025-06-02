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
