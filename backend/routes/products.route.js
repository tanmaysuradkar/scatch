const express = require("express");
const router = express.Router();
const {createProducts, getProducts,getProductByOne , deleteProduct, updateProduct} = require("../controllers/products.controller")
router.get("/", function (req, res) {
  res.send("hey it's working");
});
router.post("/getProducts", getProducts);

router.post("/createProducts", createProducts);

router.post("/deleteProduct", deleteProduct);

router.post("/updateProduct", updateProduct);

router.post("/getProductByOne", getProductByOne);

module.exports = router;