const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    items: [
        {
            productId: String,
            name: String,
            quantity: Number,
            price: Number
        }
    ],

    total: Number,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Order", orderSchema);