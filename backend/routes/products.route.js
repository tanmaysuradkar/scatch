const express = require("express");
const router = express.Router();
const {createProducts , deleteProduct, updateProduct} = require("../controllers/products.controller")
router.get("/", function (req, res) {
  res.send("hey it's working");
});

router.post("/createProducts", createProducts);

router.post("/deleteProduct", deleteProduct);

router.post("/updateProduct", updateProduct);

module.exports = router;