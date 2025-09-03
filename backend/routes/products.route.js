const express = require("express");
const router = express.Router();
const {createProducts , deleteProduct} = require("../controllers/products.controller")
router.get("/", function (req, res) {
  res.send("hey it's working");
});

router.post("/createProdects", createProducts);

router.post("/deleteProduct", deleteProduct);

module.exports = router;
