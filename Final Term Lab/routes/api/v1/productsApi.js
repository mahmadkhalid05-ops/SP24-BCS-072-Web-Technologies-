const express = require("express");
const router = express.Router();

const Product = require("../../../models/Product");


// GET ALL PRODUCTS
router.get("/", async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = 8;

        const skip = (page - 1) * limit;

        const products = await Product.find()
            .skip(skip)
            .limit(limit);

        const totalProducts = await Product.countDocuments();

        res.json({
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            products
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;