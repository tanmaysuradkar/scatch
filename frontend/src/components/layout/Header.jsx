import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
const Header = () => {
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
                <X className="block h-5 w-5" />
              ) : (
                <Menu className="block h-5 w-5" />
              )}
            </button>
          </div>

          {/* Left Navigation - Desktop */}
          <div className="hidden md:flex  items-center space-x-6 lg:space-x-8">
            <a href="/" className='text-gray-600 text-sm hover:text-black' >
              Home
            </a>
            <a href="/Shop"className='text-gray-600 text-sm hover:text-black' >
              Product
            </a>
            <a href="/Product"className='text-gray-600 text-sm hover:text-black' >
              Categories
            </a>
            <a href="./Wish"className='text-gray-600 text-sm hover:text-black' >
              SALE
            </a>
          </div>

          {/* Center Logo */}
          <div className="flex-1 flex justify-center md:flex-none">
            <h1 className="text-2xl text-black font-bold">SCRATCH</h1>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search - Desktop */}
            <div className="hidden sm:block relative">
              <input
                type="text"
                placeholder="Search Bag"
                className="pl-5 pr-2 py-1 border border-gray-300 rounded-full w-40 focus:outline-none focus:border-gray-400 bg-gray-50 text-black"
              />
              <div className="p-1 absolute right-2.5 top-1/2  transform -translate-y-1/2  !text-black hover:bg-gray-100 rounded-md transition-colors duration-200">
                <Search className='h-4 w-4' />
              </div>
            </div>

            {/* Search Icon - Mobile
            <button className="sm:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200">
              <Search className="h-5 w-5" />
            </button> */}

            {/* Shopping Bag */}
            <div className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200">
               <a href="/Wish" className='h-full w-full' ><ShoppingBag className="h-5.5 w-5.5" /></a>
            </div>

            {/* User Account */}
            <div className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200">
               <a href="/Sigup" className='h-full w-full' ><User className="h-5.5 w-5.5" /></a>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-4 space-y-1 bg-white border-t border-gray-100">
            <a href="#" className="block px-3 py-3 text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-40 rounded-md transition-colors duration-200">
              Home
            </a>
            <a href="#" className="block px-3 py-3 text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200">
              Product
            </a>
            <a href="#" className="block px-3 py-3 text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200">
              Categories
            </a>
            <a href="#" className="block px-3 py-3 text-base font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200">
              SALE
            </a>
            
            {/* Mobile Search */}
            <div className="px-3 pt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-3 pr-9 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                />
                <button className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;