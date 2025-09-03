const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema({
  username: String,
  title: String,
  message: String,
  start: Number,
  help: String,
});

module.exports = mongoose.model("reviews", reviewsSchema);
