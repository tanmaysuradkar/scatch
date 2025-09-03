import React, { useState } from 'react';
import { User, Package, MapPin, Wallet, Calendar, ChevronDown, Menu, X, Edit3, Save, Eye, EyeOff } from 'lucide-react';
import Header from '../layout/Header'
import Footer from '../layout/Footer'
export default function UserProfile() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '13/03/2001',
    dayMonthYear: 'DD/MM/DD',
    state: 'Kerala',
    address: 'My House - 234Street',
    pinCode: '680004',
    addressType: 'Home',
    landmark: '',
    mobileNumber: '+91 96567 88677',
    email: 'Sumithabu@gmail.com',
    alternateNumber: ''
  });

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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
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
    
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    return newErrors;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setOriginalData({ ...formData });
  };

  const handleSave = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsEditing(false);
    setErrors({});
    setShowSuccessMessage(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
    
    console.log('Updated profile data:', formData);
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
    
    // Simulate navigation to different sections
    if (sectionId !== 'overview') {
      alert(`Navigating to ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} section`);
    }
  };

  const menuItems = [
    { id: 'overview', icon: User, label: 'Account Overview', active: true },
    { id: 'orders', icon: Package, label: 'My Orders', active: false },
    { id: 'addresses', icon: MapPin, label: 'Manage Addresses', active: false },
    { id: 'wallet', icon: Wallet, label: 'Wallet', active: false }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const formatDateOfBirth = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as DD/MM/YYYY
    if (digits.length >= 6) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    } else if (digits.length >= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    } else if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const handleDateChange = (e) => {
    const formatted = formatDateOfBirth(e.target.value);
    setFormData({
      ...formData,
      dateOfBirth: formatted
    });
  };

  return (
    <div>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          Profile updated successfully!
        </div>
      )}
     {/* Navigation */}
      <div className="h-20 w-full border-gray-200 relative bg-white">
        <div className="h-20 w-full flex items-center justify-center">
         <Header/>
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
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Edit3 size={16} className="text-white" />
            </div>
          </div>
          <div className="bg-black text-white py-2 px-4 rounded-full text-sm font-medium">
            Susmitha S
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
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  item.id === activeSection ? 'bg-black text-white hover:bg-gray-800' : 'text-gray-700'
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
                  className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                >
                  <Save size={16} className="mr-1" />
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    isEditing ? 'bg-white' : 'bg-gray-50'
                  } ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  readOnly={!isEditing}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    isEditing ? 'bg-white' : 'bg-gray-50'
                  } ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  readOnly={!isEditing}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Date of Birth */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <div className="relative">
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleDateChange}
                    placeholder="DD/MM/YYYY"
                    maxLength="10"
                    className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-10 ${
                      isEditing ? 'bg-white' : 'bg-gray-50'
                    } ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                    readOnly={!isEditing}
                  />
                  <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Day / Month / Year</label>
                <input
                  type="text"
                  name="dayMonthYear"
                  value={formData.dayMonthYear}
                  onChange={handleInputChange}
                  className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    isEditing ? 'bg-white' : 'bg-gray-50'
                  } border-gray-300`}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {/* State */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <div className="relative">
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none ${
                      isEditing ? 'bg-white' : 'bg-gray-50'
                    } border-gray-300`}
                    disabled={!isEditing}
                  >
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div></div>
            </div>

            {/* Address */}
            <div className="mb-4 lg:mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none h-20 lg:h-24 ${
                  isEditing ? 'bg-white' : 'bg-gray-50'
                } ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                readOnly={!isEditing}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            {/* Pin Code, Address Type, Landmark */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pin Code</label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  maxLength="6"
                  className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    isEditing ? 'bg-white' : 'bg-gray-50'
                  } ${errors.pinCode ? 'border-red-500' : 'border-gray-300'}`}
                  readOnly={!isEditing}
                />
                {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                <div className="flex items-center space-x-4 mt-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="addressType"
                      value="Home"
                      checked={formData.addressType === 'Home'}
                      onChange={handleInputChange}
                      className="mr-2"
                      disabled={!isEditing}
                    />
                    <span className="text-sm">Home</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="addressType"
                      value="Work"
                      checked={formData.addressType === 'Work'}
                      onChange={handleInputChange}
                      className="mr-2"
                      disabled={!isEditing}
                    />
                    <span className="text-sm">Work</span>
                  </label>
                </div>
              </div>

              <div className="md:col-span-2 xl:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  placeholder="Optional"
                  className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    isEditing ? 'bg-white' : 'bg-gray-50'
                  } border-gray-300`}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {/* Contact Information */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-6">Contact Information</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="+91 xxxxx xxxxx"
                  className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    isEditing ? 'bg-white' : 'bg-gray-50'
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
                  className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    isEditing ? 'bg-white' : 'bg-gray-50'
                  } ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  readOnly={!isEditing}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="mb-6 lg:mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Number (Optional)</label>
              <input
                type="text"
                name="alternateNumber"
                value={formData.alternateNumber}
                onChange={handleInputChange}
                placeholder="+91 xxxxx xxxxx"
                className={`w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                  isEditing ? 'bg-white' : 'bg-gray-50'
                } border-gray-300`}
                readOnly={!isEditing}
              />
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
                    className="bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 transition-colors font-medium text-sm flex items-center"
                  >
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
   </div>
  );
}