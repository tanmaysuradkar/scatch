const reviewsModel = require("../models/reviews-model");
const userModel = require("../models/user-model");

module.exports.createReview = async function (req, res) {
  console.log("working in controller")
  try {
    let { username, title, message, product } = req.body;

    let reviews = reviewsModel.create({
      product,
      username,
      title,
      message,
    });
    res.status(201).json({
        message: "Create review successfully",
        reviews: {
          _id: reviews._id,
          username: username,
          title: title,
          message: message,
          product: product,
        },
    });
  } catch (error) {
    console.log("Err ", error);
    res.status(400).json({
      tanmay: "tanmay start",
    });
  }
};
module.exports.deleteReview = async function (req, res) {
  let { title ,username } = req.body;
  let isUser = await userModel.findOne({ _id : username });
  console.log(isUser);
  if (!isUser) {
    res.status(401).json({
      message: "Delete Product Not Working",
      product: {
        heloo: "aktjnwjliseaz;krmf;n",
      },
    });
  } else {
    let review = await reviewsModel.findOneAndDelete({ title });
    res.status(201).json({
      message: "Delete review Successfully",
      review: {
        _id: review._id,
        title: review.title,
        username:review.username,
        message:review.message
      },
    });
  }
};