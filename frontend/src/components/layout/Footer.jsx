import { Facebook, Github, Instagram, Youtube } from 'lucide-react';
import NewsletterSection from '../pages/NewsletterSection'
import React from 'react';

const Footer = () => {
  return(
    <> 
    <NewsletterSection/>
 <footer className="bg-gray-100 mt-50 md:mt-30 lg:mt-15 pt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className='text-start mt-10' >
            <h3 className="text-2xl text-black font-bold mb-2 ml-4">SCRATCH</h3>
            <p className="text-gray-600 mb-5 text-sm">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex space-x-4">
             <div className='p-1 bg-white border-1 border-black rounded-full '><Instagram className="w-6 h-6 hover:text-gray-900 !text-black cursor-pointer" /></div>
              <div className='p-1 bg-black border-1 border-black rounded-full '><Facebook className="w-6 h-6 text-white bg-black hover:text-gray-900 cursor-pointer" /></div> 
              <div className='p-1 bg-white border-1 border-black rounded-full '><Youtube className="w-6 h-6 text-black hover:text-gray-900 cursor-pointer" /></div> 
              <div className='p-1 bg-white border-1 border-black rounded-full '><Github className="w-6 h-6 text-black hover:text-gray-900 cursor-pointer" /></div> 
            </div>
          </div>
        <div className="grid lg:flex lg:grid-cols-6 items-center justify-between grid-cols-2 mt-10 md:grid-cols-5 gap-10">
          
          <div>
            <h4 className="font-bold mb-4 text-start !text-gray-900">COMPANY</h4>
            <ul className="space-y-2 text-sm text-start !text-gray-600">
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">About</a></li>
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">Features</a></li>
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">Works</a></li>
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">Career</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-start text-gray-900">HELP</h4>
            <ul className="space-y-2 text-start text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">Customer Support</a></li>
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">Delivery Details</a></li>
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-start text-gray-900">FAQ</h4>
            <ul className="space-y-2 text-start text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">Account</a></li>
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">Manage Deliveries</a></li>
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">Orders</a></li>
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">Payments</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-start text-gray-900">RESOURCES</h4>
            <ul className="space-y-2 text-start text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">Free eBooks</a></li>
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">Development Tutorial</a></li>
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">How to - Blog</a></li>
              <li><a href="#" className="hover:text-gray-900 !text-start !text-gray-600">Youtube Playlist</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-300 mt-8 pt-8 flex flex-col lg:flex-row items-center justify-between">
          <p className="text-gray-600 text-sm mb-4 lg:mb-0">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          <div className="flex space-x-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
   </>
  )
};

export default Footer;