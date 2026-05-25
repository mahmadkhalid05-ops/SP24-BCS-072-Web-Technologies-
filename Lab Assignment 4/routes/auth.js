const express = require("express");
const router = express.Router();

const User = require("../models/User");



// REGISTER PAGE
router.get("/register", (req, res) => {

    res.render("auth/register");
});



// LOGIN PAGE
router.get("/login", (req, res) => {

    res.render("auth/login");
});



// REGISTER USER
router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser) {

            req.flash("error_msg", "Email already exists");

            return res.redirect("/register");
        }

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        req.flash("success_msg", "Registration successful");

        res.redirect("/login");

    } catch(error) {

        console.log(error);

        res.send("Error");
    }
});



// LOGIN USER
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user) {

            req.flash("error_msg", "Invalid Email or Password");

            return res.redirect("/login");
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch) {

            req.flash("error_msg", "Invalid Email or Password");

            return res.redirect("/login");
        }



        req.session.user = {
            _id: user._id,
            name: user.name,
            role: user.role
        };

        req.flash("success_msg", `Welcome back ${user.name}`);

        res.redirect("/");

    } catch(error) {

        console.log(error);

        res.send("Error");
    }
});



// LOGOUT
router.get("/logout", (req, res) => {

    req.session.destroy(() => {

        req.flash("success_msg", "Logged out successfully");

        res.redirect("/login");
    });
});

module.exports = router;