const mongoose = require("mongoose");
const { type } = require("os");

const productSchema = mongoose.Schema({
  image: String,
  name: String,
  Categories: {
    type: String,
    enum: ['Casual', 'Formal', 'Party', 'Gym'],
  },
  genStyles: {
    type: String,
    enum: [ 'Feman', 'Man', 'kids' , "ALL"],
  },
  price: {
    type: Number,
    default:0
  },
  rating: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  colours: {
    type:String,
    default:"Black"
  },
  review:{
    type:[],
    default: [],
  }
});

module.exports = mongoose.model("product", productSchema);