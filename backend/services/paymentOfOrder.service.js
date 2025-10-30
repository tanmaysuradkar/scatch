const userModel = require("../models/user-model");
module.exports.createCaptain = async ({
  status,
  razorpay_signature
}) => {
  if (
    !status||
    !razorpay_signature||
    !orderArray
  ) {
    throw new Error("All fields are required");
  }
  try {
      let order = orderArray;
      let orderStatus = "Processing";
      let paymentStatus = "Paid";
      let paymentMethod = "UPI"
      let shippingAddress = null;
  } catch (error) {
    throw new Error("Payment of oder sevice file err :=",error);
  }


};