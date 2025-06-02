import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Crop from '../models/Crops.js';

dotenv.config();

const farmerId = '683d2ff4d480b93443133d42';

const crops = [
  {
    id: "1",
    name: "Wheat",
    price: 32,
    quantity: "1 kg",
    availability: "Available now",
    image: "https://www.forestwholefoods.co.uk/wp-content/uploads/2017/04/Organic-Wheat-1500px.jpg",
    regionPincodes: ["110001", "110002", "110003", "425401"],
    type: "crop",
    farmer: farmerId,
  },
  {
    id: "2",
    name: "Rice",
    price: 42,
    quantity: "1 kg",
    availability: "Available now",
    image: "https://laotiantimes.com/wp-content/uploads/2023/07/Vientiane-Authorities-Sell-Stockpiled-Rice-to-Ease-Shortage-and-Stabilize-Prices-696x364.jpg",
    regionPincodes: ["560001", "560002", "560003", "425401"],
    type: "crop",
    farmer: farmerId,
  },
  {
    id: "3",
    name: "Corn",
    price: 28,
    quantity: "1 kg",
    availability: "Available now",
    image: "https://p.globalsources.com/IMAGES/PDT/B5793699086/Yellow-Corn-For-Animal-Feed.jpg",
    regionPincodes: ["400001", "400002", "425401"],
    type: "crop",
    farmer: farmerId,
  },
  {
    id: "4",
    name: "Barley",
    price: 30,
    quantity: "1 kg",
    availability: "Limited stock",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLN3IwY1IHUUz9CTth6Rb0DOE6qDrJ5jsYHg&s",
    regionPincodes: ["110001", "110002", "110004", "425401"],
    type: "crop",
    farmer: farmerId,
  },
  {
    id: "5",
    name: "Soybean",
    price: 55,
    quantity: "1 kg",
    availability: "Available now",
    image: "https://5.imimg.com/data5/UV/HH/MY-59256180/organic-soybean-500x500.jpg",
    regionPincodes: ["700001", "700002", "425401"],
    type: "crop",
    farmer: farmerId,
  },
  {
    id: "6",
    name: "Cotton",
    price: 65,
    quantity: "1 bundle",
    availability: "Pre-order",
    image: "https://cdn.britannica.com/18/156618-050-39339EA2/cotton-harvesting.jpg",
    regionPincodes: ["560001", "560004", "425401"],
    type: "crop",
    farmer: farmerId,
  },
  {
    id: "7",
    name: "Sugarcane",
    price: 12,
    quantity: "1 stalk",
    availability: "Available now",
    image: "https://www.jiomart.com/images/product/original/590007597/sugar-cane-1-pc-approx-200-g-300-g-product-images-o590007597-p590996440-0-202502271155.jpg?im=Resize=(420,420)",
    regionPincodes: ["400001", "400005", "425401"],
    type: "crop",
    farmer: farmerId,
  },
  {
    id: "19",
    name: "Millet",
    price: 38,
    quantity: "1 kg",
    availability: "Available now",
    image: "https://wisemama.in/cdn/shop/articles/Pearl_Millet_-_Benefits_Nutritional_value_uses_recipes_and_more_2_1000x_2834169a-5d05-435f-ac6a-6124ceac4def_300x.webp?v=1746582596",
    regionPincodes: ["400003", "110002", "425401"],
    type: "crop",
    farmer: farmerId,
  },
  {
    id: "29",
    name: "Oats",
    price: 90,
    quantity: "500 gm",
    availability: "Available now",
    image: "https://healthybuddha.in/image/cache/catalog/Oat%20Flakes-500x515.jpg",
    regionPincodes: ["110005", "110006", "425401"],
    type: "crop",
    farmer: farmerId,
  },
  {
    id: "30",
    name: "Peanuts",
    price: 55,
    quantity: "1 kg",
    availability: "Available now",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgl654T-Dy_7awfvpaW2EtWS1digGOV6ksgw&s",
    regionPincodes: ["560007", "560008", "425401"],
    type: "crop",
    farmer: farmerId,
  },
  {
    id: "31",
    name: "Green Gram",
    price: 90,
    quantity: "1 kg",
    availability: "Limited stock",
    image: "https://www.agrifarming.in/wp-content/uploads/Ultimate-Guide-to-Green-Gram-Farming-1.jpg",
    regionPincodes: ["700003", "700007", "425401"],
    type: "crop",
    farmer: farmerId,
  },
  {
    id: "32",
    name: "Jowar",
    price: 32,
    quantity: "1 kg",
    availability: "Available now",
    image: "https://m.media-amazon.com/images/I/61eKPTRJisL._AC_UF1000,1000_QL80_.jpg",
    regionPincodes: ["400003", "400006", "425401"],
    type: "crop",
    farmer: farmerId,
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