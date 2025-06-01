import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // make sure this matches your actual model name
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      sellerAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        latitude: Number,
        longitude: Number,
      },
      distance: Number,
      estimatedDeliveryTime: Date,
    },
  ],
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    latitude: Number,
    longitude: Number,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deliveredAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
