const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/payment-model");
const userModel = require("../models/user-model");
module.exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

module.exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await Payment.create({
        product: req.body.orderList,
        user: req.user._id,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount: req.body.amount,
        currency: "INR",
        status: "Paid",
      });

      res
        .status(200)
        .json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
