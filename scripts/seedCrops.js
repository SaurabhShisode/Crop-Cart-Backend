import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Crop from '../models/Crops.js';

dotenv.config();
const farmerId = '683d2ff4d480b93443133d42';

const crops = [
  {
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
    id: "20",
    name: "Lentils",
    price: 78,
    quantity: "1 kg",
    availability: "Available now",
    image: "https://arrowheadmills.com/wp-content/uploads/2022/10/red-lentils-1-1024x684.jpg",
    regionPincodes: ["110001", "700001", "425401"],
    type: "crop",
    farmer: farmerId,

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
    farmer: farmerId,

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
    farmer: farmerId,

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
    farmer: farmerId,

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
    farmer: farmerId,

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
    farmer: farmerId,

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
    farmer: farmerId,

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
    farmer: farmerId,

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
    name: "Jowar",
    price: 32,
    quantity: "1 kg",
    availability: "Available now",
    image: "https://m.media-amazon.com/images/I/61eKPTRJisL._AC_UF1000,1000_QL80_.jpg",
    regionPincodes: ["400003", "400006", "425401"],
    type: "crop",
    farmer: farmerId,

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
    farmer: farmerId,

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
    farmer: farmerId,

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
    farmer: farmerId,

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
    farmer: farmerId,

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
    farmer: farmerId,

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
    farmer: farmerId,

  },
   {
    id: "39",
    name: "Red Chili Powder",
    price: 85,
    quantity: "250 gm",
    availability: "Available now",
    image: "https://spicerackindia.com/wp-content/uploads/2020/11/Byadagi-Chilli-Powder-FloraFoods.jpg",
    regionPincodes: ["110011", "560013", "425401"],
    type: "spice",
    farmer: farmerId,
  },
  {
    id: "40",
    name: "Mustard Seeds",
    price: 60,
    quantity: "250 gm",
    availability: "Available now",
    image: "https://d3kgrlupo77sg7.cloudfront.net/media/chococoorgspice.com/images/products/coorg-mustard-seeds-premium-quality-indian-spice.20230810042906.webp",
    regionPincodes: ["400012", "700008", "425401"],
    type: "spice",
    farmer: farmerId,
  },
  {
    id: "41",
    name: "Fenugreek (Methi)",
    price: 40,
    quantity: "250 gm",
    availability: "Available now",
    image: "https://www.greendna.in/cdn/shop/products/methi_d450fc8b-5fec-4fe0-b2de-3bd7f9dd5c25.jpg?v=1602575318",
    regionPincodes: ["560014", "110012", "425401"],
    type: "spice",
    farmer: farmerId,
  },
  {
    id: "42",
    name: "Cumin Seeds",
    price: 75,
    quantity: "250 gm",
    availability: "Available now",
    image: "https://brownliving.in/cdn/shop/files/sustainable-cumin-seeds-200g-pure-organic-jeera-by-satopradhan-at-brownliving-368924.jpg?v=1748665412",
    regionPincodes: ["400013", "700009", "425401"],
    type: "spice",
    farmer: farmerId,
  },
  {
    id: "43",
    name: "Coconut",
    price: 35,
    quantity: "1 piece",
    availability: "Available now",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ozLco-CYpgCVgQTz5n0R7aV6bhvwObJwrQ&s",
    regionPincodes: ["560015", "110013", "425401"],
    type: "crop",
    farmer: farmerId,
  },
  {
    id: "44",
    name: "Curry Leaves",
    price: 15,
    quantity: "1 bunch",
    availability: "Available now",
    image: "https://www.jiomart.com/images/product/original/590000117/curry-leaves-1-bunch-approx-20-g-100-g-product-images-o590000117-p590000117-0-202409171907.jpg?im=Resize=(1000,1000)",
    regionPincodes: ["400014", "560016", "425401"],
    type: "herb",
    farmer: farmerId,
  },
  {
    id: "45",
    name: "Tamarind",
    price: 90,
    quantity: "500 gm",
    availability: "Available now",
    image: "https://www.allrecipes.com/thmb/0b6D_ZfdVD07bPrM3_0LQmml74Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1147545054-2000-cf62d6b8188846518193157fba8449be.jpg",
    regionPincodes: ["700012", "110014", "425401"],
    type: "crop",
    farmer: farmerId,
  },
  {
    id: "46",
    name: "Spinach",
    price: 20,
    quantity: "1 bunch",
    availability: "Available now",
    image: "https://seed2plant.in/cdn/shop/products/spinachseeds.jpg?v=1603966262&width=1500",
    regionPincodes: ["560017", "400015", "425401"],
    type: "vegetable",
    farmer: farmerId,
  },
  {
    id: "47",
    name: "Bottle Gourd (Lauki)",
    price: 25,
    quantity: "1 piece (~500 gm)",
    availability: "Available now",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnreMrckbN-eY1dAiCtk1g3iSyy8wCr6nFzQ&s",
    regionPincodes: ["110015", "700013", "425401"],
    type: "vegetable",
    farmer: farmerId,
  },
  {
    id: "48",
    name: "Okra (Bhindi)",
    price: 40,
    quantity: "500 gm",
    availability: "Available now",
    image: "https://www.sailusfood.com/wp-content/uploads/2015/07/bhindi.jpg",
    regionPincodes: ["560018", "400016", "425401"],
    type: "vegetable",
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
