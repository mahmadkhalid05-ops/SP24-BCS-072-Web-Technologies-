// CHECK LOGIN
const isLoggedIn = (req, res, next) => {

    if(!req.session.user) {

        req.flash("error_msg", "Please login first");

        return res.redirect("/login");
    }

    next();
};



// CHECK ADMIN
const isAdmin = (req, res, next) => {
            console.log("SESSION USER:", req.session.user);

    if(!req.session.user || req.session.user.role !== "admin") {

        req.flash("error_msg", "Access Denied");

        return res.redirect("/");
    }

    next();
};


module.exports = {
    isLoggedIn,
    isAdmin
};