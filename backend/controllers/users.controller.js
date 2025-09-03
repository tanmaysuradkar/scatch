const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");

module.exports.registerUser = async function (req, res) {
  try {
    let { email, password, fullname } = req.body;
      console.log(email,password,fullname)
    let useris = await userModel.findOne({ email: email });
    if (useris) {
      res.status(401).json({message:"Use is alread has",tanmay :"tanmy end"});
      return res.redirect("/");
    } else {
      const passwordHash = await userModel.hashPassword(password);
      const user = await userModel.create({
        email,
        password: passwordHash,
        fullname,
      });

      let token = await userModel.generateAuthToken;
      res.status(201).json({
        message:"Create user successfully",
      user:{
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      vehicle: user.vehicle,
      token,
    }
  })
  res.cookie("token", token);
    }
  } catch (err) {
    console.log('Err ', err)
    res.status(400).json({
      tanmay: "tanmay start"
    })
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
    res.cookie("token", token);
    res.redirect("/");
  } else {
    req.flash("error", "Email or Password incorrect");
    return res.redirect("/");
  }
};

module.exports.logout = function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
};
