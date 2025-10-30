const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const ownersController = require("../controllers/owners.controller");

router.post("/create", async function (req, res) {
  let owners = await ownerModel.find();
  if (owners.length > 0) {
    return res
      .status(500)
      .send("You don't have permission to create a new owner.");
  }
  let { fullname, email, password } = req.body;
  let createdOwner = await ownerModel.create({
    fullname,
    email,
    password,
  });
  res.status(201).json({
    message: "Create review successfully",
    createdOwner,
  });
});

router.get("/", function (req, res) {
  res.send("hey it's working");
});

// Return flattened transactions (user email + each ordered product)
router.get("/transactions", ownersController.getTransactions);

// Update or create payment status for a user+product
router.post("/updateStatus", ownersController.updatePaymentStatus);

module.exports = router;
