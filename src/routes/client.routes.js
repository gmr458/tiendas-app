const { Router } = require("express");
const pool = require("../database/connection");
const { isLoggedIn, hideLoginAndRegister } = require("../lib/auth");

const router = Router();

router.get("/show-stores", isLoggedIn, (req, res) => {
    const { role } = req.user;
    if (role === "client") {
        res.render("pages/client/show-stores");
    } else {
        res.redirect("/profile");
    }
});

module.exports = router;
