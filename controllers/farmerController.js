import Crop from '../models/Crops.js';
import Order from '../models/Order.js';
import mongoose from 'mongoose';
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
    const orders = await Order.find({ farmerId: req.user._id }).populate('userId', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
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
export const getFarmerAnalytics = async (req, res) => {
  const farmerId = req.user?._id;

  if (!farmerId) {
    return res.status(401).json({ message: 'Unauthorized: farmerId missing' });
  }

  try {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    // Monthly Orders & Earnings
    const allOrders = await Order.aggregate([
      {
        $match: {
          farmerId: new mongoose.Types.ObjectId(farmerId),
          createdAt: { $gte: startOfYear },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          totalEarnings: { $sum: { $ifNull: ['$total', 0] } },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { '_id': 1 } },
    ]);

    // Current Month Summary
    const currentMonthOrders = await Order.aggregate([
      {
        $match: {
          farmerId: new mongoose.Types.ObjectId(farmerId),
          createdAt: {
            $gte: currentMonthStart,
            $lte: currentMonthEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: { $ifNull: ['$total', 0] } },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    const monthlyEarnings = Array(12).fill(0);
    const monthlyOrders = Array(12).fill(0);
    allOrders.forEach((entry) => {
      monthlyEarnings[entry._id - 1] = entry.totalEarnings;
      monthlyOrders[entry._id - 1] = entry.totalOrders;
    });

    const currentMonthSummary = currentMonthOrders[0] || { totalEarnings: 0, totalOrders: 0 };

    // Weekly Data (last 7 days)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 6);

    const weeklyData = await Order.aggregate([
      {
        $match: {
          farmerId: new mongoose.Types.ObjectId(farmerId),
          createdAt: { $gte: startOfWeek },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          totalEarnings: { $sum: { $ifNull: ['$total', 0] } },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { '_id': 1 } },
    ]);


    const weeklyLabels = [];
    const weeklyEarnings = [];
    const weeklyOrders = [];

    for (let i = 6; i >= 0; i--) {
      const day = new Date(now);
      day.setDate(now.getDate() - i);
      const label = day.toISOString().split('T')[0];
      weeklyLabels.push(label);

      const entry = weeklyData.find((e) => e._id === label);
      weeklyEarnings.push(entry?.totalEarnings || 0);
      weeklyOrders.push(entry?.totalOrders || 0);
    }
    const mostSoldCrop = await Order.aggregate([
      { $match: { farmerId: new mongoose.Types.ObjectId(farmerId) } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.cropId',
          cropName: { $first: '$items.name' },
          totalSold: { $sum: '$items.quantityInCart' },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 1 },

      
      {
        $lookup: {
          from: 'crops',             
          localField: '_id',         
          foreignField: '_id',       
          as: 'cropDetails',
        },
      },

      
      { $unwind: '$cropDetails' },

      
      {
        $project: {
          cropName: 1,
          totalSold: 1,
          image: '$cropDetails.image',
        },
      },
    ]);


    res.json({
      currentMonthEarnings: currentMonthSummary.totalEarnings,
      currentMonthOrders: currentMonthSummary.totalOrders,
      monthlyEarnings,
      monthlyOrders,
      weeklyLabels,
      weeklyEarnings,
      weeklyOrders,
      mostSoldCrop: mostSoldCrop[0] || null,
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Failed to load dashboard data', error: error.message });
  }
};
