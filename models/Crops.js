import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },    // unique id as string
  name: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: String, required: true },
  image: { type: String },
  regionPincodes: [{ type: String, required: true }],
  type: { type: String, required: true },
});

const Crop = mongoose.model('Crop', cropSchema);
export default Crop;
