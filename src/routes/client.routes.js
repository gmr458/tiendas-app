const { Router } = require("express");
const pool = require("../database/connection");
const { isLoggedIn, hideLoginAndRegister } = require("../lib/auth");

const router = Router();

router.get("/show-stores", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "client") {
        const stores = await pool.query("SELECT * FROM user WHERE role = 'store'");
        res.render("pages/client/show-stores", { stores });
    } else {
        res.redirect("/profile");
    }
});

router.get("/show-products-store/:id", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "client") {
        const products = await pool.query("SELECT * FROM product WHERE id_store = ?", [req.params.id]);
        res.render("pages/client/show-products-store", { products });
    } else {
        res.redirect("/profile");
    }
});

module.exports = router;
