const mongoose = require("mongoose")

const orderList = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  quantity: Number,
  orderDate: { type: Date, default: Date.now },
});

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  product: [orderList],
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  amount: Number,
  currency: String,
  status: String,
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
