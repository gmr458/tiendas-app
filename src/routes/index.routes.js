const { Router } = require("express");
const passport = require("passport");
const { hideLoginAndRegister } = require("../lib/auth");

const router = Router();

router.get("/", (req, res) => {
    res.render("pages/index");
});

router.get("/login-form", hideLoginAndRegister, (req, res) => {
    res.render("pages/users/login");
});

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/profile",
        failureRedirect: "/login-form",
        failureFlash: true,
    })
);

module.exports = router;
