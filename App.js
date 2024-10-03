const express = require("express")
const cors = require("cors");
const app = express()
require('dotenv').config();

app.use(cors({
  origin:'https://shopy-doby.vercel.app/',
  methods: ['GET', 'POST'],
  credentials: true,
}
));

const userRoutes = require('./routes/UserRoute'); // Define routes


const mongoose = require("mongoose")

app.use(express.json());
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGO_URL, {
  serverSelectionTimeoutMS: 1000000000, // 100 seconds
  socketTimeoutMS: 45000, // Optional: Adjust as needed
});

console.log(`mongo Db connected`)





const products = [
  { id: 1, name: 'Wireless Earbuds', price: 99.99, rating: 4.5, images:'https://img.freepik.com/premium-vector/3d-rendering_938045-4733.jpg?w=740' },
  { id: 2, name: 'Smart Watch', price: 199.99, rating: 4.2, images:'https://img.freepik.com/premium-vector/watch-with-time-11-05-it_1163677-3527.jpg?w=740' },
  { id: 3, name: 'Bluetooth Speaker', price: 79.99, rating: 4.7, images: 'https://img.freepik.com/free-vector/portable-speaker-with-digital-radio-clock-illustration_1441-2614.jpg?t=st=1726046057~exp=1726049657~hmac=0166677271a62a00dab33676bde6e2b2c4170f361162e6276c8e2a38dfba6aae&w=740' },
  { id: 4, name: 'Laptop', price: 999.99, rating: 4.8, images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6O8pSCtuSVERyFDelPxbTCjZUJq80WNAM_w&s' },
  { id: 5, name: 'Smartphone', price: 699.99, rating: 4.6, images: 'https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/i/p/iphone_15_yellow_pdp_image_position-1__wwen-removebg-preview.png'},
  { id: 6, name: 'Tablet', price: 349.99, rating: 4.4, images: 'https://inventstore.in/wp-content/uploads/2023/05/iPad-10th-gen-blue-1-300x300.webp'},
  {id: 7, name: 'Bluetooth Speaker', price: 79.99, rating: 4.7, images: 'https://img.freepik.com/free-vector/portable-speaker-with-digital-radio-clock-illustration_1441-2614.jpg?t=st=1726046057~exp=1726049657~hmac=0166677271a62a00dab33676bde6e2b2c4170f361162e6276c8e2a38dfba6aae&w=740' },
  {id: 8, name: 'Laptop', price: 999.99, rating: 4.8, images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6O8pSCtuSVERyFDelPxbTCjZUJq80WNAM_w&s'}
];

const clothing = [
  { id: 1, name: 'Classic White T-Shirt', price: 29.99, rating: 4.5, image: 'https://blackberrys.com/cdn/shop/files/formal-shirt-in-white-spectrum-blackberrys-clothing-8_4563957d-1db2-4a9f-8d92-e7e266bb399d.jpg?v=1710220938&width=2000' },
  { id: 2, name: 'Slim Fit Jeans', price: 59.99, rating: 4.2, image: 'https://images.bestsellerclothing.in/data/JJ/13-feb-2024/219827801_g0.jpg?width=1080&height=1355&mode=fill&fill=blur&format=auto'},
  { id: 3, name: 'Floral Summer Dress', price: 49.99, rating: 4.7, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSPMfnr-DnPjl-3FBlBL-MBm6WLeyq_gWMOw&s' },
  { id: 4, name: 'Leather Jacket', price: 129.99, rating: 4.8, image: 'https://m.media-amazon.com/images/I/71mpvCWIZ0L._AC_UY1000_.jpg' },
  { id: 5, name: 'Cozy Knit Sweater', price: 69.99, rating: 4.6, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCl6N2Vs32MJEOTlHKwCWcdSK3QxHPHqidWO0-epQT5tjT_xgkldlYUHHpS8e8svb8Nwc&usqp=CAU' },
  { id: 6, name: 'Athletic Sneakers', price: 89.99, rating: 4.4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ749zHg9RrKCk6H_RMpecmRlgEFMQxNlNRw&s' },
]

const newArrivals = [
  { id: 1, name: 'Wireless Earbuds Pro', price: 129.99, rating: 4.8, image: 'https://img.freepik.com/premium-vector/3d-rendering_938045-4733.jpg?w=740', category: 'Electronics' },
  { id: 2, name: 'Smart Fitness Tracker', price: 89.99, rating: 4.6, image: 'https://img.freepik.com/premium-vector/watch-with-time-11-05-it_1163677-3527.jpg?w=740', category: 'Wearables' },
  { id: 3, name: 'Ultra-Slim Laptop', price: 999.99, rating: 4.9, image: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1714124701/Croma%20Assets/Computers%20Peripherals/Laptop/Images/304451_0_bivydp.png?tr=w-400', category: 'Computers' },
  { id: 4, name: 'Noise-Cancelling Headphones', price: 199.99, rating: 4.7, image: 'https://sony.scene7.com/is/image/sonyglobalsolutions/wh-ch720_Primary_image?$categorypdpnav$&fmt=png-alpha', category: 'Audio' },
  { id: 5, name: '4K Smart TV', price: 699.99, rating: 4.5, image: 'https://vasanthandco.in/UploadedFiles/productimages/20231110035512-Untitled-1.png', category: 'Home Entertainment' },
  { id: 6, name: 'Portable Bluetooth Speaker', price: 79.99, rating: 4.4, image: 'https://img.freepik.com/free-vector/portable-speaker-with-digital-radio-clock-illustration_1441-2614.jpg?t=st=1726046057~exp=1726049657~hmac=0166677271a62a00dab33676bde6e2b2c4170f361162e6276c8e2a38dfba6aae&w=740', category: 'Audio' },
  { id: 7, name: 'Gaming Console', price: 499.99, rating: 4.8, image: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697016680/Croma%20Assets/Gaming/Gaming%20Consoles/Images/267452_0_eeziko.png', category: 'Gaming' },
  { id: 8, name: 'Smartphone', price: 799.99, rating: 4.7, image: 'https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/i/p/iphone_15_yellow_pdp_image_position-1__wwen-removebg-preview.png', category: 'Mobile' },
];

const saleItems = [
  { id: 1, name: 'Wireless Earbuds', originalPrice: 129.99, salePrice: 79.99, discount: 38, rating: 4.5, image: 'https://img.freepik.com/premium-vector/3d-rendering_938045-4733.jpg?w=740' },
  { id: 2, name: 'Smart Watch', originalPrice: 199.99, salePrice: 149.99, discount: 25, rating: 4.2, image: 'https://img.freepik.com/premium-vector/watch-with-time-11-05-it_1163677-3527.jpg?w=740' },
  { id: 3, name: '4K Ultra HD TV', originalPrice: 799.99, salePrice: 599.99, discount: 25, rating: 4.8, image: 'https://vasanthandco.in/UploadedFiles/productimages/20231110035512-Untitled-1.png' },
  { id: 4, name: 'Bluetooth Speaker', originalPrice: 89.99, salePrice: 59.99, discount: 33, rating: 4.3, image: 'https://img.freepik.com/free-vector/portable-speaker-with-digital-radio-clock-illustration_1441-2614.jpg?t=st=1726046057~exp=1726049657~hmac=0166677271a62a00dab33676bde6e2b2c4170f361162e6276c8e2a38dfba6aae&w=740' },
  { id: 5, name: 'Gaming Laptop', originalPrice: 1299.99, salePrice: 999.99, discount: 23, rating: 4.7, image: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1714124701/Croma%20Assets/Computers%20Peripherals/Laptop/Images/304451_0_bivydp.png?tr=w-400' },
  { id: 6, name: 'Noise-Cancelling Headphones', originalPrice: 249.99, salePrice: 179.99, discount: 28, rating: 4.6, image: 'https://sony.scene7.com/is/image/sonyglobalsolutions/wh-ch720_Primary_image?$categorypdpnav$&fmt=png-alpha' },
  { id: 7, name: 'Smartphone', originalPrice: 699.99, salePrice: 549.99, discount: 21, rating: 4.4, image: 'https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/i/p/iphone_15_yellow_pdp_image_position-1__wwen-removebg-preview.png' },
  { id: 8, name: 'Fitness Tracker', originalPrice: 79.99, salePrice: 49.99, discount: 37, rating: 4.1, image: 'https://img.freepik.com/premium-vector/watch-with-time-11-05-it_1163677-3527.jpg?w=740' },
];

const homeAndGardenItems = [
  { id: 1, name: 'Cozy Throw Blanket', price: 39.99, rating: 4.5, image: 'https://i5.walmartimages.com/asr/214e45bd-c6bd-406f-8f5e-acc082da5121.822cac37fcce586c285b40d22c0c5915.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF', category: 'Home Decor' },
  { id: 2, name: 'Indoor Plant Set', price: 49.99, rating: 4.2, image: 'https://www.jiomart.com/images/product/original/rvrvb8uk7k/floweraura-decorative-set-of-3-single-layer-bamboo-sansevieria-snake-haworthia-plant-live-indoor-plants-in-metal-vase-pot-for-living-room-balcony-bedroom-office-home-decoration-and-gifts-for-friends-colleagues-relatives-neighbours-product-images-orvrvb8uk7k-p600508424-0-202304132116.jpg?im=Resize=(420,420)', category: 'Garden' },
  { id: 3, name: 'Modern Table Lamp', price: 79.99, rating: 4.7, image: 'https://www.super99.in/pub/media/catalog/product/cache/325a3f20c9b5454dc14637ff0161ceb5/s/r/sr00013932_cover_image.jpg', category: 'Lighting' },
  { id: 4, name: 'Ergonomic Office Chair', price: 199.99, rating: 4.8, image: 'https://www.nilkamalfurniture.com/cdn/shop/files/BOLDEOFC.jpg?v=1697607154', category: 'Furniture' },
  { id: 5, name: 'Stainless Steel Cookware Set', price: 149.99, rating: 4.6, image: 'https://m.media-amazon.com/images/I/71oZ1-QYomL._AC_UF894,1000_QL80_.jpg', category: 'Kitchen' },
  { id: 6, name: 'Smart Home Thermostat', price: 129.99, rating: 4.4, image: 'https://m.media-amazon.com/images/I/51v-r2wIvfS._AC_UF894,1000_QL80_.jpg', category: 'Smart Home' },
  { id: 7, name: 'Outdoor Patio Set', price: 399.99, rating: 4.3, image: 'https://m.media-amazon.com/images/I/811rgJ30fvL._AC_UF894,1000_QL80_.jpg', category: 'Garden' },
  { id: 8, name: 'Luxury Bedding Set', price: 89.99, rating: 4.9, image: 'https://5.imimg.com/data5/ECOM/Default/2023/2/SA/WZ/EN/9422220/flowers-jacquard-luxury-bedding-set-queen-king-size-bed-set-4pcs-cotton-silk-lace-ruffles-duvet-jpg-640x640-e47df059-57fa-4155-96bb-1ff600c52d5b-500x500.jpg', category: 'Bedroom' },
];

const sportsAndOutdoorItems = [
  { id: 1, name: 'Professional Basketball', price: 29.99, rating: 4.5, image:'https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png', category: 'Team Sports' },
  { id: 2, name: 'Hiking Backpack', price: 79.99, rating: 4.7, image: 'https://m.media-amazon.com/images/I/71iw8YbEOcL._AC_UF1000,1000_QL80_.jpg', category: 'Outdoor' },
  { id: 3, name: 'Tennis Racket Set', price: 89.99, rating: 4.3, image: 'https://m.media-amazon.com/images/I/61Q1XP7QKxL.jpg', category: 'Racket Sports' },
  { id: 4, name: 'Camping Tent (4-Person)', price: 149.99, rating: 4.6, image: 'https://contents.mediadecathlon.com/p2376667/24f4c8d539e9b883451d8e869965ff41/p2376667.jpg?format=auto&quality=70&f=2520x0', category: 'Camping' },
  { id: 5, name: 'Fitness Tracker Watch', price: 99.99, rating: 4.4, image: 'https://img.freepik.com/premium-vector/watch-with-time-11-05-it_1163677-3527.jpg?w=740', category: 'Fitness' },
  { id: 6, name: 'Mountain Bike', price: 499.99, rating: 4.8, image: 'https://www.vpace.de/media/image/10/34/ec/max20-vpace-perspektive_1600x1600.jpg', category: 'Cycling' },
  { id: 7, name: 'Yoga Mat', price: 24.99, rating: 4.2, image: ' https://m.media-amazon.com/images/I/71b5fW+s18L._AC_UF1000,1000_QL80_.jpg', category: 'Fitness' },
  { id: 8, name: 'Fishing Rod and Reel Combo', price: 69.99, rating: 4.1, image: ' https://m.media-amazon.com/images/I/61h1gvUi+bL._AC_UF894,1000_QL80_.jpg', category: 'Outdoor' },
];


app.use('/users', userRoutes);

app.get("/api/products" ,(req,res)=>{
    res.json(products)
})
app.get("/api/clothing",(req,res)=>{
  res.json(clothing)
})
app.get("/api/new",(req,res)=>{
  res.json(newArrivals)
})
app.get("/api/sale",(req,res)=>{
  res.json(saleItems)
})
app.get("/api/home",(req,res)=>{
  res.json(homeAndGardenItems)
})
app.get("/api/sports" ,(req,res)=>{
  res.json(sportsAndOutdoorItems)
})




app.listen(process.env.PORT||5000, ()=>{console.log("Server started on port 5000");
})