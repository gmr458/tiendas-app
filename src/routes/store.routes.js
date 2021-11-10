const { Router } = require("express");
const pool = require("../database/connection");
const { isLoggedIn, hideLoginAndRegister } = require("../lib/auth");

const router = Router();

router.get("/create-product-form", isLoggedIn, (req, res) => {
    const { role } = req.user;
    if (role === "store") {
        res.render("pages/store/create-product");
    } else {
        res.redirect("/profile");
    }
});

router.post("/create-product", isLoggedIn, async (req, res) => {
    const { name, description, price, stock } = req.body;
    const id_store = req.user.id;
    const existsName = await pool.query("SELECT * FROM product WHERE id_store = ? AND name = ?", [id_store, name]);
    if (existsName.length > 0) {
        return res.render("pages/store/create-product", {
            name: "",
            description,
            price,
            stock,
            message_name: "Ya existe un producto con ese nombre",
        });
    }
    const existsDescription = await pool.query("SELECT * FROM product WHERE id_store = ? AND description = ?", [id_store, description]);
    if (existsDescription.length > 0) {
        return res.render("pages/store/create-product", {
            name,
            description: "",
            price,
            stock,
            message_description: "Ya existe un producto con esa descripción",
        });
    }
    if (parseFloat(price) <= 0) {
        return res.render("pages/store/create-product", {
            name,
            description,
            price: "",
            stock,
            message_price: "El precio debe ser mayor que 0",
        });
    }
    if (parseInt(stock) < 0) {
        return res.render("pages/store/create-product", {
            name,
            description,
            price,
            stock: "",
            message_stock: "La cantidad de productos no puede ser un número negativo",
        });
    }
    const newProduct = {
        id_store,
        name,
        description,
        price,
        stock,
    };
    await pool.query("INSERT INTO product SET ?", [newProduct]);
    req.flash("success", "Producto creado");
    res.redirect("/create-product-form");
});

router.get("/show-products", isLoggedIn, (req, res) => {
    const { role } = req.user;
    if (role === "store") {
        res.render("pages/store/show-products");
    } else {
        res.redirect("/profile");
    }
});

router.get("/show-orders", isLoggedIn, (req, res) => {
    const { role } = req.user;
    if (role === "store") {
        res.render("pages/store/show-orders");
    } else {
        res.redirect("/profile");
    }
});

module.exports = router;
