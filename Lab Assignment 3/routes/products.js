const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {

    // 1. Pagination setup
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    // 2. Filters from URL
    const search = req.query.search || "";
    const category = req.query.category || "";
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || 9999999;

    // 3. Build Mongo filter object
    let filter = {
        price: { $gte: minPrice, $lte: maxPrice }
    };

    if (search) {
        filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
        filter.category = category;
    }

    // 4. Count total products (for pagination)
    const totalProducts = await Product.countDocuments(filter);

    // 5. Fetch products
    const products = await Product.find(filter)
        .skip(skip)
        .limit(limit);

    const totalPages = Math.ceil(totalProducts / limit);

    // 6. Send to EJS
    res.render("products", {
        products,
        currentPage: page,
        totalPages,
        search,
        category,
        minPrice,
        maxPrice
    });

});

module.exports = router;