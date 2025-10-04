const productsModels = require("../models/product-model");

module.exports.createProducts = async function (req, res) {
  try {
    let { image, name, Categories, genStyles, price, discount, color } =
      req.body;
    console.log(image, name, Categories, genStyles, price, discount, color);
    let ProductIs = await productsModels.findOne({ name });
    if (ProductIs) {
      res
        .status(401)
        .json({ message: "Product is alread create", hello: "tanmay start" });
    } else {
      const product = await productsModels.create({
        image,
        name,
        dressStyles:Categories,
        color,
        genStyles,
        price,
        discount,
      });
      res.status(201).json({
        message: "Create product successfully",
        product,
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
        image: product.image,
        name: product.name,
        Categories: product.Categories,
        price: product.price,
        discount: product.discount,
      },
    });
  }
};

module.exports.updateProduct = async function (req, res) {
  let { name, image, rename, Categories, price, discount } = req.body;

  let productIs = await productsModels.findOne({ name });
  if (!productIs) {
    // req.flash("error", "Email or Password incorrect");
    // return res.redirect("/");
    res.status(401).json({
      message: "update Product, Not Working",
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

module.exports.getProducts = async function (req, res) {
  try {
    const {
      filterGendar,
      filterPrice,
      filterColors,
      filterDressStyle,
      isModeALL,
    } = req.body;

    let filter = {};

    // Mode ALL: return all products
    if (isModeALL === "ALL") {
      filter = {}; // no filter
    } else {
      // Price filter (min 25, max either filterPrice or 200)
      filter.price = { $gte: 25, $lte: filterPrice || 900 };

      // Add filters only if arrays have values
      if (filterGendar?.length) filter.genStyles = { $in: filterGendar };
      if (filterColors?.length) filter.colours = { $in: filterColors };
      if (filterDressStyle?.length) filter.dressStyles = { $in: filterDressStyle };
    }

    // Fetch products from DB
    const filterProduct = await productsModels.find(filter).sort({ price: -1 });

    if (!filterProduct || filterProduct.length === 0) {
      return res.status(404).json({
        message: "No products found",
        Product: filterProduct,
      });
    }

    res.status(200).json({
      message: "Products fetched successfully",
      Product: filterProduct,
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
module.exports.getProductByOne = async function (req, res) {
  try {
    const {
      productId
    } = req.body;

    // Fetch products from DB
    const Product = await productsModels.findOne({_id:productId});
console.log(Product)
    if (!Product) {
      return res.status(404).json({
        message: "No products found",
        Product: Product,
      });
    }

    res.status(200).json({
      message: "Products fetched successfully",
      Product: Product,
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
