const userModel = require("../models/user-model");
const productModel = require("../models/product-model");
const blacklistTokenaModel = require("../models/blacklistToken.model");
const { sendEmail } = require("../helper/nodemailer");
const jwt = require("jsonwebtoken");
module.exports.registerUser = async function (req, res) {
  try {
    let { email, password, fullname } = req.body;
    let useris = await userModel.findOne({ email: email });
    if (useris) {
      res
        .status(401)
        .json({ header: "User is already, Unauthorized ", message: "heloo" }); // rewrite the message response
    } else {
      const passwordHash = await userModel.hashPassword(password);
      const user = await userModel.create({
        email,
        password: passwordHash,
        fullname:fullname ,
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
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) {
    req.flash("error", "Email or Password incorrect");
    return res.redirect("/");
  }

  let result = user.comparePassword(password);
  if (result) {
    let token = user.generateAuthToken();
    res.status(201).json({
      message: "Create user successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        token,
      },
    });
    res.cookie("token", token);
    res.redirect("/");
  } else {
    req.flash("error", "Email or Password incorrect");
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
  let { productId, userId, quantity } = req.body;

  try {
    let isProduct = await productModel.findOne({ _id: productId });
    if (!isProduct) {
      res.status(401).json({
        header: "project not allow",
        message: "try larst",
      });
    } else {
      let isUser = await userModel
        .findOneAndUpdate(
          { _id: userId },
          { $set: { orders: [{ quantity, product: isProduct }] } },
          { new: true } // Returns the updated document
        )
        .select("-password");
      if (!isUser) {
        res.status(401).json({
          header: "User not allow",
          message: "try larst",
        });
      } else {
        res.status(201).json({
          header: "user orderlist add successfully",
          message: "Good res",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      header: "User not allow",
      message: "try larst",
    });
  }
};
module.exports.getOrder = async function (req, res, next) {
  let { userId } = req.body;

  try {
    let isUser = await userModel.findOne({_id:userId});
    if (!isUser) {
      res.status(401).json({ message: "Unauthorized access." });
    } 
    if(isUser.orders.length <= 0){
      res.status(201).json({
      message: "No cart found",
      cart:isUser.orders
    });
    }
    res.status(201).json({
      message: "User cart fetched successfully",
      cart:isUser.orders
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
  await blacklistTokenaModel.create({ token });
  res.status(200).json({
    message: "User logged out successfully",
  });
};
