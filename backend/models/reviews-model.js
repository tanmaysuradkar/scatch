const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    usernamefull: { type: String },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    help: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("review", reviewsSchema);
