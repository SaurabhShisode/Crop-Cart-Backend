import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  phone: String, 
  address: String,
  items: Array,
  total: String,
  tax: String,
  deliveryFee: Number,
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
