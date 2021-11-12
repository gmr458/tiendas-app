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

router.post("/create-sale/:idStore/:idProduct", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "client") {
        const { idStore, idProduct } = req.params;
        const { quantity } = req.body;
        const idClient = req.user.id;
        const dataSale = {
            id_client: idClient,
            id_store: idStore,
            state: 0,
        };
        const pedidoPendiente = await pool.query("SELECT state FROM sale WHERE state = ?", [0]);
        console.log(pedidoPendiente);
        let resultSaleOne;
        let resultSaleTwo;
        if (pedidoPendiente.length === 0) {
            resultSaleOne = await pool.query("INSERT INTO sale SET ?", [dataSale]);
        } else {
            resultSaleTwo = await pool.query("SELECT id FROM sale WHERE id_client = ? AND id_store = ? AND state = ?", [
                idClient,
                idStore,
                0,
            ]);
        }
        const unitPrice = await pool.query("SELECT price FROM product WHERE id = ? AND id_store = ?", [
            idProduct,
            idStore,
        ]);
        const price = unitPrice[0].price * quantity;
        let dataSaleProduct;
        if (resultSaleOne) {
            dataSaleProduct = {
                id_sale: resultSaleOne.insertId,
                id_product: idProduct,
                quantity,
                price,
            };
        } else {
            dataSaleProduct = {
                id_sale: resultSaleTwo[0].id,
                id_product: idProduct,
                quantity,
                price,
            };
        }
        const resultSaleProduct = await pool.query("INSERT INTO sale_product SET ?", [dataSaleProduct]);
        if (resultSaleOne) {
            await pool.query("UPDATE sale SET total_price = total_price + ? WHERE id = ?", [
                price,
                resultSaleOne.insertId,
            ]);
        } else {
            await pool.query("UPDATE sale SET total_price = total_price + ? WHERE id = ?", [
                price,
                resultSaleTwo[0].id,
            ]);
        }
        await pool.query("UPDATE product SET stock = stock - ? WHERE id = ? AND id_store = ?", [
            quantity,
            idProduct,
            idStore,
        ]);
        res.send("ok");
    } else {
        res.redirect("/profile");
    }
});

module.exports = router;
