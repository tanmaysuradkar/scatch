import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, clearUserInfo } from '../../redux/features/userInfo'
 
const Header = () => {
    const userAuth = useSelector((state) => state.userInformation.value)
    const dispatch = useDispatch()
    const isLoggedIn = Boolean(userAuth?._id);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
    // ✅ FIXED: Proper logout handler
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            // Optional: Call backend logout endpoint
            // await axios.get('/logout', { headers: { Authorization: `Bearer ${token}` } });
            
            // Clear Redux state
            dispatch(clearUserInfo());
            
            // Clear localStorage
            localStorage.removeItem('token');
            
            // Redirect to login/home
            navigate('/login');
            
            console.log("✅ User logged out successfully");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };
 
    return (
        <nav className="w-full z-800 fixed top-3">
            <div className="max-w-7xl relative z-900 bg-white/20 rounded-xl backdrop-blur-md shadow-lg ring-1 ring-black/5 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                        >
                            {isMobileMenuOpen ? (
                                <X className="block cursor-pointer h-5 w-5" />
                            ) : (
                                <Menu className="block cursor-pointer h-5 w-5" />
                            )}
                        </button>
                    </div>
 
                    {/* Left Navigation - Desktop */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        <a 
                            onClick={() => navigate("/")} 
                            className='text-gray-600 cursor-pointer text-sm hover:text-black transition-colors'
                        >
                            Home
                        </a>
                        <a 
                            onClick={() => navigate("/shop")} 
                            className='text-gray-600 cursor-pointer text-sm hover:text-black transition-colors'
                        >
                            Product
                        </a>
                        {/* <a onClick={()=> navigate("/Product")} className='text-gray-600 text-sm hover:text-black' >
                          Categories
                        </a>
                        <a onClick={()=> navigate("/cart")} className='text-gray-600 text-sm hover:text-black' >
                          SALE
                        </a> */}
                    </div>
 
                    {/* Center Logo */}
                    <div className="flex-1 cursor-pointer flex justify-center md:flex-none">
                        <h1 
                            onClick={() => navigate("/")} 
                            className="text-2xl text-black font-bold hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            SCRATCH
                        </h1>
                    </div>
 
                    {/* Right Icons */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* ✅ FIXED: Corrected the logic - isLoggedIn (not !isLoggedIn) */}
                        {isLoggedIn ? (
                            <>
                                {/* Shopping Bag */}
                                <div className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200">
                                    <a 
                                        onClick={() => navigate("/cart")} 
                                        className='h-full cursor-pointer w-full flex items-center justify-center'
                                        title="Shopping Cart"
                                    >
                                        <ShoppingBag className="h-5.5 w-5.5" />
                                    </a>
                                </div>
 
                                {/* User Account */}
                                <div className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200">
                                    <a 
                                        onClick={() => navigate("/my-account")} 
                                        className='h-full cursor-pointer w-full flex items-center justify-center'
                                        title="My Account"
                                    >
                                        <User className="h-5.5 w-5.5" />
                                    </a>
                                </div>
 
                                {/* Logout Button */}
                                <div className="text-center">
                                    <button
                                        onClick={handleLogout}
                                        className='cursor-pointer bg-black text-white py-1 px-3 rounded-full hover:bg-gray-800 transition-colors font-medium text-sm'
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Shopping Bag - when not logged in */}
                                <div className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200">
                                    <a 
                                        onClick={() => navigate("/cart")} 
                                        className='h-full cursor-pointer w-full flex items-center justify-center'
                                        title="Shopping Cart"
                                    >
                                        <ShoppingBag className="h-5.5 w-5.5" />
                                    </a>
                                </div>
 
                                {/* Login/Signup Button */}
                                <button
                                    onClick={() => navigate("/login")}
                                    className='cursor-pointer bg-black text-white py-1 px-3 rounded-full hover:bg-gray-800 transition-colors font-medium text-sm'
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate("/signup")}
                                    className='cursor-pointer border-2 border-black text-black py-1 px-3 rounded-full hover:bg-black hover:text-white transition-colors font-medium text-sm'
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
 
                {/* Mobile Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="px-2 pt-2 pb-4 space-y-1 bg-white border-t border-gray-100">
                        <a 
                            onClick={() => {
                                navigate("/");
                                setIsMobileMenuOpen(false);
                            }} 
                            className="block cursor-pointer px-3 py-3 text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                        >
                            Home
                        </a>
                        <a 
                            onClick={() => {
                                navigate("/shop");
                                setIsMobileMenuOpen(false);
                            }} 
                            className="block cursor-pointer px-3 py-3 text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                        >
                            Product
                        </a>
 
                        {/* Mobile Auth Section */}
                        <div className="border-t border-gray-100 pt-3 mt-3">
                            {isLoggedIn ? (
                                <>
                                    <a 
                                        onClick={() => {
                                            navigate("/my-account");
                                            setIsMobileMenuOpen(false);
                                        }} 
                                        className="block cursor-pointer px-3 py-3 text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                    >
                                        My Account
                                    </a>
                                    <a 
                                        onClick={() => {
                                            navigate("/cart");
                                            setIsMobileMenuOpen(false);
                                        }} 
                                        className="block cursor-pointer px-3 py-3 text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                    >
                                        Cart
                                    </a>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="block w-full text-left cursor-pointer px-3 py-3 text-base font-normal text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            navigate("/login");
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="block w-full px-3 py-3 text-base font-normal bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate("/signup");
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="block w-full mt-2 px-3 py-3 text-base font-normal border-2 border-black text-black rounded-md hover:bg-black hover:text-white transition-colors duration-200"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
 
export default Header;
