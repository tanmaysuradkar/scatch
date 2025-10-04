import React, { useState, useEffect } from "react";
import { ChevronDown, Star, X, SlidersHorizontal, Route } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from "axios";
import { Routes, useNavigate } from "react-router-dom";

const EcommerceProductPage = () => {
  const navigate = useNavigate();
  const [messageOfProduct, setMessageOfProduct] = useState(
    "Server Erron, try larst"
  );
  const [selectedFilters, setSelectedFilters] = useState({
    price: 900,
    colors: [],
    // size: ['Small'],
    dressStyle: ["Casual"],
    genStyles: ["Feman"],
  });
  const [products, setproducts] = useState([]);
  const colors = [
    { name: "Green", color: "bg-green-500" },
    { name: "Red", color: "bg-red-500" },
    { name: "Yellow", color: "bg-yellow-500" },
    { name: "Orange", color: "bg-orange-500" },
    { name: "Cyan", color: "bg-cyan-500" },
    { name: "Blue", color: "bg-blue-600" },
    { name: "Purple", color: "bg-purple-600" },
    { name: "Pink", color: "bg-pink-500" },
    { name: "Black", color: "bg-black" },
  ];
  const dressStyles = ["Casual", "Formal", "Party", "Gym"];
  const genStyles = ["Feman", "Man", "kids"];

  const handleSubmitOfProductList = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backendURL}products/getProducts`,
        {
          filterPrice: selectedFilters.price,
          filterGendar: selectedFilters.genStyles,
          filterColors: selectedFilters.colors,
          filterDressStyle: selectedFilters.dressStyle,
          isModeALL: "NotAll",
        }
      );
      console.log("response", response);
      setproducts(response.data.Product);
    } catch (error) {
      console.log("err => ", error);
    }
  };
  const handleSubmitOfProductListALL = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backendURL}products/getProducts`,
        {
          isModeALL: "ALL",
        }
      );
      console.log("response", response.data.Product);
      setproducts(response.data.Product);
    } catch (error) {
      console.log("err => ", error);
      setMessageOfProduct(error.response.data.message);
    }
  };
  const toggleColor = (color) => {
    setSelectedFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };
  const toggleDressStyle = (style) => {
    setSelectedFilters((prev) => ({
      ...prev,
      dressStyle: prev.dressStyle.includes(style)
        ? prev.dressStyle.filter((s) => s !== style)
        : [...prev.dressStyle, style],
    }));
  };
  const togglegenStyles = (style) => {
    setSelectedFilters((prev) => ({
      ...prev,
      genStyles: prev.genStyles.includes(style)
        ? prev.genStyles.filter((s) => s !== style)
        : [...prev.genStyles, style],
    }));
  };
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4">
          <Star className="w-4 h-4 text-gray-300 absolute" />
          <Star
            className="w-4 h-4 fill-yellow-400 text-yellow-400 absolute"
            style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
          />
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  useEffect(() => {
    handleSubmitOfProductListALL();
  }, []);
  const goToProduct = (e) => {
    navigate(`/Product/=${e}`); // Navigates to the /about path
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Header */}
      <div className="bg-black text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex-1 text-center">
            Sign up and get 20% off to your first order.
            <span className="underline cursor-pointer ml-1">Sign Up Now</span>
          </div>
          <button className="text-white hover:text-gray-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className=" border-gray-200 relative bg-white">
        <div className="h-20 w-full flex items-center justify-center">
          <Header />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-[98%] mx-auto px-4 py-4 bg-white">
        <div className="text-sm text-start text-gray-500">Home → Product</div>
      </div>

      {/* Horizontal Filters */}
      <div className="max-w-[98%] mx-auto px-4 mb-6 text-black">
        <div className="border border-gray-200 rounded-2xl px-6 py-2 bg-white shadow-sm">
          <div className="flex items-center relative justify-between mb-6">
            <h3 className="font-semibold text-lg">Filters</h3>
            <SlidersHorizontal className="w-4 h-4 absolute left-15 mt-1" />
            <div className="flex items-center relative justify-between gap-0.5">
              <button
                onClick={() => {
                  handleSubmitOfProductListALL();
                }}
                className="bg-black text-white px-3 py-1 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                All product
              </button>
              <button
                onClick={() => {
                  handleSubmitOfProductList();
                }}
                className="bg-black text-white px-3 py-1 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Apply Filter
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Gendar Style Filter */}
            <div className="border-t-2 border-t-gray-200">
              <h4 className="font-medium mb-4 flex items-center mt-2">
                Gendar
                <ChevronDown className="w-4 h-4 ml-2" />
              </h4>
              <div className="space-y-2">
                {genStyles.map((style, index) => (
                  <button
                    key={index}
                    onClick={() => togglegenStyles(style)}
                    className={`w-full text-left py-2 px-4 rounded-lg text-sm flex items-center justify-between ${
                      selectedFilters.genStyles.includes(style)
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-50 border border-gray-200"
                    } transition-colors`}
                  >
                    {style}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
            {/* Price Filter */}
            <div className="border-t-2 border-t-gray-200">
              <h4 className="font-medium mb-4 flex items-center mt-2">
                Price
                <ChevronDown className="w-4 h-4 ml-2" />
              </h4>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="range"
                    min="25"
                    max="900"
                    value={selectedFilters.price}
                    onChange={(e) =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        price: parseInt(e.target.value),
                      }))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <style jsx>{`
                    .slider::-webkit-slider-thumb {
                      appearance: none;
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: #000;
                      cursor: pointer;
                    }
                    .slider::-moz-range-thumb {
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: #000;
                      cursor: pointer;
                      border: none;
                    }
                  `}</style>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>₹25</span>
                    <span>₹{selectedFilters.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Colors Filter */}
            <div className="border-t-2 border-t-gray-200">
              <h4 className="font-medium mb-4 flex items-center mt-2">
                Colors
                <ChevronDown className="w-4 h-4 ml-2" />
              </h4>
              <div className="flex flex-wrap gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => toggleColor(color.name)}
                    className={`w-8 h-8 rounded-full ${color.color} border-2 ${
                      selectedFilters.colors.includes(color.name)
                        ? "border-gray-800 ring-2 ring-gray-300"
                        : "border-gray-300"
                    } hover:scale-110 transition-transform`}
                  />
                ))}
              </div>
            </div>

            {/* Size Filter
            <div className='border-t-2 border-t-gray-200'>
              <h4 className="font-medium mb-4 flex items-center mt-2">
                Size
                <ChevronDown className="w-4 h-4 ml-2" />
              </h4>
              <div className="flex flex-wrap gap-2">
                {sizes.slice(0, 9).map((size, index) => (
                  <button
                    key={index}
                    onClick={() => toggleSize(size)}
                    className={`py-2 px-3 text-sm border rounded-full whitespace-nowrap ${
                      selectedFilters.size.includes(size)
                        ? 'bg-black text-white border-black'
                        : 'bg-gray-100 text-gray-600 border-gray-200 hover:border-gray-300'
                    } transition-colors`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Dress Style Filter */}
            <div className="border-t-2 border-t-gray-200">
              <h4 className="font-medium mb-4 flex items-center mt-2">
                Dress Style
                <ChevronDown className="w-4 h-4 ml-2" />
              </h4>
              <div className="space-y-2">
                {dressStyles.map((style, index) => (
                  <button
                    key={index}
                    onClick={() => toggleDressStyle(style)}
                    className={`w-full text-left py-2 px-4 rounded-lg text-sm flex items-center justify-between ${
                      selectedFilters.dressStyle.includes(style)
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-50 border border-gray-200"
                    } transition-colors`}
                  >
                    {style}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[98%] mx-auto px-4 text-black">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Casual</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Showing 1-10 of 100 Products</span>
            <div className="flex items-center space-x-2">
              <span>Sort by:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none bg-white">
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}

        {products.length <= 0 && (
          <div className="flex items-center mb-10 font-bold justify-center text-center w-full">
            <h1 className="text-black text-5xl">{messageOfProduct}</h1>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 ">
          {products.map((product) => (
            <div
              onClick={() => {
                goToProduct(product._id);
              }}
              key={product.id}
              className="group cursor-pointer bg-gray-50 rounded-lg overflow-hidden"
            >
              <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm text-start mb-1 text-gray-900">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-1 mb-1">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.reviews}/5
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                        -{product.discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EcommerceProductPage;
