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
        const pedidoPendiente = await pool.query("SELECT * FROM sale WHERE state = ? AND id_client = ?", [0, idClient]);
        console.log(`pedido pendiente: ${pedidoPendiente}`);
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

router.get("/all-products/:idStore", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "client") {
        const { idStore } = req.params;
        const products = await pool.query("SELECT * FROM product WHERE id_store = ?", [idStore]);
        res.status(200).json(products);
    } else {
        res.redirect("/profile");
    }
});

router.get("/render-form-sale/:idStore", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "client") {
        const { idStore } = req.params;
        const store = await pool.query("SELECT * FROM user WHERE id = ?", [idStore]);
        res.render("pages/client/make-sale", { store: store[0], client: req.user.id });
    } else {
        res.redirect("/profile");
    }
});

router.post("/save-sale", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "client") {
        try {
            const { insertId } = await pool.query("INSERT INTO sale SET ?", [req.body.sale]);
            for (const product of req.body.products) {
                const saleProduct = {
                    id_sale: insertId,
                    id_product: product.id,
                    quantity: product.quantity,
                    price: product.totalPrice,
                };
                await pool.query("INSERT INTO sale_product SET ?", [saleProduct]);
            }
            return res.status(200).json({ message: "Sale saved" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error saving sale" });
        }
    } else {
        res.redirect("/profile");
    }
});

router.get("/my-sale", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "client") {
        const mySale = await pool.query("SELECT * FROM sale WHERE id_client = ?", [req.user.id]);
        if (mySale.length > 0) {
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
            req.flash("error", "No tienes ningún pedido pendiente");
            res.redirect("/show-stores");
        }
    } else {
        res.redirect("/profile");
    }
});

module.exports = router;
