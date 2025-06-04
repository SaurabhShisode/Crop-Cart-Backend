import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },

    items: [
      {
        cropId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Crop',
          required: true,
        },
        name: String,
        price: Number,
        quantity: String,
      },
    ],

    total: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
