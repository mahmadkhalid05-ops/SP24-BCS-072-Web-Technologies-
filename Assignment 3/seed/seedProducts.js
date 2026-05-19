const mongoose = require("mongoose");
const Product = require("../models/Product");

mongoose.connect("mongodb://127.0.0.1:27017/metro_clone");


const products = [];

const categories = ["Electronics", "Fashion", "Grocery", "Home"];

for (let i = 1; i <= 24; i++) {
    products.push({
        name: `Product ${i}`,
        price: 1000 + i * 500,
        category: categories[i % categories.length],
        rating: (Math.random() * 5).toFixed(1),
        stock: 10 + i,
        image: "defaultImg/images.png"
    });
}

async function seedDB() {
    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log("Database Seeded Successfully");
    mongoose.connection.close();
}

seedDB();