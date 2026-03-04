// utils/loginOrCreateOwner.js
const OwnerModel = require("../models/owner-model");

async function loginOrCreateOwner(googleProfile) {
  const email = googleProfile.emails?.[0]?.value;

  if (!email) {
    throw new Error("Google account has no email");
  }

  let owner = await OwnerModel.findOne({ email });

  if (!owner) {
    owner = new OwnerModel({
      fullname: googleProfile.displayName,
      email,
      picture: googleProfile.photos?.[0]?.value,
      isVerify: true,
    });

    await owner.save();
  }

  const token = owner.generateAuthToken();
  return token;
}

module.exports = loginOrCreateOwner;