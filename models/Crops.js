import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: String, required: true },
  image: { type: String },
  regionPincodes: [{ type: String, required: true }],
  type: { type: String, required: true },
  quantity: { type: String, required: true },

  sellerAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  }
}, { timestamps: true });  

const Crop = mongoose.model('Crop', cropSchema);

export default Crop;
