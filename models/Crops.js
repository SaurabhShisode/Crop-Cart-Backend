import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: String, required: true },
    image: { type: String },
    regionPincodes: [{ type: String, required: true }],
    type: { type: String, required: true },
    quantity: { type: String, required: true }, 
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Crop = mongoose.model('Crop', cropSchema);
export default Crop;
