const express = require("express");
const { createProduct, products } = require("../controllers/product");

const router = express.Router();

router.route("/").post(createProduct).get(products);

module.exports = router;
