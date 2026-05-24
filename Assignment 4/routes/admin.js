const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const multer = require("multer");
const path = require("path");

// ==========================
// MULTER CONFIGURATION
// ==========================
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

// ==========================
// DASHBOARD
// ==========================
router.get("/", async (req, res) => {

    const products = await Product.find();

    res.render("admin/dashboard", {
        products,
        layout: "Layouts/admin-layout"
    });
});

// ==========================
// ADD PRODUCT FORM
// ==========================
router.get("/add", (req, res) => {

    res.render("admin/add-product", {
        layout: "Layouts/admin-layout"
    });
});

// ==========================
// CREATE PRODUCT
// ==========================
router.post("/add", upload.single("image"), async (req, res) => {

    const { name, price, stock, category, description } = req.body;

    // SIMPLE VALIDATION
    if (!name || !price || !stock || !category || !description) {
        return res.send("All fields are required");
    }

    await Product.create({
        name,
        price,
        stock,
        category,
        description,
        image: req.file ? req.file.filename : ""
    });

    res.redirect("/admin");
});

// ==========================
// EDIT PRODUCT FORM
// ==========================
router.get("/edit/:id", async (req, res) => {

    const product = await Product.findById(req.params.id);

    res.render("admin/edit-product", {
        product,
        layout: "Layouts/admin-layout"
    });
});

// ==========================
// UPDATE PRODUCT
// ==========================
router.post("/edit/:id", upload.single("image"), async (req, res) => {

    const updateData = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category,
        description: req.body.description
    };

    // UPDATE IMAGE ONLY IF NEW IMAGE IS UPLOADED
    if (req.file) {
        updateData.image = req.file.filename;
    }

    await Product.findByIdAndUpdate(
        req.params.id,
        updateData
    );

    res.redirect("/admin");
});

// ==========================
// DELETE PRODUCT
// ==========================
router.get("/delete/:id", async (req, res) => {

    await Product.findByIdAndDelete(req.params.id);

    res.redirect("/admin");
});

module.exports = router;