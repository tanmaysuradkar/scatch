import React, { useState } from "react";
import axios from "axios";

const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    image: "",
    name: "",
    Categories: "",
    genStyles: "",
    price: "",
    discount: 0,
    color: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleColorSelect = (colorName) => {
  setProductData((prev) => ({
    ...prev,
    color: colorName,
  }));
};
  const colorspick = [
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backendURL}products/createProducts`,
        productData,
      );
      console.log("Product created:", response.data);
      // Reset form after successful submission
      setProductData({
        image: "",
        name: "",
        Categories: "",
        genStyles: "",
        price: "",
        discount: "",
        color: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }finally{
      setLoading(false);
    }
  };

  const categoryOptions = ["Casual", "Formal", "Party", "Gym"];
  const genStyleOptions = ["Feman", "Man", "kids", "ALL"];

  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Create New Product
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg px-8 py-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={productData.image}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="Categories"
                value={productData.Categories}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount
              </label>
              <input
                type="number"
                name="discount"
                value={productData.discount}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender Style
              </label>
              <select
                name="genStyles"
                value={productData.genStyles}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Style</option>
                {genStyleOptions.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>

          <div className="flex flex-wrap gap-4">
            {colorspick.map((c, index) => {
              const isSelected = productData.color === c.name;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleColorSelect(c.name)}
                  className={`
          w-10 h-10 rounded-full ${c.color}
          border-2 transition-all duration-200
          ${
            isSelected
              ? "border-black ring-4 ring-gray-400 scale-110"
              : "border-gray-300"
          }
          hover:scale-105
        `}
                  aria-label={c.name}
                />
              );
            })}
          </div>

          {productData.color && (
            <p className="text-sm mt-2 text-gray-700">
              Selected Color: <strong>{productData.color}</strong>
            </p>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              {loading ? "Creating Product..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
