const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: String,
  name: String,
  Categories: String,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  color: String,
  review:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'reviews'
  }
});

module.exports = mongoose.model("product", productSchema);
