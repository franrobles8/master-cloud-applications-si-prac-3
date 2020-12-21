const express = require("express");
const { findAll, findOne, create, remove } = require("../controllers/eoloplantController");
const router = express.Router();

router.get("/eoloplants", findAll);
router.get("/eoloplants/:id", findOne);
router.post("/eoloplants", create);
router.delete("/eoloplants/:id", remove);

module.exports = router;