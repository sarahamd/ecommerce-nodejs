const express = require("express");
const { getcategory, createCategory } = require("../services/categoryServices");
const router = express.Router();
// router.get("/category",getcategory)
// router.post("/category",getcategory)

router.route("/").get(getcategory).post(createCategory);

modules.exports = router;