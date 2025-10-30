const reviewsModel = require("../models/reviews-model");
const userModel = require("../models/user-model");
const productModel = require("../models/product-model");

module.exports.createReview = async function (req, res) {
  console.log("Working in review controller...");

  try {
    const { username, message, rating, productId } = req.body;

    // Validate user existence
    const isUser = await userModel.findOne({ _id: username });
    if (!isUser) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Validate product existence
    const isProduct = await productModel.findOne({ _id: productId });
    if (!isProduct) {
      return res.status(401).json({
        message: "Product not found",
      });
    }

    // Create review 
    const review = await reviewsModel.create({
      product: productId,
      username: username,
      usernamefull: isUser.fullname,
      message,
      rating,
    });

    res.status(201).json({
      message: "Review created successfully ",
      review: {
        usernamefull: isUser.fullname,
        _id: review._id,
        user: username,
        message,
        product: productId,
        rating,
      },
    });

  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
module.exports.deleteReview = async function (req, res) {
  try {
    const { reviewId, username } = req.body;

    if (!reviewId || !username) {
      return res.status(400).json({ message: "reviewId and username are required" });
    }

    // Verify user exists
    const isUser = await userModel.findById(username);
    if (!isUser) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const review = await reviewsModel.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Only the review owner (username) can delete the review
    if (review.username.toString() !== username.toString()) {
      return res.status(403).json({ message: "Forbidden: you are not the owner of this review" });
    }

    await reviewsModel.findByIdAndDelete(reviewId);

    return res.status(200).json({ message: "Review deleted successfully", reviewId });
  } catch (err) {
    console.error("Error deleting review:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
module.exports.getReview = async function (req, res) {
  console.log("working in controller of reviews");
  let { getType, userId, productId } = req.body;
  try {
    let reviews;
    if (getType === "product") {
      reviews = await reviewsModel.find({ product: productId });
    } else {
      reviews = await reviewsModel.find({ username: userId });
    }
    console.log(reviews);
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        message: "No Review found",
        review: reviews,
      });
    }
    res.status(200).json({
      message: "Review fetched successfully",
      review: reviews,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      message: "No Review found",
      error: error.message,
    });
  }
};
