const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
    res.render("eoloplants");
});

module.exports = router;