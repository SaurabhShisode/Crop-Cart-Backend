const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      sellerAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        latitude: Number,
        longitude: Number
      },
      distance: Number, // distance from seller to delivery for this product (km)
      estimatedDeliveryTime: Date // estimated delivery for this product
    }
  ],
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    latitude: Number,
    longitude: Number
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deliveredAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Order", orderSchema);
