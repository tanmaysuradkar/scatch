const express = require("express")
const { createOrder, verifyPayment } = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/isLoggedIn");
const router = express.Router();

router.post("/order", createOrder);
router.post("/verify", authMiddleware.isloggedIn ,verifyPayment);

module.exports = router;
