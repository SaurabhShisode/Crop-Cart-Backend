import Order from '../models/Order.js';

async function updateDeliveredOrders() {
  const now = new Date();

  try {
    const result = await Order.updateMany(
      {
        status: { $ne: 'delivered' },
        estimatedDeliveryTime: { $lte: now }
      },
      { $set: { status: 'delivered', deliveredAt: now } }
    );
    console.log(`Order status updated: ${result.modifiedCount} orders marked as delivered.`);
  } catch (err) {
    console.error('Failed to update delivered orders:', err);
  }
}


setInterval(updateDeliveredOrders, 10 * 60 * 1000);


updateDeliveredOrders();

export default updateDeliveredOrders;
