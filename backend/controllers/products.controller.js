const productsModels = require("../models/product-model");

module.exports.createProducts = async function (req, res) {
  try {
    let { image, name, Categories, price, discount } = req.body;
    console.log(image, name, Categories, price, discount);
    let ProductIs = await productsModels.findOne({ name });
    if (ProductIs) {
      res
        .status(401)
        .json({ message: "Product is alread create", hello: "tanmay start" });
      return res.redirect("/");
    } else {
      const product = await productsModels.create({
        image,
        name,
        Categories,
        price,
        discount,
      });
      res.status(201).json({
        message: "Create product successfully",
        product: {
          _id: product._id,
          image: image,
          name: name,
          Categories: Categories,
          price: price,
          discount: discount,
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

module.exports.deleteProduct = async function (req, res) {
  let { name } = req.body;

  let products = await productsModels.findOne({ name });
  if (!products) {
    // req.flash("error", "Email or Password incorrect");
    // return res.redirect("/");
    res.status(401).json({
      message: "Delete Product Not Working",
      product: {
        heloo: "aktjnwjliseaz;krmf;n",
      },
    });
  } else {
    let product = await productsModels.findOneAndDelete({ name: name });
    res.status(201).json({
      message: "Delete Product Successfully",
      product: {
        _id: product._id,
        image: image,
        name: name,
        Categories: Categories,
        price: price,
        discount: discount,
      },
    });
  }
};

module.exports.updateProduct = async function (req, res) {
  let { image, name, Categories, price, discount } = req.body;

  let productIs = await productsModels.findOne({ name });
  if (!productIs) {
    // req.flash("error", "Email or Password incorrect");
    // return res.redirect("/");
    res.status(401).json({
      message: "update Product Not Working",
      product: {
        heloo: "aktjnwjliseaz;krmf;n",
      },
    });
  } else {
    let product = await productIs.findOneAndUpdate({
      image,
      name,
      Categories,
      price,
      discount,
    });
    res.status(201).json({
      message: "Delete Product Successfully",
      product: {
        _id: product._id,
        image: image,
        name: name,
        Categories: Categories,
        price: price,
        discount: discount,
      },
    });
  }
};
