import express from 'express';
import Order from '../models/Order.js'; 
import Product from '../models/Crops.js'; // or your Product model
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Haversine formula to calculate distance between two lat/lng points (km)
function getDistanceInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// POST /orders - place a new order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, deliveryAddress } = req.body;

    if (
      !deliveryAddress.latitude || 
      !deliveryAddress.longitude
    ) {
      return res.status(400).json({ message: "Delivery address coordinates are required" });
    }

    const productsWithSellerInfo = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product with id ${item.productId} not found` });
      }
      
      // Ensure sellerAddress and coordinates exist
      if (!product.sellerAddress || !product.sellerAddress.coordinates) {
        return res.status(400).json({ message: `Seller address missing for product ${product._id}` });
      }

      const sellerCoords = product.sellerAddress.coordinates;
      const distance = getDistanceInKm(
        sellerCoords.lat,
        sellerCoords.lng,
        deliveryAddress.latitude,
        deliveryAddress.longitude
      );

      // Simple estimated delivery time (e.g., 1 hour per 50km + 1 hour handling)
      const estimatedHours = Math.ceil(distance / 50) + 1;
      const estimatedDeliveryTime = new Date(Date.now() + estimatedHours * 3600 * 1000);

      productsWithSellerInfo.push({
        productId: product._id,
        quantity: item.quantity,
        sellerAddress: product.sellerAddress,
        distance,
        estimatedDeliveryTime
      });
    }

    const newOrder = new Order({
      buyer: req.user.id,
      products: productsWithSellerInfo,
      deliveryAddress,
      status: 'pending',
      createdAt: new Date()
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// GET /orders/user/:userId - fetch orders for logged-in user
router.get('/user/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;

  if (req.user.id !== userId) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  try {
    const orders = await Order.find({ buyer: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

export default router;
