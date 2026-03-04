const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const ownersController = require("../controllers/owners.controller");
const authMiddleware = require("../middlewares/isLoggedIn");

router.post("/create", ownersController.registerOwner);


router.get("/", function (req, res) {
  res.send("hey it's working on Owner");
});

// Login Owner 
router.get("/login", ownersController.loginOwner);

// Getting Owner profile 
router.get("/profile",authMiddleware.authOwer,ownersController.getOwnerProfile);

// Return flattened transactions (user email + each ordered product)
router.get("/transactions", ownersController.getTransactions);

// Update or create payment status for a user+product
router.post("/updateStatus", ownersController.updatePaymentStatus);

module.exports = router;
