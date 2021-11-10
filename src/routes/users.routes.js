const { Router } = require("express");
const bcrypt = require("bcrypt");
const pool = require("../database/connection");
const passport = require("passport");
const { isLoggedIn, hideLoginAndRegister } = require("../lib/auth");

const router = Router();

router.get("/register-user-form", (req, res) => {
    res.render("pages/users/register-user");
});

router.post("/register-user", hideLoginAndRegister, async (req, res) => {
    const {
        name,
        email,
        password,
        neighborhood,
        street,
        avenue,
        number,
        role,
    } = req.body;
    const existsEmail = await pool.query(
        "SELECT * FROM user WHERE email = ?",
        [email]
    );
    if (existsEmail.length > 0) {
        return res.render("pages/users/register-user", {
            name,
            email: "",
            password,
            neighborhood,
            street,
            avenue,
            number,
            role,
            message_email: "Ya existe un usuario con ese email",
        });
    }
    if (password.length < 8) {
        return res.render("pages/users/register-user", {
            name,
            email,
            password: "",
            neighborhood,
            street,
            avenue,
            number,
            role,
            message_password: "La contraseña debe tener al menos 8 caracteres",
        });
    }
    const existsAddress = await pool.query(
        "SELECT * FROM user WHERE neighborhood = ? AND street = ? AND avenue = ? AND number = ?",
        [neighborhood, street, avenue, number]
    );
    if (existsAddress.length > 0) {
        return res.render("pages/users/register-user", {
            name,
            email,
            password,
            neighborhood: "",
            street: "",
            avenue: "",
            number: "",
            role,
            message_address: "Ya existe un usuario con esa dirección",
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
        role,
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

module.exports = router;
