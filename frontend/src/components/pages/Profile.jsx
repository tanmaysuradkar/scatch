import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, Wallet, Calendar, ChevronDown, Menu, X, Edit3, Save, Eye, EyeOff } from 'lucide-react';
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { useSelector } from 'react-redux'
import axios from "axios";

export default function UserProfile() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const userAuth = useSelector((state) => state.userInformation.value);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullname: '',
    state: '',
    picture: '',
    address: '',
    pinCode: "",
    addressType: '',
    landmark: '',
    mobileNumber: "",
    email: '',
  });

  // Initialize form data when user auth data is available
  useEffect(() => {
    if (userAuth) {
      setFormData({
        fullname: userAuth.fullname || '',
        email: userAuth.email || '',
        state: userAuth.state || '',
        // Convert boolean/falsy addressType to appropriate string
        addressType: userAuth.addressType === 'Work' ? 'Work' : 'Home',
        mobileNumber: userAuth.mobileNumber || '',
        landmark: userAuth.Landmark || userAuth.landmark || '', // Handle both cases
        // Ensure pinCode is not "0" - treat it as empty if it is
        pinCode: userAuth.pinCode && userAuth.pinCode !== "0" ? userAuth.pinCode : '',
        address: userAuth.address || '',
        picture: userAuth.picture || '',
      });
    }
  }, [userAuth]);

  const [originalData, setOriginalData] = useState({ ...formData });

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\+91\s\d{5}\s\d{5}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid mobile number (+91 xxxxx xxxxx)';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'Pin code is required';
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'Pin code must be 6 digits';
    }

    return newErrors;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setOriginalData({ ...formData });
  };

  const handleSave = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Prepare data to send (use Landmark with capital L to match backend)
      const dataToSend = {
        ...formData,
        Landmark: formData.landmark, // Send as Landmark to backend
      };

      const res = await axios.post(
        `${import.meta.env.VITE_backendURL}users/userInfomation`,
        dataToSend,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );

      if (res.data.success) {
        setIsEditing(false);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }

    } catch (err) {
      console.error(err);
      setErrors({ submit: err.response?.data?.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
    setErrors({});
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      alert('Logging out... Redirecting to login page');
      // Here you would typically redirect to login page
      // window.location.href = '/login';
    }
  };

  const handleSectionChange = (sectionId) => {
    if (isEditing) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) return;
      setIsEditing(false);
      setFormData({ ...originalData });
      setErrors({});
    }

    setActiveSection(sectionId);
    setSidebarOpen(false);
  };

  const menuItems = [
    { id: 'overview', icon: User, label: 'Account Overview', active: true },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          Profile updated successfully!
        </div>
      )}
      
      {/* Error Message */}
      {errors.submit && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {errors.submit}
        </div>
      )}
      
      {/* Navigation */}
      <div className="h-20 w-full border-gray-200 relative bg-white">
        <div className="h-20 w-full flex items-center justify-center">
          <Header />
        </div>
      </div>
      
      <div className="min-h-screen bg-gray-50 flex">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-md"
        >
          <Menu size={20} />
        </button>

        {/* Sidebar */}
        <div className={`fixed lg:static inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out w-72 lg:w-80 bg-white shadow-lg z-40`}>
          {/* Mobile Close Button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden absolute top-4 right-4 text-gray-600"
          >
            <X size={20} />
          </button>

          {/* Profile Section */}
          <div className="p-6 text-center border-b">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 relative group">
              <img
                src={userAuth?.picture || "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-black text-white py-2 px-4 rounded-full text-sm font-medium">
              {userAuth?.fullname || 'User'}
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-4 flex-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${item.id === activeSection ? 'bg-black text-white hover:bg-gray-800' : 'text-gray-700'
                    }`}
                >
                  <IconComponent size={18} className="mr-3" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
            >
              LOGOUT
            </button>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 text-black ml-0">
          <div className="max-w-4xl mx-auto mt-12 lg:mt-0">
            <div className="flex justify-between items-center mb-6 lg:mb-8">
              <div>
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">Your Details</h1>
                <p className="text-gray-600 text-sm">Personal Information</p>
              </div>
              {isEditing && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center disabled:opacity-50"
                  >
                    <Save size={16} className="mr-1" />
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white text-black rounded-lg shadow-sm p-4 lg:p-8">
              {/* Full Name and State */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${isEditing ? 'bg-white cursor-text' : 'bg-gray-50 cursor-default'
                      } ${errors.fullname ? 'border-red-500' : 'border-gray-300'}`}
                    readOnly={!isEditing}
                  />
                  {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <div className="relative">
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none ${isEditing ? 'bg-white cursor-pointer' : 'bg-gray-50 cursor-default'
                        } border-gray-300`}
                      disabled={!isEditing}
                    >
                      <option value="">Select a state</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none h-20 lg:h-24 ${isEditing ? 'bg-white cursor-text' : 'bg-gray-50 cursor-default'
                    } ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  readOnly={!isEditing}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              {/* Pin Code, Address Type, Landmark */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pin Code</label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    maxLength="6"
                    className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${isEditing ? 'bg-white cursor-text' : 'bg-gray-50 cursor-default'
                      } ${errors.pinCode ? 'border-red-500' : 'border-gray-300'}`}
                    readOnly={!isEditing}
                  />
                  {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="addressType"
                        value="Home"
                        checked={formData.addressType === 'Home'}
                        onChange={handleInputChange}
                        className="mr-2 cursor-pointer"
                        disabled={!isEditing}
                      />
                      <span className="text-sm">Home</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="addressType"
                        value="Work"
                        checked={formData.addressType === 'Work'}
                        onChange={handleInputChange}
                        className="mr-2 cursor-pointer"
                        disabled={!isEditing}
                      />
                      <span className="text-sm">Work</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="Optional"
                    className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${isEditing ? 'bg-white cursor-text' : 'bg-gray-50 cursor-default'
                      } border-gray-300`}
                    readOnly={!isEditing}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Information</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="+91 xxxxx xxxxx"
                    className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${isEditing ? 'bg-white cursor-text' : 'bg-gray-50 cursor-default'
                      } ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'}`}
                    readOnly={!isEditing}
                  />
                  {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${isEditing ? 'bg-white cursor-text' : 'bg-gray-50 cursor-default'
                      } ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    readOnly={!isEditing}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Edit Button */}
              <div className="flex justify-center">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="bg-black text-white py-3 px-8 lg:px-12 rounded-md hover:bg-gray-800 transition-colors font-medium text-sm flex items-center"
                  >
                    <Edit3 size={16} className="mr-2" />
                    Edit
                  </button>
                ) : (
                  <div className="flex space-x-4">
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white py-3 px-8 rounded-md hover:bg-gray-600 transition-colors font-medium text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 transition-colors font-medium text-sm flex items-center disabled:opacity-50"
                    >
                      <Save size={16} className="mr-2" />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}