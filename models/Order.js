
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: String,
  email: String,
  address: String,
  items: [
    {
      id: String,
      name: String,
      price: Number,
      quantityInCart: String,
      quantity: String,
    },
  ],
  total: String,
  tax: String,
  deliveryFee: Number,
  placedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
