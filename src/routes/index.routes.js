const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.redirect("/login-form");
});

module.exports = router;
