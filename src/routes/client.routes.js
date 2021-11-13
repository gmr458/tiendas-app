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
        req.flash("success", "Producto añadido");
        res.redirect("/show-products-store/" + idStore);
    } else {
        res.redirect("/profile");
    }
});

router.get("/my-sale", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "client") {
        const mySale = await pool.query("SELECT * FROM sale WHERE id_client = ? AND state = ?", [req.user.id, 0]);
        const productsMySale = await pool.query("SELECT * FROM sale_product WHERE id_sale = ?", [mySale[0].id]);
        let products = [];
        for (let i = 0; i < productsMySale.length; i++) {
            const productFromDb = await pool.query("SELECT * FROM product WHERE id = ?", [
                productsMySale[i].id_product,
            ]);
            const product = {
                id: productFromDb[0].id,
                id_store: productFromDb[0].id_store,
                name: productFromDb[0].name,
                description: productFromDb[0].description,
                unitPrice: productFromDb[0].price,
                stock: productFromDb[0].stock,
                quantity: productsMySale[i].quantity,
                totalPrice: productsMySale[i].price,
            };
            products.push(product);
        }
        console.log(mySale);
        console.log(productsMySale);
        console.log(products);
        res.render("pages/client/my-sale", { mySale: mySale[0], products });
    } else {
        res.redirect("/profile");
    }
});

module.exports = router;
