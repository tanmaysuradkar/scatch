import { Facebook, Instagram, Youtube } from 'lucide-react';
import React from 'react'

const Page4 = () => {
  return (
    <section className="py-6 m-2 rounded-2xl min-h-screen bg-[#D9D0FF]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex space-x-4 mb-6">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              <Instagram className="w-8 h-8 text-gray-600" />
              <Facebook className="w-8 h-8 text-gray-600" />
              <Youtube className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-700 mb-8 text-start leading-relaxed">
              At Our Product, we breathe life into fashion, where each stitch tells a story of creativity and dedication. Born from a passion for style, we are more than a brand, we are curators of elegance, trendsetters on a mission to redefine fashion norms.
            </p>
            <p className="text-gray-700 mb-8 text-start leading-relaxed">
              Our designs reflect a commitment to quality, innovation, and inclusivity, embracing diversity in every thread. With a legacy of visionary artisans, we shape collections that resonate with the dynamic spirit of modern fashion. Join us on a journey where every garment is a canvas, and style is an expression. Discover the allure of our product – your fashion destination.
            </p>
          </div>

          <div className="text-right">
            <h2 className="text-4xl -mt-20 lg:text-5xl font-bold text-gray-900 leading-tight">
              PASSIONATE<br />
              PIONEERS<br />
              WORLDFASHION
            </h2>
           
          </div>
        </div>
          {/* Img */}
           <div className="mt-15 relative">
              <div className="bg-white rounded-full p-1 inline-block">
                <img 
                  src="./img/Page4.4.png"
                  alt="Fashion accessories" 
                  className="lg:w-200 w-90 h-62 object-cover rounded-full"
                />
              </div>
              <div className="absolute -top-13 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <div className="w-20 lg:w-25 h-20 lg:h-25 bg-white rounded-full overflow-hidden border-4 border-white">
                  <img src="./img/Page4.1.png" alt="Person 1" className="w-full h-full object-cover" />
                </div>
                <div className="w-20 lg:w-25 h-20 lg:h-25 bg-white rounded-full overflow-hidden border-4 border-white">
                  <img src="./img/Page4.2.png" alt="Person 2" className="w-full h-full object-cover" />
                </div>
                <div className="w-20 lg:w-25 h-20 lg:h-25 bg-white rounded-full overflow-hidden border-4 border-white">
                  <img src="./img/Page4.3.png" alt="Person 3" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
      </div>
    </section>
  )};

export default Page4