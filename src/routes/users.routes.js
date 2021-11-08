const { Router } = require("express");
const bcrypt = require("bcrypt");
const pool = require("../database/connection");
const passport = require("passport");
const { isLoggedIn, hideLoginAndRegister } = require("../lib/auth");

const router = Router();

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

router.get("/register-user-form", (req, res) => {
    res.render("pages/users/register-user");
});

router.post("/register-user", hideLoginAndRegister, async (req, res) => {
    const { name, email, password, neighborhood, street, avenue, number } = req.body;
    const existsEmail = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
    if (existsEmail.length > 0) {
        return res.render("pages/users/register-user", {
            name,
            email: "",
            password,
            message_email: "Ya existe una cuenta con ese email",
        });
    }
    if (password.length < 8) {
        return res.render("pages/users/register-user", {
            name,
            email,
            password: "",
            message_password: "La contraseña debe tener al menos 8 caracteres",
        });
    }
    const newUser = {
        name,
        email,
        password,
        neighborhood,
        street,
        avenue,
        number,
    };
    newUser.password = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO user SET ?", [newUser]);
    req.flash("success", "Cuenta creada, puedes iniciar sesión");
    res.redirect("/login-form");
});

router.get("/profile", isLoggedIn, (req, res) => {
    res.render("pages/users/profile");
});

router.get("/logout", isLoggedIn, (req, res) => {
    req.logout();
    res.redirect("/login-form");
});

router.get("/register-store-form", (req, res) => {
    res.render("pages/users/register-store");
});

router.post("/register-store", (req, res) => {
    res.render("pages/users/register-store");
});

module.exports = router;
