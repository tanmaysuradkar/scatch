const userModel = require("../models/user-model");
const Payment = require("../models/payment-model");
const productModel = require("../models/product-model");

// GET /owners/transactions
module.exports.getTransactions = async function (req, res) {
  try {
    // Use Payment records as the source of truth for completed transactions.
    // user.orders in the user model represents the cart (not completed orders) and can be modified by users,
    // so owner dashboard should only display actual payments.
    // Populate nested product references inside the orderList array
    const payments = await Payment.find()
      .populate("user", "email")
      .populate({ path: "product.product", model: "product" });

    // Flatten payments -> one transaction per order item in payment.product array
    const transactions = [];
    for (const p of payments) {
      const orderItems = p.product || [];
      for (const item of orderItems) {
        transactions.push({
          userId: p.user?._id,
          userEmail: p.user?.email,
          product: item.product || null,
          quantity: item.quantity || 0,
          amount: p.amount || null,
          orderDate: item.orderDate || p.createdAt || p.updatedAt || null,
          paymentStatus: p.status || "Pending",
          paymentId: p._id,
        });
      }
    }
    return res.status(200).json({ transactions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to fetch transactions", error: err.message });
  }
};

// POST /owners/updateStatus
module.exports.updatePaymentStatus = async function (req, res) {
  try {
    // Now expect paymentId and status. Payment.product is an array of items,
    // status is stored at Payment (whole payment) level.
    const { paymentId, status } = req.body;
    if (!paymentId || !status) {
      return res.status(400).json({ message: "paymentId and status are required" });
    }

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { status },
      { new: true }
    );

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    return res.status(200).json({ message: "Payment status updated", payment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to update status", error: err.message });
  }
};
