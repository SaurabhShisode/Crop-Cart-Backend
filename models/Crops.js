import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: String, required: true },
  image: { type: String },
  regionPincodes: [{ type: String, required: true }],
  type: { type: String, required: true },
  quantity: { type: String, required: true }, // new field added
});

const Crop = mongoose.model('Crop', cropSchema);
export default Crop;
