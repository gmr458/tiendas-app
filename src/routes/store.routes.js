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
    const existsName = await pool.query(
        "SELECT * FROM product WHERE id_store = ? AND name = ?",
        [id_store, name],
    );
    if (existsName.length > 0) {
        return res.render("pages/store/create-product", {
            name: "",
            description,
            price,
            stock,
            message_name: "Ya existe un producto con ese nombre",
        });
    }
    const existsDescription = await pool.query(
        "SELECT * FROM product WHERE id_store = ? AND description = ?",
        [id_store, description],
    );
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
            message_stock:
                "La cantidad de productos no puede ser un número negativo",
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

router.get("/show-products", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "store") {
        const products = await pool.query(
            "SELECT * FROM product WHERE id_store = ?",
            [req.user.id],
        );
        res.render("pages/store/show-products", { products });
    } else {
        res.redirect("/profile");
    }
});

router.get("/get-products", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "store") {
        const products = await pool.query(
            "SELECT * FROM product WHERE id_store = ?",
            [req.user.id],
        );
        res.status(200).json(products);
    } else {
        res.redirect("/profile");
    }
});

router.get("/edit-product-form/:id", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    const id_store = req.user.id;
    if (role === "store") {
        const { id } = req.params;
        const product = await pool.query(
            "SELECT * FROM product WHERE id = ? AND id_store = ?",
            [id, id_store],
        );
        res.render("pages/store/edit-product", {
            id: product[0].id,
            name: product[0].name,
            description: product[0].description,
            price: product[0].price,
            stock: product[0].stock,
        });
    } else {
        res.redirect("/profile");
    }
});

router.post("/edit-product/:id", isLoggedIn, async (req, res) => {
    const { name, description, price, stock } = req.body;
    const { id } = req.params;
    const id_store = req.user.id;
    const existsName = await pool.query(
        "SELECT * FROM product WHERE id <> ? AND id_store = ? AND name = ?",
        [id, id_store, name],
    );
    if (existsName.length > 0) {
        return res.render("pages/store/edit-product", {
            id,
            name: "",
            description,
            price,
            stock,
            message_name: "Ya existe un producto con ese nombre",
        });
    }
    const existsDescription = await pool.query(
        "SELECT * FROM product WHERE id <> ? AND id_store = ? AND description = ?",
        [id, id_store, description],
    );
    if (existsDescription.length > 0) {
        return res.render("pages/store/edit-product", {
            id,
            name,
            description: "",
            price,
            stock,
            message_description: "Ya existe un producto con esa descripción",
        });
    }
    if (parseFloat(price) <= 0) {
        return res.render("pages/store/edit-product", {
            id,
            name,
            description,
            price: "",
            stock,
            message_price: "El precio debe ser mayor que 0",
        });
    }
    if (parseInt(stock) < 0) {
        return res.render("pages/store/edit-product", {
            id,
            name,
            description,
            price,
            stock: "",
            message_stock:
                "La cantidad de productos no puede ser un número negativo",
        });
    }
    const newDataProduct = {
        name,
        description,
        price,
        stock,
    };
    await pool.query("UPDATE product SET ? WHERE id = ? and id_store = ?", [
        newDataProduct,
        id,
        id_store,
    ]);
    req.flash("success", "Producto actualizado");
    res.redirect("/show-products");
});

router.post("/delete-product/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const id_store = req.user.id;
    await pool.query("DELETE FROM product WHERE id = ? AND id_store = ?", [
        id,
        id_store,
    ]);
    req.flash("success", "Producto eliminado");
    res.redirect("/show-products");
});

router.post("/disable-product/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const id_store = req.user.id;
    await pool.query(
        "UPDATE product SET status = ? WHERE id = ? AND id_store = ?",
        [id, id_store],
    );
    req.flash("success", "Producto eliminado");
    res.redirect("/show-products");
});

router.get("/show-sales", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "store") {
        res.render("pages/store/show-sales");
    } else {
        res.redirect("/profile");
    }
});

router.get("/get-sales", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "store") {
        const sales = await pool.query(
            "SELECT * FROM sale WHERE id_store = ?",
            [req.user.id],
        );
        res.status(200).json(sales);
    } else {
        res.redirect("/profile");
    }
});

router.get("/view-details-sale/:id", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "store") {
        const sale = await pool.query("SELECT * FROM sale WHERE id = ?", [
            req.params.id,
        ]);
        const dataClient = await pool.query("SELECT * FROM user WHERE id = ?", [
            sale[0].id_client,
        ]);
        const productsSale = await pool.query(
            "SELECT * FROM sale_product WHERE id_sale = ?",
            [sale[0].id],
        );
        let products = [];
        for (let i = 0; i < productsSale.length; i++) {
            const productFromDb = await pool.query(
                "SELECT * FROM product WHERE id = ?",
                [productsSale[i].id_product],
            );
            const product = {
                id: productFromDb[0].id,
                id_store: productFromDb[0].id_store,
                name: productFromDb[0].name,
                description: productFromDb[0].description,
                unitPrice: productFromDb[0].price,
                stock: productFromDb[0].stock,
                quantity: productsSale[i].quantity,
                totalPrice: productsSale[i].price,
            };
            products.push(product);
        }
        res.render("pages/store/view-details-sale", {
            sale: sale[0],
            products,
            client: dataClient[0],
        });
    } else {
        res.redirect("/profile");
    }
});

router.post("/acept-sale/:idSale", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "store") {
        const { idSale } = req.params;
        await pool.query("UPDATE sale SET status = ? WHERE id = ?", [
            1,
            idSale,
        ]);
        const saleQuantities = await pool.query(
            "SELECT id_product, quantity FROM sale_product WHERE id_sale = ?",
            [idSale],
        );
        for (let data of saleQuantities) {
            await pool.query(
                "UPDATE product SET stock = stock - ? WHERE id = ?",
                [data.quantity, data.id_product],
            );
        }
        req.flash("success", "Venta aceptada");
        res.redirect("/view-details-sale/" + idSale);
    } else {
        res.redirect("/profile");
    }
});

router.get("/statistics", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "store") {
        res.render("pages/store/statistics");
    } else {
        res.redirect("/profile");
    }
});

router.get(
    "/get-statistics-client-more-sales",
    isLoggedIn,
    async (req, res) => {
        const { role } = req.user;
        if (role === "store") {
            const clientMoreSales = await pool.query(
                "SELECT sale.id_client, user.name name_client, COUNT(*) quantity FROM sale JOIN user ON sale.id_client = user.id WHERE id_store = ? GROUP BY sale.id_client",
                [req.user.id],
            );
            console.log(clientMoreSales);
            res.status(200).json(clientMoreSales);
        } else {
            res.redirect("/profile");
        }
    },
);

router.get(
    "/get-statistics-neighborhood-more-sales",
    isLoggedIn,
    async (req, res) => {
        const { role } = req.user;
        if (role === "store") {
            const neighborhoodMoreSales = await pool.query(
                "SELECT user.neighborhood name_neighborhood, COUNT(user.neighborhood) quantity FROM sale JOIN user ON sale.id_client = user.id WHERE id_store = ? GROUP BY user.neighborhood ORDER BY quantity DESC",
                [req.user.id],
            );
            console.log(neighborhoodMoreSales);
            res.status(200).json(neighborhoodMoreSales);
        } else {
            res.redirect("/profile");
        }
    },
);

router.get(
    "/get-statistics-client-more-money",
    isLoggedIn,
    async (req, res) => {
        const { role } = req.user;
        if (role === "store") {
            const clientMoreMoney = await pool.query(
                "SELECT sale.id_client, user.name name_client, SUM(total_price) money FROM sale JOIN user ON sale.id_client = user.id WHERE id_store = ? GROUP BY sale.id_client ORDER BY money DESC",
                [req.user.id],
            );
            console.log(clientMoreMoney);
            res.status(200).json(clientMoreMoney);
        } else {
            res.redirect("/profile");
        }
    },
);

router.put("/change-status-product/:id", isLoggedIn, async (req, res) => {
    const { role } = req.user;
    if (role === "store") {
        const result = await pool.query(
            "SELECT status FROM product WHERE id = ?",
            [req.params.id],
        );
        const actualStatus = result[0].status;
        let newStatus = 0;
        if (actualStatus === 0) {
            newStatus = 1;
        }
        await pool.query("UPDATE product SET status = ? WHERE id = ?", [
            newStatus,
            req.params.id,
        ]);
        res.status(200).json({});
    } else {
        res.redirect("/profile");
    }
});

module.exports = router;
