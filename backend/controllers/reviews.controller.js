const reviewsModel = require("../models/reviews-model");
const userModel = require("../models/user-model");
const productModel = require("../models/product-model");

module.exports.createReview = async function (req, res) {
  console.log("working in controller");
  try {
    let { username, message, rating, productId } = req.body;
    let isUser = await userModel.findOne({ _id: username });
    console.log(isUser);
    if (!isUser) {
      res.status(401).json({
        message: "Not Working Review Route",
        product: {
          heloo: "aktjnwjliseaz;krmf;n",
        },
      });
    } else {
      let isProduct = productModel.findOne({ _id: productId });
      if (!isProduct) {
        res.status(401).json({
          message: "Not Working Review Route",
          product: {
            heloo: "aktjnwjliseaz;krmf;n",
          },
        });
      } else {
        let reviews = reviewsModel.create({
          product: productId,
          username: username,
          message,
          rating,
        });
        res.status(201).json({
          message: "Create review successfully",
          reviews: {
            _id: reviews._id,
            username: username,
            message: message,
            product: productId,
            rating: rating,
          },
        });
      }
    }
  } catch (error) {
    console.log("Err ", error);
    res.status(400).json({
      tanmay: "tanmay start",
    });
  }
};
module.exports.deleteReview = async function (req, res) {
  let { reviewId, username } = req.body;
  let isUser = await userModel.findOne({ _id: username });
  console.log(isUser);
  if (!isUser) {
    res.status(401).json({
      message: "Delete Product Not Working",
      product: {
        heloo: "aktjnwjliseaz;krmf;n",
      },
    });
  } else {
    let review = await reviewsModel.findOneAndDelete({ _id: reviewId });
    if (!review) {
      res.status(401).json({
        message: "Delete Product Not Working",
        product: {
          heloo: "aktjnwjliseaz;krmf;n",
        },
      });
    } else {
      res.status(201).json({
        message: "Delete review Successfully",
        review: {
          _id: review._id,
          title: review.title,
          username: review.username,
          message: review.message,
        },
      });
    }
  }
};
module.exports.getReview = async function (req, res) {
  console.log("working in controller of reviews");
  let { getType, userId, productId } = req.body;
  let id = productId;
  if (!(getType == "product")) {
    id = userId;
  }
try {
   const review = await reviewsModel.find({ getType: id });
  if (!review || review.length === 0) {
    return res.status(404).json({
      message: "No Review found",
      Product: review,
    });
  }
  res.status(200).json({
    message: "Review fetched successfully",
    review: review,
  });
} catch (error) {
   console.error("Server Error:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
}
};
