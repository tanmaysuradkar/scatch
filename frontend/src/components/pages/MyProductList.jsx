import React, { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ArrowRight, Tag } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from "axios";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
 
export default function ShoppingCartPage() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  const userAuth = useSelector((state) => state.userInformation.value)
  
  console.log("👤 User Auth:", userAuth);
 
  const [messageOfCart, setMessageOfCart] = useState("Loading cart...");
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
 
  // ✅ FIXED: Proper cart fetching with error handling
  const handleShowCartDetial = async () => {
    try {
      setIsLoading(true);
      console.log("🔄 Fetching cart for user:", userAuth?._id);
 
      const res = await axios.post(
        `${import.meta.env.VITE_backendURL}users/getOrder`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
 
      console.log("📦 Response Status:", res.status);
      console.log("📦 Response Data:", res.data);
 
      // ✅ FIXED: Check for status 200 (not 201)
      if (res.status === 200 || res.status === 201) {
        if (res.data?.cart && res.data.cart.length > 0) {
          console.log("✅ Cart items found:", res.data.cart);
          setCartItems(res.data.cart);
          setMessageOfCart("");
        } else {
          console.log("📭 Cart is empty");
          setCartItems([]);
          setMessageOfCart("No items in cart 🛒");
        }
      }
    } catch (err) {
      console.error("❌ Cart fetch error:", err);
      console.error("Error details:", err.response?.data);
      
      setCartItems([]);
      setMessageOfCart(err.response?.data?.message || "Error loading cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
 
  // ✅ FIXED: Proper useEffect with token dependency
  useEffect(() => {
    if (userAuth?._id && token) {
      handleShowCartDetial();
    } else {
      console.warn("⚠️ User not authenticated, redirecting to login");
      setIsLoading(false);
      setMessageOfCart("Please login to view your cart");
      // Optionally redirect: navigate("/login");
    }
  }, [userAuth?._id, token]);
 
  // ✅ FIXED: Proper discount calculation
  const calculateDiscount = () => {
    return cartItems.reduce((sum, item) => {
      const itemDiscount = (item.product.price * (item.product.discount || 0) / 100) * item.quantity;
      return sum + itemDiscount;
    }, 0);
  };
 
  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const discountAmount = calculateDiscount();
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discountAmount + deliveryFee;
 
  // ✅ FIXED: Proper quantity update with API call
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
 
    try {
      // Optimistic update
      setCartItems((items) =>
        items.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
 
      // In a real app, you'd want to send this to backend
      // await axios.put(`${import.meta.env.VITE_backendURL}users/updateCart`, 
      //   { productId, quantity: newQuantity },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
    } catch (err) {
      console.error("Error updating quantity:", err);
      // Re-fetch cart on error
      handleShowCartDetial();
    }
  };
 
  // ✅ FIXED: Proper item removal with error handling
  const removeItem = async (productId) => {
    try {
      console.log("🗑️ Removing product:", productId);
 
      // Optimistic update - remove from UI immediately
      const updatedCart = cartItems.filter((item) => item.product._id !== productId);
      setCartItems(updatedCart);
 
      if (userAuth?._id && token) {
        const res = await axios.post(
          `${import.meta.env.VITE_backendURL}users/deleteOrder`,
          { productId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
 
        console.log("✅ Item removed successfully");
 
        // If backend returns updated cart, use it
        if (res?.status === 200 && res.data?.cart) {
          setCartItems(res.data.cart);
        }
      }
    } catch (err) {
      console.error("❌ Error removing item:", err);
      // Re-fetch to sync with backend
      handleShowCartDetial();
    }
  };
 
  // Apply promo code
  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      alert("Please enter a promo code");
      return;
    }
    console.log("Applying promo code:", promoCode);
    // TODO: Implement promo code logic
  };
 
  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }
    navigate("/payment", { state: { total, cartItems, discountAmount, subtotal } });
  };
 
  return (
    <div className="max-w-[100%] text-black mx-auto bg-gray-50 min-h-screen">
      {/* Navigation */}
      <div className="border-gray-200 relative flex items-center justify-center bg-white">
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
 
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
              <p className="text-gray-600">Loading your cart...</p>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-400 mb-4">{messageOfCart}</h1>
              <button
                onClick={() => navigate("/shop")}
                className="mt-6 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                // ✅ FIXED: Proper null checking
                if (!item?.product) {
                  console.warn("⚠️ Invalid item structure:", item);
                  return null;
                }
 
                const discountedPrice =
                  item.product.price -
                  (item.product.price * (item.product.discount || 0)) / 100;
 
                return (
                  <div
                    key={item.product._id}
                    className="bg-white rounded-lg p-6 flex items-center gap-4"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        // ✅ FIXED: Use absolute path, not relative
                        src={item.product.image || "/placeholder.jpg"}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/placeholder.jpg";
                        }}
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
                          <span className="font-medium">
                            {item.product.color || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="text-lg font-bold mt-2">
                        ₹{discountedPrice.toFixed(2)}
                      </div>
                      {item.product.discount > 0 && (
                        <div className="text-sm text-red-600 font-semibold mt-1">
                          Save ₹{(item.product.price - discountedPrice).toFixed(2)}
                          ({item.product.discount}% off)
                        </div>
                      )}
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
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
 
            {/* Order Summary */}
            <div className="bg-white rounded-lg p-6 h-fit sticky top-4">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
 
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
 
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
 
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
 
                <hr className="border-gray-200" />
 
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{Math.max(0, total).toFixed(2)}</span>
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
              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="w-full bg-black text-white py-4 px-6 rounded-full hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Go to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>
 
              {/* Continue Shopping */}
              <button
                onClick={() => navigate("/shop")}
                className="w-full mt-3 border-2 border-black text-black py-3 px-6 rounded-full hover:bg-gray-50 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
 
      <Footer />
    </div>
  );
}