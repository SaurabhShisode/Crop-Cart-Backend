import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Crop from '../models/Crop.js';

dotenv.config();

const crops = [
  {
    id: "19",
    name: "Millet",
    price: 105,
    availability: "Available now",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/320px-Tomato_je.jpg",
    regionPincodes: ["400003", "110002", "425401"],
    type: "crop",
  },
  {
    id: "20",
    name: "Tomato",
    price: 80,
    availability: "Available now",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/320px-Tomato_je.jpg",
    regionPincodes: ["400003", "110002", "425401"],
    type: "crop",
  },

];

const seedCrops = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Crop.deleteMany({});
    await Crop.insertMany(crops);
    console.log('Crops seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding crops:', error);
    process.exit(1);
  }
};

seedCrops();
