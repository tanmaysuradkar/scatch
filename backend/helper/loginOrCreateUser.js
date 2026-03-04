// utils/loginOrCreateUser.js
const UserModel = require("../models/user-model");

async function loginOrCreateUser(googleProfile) {
  const email = googleProfile.emails?.[0]?.value;

  if (!email) {
    throw new Error("Google account has no email");
  }

  let user = await UserModel.findOne({ email });

  if (!user) {
    user = new UserModel({
      fullname: googleProfile.displayName,
      email,
      picture: googleProfile.photos?.[0]?.value,
      isVerify: true,
    });

    await user.save();
  }

  const token = user.generateAuthToken();
  return token;
}

module.exports = loginOrCreateUser;