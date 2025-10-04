import React, { useState, useEffect, useContext } from "react";
import {
  Star,
  Plus,
  Minus,
  MoreHorizontal,
  Filter,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Search,
  Check,
  X,
  CaseLower,
} from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";

export default function TShirtProductPage() {
  const { userAuth } = useContext(UserDataContext);
  const [selectedColor, setSelectedColor] = useState("olive");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("reviews");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState("");
  const [reviewFilter, setReviewFilter] = useState("latest");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const params = useParams();
  const [newReview, setNewReview] = useState({ rating: 5, message: "" });
  const productId = params.productId.split("=")[1];
  const [reviews, setReviews] = useState([]);
  const [messageOfReview, setMessageOfReview] = useState("Server Erron, try larst")
  const [Product, setProduct] = useState({
    discount: 0,
    name: "OVERSIZED SWEATSHIRT",
    price: 320,
    rating: 4.6,
    reviews: 4,
    image: "./img/Banner (4).png",
    colours: "Yellow",
    dressStyles: "Casual",
    genStyles: "kids",
  });
  const colors = [
    { name: "olive", bg: "bg-green-700", label: "Olive Green" },
    { name: "gray", bg: "bg-gray-600", label: "Charcoal Gray" },
    { name: "navy", bg: "bg-blue-900", label: "Navy Blue" },
  ];
  const images = [Product.image];
  const productFeatures = [
    { icon: Truck, message: "Free shipping on orders over $100" },
    { icon: RotateCcw, message: "30-day return policy" },
    { icon: Shield, message: "2-year warranty included" },
  ];
  // Show notification
  const showNotificationMessage = (message, type = "success") => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification(""), 3000);
  };
  const handleShowProductDetial = async (e) => {
    try {
      // Replace with your API endpoint
      const res = await axios.post(
        `${import.meta.env.VITE_backendURL}products/getProductByOne`,
        { productId }
      );
      console.log(productId);
      console.log("Response  =>", res.data.Product);
      setProduct((prev) => ({
        ...prev, // keep old values if API doesn’t return them
        discount: res.data.Product.discount,
        name: res.data.Product.name,
        price: res.data.Product.price,
        rating: res.data.Product.rating,
        reviews: res.data.Product.reviews,
        image: res.data.Product.image,
        colours: res.data.Product.colours,
        dressStyles: res.data.Product.dressStyles,
        genStyles: res.data.Product.genStyles,
      }));
    } catch (err) {
      console.log(productId);
      console.log(err);
    }
  };
  const handleShowProductReviewAll = async (e) => {
    try {
      // Replace with your API endpoint
      const res = await axios.post(
        `${import.meta.env.VITE_backendURL}reviews/getReview`,
        { productId, getType: "product" }
      );
      console.log("Response  =>", res.data.Product);
      setReviews(res.data.review);
    } catch (err) {
      console.log(productId);
      console.log(err.response.data);
      setMessageOfReview(err.response.data.message)
    }
  };
  useEffect(() => {
    handleShowProductDetial();
    handleShowProductReviewAll();
  }, [productId]);

  // Add to cart functionality
  const addToCart = async () => {
    const item = {
      productId,
      userId: userAuth._id,
      quantity: quantity,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_backendURL}users/addcart`,
      item
    );
    setCartItems((prev) => [...prev, item]);
    showNotificationMessage(`Added ${quantity} item(s) to cart!`);
  };

  // Add to favorites
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    showNotificationMessage(
      isFavorite ? "Removed from favorites" : "Added to favorites!",
      isFavorite ? "info" : "success"
    );
  };
  // Share product
  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "ONE LIFE GRAPHIC T-SHIRT",
          message: "Check out this amazing t-shirt!",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      showNotificationMessage("Link copied to clipboard!");
    }
  };
  // Filter reviews
  const filteredReviews = [...reviews].sort((a, b) => {
    switch (reviewFilter) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "helpful":
        return b.helpful - a.helpful;
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });
  // Submit review
  const submitReview = async () => {
    if (!newReview.message.trim()) {
      showNotificationMessage("Please fill in all fields", "error");
      return;
    }

    const review = {
      username: "user._id",
      productId: productId,
      rating: newReview.rating,
      message: newReview.message,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_backendURL}reviews/createReview`,
      review
    );

    if (response.status === 401) {
      setNewReview({ rating: 5, message: "", name: "" });
      setShowReviewModal(false);
      showNotificationMessage("Please fill in all fields or server", "error");
    } else {
      setReviews((prev) => [review, ...prev]);
      setNewReview({ rating: 5, message: "", name: "" });
      setShowReviewModal(false);
      showNotificationMessage("Review submitted successfully!");
    }
  };

  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="max-w-full text-black mx-auto bg-white relative">
      {/* Notification */}
      {showNotification && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            showNotification.type === "error"
              ? "bg-red-500"
              : showNotification.type === "info"
              ? "bg-blue-500"
              : "bg-green-500"
          } text-white flex items-center gap-2`}
        >
          <Check className="w-5 h-5" />
          {showNotification.message}
        </div>
      )}
      {/* Navigation */}
      <div className=" border-gray-200 relative flex items-center justify-center bg-white">
        <div className="h-20 w-full">
          <Header />
        </div>
      </div>
      <div className="px-2.5 md:px-5 lg:px-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 text-start mb-6">
          <span className="hover:text-black cursor-pointer">Home</span>{" "}
          <span className="mx-2">{">"}</span>
          <span className="hover:text-black cursor-pointer">Shop</span>{" "}
          <span className="mx-2">{">"}</span>
          <span className="hover:text-black cursor-pointer">Men</span>{" "}
          <span className="mx-2">{">"}</span>
          <span className="text-black">T-shirts</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="flex gap-4">
            {/* Thumbnail Column */}
            <div className="flex flex-col gap-3">
              {images.map(
                (img, index) => (
                  console.log(img),
                  (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-24 bg-gray-100 rounded-lg border-2 ${
                        selectedImage === index
                          ? "border-black"
                          : "border-gray-200"
                      } overflow-hidden cursor-pointer hover:border-gray-400 transition-colors`}
                    >
                      <img
                        src={`../${Product.image}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
                )
              )}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden relative group">
              <div
                className="aspect-square bg-gray-200 flex items-center justify-center cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={`../${Product.image}`}
                  className={`w-64 h-80 ${
                    colors.find((c) => c.name === selectedColor)?.bg
                  } rounded-lg flex items-center justify-center transition-transform ${
                    isZoomed ? "scale-150" : "scale-100"
                  }`}
                />
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Search className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h1 className="lg:text-3xl md:text-3xl text-xl font-bold">
                  {Product.name}
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={shareProduct}
                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(Math.floor(Product.rating))].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 5
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {Math.floor(Product.rating)}/5
                </span>
                <span className="text-sm text-gray-500">
                  ({reviews.length} reviews)
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold">
                  ₹{Product.price - (Product.discount / 100) * Product.price}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ₹{Product.price}
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                  -{Product.discount}%
                </span>
              </div>

              <p className="text-gray-600 text-start mb-6">
                This graphic t-shirt which is perfect for any occasion. Crafted
                from a soft and breathable fabric, it offers superior comfort
                and style.
              </p>
            </div>

            {/* Color Selection */}
            <div className="text-start">
              <h3 className="font-medium mb-3">Select Colors</h3>
              <div className="flex gap-3">
                <button
                  key={Product.colours}
                  style={{ backgroundColor: Product.colours.toLowerCase() }}
                  //lower case Product.colours Black => black
                  onClick={() => setSelectedColor(Product.colours)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === Product.colours
                      ? "border-black"
                      : "border-gray-300"
                  } hover:border-gray-400 transition-colors relative`}
                  title={Product.colours}
                >
                  {selectedColor === Product.colours && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Selected: {Product.colours}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            {userAuth._id.length < 0 && (
              <div className="flex gap-4">
              <div className="flex items-center border rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 rounded-l-full disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="lg:px-4 lg:py-3 md:px-4 md:py-3 font-medium min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 rounded-r-full disabled:opacity-50"
                  disabled={quantity >= 10}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={addToCart}
                className="flex-1 bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 transition-colors font-medium"
              >
                Add to Cart • ₹
                {(
                  (Product.price - (Product.discount / 100) * Product.price) *
                  quantity
                ).toLocaleString()}
              </button>
            </div>
            )}
            

            {/* Product Features */}
            <div className="border-t pt-6">
              <div className="space-y-3">
                {productFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm text-gray-600"
                  >
                    <feature.icon className="w-5 h-5" />
                    <span>{feature.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <div className="flex border-b">
            {[
              { key: "details", label: "Product Details" },
              { key: "reviews", label: "Rating & Reviews" },
              { key: "faqs", label: "FAQs" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.key
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Details Tab */}
          {activeTab === "details" && (
            <div className="py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Product Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Material:</span>
                      <span>100% Premium Cotton</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fit:</span>
                      <span>Regular Fit</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Care:</span>
                      <span>Machine Wash Cold</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Origin:</span>
                      <span>Made in USA</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Size Guide</h3>
                  <div className="text-sm text-gray-600">
                    <p>All measurements are in inches and approximate:</p>
                    <div className="mt-3 space-y-1">
                      <div>S: Chest 36-38", Length 27"</div>
                      <div>M: Chest 40-42", Length 28"</div>
                      <div>L: Chest 44-46", Length 29"</div>
                      <div>XL: Chest 48-50", Length 30"</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Section */}
          {activeTab === "reviews" && (
            <div className="py-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  All Reviews{" "}
                  <span className="text-gray-500 font-normal">
                    ({reviews.length})
                  </span>
                </h2>
                <div className="flex gap-3">
                  <button className="p-2 border rounded hover:bg-gray-50">
                    <Filter className="w-5 h-5" />
                  </button>
                  <select
                    value={reviewFilter}
                    onChange={(e) => setReviewFilter(e.target.value)}
                    className="border rounded px-3 py-2 text-sm"
                  >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                    <option value="helpful">Most Helpful</option>
                  </select>
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                  >
                    Write a Review
                  </button>
                </div>
              </div>
              {filteredReviews.length <= 0 && (
                <div className="flex items-center mb-10 font-bold justify-center text-center w-full">
                  <h1 className="text-black text-5xl">
                    {messageOfReview}
                  </h1>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredReviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      <button>
                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="font-semibold text-start">
                        {review.name}
                      </h4>
                      {review.verified && (
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full"
                          title="Verified Purchase"
                        ></div>
                      )}
                    </div>

                    <p className="text-gray-600 mb-3 text-start">
                      {review.text}
                    </p>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Posted on {review.date}</span>
                      <button className="hover:text-gray-700">
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Tab */}
          {activeTab === "faqs" && (
            <div className="py-8">
              <div className="space-y-4">
                {[
                  {
                    question: "What is the return policy?",
                    answer:
                      "We offer a 30-day return policy for all unworn items with original tags.",
                  },
                  {
                    question: "How should I care for this t-shirt?",
                    answer:
                      "Machine wash cold with like colors. Tumble dry low. Do not bleach or iron directly on design.",
                  },
                  {
                    question: "Is this t-shirt true to size?",
                    answer:
                      "Yes, this t-shirt runs true to size. Please refer to our size guide for measurements.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Write a Review</h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setNewReview((prev) => ({ ...prev, rating: i + 1 }))
                        }
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            i < newReview.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={newReview.message}
                    onChange={(e) =>
                      setNewReview((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    className="w-full border rounded-lg px-3 py-2 h-24 resize-none"
                    placeholder="Write your review here..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitReview}
                    className="flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
