const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.render("pages/index");
});

module.exports = router;
