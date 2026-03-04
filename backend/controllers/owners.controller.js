const OwnerModel = require("../models/owner-model");
const Payment = require("../models/payment-model");
const { sendEmailOwner } = require("../helper/nodemailer");
const productModel = require("../models/product-model");

// GET /owners/transactions
module.exports.getTransactions = async function (req, res) {
  try {
    // Use Payment records as the source of truth for completed transactions.
    // user.orders in the user model represents the cart (not completed orders) and can be modified by users,
    // so owner dashboard should only display actual payments.
    // Populate nested product references inside the orderList array
    const payments = await Payment.find()
      .populate("user", "email")
      .populate({ path: "product.product", model: "product" });

    // Flatten payments -> one transaction per order item in payment.product array
    const transactions = [];
    for (const p of payments) {
      const orderItems = p.product || [];
      for (const item of orderItems) {
        transactions.push({
          userId: p.user?._id,
          userEmail: p.user?.email,
          product: item.product || null,
          quantity: item.quantity || 0,
          amount: p.amount || null,
          orderDate: item.orderDate || p.createdAt || p.updatedAt || null,
          paymentStatus: p.status || "Pending",
          paymentId: p._id,
        });
      }
    }
    return res.status(200).json({ transactions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to fetch transactions", error: err.message });
  }
};

// POST /owners/updateStatus
module.exports.updatePaymentStatus = async function (req, res) {
  try {
    // Now expect paymentId and status. Payment.product is an array of items,
    // status is stored at Payment (whole payment) level.
    const { paymentId, status } = req.body;
    if (!paymentId || !status) {
      return res.status(400).json({ message: "paymentId and status are required" });
    }

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { status },
      { new: true }
    );

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    return res.status(200).json({ message: "Payment status updated", payment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to update status", error: err.message });
  }
};
// POST /owners/profile
module.exports.getOwnerProfile = async (req, res) => {
  res.status(200).json({
    message: "User profile fetched successfully",
    success: true,
    Owner: req.Owner
  });
};

// POST /owners/Create
module.exports.registerOwner = async function (req, res) {
  try {
    let { email,password, fullname } = req.body;
    let ownerIs = await OwnerModel.findOne({ email: email });
    let owners = await OwnerModel.find();
    if (ownerIs) {
      return res.status(409).json({
        header: "Owner already exists",
        message: "This email is already registered. Please login instead.",
      });
    } else if(!(owners.length >= 1)) {
      const passwordHash = await OwnerModel.hashPassword(password);
      const owner = await OwnerModel.create({
        email,
        password: passwordHash,
        fullname,
      });
      const savedOwner = await owner.save();
      let mail = await sendEmailOwner({
        email,
        emailType: "VERIFY",
        owner: savedOwner,
      });
      res.status(201).json({
        message: "Create Owner successfully",
        Owner: {
          fullname: fullname,
          email: Owner.email,
          mail,
        },
      });
    } else{
      return res.status(409).json({
        header: "Owner already exists ",
        message: "This email is already registered. Please login instead.",
      });
    }
  } catch (err) {
    console.log("Err ", err);
    res.status(400).json({
      message: `Ower Create error ${err}`,
    });
  }
};
// POST /owners/login
module.exports.loginOwner = async function (req, res) {
  try {
    const { email, password } = req.body;
    const Owner = await OwnerModel.findOne({ email });
    if (!Owner) {
      return res.status(401).json({
        header: "Owner Unauthorized access.",
        message: "Invalid email or password, Please login again.",
      });
    }
    const result = await Owner.comparePassword(password);
    console.log(result)

    if (!result) {
      return res
        .status(401)
        .json({
          header: "Owner Unauthorized access.",
          message: "Invalid  or password, Please login again."
        });
    } else if(!Owner.isVerify){
      return res
        .status(401)
        .json({
          header: "Owner not verify the email",
          message: "First Open Email form tanmaysuradkar2008@gmail.com and verify your account"
        });
    }

    const token = Owner.generateAuthToken();
    res.cookie("token", token, { httpOnly: true, secure: true });

    res.status(201).json({
      message: "Login successful ✅",
      Owner: {
        _id: Owner._id,
        fullname: Owner.fullname,
        email: Owner.email,
      },
      token
    });
  } catch (err) {
    console.log("Error logging in:", err);
    res.status(500).json({header: "Internal server error.",message: "server error, Please login again." });
  }
};
// POST /owners/verify
module.exports.verify = async function (req, res) {
  try {
    const { token } = req.body;
    console.log(req.body);
    const istoken = await jwt.verify(token || "", process.env.JWT_KEY);
    const isOwner = await OwnerModel.findOneAndUpdate(
      { _id: istoken },
      { $set: { isVerify: true } },
      { new: true } // Returns the updated document
    );
    if (isOwner) {
      res.status(201).json({
        message: "Owner VERFY successfully",
        isOwner,
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