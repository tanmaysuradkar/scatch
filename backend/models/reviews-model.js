const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  title: String,
  message: String,
  start: Number,
  help: String,
});

module.exports = mongoose.model("reviews", reviewsSchema);
