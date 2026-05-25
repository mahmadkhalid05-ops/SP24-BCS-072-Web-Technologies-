const express = require("express");
const router = express.Router();

const Order = require("../models/order");

// SALES PAGE
router.get("/sales", async (req, res) => {
    try {

        // TOTAL REVENUE
        const revenueResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" }
                }
            }
        ]);

        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].totalRevenue
                : 0;

        // TOTAL ORDERS
        const totalOrders = await Order.countDocuments();

        // TOP SELLING PRODUCT
        const topProduct = await Order.aggregate([
            { $unwind: "$products" },

            {
                $group: {
                    _id: "$products.product",
                    totalSold: {
                        $sum: "$products.quantity"
                    }
                }
            },

            {
                $sort: {
                    totalSold: -1
                }
            },

            {
                $limit: 1
            }
        ]);

        res.render("sales", {
            title: "Sales Dashboard",
            layout: "Layouts/admin-layout",
            totalRevenue,
            totalOrders,
            topProduct
        });

    } catch (err) {
        console.log(err);
        res.send("Error loading sales dashboard");
    }
});


// LIVE API ROUTE
router.get("/api/sales-data", async (req, res) => {

    try {

        const revenueResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalAmount"
                    }
                }
            }
        ]);

        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].totalRevenue
                : 0;

        const totalOrders = await Order.countDocuments();

        const topProduct = await Order.aggregate([
            { $unwind: "$products" },

            {
                $group: {
                    _id: "$products.product",
                    totalSold: {
                        $sum: "$products.quantity"
                    }
                }
            },

            {
                $sort: {
                    totalSold: -1
                }
            },

            {
                $limit: 1
            }
        ]);

        res.json({
            totalRevenue,
            totalOrders,
            topProduct
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = router;