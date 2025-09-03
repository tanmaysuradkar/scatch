import React, { useState } from 'react';
import { Star, Plus, Minus, MoreHorizontal, Filter, ChevronDown, Heart, Share2, Truck, Shield, RotateCcw, Search, Check, X } from 'lucide-react';
import Header from '../layout/Header'
import Footer from '../layout/Footer'
export default function TShirtProductPage() {
  const [selectedColor, setSelectedColor] = useState('olive');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('reviews');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState('');
  const [reviewFilter, setReviewFilter] = useState('latest');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, text: '', name: '' });
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Samantha D.",
      rating: 5,
      date: "August 19, 2023",
      text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      name: "Alex M.",
      rating: 5,
      date: "August 15, 2023",
      text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is fantastic. Being a UIUX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
      verified: false,
      helpful: 8
    }
  ]);

  const colors = [
    { name: 'olive', bg: 'bg-green-700', label: 'Olive Green' },
    { name: 'gray', bg: 'bg-gray-600', label: 'Charcoal Gray' },
    { name: 'navy', bg: 'bg-blue-900', label: 'Navy Blue' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const images = [
    '/api/placeholder/400/500',
    '/api/placeholder/400/500',
    '/api/placeholder/400/500'
  ];

  const productFeatures = [
    { icon: Truck, text: 'Free shipping on orders over $100' },
    { icon: RotateCcw, text: '30-day return policy' },
    { icon: Shield, text: '2-year warranty included' }
  ];

  // Show notification
  const showNotificationMessage = (message, type = 'success') => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification(''), 3000);
  };

  // Add to cart functionality
  const addToCart = () => {
    const item = {
      id: Date.now(),
      name: 'ONE LIFE GRAPHIC T-SHIRT',
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      price: 260,
      image: images[selectedImage]
    };
    
    setCartItems(prev => [...prev, item]);
    showNotificationMessage(`Added ${quantity} item(s) to cart!`);
  };

  // Add to favorites
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    showNotificationMessage(
      isFavorite ? 'Removed from favorites' : 'Added to favorites!',
      isFavorite ? 'info' : 'success'
    );
  };

  // Share product
  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ONE LIFE GRAPHIC T-SHIRT',
          text: 'Check out this amazing t-shirt!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      showNotificationMessage('Link copied to clipboard!');
    }
  };

  // Filter reviews
  const filteredReviews = [...reviews].sort((a, b) => {
    switch (reviewFilter) {
      case 'newest': return new Date(b.date) - new Date(a.date);
      case 'oldest': return new Date(a.date) - new Date(b.date);
      case 'highest': return b.rating - a.rating;
      case 'lowest': return a.rating - b.rating;
      case 'helpful': return b.helpful - a.helpful;
      default: return new Date(b.date) - new Date(a.date);
    }
  });

  // Submit review
  const submitReview = () => {
    if (!newReview.name.trim() || !newReview.text.trim()) {
      showNotificationMessage('Please fill in all fields', 'error');
      return;
    }

    const review = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      text: newReview.text,
      verified: false,
      helpful: 0
    };

    setReviews(prev => [review, ...prev]);
    setNewReview({ rating: 5, text: '', name: '' });
    setShowReviewModal(false);
    showNotificationMessage('Review submitted successfully!');
  };

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="max-w-full text-black mx-auto bg-white relative">
      {/* Notification */}
      {showNotification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          showNotification.type === 'error' ? 'bg-red-500' : 
          showNotification.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
        } text-white flex items-center gap-2`}>
          <Check className="w-5 h-5" />
          {showNotification.message}
        </div>
      )}
      {/* Navigation */}
      <div className=" border-gray-200 relative flex items-center justify-center bg-white">
        <div className="h-20 w-full">
         <Header/>
        </div>
      </div>
      <div className='px-2.5 md:px-5 lg:px-10'>
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 text-start mb-6">
        <span className="hover:text-black cursor-pointer">Home</span> <span className="mx-2">{">"}</span>
        <span className="hover:text-black cursor-pointer">Shop</span> <span className="mx-2">{">"}</span>
        <span className="hover:text-black cursor-pointer">Men</span> <span className="mx-2">{">"}</span>
        <span className="text-black">T-shirts</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="flex gap-4">
          {/* Thumbnail Column */}
          <div className="flex flex-col gap-3">
            {images.map((img, index) => (
              <div 
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-24 bg-gray-100 rounded-lg border-2 ${
                  selectedImage === index ? 'border-black' : 'border-gray-200'
                } overflow-hidden cursor-pointer hover:border-gray-400 transition-colors`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          
          {/* Main Image */}
          <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden relative group">
            <div 
              className="aspect-square bg-gray-200 flex items-center justify-center cursor-zoom-in"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <div className={`w-64 h-80 ${colors.find(c => c.name === selectedColor)?.bg} rounded-lg flex items-center justify-center transition-transform ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}>
                <div className="text-white font-bold text-xl">One Life</div>
              </div>
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
              <h1 className="lg:text-3xl md:text-3xl text-xl font-bold">ONE LIFE GRAPHIC T-SHIRT</h1>
              <div className="flex gap-2">
                <button 
                  onClick={toggleFavorite}
                  className={`p-2 rounded-full border ${
                    isFavorite ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 hover:bg-gray-50'
                  } transition-colors`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
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
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${
                    i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`} />
                ))}
              </div>
              <span className="text-sm text-gray-600">{averageRating.toFixed(1)}/5</span>
              <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold">$260</span>
              <span className="text-xl text-gray-400 line-through">$300</span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">-40%</span>
            </div>
            
            <p className="text-gray-600 text-start mb-6">
              This graphic t-shirt which is perfect for any occasion. Crafted from a soft and 
              breathable fabric, it offers superior comfort and style.
            </p>
          </div>

          {/* Color Selection */}
          <div className='text-start'>
            <h3 className="font-medium mb-3">Select Colors</h3>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-10 h-10 rounded-full ${color.bg} border-2 ${
                    selectedColor === color.name ? 'border-black' : 'border-gray-300'
                  } hover:border-gray-400 transition-colors relative`}
                  title={color.label}
                >
                  {selectedColor === color.name && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Selected: {colors.find(c => c.name === selectedColor)?.label}
            </p>
          </div>

          {/* Size Selection */}
          <div className='text-start'>
            <h3 className="font-medium mb-3">Choose Size</h3>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                    selectedSize === size 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4">
            <div className="flex items-center border rounded-full">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-100 rounded-l-full disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="lg:px-4 lg:py-3 md:px-4 md:py-3 font-medium min-w-[60px] text-center">{quantity}</span>
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
              Add to Cart • ${(260 * quantity).toLocaleString()}
            </button>
          </div>

          {/* Product Features */}
          <div className="border-t pt-6">
            <div className="space-y-3">
              {productFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-gray-600">
                  <feature.icon className="w-5 h-5" />
                  <span>{feature.text}</span>
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
            { key: 'details', label: 'Product Details' },
            { key: 'reviews', label: 'Rating & Reviews' },
            { key: 'faqs', label: 'FAQs' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === tab.key 
                  ? 'border-b-2 border-black text-black' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Details Tab */}
        {activeTab === 'details' && (
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
        {activeTab === 'reviews' && (
          <div className="py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                All Reviews <span className="text-gray-500 font-normal">({reviews.length})</span>
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
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <button>
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="font-semibold text-start">{review.name}</h4>
                    {review.verified && (
                      <div className="w-2 h-2 bg-green-500 rounded-full" title="Verified Purchase"></div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3 text-start">{review.text}</p>
                  
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
        {activeTab === 'faqs' && (
          <div className="py-8">
            <div className="space-y-4">
              {[
                {
                  question: "What is the return policy?",
                  answer: "We offer a 30-day return policy for all unworn items with original tags."
                },
                {
                  question: "How should I care for this t-shirt?",
                  answer: "Machine wash cold with like colors. Tumble dry low. Do not bleach or iron directly on design."
                },
                {
                  question: "Is this t-shirt true to size?",
                  answer: "Yes, this t-shirt runs true to size. Please refer to our size guide for measurements."
                }
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
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setNewReview(prev => ({ ...prev, rating: i + 1 }))}
                      className="p-1"
                    >
                      <Star className={`w-6 h-6 ${
                        i < newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <textarea
                  value={newReview.text}
                  onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
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
      <Footer/>
    </div>
  );
}