const express = require('express');
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin");

const path = require('path');

const app = express();
const PORT = 3000;
mongoose.connect("mongodb://127.0.0.1:27017/metro_clone");

// Set view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));



// Static folder
app.use(express.static(path.join(__dirname, 'public')));
const productRoutes = require("./routes/products");
app.use("/products", productRoutes);
app.use("/uploads", express.static("public/uploads"));
//app.use(express.static(path.join(__dirname, 'public/Body/item/Section1')));


app.use("/admin", adminRoutes);

// Route
app.get('/', (req, res) => {
    res.render('index');
});






app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
