const userModel = require("../models/user-model");
const productModel = require("../models/product-model");
const blacklistTokenaModel = require("../models/blacklistToken-model");
const { sendEmailUser } = require("../helper/nodemailer");
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
      let mail = await sendEmailUser({
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
    res.status(500).json({
      message: "Server error during registration",
    });
  }
};
 
module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    
    if (!user) {
      return res.status(401).json({
        header: "User Unauthorized access.",
        message: "Invalid email or password, Please login again.",
      });
    }
    
    const result = await user.comparePassword(password);
    console.log("Password match result:", result);
    
    if (!result) {
      return res.status(401).json({
        header: "User Unauthorized access.",
        message: "Invalid email or password, Please login again.",
      });
    }
 
    // ✅ FIX: Check isVerify on the correct user object
    if (!user.isVerify) {
      return res.status(401).json({
        header: "Email not verified",
        message: "Please verify your email before login. Check your inbox.",
      });
    }
 
    const token = user.generateAuthToken();
    res.cookie("token", token, { httpOnly: true, secure: true });
 
    res.status(200).json({
      message: "Login successful ✅",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.log("Error logging in:", err);
    res.status(500).json({
      header: "Internal server error.",
      message: "Server error, Please login again.",
    });
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
      { new: true }
    );
    if (isUser) {
      res.status(201).json({
        message: "user verified successfully",
        isUser,
        token,
      });
    } else {
      res.status(401).json({ message: "incorrect verification" });
    }
  } catch (error) {
    console.log("Err ", error);
    res.status(400).json({
      message: "server side verify route error",
    });
  }
};
 
// ✅ FIXED: Proper addOrder endpoint for "Add to Cart"
module.exports.addOrder = async function (req, res, next) {
  const { productId, quantity } = req.body;
  const userId = req.user._id;
  
  try {
    // Step 1: Validate input
    if (!productId || !quantity) {
      return res.status(400).json({
        message: "Product ID and quantity are required",
      });
    }
 
    // Step 2: Validate product exists
    const isProduct = await productModel.findById(productId);
    if (!isProduct) {
      return res.status(404).json({
        header: "Product not found 🌀",
        message: "Please try again with a valid product ID.",
      });
    }
 
    // Step 3: Validate user exists
    const isUser = await userModel.findById(userId);
    if (!isUser) {
      return res.status(401).json({
        header: "Unauthorized access. 🚫",
        message: "Invalid user. Please login again.",
      });
    }
 
    // Step 4: Check if product already exists in user's orders
    const existingOrder = isUser.orders.find(
      (o) => o.product.toString() === productId
    );
 
    if (existingOrder) {
      // If already in cart, update quantity instead of pushing again
      console.log(`📦 Product already in cart, updating quantity from ${existingOrder.quantity} to ${existingOrder.quantity + Number(quantity)}`);
      existingOrder.quantity += Number(quantity);
    } else {
      // Add new product to cart
      console.log(`📦 Adding new product to cart with quantity ${quantity}`);
      isUser.orders.push({
        product: isProduct._id,
        quantity: Number(quantity),
      });
    }
 
    // Step 5: Save user with updated orders
    await isUser.save();
 
    // Step 6: Populate and respond with updated cart
    const populatedUser = await userModel
      .findById(userId)
      .populate("orders.product")
      .select("-password");
 
    // ✅ FIXED: Return status 200 for success, consistent with getOrder
    return res.status(200).json({
      header: "Order added successfully 👍🏻",
      message: "Item added to cart successfully!",
      orders: populatedUser.orders,
      cart: populatedUser.orders, // Add both for compatibility
    });
    
  } catch (err) {
    console.error("Error adding order:", err);
    return res.status(500).json({
      header: "Something went wrong",
      message: err.message || "Failed to add item to cart",
    });
  }
};
 
// ✅ IMPROVED: Better getOrder with more logging
module.exports.getOrder = async function (req, res, next) {
  const userId = req.user._id;
 
  try {
    console.log("📦 Fetching cart for user:", userId);
 
    const isUser = await userModel.findOne({ _id: userId }).populate({
      path: "orders.product",
      model: "product",
    });
 
    if (!isUser) {
      console.warn("⚠️ User not found:", userId);
      return res.status(401).json({ 
        message: "Unauthorized access." 
      });
    }
 
    if (!isUser.orders || isUser.orders.length === 0) {
      console.log("📭 Cart is empty for user:", userId);
      return res.status(200).json({
        message: "No cart found 🛒",
        cart: [],
      });
    }
 
    console.log("✅ Cart items found:", isUser.orders.length);
    
    // ✅ FIXED: Return status 200 (not 201)
    return res.status(200).json({
      message: "User cart fetched successfully",
      cart: isUser.orders,
    });
 
  } catch (err) {
    console.error("❌ Get order error:", err);
    return res.status(500).json({
      message: "Error fetching cart",
      error: err.message,
    });
  }
};
 
// ✅ IMPROVED: Better deleteOrder with confirmation
module.exports.deleteOrder = async function (req, res, next) {
  const { productId } = req.body;
  const userId = req.user._id;
  
  try {
    if (!userId || !productId) {
      return res.status(400).json({ 
        message: "Missing userId or productId in request." 
      });
    }
 
    console.log("🗑️ Removing product:", productId, "for user:", userId);
 
    const isUser = await userModel.findById(userId).populate("orders.product");
    if (!isUser) {
      return res.status(401).json({ 
        message: "Unauthorized access." 
      });
    }
 
    if (!isUser.orders || isUser.orders.length === 0) {
      return res.status(200).json({ 
        message: "No cart found 🛒", 
        cart: [] 
      });
    }
 
    // Find the index of the order entry matching the given productId
    const orderIndex = isUser.orders.findIndex((o) => {
      const pid = o.product && o.product._id 
        ? o.product._id.toString() 
        : o.product?.toString();
      return pid === productId;
    });
 
    if (orderIndex === -1) {
      console.warn("⚠️ Product not found in cart:", productId);
      return res.status(404).json({ 
        message: "Product not found in cart." 
      });
    }
 
    // Remove the order entry
    const removedItem = isUser.orders.splice(orderIndex, 1);
    console.log("✅ Removed item:", removedItem[0].product._id);
 
    await isUser.save();
 
    // Re-populate to ensure product details are present in response
    const populatedUser = await userModel
      .findById(userId)
      .populate("orders.product")
      .select("-password");
 
    // ✅ FIXED: Return status 200 (not 201)
    return res.status(200).json({
      message: "Product removed from cart successfully",
      cart: populatedUser.orders,
    });
 
  } catch (err) {
    console.error("❌ Delete order error:", err);
    return res.status(500).json({ 
      message: err.message || "Failed to remove item from cart",
    });
  }
};
 
module.exports.getUserProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: "User profile fetched successfully",
      user: req.user,
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({
      message: "Error fetching profile",
    });
  }
};
 
module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
    
    if (token) {
      let blacktoken = await blacklistTokenaModel.create({ token });
    }
 
    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({
      message: "Error logging out",
    });
  }
};
 
module.exports.userInfomation = async (req, res) => {
  try {
    const {
      fullname,
      email,
      state,
      address,
      pinCode,
      addressType,
      landmark,
      mobileNumber,
    } = req.body;
 
    // Server-side validation
    const errors = {};
 
    if (!fullname?.trim()) errors.fullname = 'Full name is required';
    if (!email?.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email';
    if (!mobileNumber?.trim()) errors.mobileNumber = 'Mobile number required';
    else if (!/^\d{10}$/.test(mobileNumber)) errors.mobileNumber = 'Invalid mobile number';
    if (!address?.trim()) errors.address = 'Address required';
    if (!pinCode?.trim()) errors.pinCode = 'Pin code required';
    else if (!/^\d{6}$/.test(pinCode)) errors.pinCode = 'Pin code must be 6 digits';
 
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }
 
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        fullname,
        email,
        state,
        address,
        pinCode,
        addressType,
        landmark,
        mobileNumber,
      },
      { new: true }
    ).select('-password');
 
    res.status(200).json({ 
      success: true, 
      data: updatedUser, 
      message: 'Profile updated successfully' 
    });
  } catch (err) {
    console.error("User info update error:", err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};
 
