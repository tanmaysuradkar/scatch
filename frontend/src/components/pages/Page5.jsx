import { ArrowRight } from 'lucide-react';
import React from 'react'

const Page5 = () => {
  return (
    <section className=" m-2 rounded-2xl overflow-hidden bg-blue-50">
      <div className="w-full mx-auto overflow-hidden bg-amber-300 ">
        {/* Featured Products */}
        <div className="bg-blue-100 p-9.5 flex items-center justify-between">
          <div className='text-start w-[44%]'>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">FEATURED PRODUCTS</h3>
            <p className="text-gray-600">Showcasing specific products, bestsellers, or seasonal items to attract attention.</p>
          </div>
          <div className='ml-35 py-0.5 rounded-2xl border-2 border-black px-4'>
            <ArrowRight className="lg:w-6 w-3 h-6 font-light text-black" />
            </div>
        </div>

        {/* Product Details */}
        <div className="bg-gray-900 relative p-9.5 flex items-center justify-between text-white">
          <div className='text-start w-[24%]'>
            <h3 className="text-2xl font-bold mb-2">PRODUCT DETAILS</h3>
            <p className="text-gray-300">Providing detailed information about each product, including images, descriptions, prices, and available sizes.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-[40%] absolute bg-amber-700 overflow-hidden flex items-center justify-center h-full left-[40%]">
            <img 
              src="./img/Page5.png" 
              alt="Product detail" 
              className='h-full w-full object-cover'
            />
            </div>
            <div className='py-0.5 ml-55  rounded-2xl border-2 border-black px-4 bg-[#BBF6BE]'>
            <ArrowRight className="lg:w-6 w-3 h-6 font-light text-black" />
            </div>
          </div>
        </div>

        {/* Promotions */}
        <div className="bg-blue-100 p-9.5 flex items-center justify-between">
          <div className='text-start w-[44%]'>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">PROMOTIONS AND DISCOUNTS</h3>
            <p className="text-gray-600">Highlighting ongoing sales, discounts, or special offers to encourage purchases.</p>
          </div>
          <div className='ml-35 py-0.5 rounded-2xl border-2 border-black px-4'>
            <ArrowRight className="lg:w-6 w-3 h-6 font-light text-black" />
            </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-100 p-9.5 flex items-center justify-between">
          <div className='text-start w-[44%]'>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">CONTACT INFORMATION</h3>
            <p className="text-gray-600">Displaying contact details and customer support information for inquiries or assistance.</p>
          </div>
          <div className='ml-35 py-0.5 rounded-2xl border-2 border-black px-4 '>
            <ArrowRight className="lg:w-6 w-3 h-6 font-light text-black" />
            </div>
        </div>
      </div>
    </section>
  )};

export default Page5