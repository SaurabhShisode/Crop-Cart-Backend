import mongoose from 'mongoose';
import Crop from '../models/Crops.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

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
  },
  {
    id: "20",
    name: "Lentils",
    price: 78,
    quantity: "1 kg",
    availability: "Available now",
    image: "https://arrowheadmills.com/wp-content/uploads/2022/10/red-lentils-1-1024x684.jpg",
    regionPincodes: ["110001", "700001", "425401"],
    type: "crop",
  },
  {
    id: "21",
    name: "Flour",
    price: 32,
    quantity: "1 kg",
    availability: "Available now",
    image: "https://whitecaps.in/wp-content/uploads/2025/05/Different-Types-of-Flour-for-Baking.webp",
    regionPincodes: ["560001", "560005", "425401"],
    type: "grocery",
  },
  {
    id: "22",
    name: "Cooking Oil",
    price: 135,
    quantity: "1 litre",
    availability: "Available now",
    image: "https://rukminim2.flixcart.com/image/850/1000/l2hwwi80/edible-oil/k/y/s/1-canola-1-litre-cooking-oil-plastic-bottle-1-canola-oil-jivo-original-imagdtnnkccguhzz.jpeg?q=90&crop=false",
    regionPincodes: ["400001", "400008", "425401"],
    type: "grocery",
  },
  {
    id: "23",
    name: "Sugar",
    price: 44,
    quantity: "1 kg",
    availability: "Available now",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGQvGDxk7hwBteBGT3hg4JwBPraCTDiBVsfg&s",
    regionPincodes: ["110003", "110007", "425401"],
    type: "grocery",
  },
  {
    id: "24",
    name: "Salt",
    price: 18,
    quantity: "1 kg",
    availability: "Available now",
    image: "https://www.sirimart.in/wp-content/uploads/2021/03/Pink-Himalayan-Salt.jpg",
    regionPincodes: ["700001", "700004", "425401"],
    type: "grocery",
  },
  {
    id: "25",
    name: "Milk",
    price: 56,
    quantity: "1 litre",
    availability: "Available now",
    image: "https://5.imimg.com/data5/SB/ET/MY-12973441/pure-dairy-milk.jpg",
    regionPincodes: ["110001", "110009", "425401"],
    type: "dairy",
  },
  {
    id: "26",
    name: "Cheese",
    price: 190,
    quantity: "500 gm",
    availability: "Available now",
    image: "https://static.toiimg.com/thumb/msid-115029115,width-400,resizemode-4/115029115.jpg",
    regionPincodes: ["560002", "560006", "425401"],
    type: "dairy",
  },
  {
    id: "27",
    name: "Butter",
    price: 170,
    quantity: "500 gm",
    availability: "Limited stock",
    image: "https://www.fitterfly.com/blog/wp-content/uploads/2024/09/Is-Butter-Good-for-Weight-Loss.webp",
    regionPincodes: ["400001", "400009", "425401"],
    type: "dairy",
  },
  {
    id: "28",
    name: "Curd",
    price: 38,
    quantity: "500 ml",
    availability: "Available now",
    image: "https://images.jdmagicbox.com/quickquotes/images_main/-24qv1bul.jpg",
    regionPincodes: ["700002", "700005", "425401"],
    type: "dairy",
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
  },
  {
    id: "33",
    name: "Honey",
    price: 240,
    quantity: "500 ml",
    availability: "Available now",
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2024/03/Honey440-bb52330.jpg?quality=90&resize=440,400",
    regionPincodes: ["110002", "110008", "425401"],
    type: "grocery",
  },
  {
    id: "34",
    name: "Tea Leaves",
    price: 280,
    quantity: "250 gm",
    availability: "Available now",
    image: "https://rukminim2.flixcart.com/image/850/1000/khuvxjk0-0/tea/u/7/j/200-100-natural-organic-herbal-green-tea-leaf-for-weight-loss-original-imafxsahfkdyqs9y.jpeg?q=20&crop=false",
    regionPincodes: ["560010", "560011", "425401"],
    type: "grocery",
  },
  {
    id: "35",
    name: "Coffee Beans",
    price: 370,
    quantity: "250 gm",
    availability: "Limited stock",
    image: "https://assets.bonappetit.com/photos/57c5d0e36a6acdf3485dfb2b/16:9/w_1280,c_limit/3717295073_f5ae257d71_o.jpg?mbid=social_retweet",
    regionPincodes: ["700010", "700011", "425401"],
    type: "grocery",
  },
  {
    id: "36",
    name: "Paneer",
    price: 200,
    quantity: "500 gm",
    availability: "Available now",
    image: "https://www.between2kitchens.com/wp-content/uploads/2021/09/Paneer-cubes-on-cutting-board-edited-19-of-1-1.jpg",
    regionPincodes: ["110004", "110010", "425401"],
    type: "dairy",
  },
  {
    id: "37",
    name: "Ghee",
    price: 320,
    quantity: "1 litre",
    availability: "Available now",
    image: "https://m.media-amazon.com/images/I/51cAnoCvWkL._AC_UF1000,1000_QL80_.jpg",
    regionPincodes: ["560009", "560012", "425401"],
    type: "dairy",
  },
  {
    id: "38",
    name: "Eggs",
    price: 6,
    quantity: "1 piece",
    availability: "Available now",
    image: "https://kidseatincolor.com/wp-content/uploads/2022/02/eggs-e1648216369366.jpeg",
    regionPincodes: ["400010", "400011", "425401"],
    type: "dairy",
  },
];

const sellerAddresses = [
  {
    street: "123 Green Lane",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    postalCode: "110001",
  },
  {
    street: "56 Agro Road",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    postalCode: "560001",
  },
  {
    street: "89 Harvest Street",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    postalCode: "400001",
  },
  {
    street: "21 Farm View",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    postalCode: "700001",
  },
];

const getCoordinates = async (address) => {
  const formatted = `${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.postalCode}`;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formatted)}&key=${apiKey}`;

  try {
    const res = await axios.get(url);
    const location = res.data.results[0]?.geometry?.location;
    return location || { lat: null, lng: null };
  } catch (err) {
    console.error("❌ Failed geocoding:", formatted, err.message);
    return { lat: null, lng: null };
  }
};

const seedCrops = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Crop.deleteMany();

    
    const resolvedAddresses = await Promise.all(
      sellerAddresses.map(async (addr) => ({
        ...addr,
        coordinates: await getCoordinates(addr),
      }))
    );

    
    const cropsWithSeller = crops.map((crop, index) => ({
      ...crop,
      sellerAddress: resolvedAddresses[index % resolvedAddresses.length],
    }));

    await Crop.insertMany(cropsWithSeller);
    console.log('✅ All crops seeded with seller addresses and coordinates');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedCrops();