const { Type } = require("ajv/dist/compile/util");
const mongoose = require("mongoose");
const { type } = require("os");

const reviewsSchema = mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  message: String,
  rating: Number,
  help: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("reviews", reviewsSchema);
