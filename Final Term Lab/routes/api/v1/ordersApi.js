const express = require("express");
const router = express.Router();

const Order = require("../../../models/order");

const verifyToken = require("../../../middleware/jwtAuthMiddleware");

router.get("/", verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.user_id });

        res.json({
            success: true,
            orders
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.post(
    "/",
    verifyToken,
    async (req, res) => {

        try {

            const order = new Order({

                user: req.user.user_id,

                items: req.body.items,

                total: req.body.total

            });

            await order.save();

            res.json({
                success: true,
                message: "Order placed successfully",
                order
            });

        } catch (err) {

            res.status(500).json({
                message: err.message
            });

        }

    }
);

module.exports = router;