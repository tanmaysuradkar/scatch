const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  amount: Number,
  currency: String,
  status: String,
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
