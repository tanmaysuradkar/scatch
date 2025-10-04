import React, { useState, useEffect, useContext } from "react";
import { Trash2, Plus, Minus, ArrowRight, Tag } from "lucide-react";
import { UserDataContext } from "../../context/UserContext";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from "axios";
export default function ShoppingCartPage() {
  const { userAuth } = useContext(UserDataContext);
    const [messageOfCart, setMessageOfCart] = useState("Server Erron, try larst")
  const [cartItems, setCartItems] = useState([
    {
      product: {
        _id: 1,
        name: "Gradient Graphic T-shirt",
        discount: 0,
        color: "White",
        price: 145,
        image: "/api/placeholder/80/80",
      },
      quantity: 1,
    },
  ]);
  const [promoCode, setPromoCode] = useState("");
  const handleShowCartDetial = async (e) => {
    try {
      // Replace with your API endpoint
      const res = await axios.post(
        `${import.meta.env.VITE_backendURL}users/getOrder`,
        { userId: userAuth._id }
      );
      console.log("jdijad", res);
      if (res.status == 201) {
        setCartItems(res.data.cart);
      }
    } catch (err) {
      console.log(userAuth);
      console.log(err);
      setMessageOfCart(err.response.data.message);
    }
  };
  useEffect(() => {
    handleShowCartDetial();
  }, [userAuth]);
  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discountAmount = Math.round(subtotal * 0.2); // 20% discount
  const deliveryFee = 15;
  const total = subtotal - discountAmount + deliveryFee;

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.product._id !== id));
  };

  // Apply promo code
  const applyPromoCode = () => {
    // Placeholder for promo code logic
    console.log("Applying promo code:", promoCode);
  };

  return (
    <div className="max-w-[100%] text-black mx-auto bg-gray-50 min-h-screen">
      {/* Navigation */}
      <div className=" border-gray-200 relative flex items-center justify-center bg-white">
        <div className="h-20 w-full">
          <Header />
        </div>
      </div>
      <div className="lg:px-10 md:px-5 px-2.5 py-5">
        {/* Breadcrumb */}
        <nav className="text-sm text-start text-gray-500 mb-6">
          <span className="hover:text-black cursor-pointer">Home</span>
          <span className="mx-2">{">"}</span>
          <span className="text-black">Cart</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-4xl text-start font-bold mb-8">YOUR CART</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          {cartItems.length <= 0 && (
          <div className="flex items-center mb-10 font-bold justify-center text-center w-full">
            <h1 className="text-black text-5xl">{messageOfCart}</h1>
          </div>
          )}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="bg-white rounded-lg p-6 flex items-center gap-4"
              >
                {/* Product Image */}
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={`../${item.product.image}`}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">
                    {item.product.name}
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      Color:{" "}
                      <span className="font-medium">{item.product.color}</span>
                    </div>
                  </div>
                  <div className="text-xl font-bold mt-2">
                    ${item.product.price}
                  </div>
                  <div className="text-xl text-red-700 font-bold mt-2">
                    -%
                    {item.product.price -
                      (item.product.discount / 100) * item.product.price}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-full bg-gray-50">
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity - 1)
                      }
                      className="p-2 hover:bg-gray-100 rounded-l-full"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium min-w-[50px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity + 1)
                      }
                      className="p-2 hover:bg-gray-100 rounded-r-full"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal}</span>
              </div>

              <div className="flex justify-between text-red-500">
                <span>Discount (-20%)</span>
                <span className="font-medium">-${discountAmount}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-medium">${deliveryFee}</span>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Add promo code"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <button
                  onClick={applyPromoCode}
                  className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-black text-white py-4 px-6 rounded-full hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2">
              Go to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
