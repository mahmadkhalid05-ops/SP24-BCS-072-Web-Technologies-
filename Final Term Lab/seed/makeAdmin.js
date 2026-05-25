const mongoose = require("mongoose");
const User = require("../models/User");

mongoose.connect("mongodb://127.0.0.1:27017/webproject");

async function makeAdmin() {

    await User.updateOne(
        { email: "mahmadkhalid04@gmail.com" },
        { $set: { role: "admin" } }
    );

    console.log("User updated to admin");

    mongoose.disconnect();
}

makeAdmin();