const userModel = require("../models/user-model");
const productModel = require("../models/product-model");
const blacklistTokenaModel = require("../models/blacklistToken-model");
const { sendEmail } = require("../helper/nodemailer");
const jwt = require("jsonwebtoken");
const passport = require("passport");
module.exports.registerUser = async function (req, res) {
  try {
    let { email, password, fullname } = req.body;
    let useris = await userModel.findOne({ email: email });
    if (useris) {
      return res.status(409).json({
        header: "User already exists ",
        message: "This email is already registered. Please login instead.",
      });
    } else {
      const passwordHash = await userModel.hashPassword(password);
      const user = await userModel.create({
        email,
        password: passwordHash,
        fullname,
      });
      const savedUser = await user.save();
      let mail = await sendEmail({
        email,
        emailType: "VERIFY",
        user: savedUser,
      });
      res.status(201).json({
        message: "Create user successfully",
        user: {
          fullname: fullname,
          email: user.email,
          mail,
        },
      });
    }
  } catch (err) {
    console.log("Err ", err);
    res.status(400).json({
      tanmay: "tanmay start",
    });
  }
};
module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const result = await user.comparePassword(password);
    if (!result) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res.cookie("token", token, { httpOnly: true, secure: true });

    res.status(200).json({
      message: "Login successful ✅",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    console.log("Error logging in:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.verify = async function (req, res) {
  try {
    const { token } = req.body;
    console.log(req.body);
    const istoken = await jwt.verify(token, process.env.JWT_KEY);
    const isUser = await userModel.findOneAndUpdate(
      { _id: istoken },
      { $set: { isVerify: true } },
      { new: true } // Returns the updated document
    );
    if (isUser) {
      res.status(201).json({
        message: "user VERFY successfully",
        isUser,
        token,
      });
    } else {
      res.status(401).json({ message: "incorrent Verify" });
    }
  } catch (error) {
    console.log("Err ", error);
    res.status(400).json({
      message: "server side verify route",
    });
  }
};

module.exports.addOrder = async function (req, res, next) {
  const { productId, userId, quantity } = req.body;

  try {
    //  Step 1: Validate product
    const isProduct = await productModel.findById(productId);
    if (!isProduct) {
      return res.status(404).json({
        header: "Product not found 🌀",
        message: "Please try again with a valid product ID.",
      });
    }

    //  Step 2: Validate user
    const isUser = await userModel.findById(userId);
    if (!isUser) {
      return res.status(404).json({
        header: "User not found 🚫",
        message: "Invalid user. Please login again.",
      });
    }

    //  Step 3: Check if product already exists in user's orders
    const existingOrder = isUser.orders.find(
      (o) => o.product.toString() === productId
    );

    if (existingOrder) {
      // If already in cart, update quantity instead of pushing again
      existingOrder.quantity += Number(quantity);
    } else {
      isUser.orders.push({
        product: isProduct._id,
        quantity: Number(quantity),
      });
    }

    await isUser.save();

    // Step 4: Populate and respond
    const populatedUser = await userModel
      .findById(userId)
      .populate("orders.product")
      .select("-password");

    res.status(201).json({
      header: "Order added successfully 👍🏻",
      message: "User order list updated successfully!",
      orders: populatedUser.orders,
    });
  } catch (err) {
    console.error(" Error adding order:", err);
    res.status(500).json({
      header: "Something went wrong ",
      message: err.message,
    });
  }
};

module.exports.getOrder = async function (req, res, next) {
  let { userId } = req.body;

  try {
    let isUser = await userModel.findOne({ _id: userId }).populate({
      path: "orders.product",
      model: "product",
    });
    if (!isUser) {
      res.status(401).json({ message: "Unauthorized access." });
    }
    if (!isUser.orders || isUser.orders.length === 0) {
      return res.status(200).json({
        message: "No cart found 🛒",
        cart: [],
      });
    }
    res.status(201).json({
      message: "User cart fetched successfully",
      cart: isUser.orders,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      header: "User not allow",
      message: "",
    });
  }
};
module.exports.getUserProfile = async (req, res) => {
  res.status(200).json({
    message: "User profile fetched successfully",
    user: req.user,
  });
};
module.exports.logoutUser = async (req, res) => {
  res.clearCookie("token");
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  let blacktoken = await blacklistTokenaModel.create({ token });
  res.status(200).json({
    message: "User logged out successfully",
    blacktoken,
  });
};
