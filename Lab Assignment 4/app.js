const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

// Routes
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const app = express();
const PORT = 3000;

// ========================
// DATABASE CONNECTION
// ========================
mongoose.connect("mongodb://127.0.0.1:27017/metro_clone")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// ========================
// VIEW ENGINE SETUP
// ========================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ========================
// MIDDLEWARE
// ========================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static folder
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use(
    "/api/v1/auth",
    require("./routes/api/v1/authApi")
);

app.use(
    "/api/v1/products",
    require("./routes/api/v1/productsApi")
);

app.use(
    "/api/v1/orders",
    require("./routes/api/v1/ordersApi")
);

app.use(
    "/api/v1/user",
    require("./routes/api/v1/userApi")
);

// ========================
// SESSION (MUST BE BEFORE FLASH)
// ========================
app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/metro_clone"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// ========================
// FLASH (AFTER SESSION)
// ========================
app.use(flash());

// ========================
// GLOBAL VARIABLES (FOR EJS)
// ========================
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.currentUser = req.session.user || null;
    next();
});

// ========================
// LAYOUTS
// ========================
app.use(expressLayouts);
app.set("layout", false);

// ========================
// ROUTES
// ========================
app.use("/", authRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);

// ========================
// HOME ROUTE
// ========================
app.get("/", (req, res) => {
    res.render("index");
});

// ========================
// START SERVER
// ========================
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});