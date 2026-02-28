const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const orderSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  quantity: Number,
  orderDate: { type: Date, default: Date.now },
});

const orderPaymentSchema = new mongoose.Schema({
  orders: [orderSchema],
  totalAmount: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ["COD", "CreditCard", "DebitCard", "UPI", "NetBanking"],
    default: "COD",
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed", "Refunded"],
    default: "Pending",
  },
  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing",
  },
  transactionId: { type: String }, // for payment gateway reference
  shippingAddress: { type: String },
  orderDate: { type: Date, default: Date.now },
});

// Automatically calculate total amount before saving
orderPaymentSchema.pre("save", function (next) {
  if (this.orders && this.orders.length > 0) {
    this.totalAmount = this.orders.reduce(
      (sum, item) => sum + item.product * item.quantity,
      0
    );
  }
  next();
});

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: [3, "First name must be at least 3 characters long"],
  },
  email: String,
  password: String,
  like: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    default: [],
  },
  orders: {
    type: [orderSchema],
    default: [],
  },
  ordersPayment: {
    type: [orderPaymentSchema],
    default: [],
  },
  state: String,
  contact: Number,
  picture: String,
  address: String,
  pinCode: Number,
  addressType: {
    type: Boolean,
    default: false,
  },
  Landmark: String,
  isVerify: {
    type: Boolean,
    default: false,
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
  return token;
};
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model("user", userSchema);
