import React  from "react";
import { ArrowRight } from "lucide-react";
import { useSelector } from 'react-redux'
const FashionApp = () => {
  return (
    <section className=" !pt-18 relative flex items-center justify-center text-center">
      <div className="lg:h-[97.5vh] md:h-[190vh] h-[120vh] w-[99%] rounded-2xl z-0 overflow-hidden top-2 absolute">
        <img
          src="./backgrow.png"
          className="h-full rounded-2xl w-full object-cover top-0 z-0 absolute"
          alt=""
        />
      </div>
      <div className="max-w-7xl z-10 relative flex items-center justify-center text-cente mx-auto px-4">
        <div className="min-h-scree mt-5 relative">
          {/* Main Hero Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5  pb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-4 flex justify-start text-start flex-col">
                {/* Main Heading */}
                <div className="space-y-6 font-serif">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    FIND YOUR
                  </h1>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    FASHION{}
                  </h1>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    BAG TODAY
                  </h1>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 max-w-md leading-relaxed">
                  Dress to impress with our latest collection, curated for
                  trendsetters seeking chic and timeless style. Elevate your
                  wardrobe today!
                </p>

                {/* CTA Button */}
                <div className="flex items-center gap-4">
                  <button className="bg-black cursor-pointer text-white h-10 w-40 !py-7 flex items-center justify-center text-center !rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors duration-200">
                    BUY NOW
                  </button>
                  <div className="h-15 w-15 flex items-center justify-center text-center !rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-200  bg-white -rotate-40">
                    <ArrowRight className="[transform:scalex(1.8)] text-black" />
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-8 pt-8">
                  <div className="text-center lg:text-left">
                    <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      1+
                    </div>
                    <div className="text-sm text-gray-600 uppercase tracking-wide">
                      YEARS OF EXPERIENCE
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      21K+
                    </div>
                    <div className="text-sm text-gray-600 uppercase tracking-wide">
                      HAPPY CUSTOMERS
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      20+
                    </div>
                    <div className="text-sm text-gray-600 uppercase tracking-wide">
                      PRODUCT BRAND
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="relative h-full">
                {/* Main Image Container */}
                <div className="relative -mt-10">
                  <div className="h-80 flex items-center w-full justify-center gap-2 relative">
                    <div className="h-[90%] overflow-hidden bg-[#32D3AC] w-[39%] rounded-tl-[70px]">
                        <img
                        src="./img/Banner (1).png"
                        className="h-full w-full object-cover"
                        alt=""
                      />
                    </div>
                    <div className="h-[90%] bg-gray-400 w-[39%] rounded-tr-[70px]">
                      <img
                        src="./img/Hero2.png"
                        className="h-full w-full object-cover"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="h-50 w-50 absolute flex items-center justify-center text-center top-[60%] bg-white left-[50%] [transform:translateX(-50%)] rounded-full ">
                    <div className="h-45 w-45 overflow-hidden rounded-full border-2 border-black ">
                      <img
                        src="./img/Hero.png"
                        className="h-full p-3 pl-5 w-full object-cover"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                {/* Bottom Feature Cards */}
                <div className="flex justify-around items-center text-center mt-30">
                  {/* Premium Quality */}
                  <div className="bg-purple-100 rounded-2xl p-4 flex items-center">
                    <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">
                        PREMIUM QUALITY
                      </div>
                      <div className="font-semibold text-sm text-gray-900">
                        MATERIALS
                      </div>
                    </div>
                  </div>
                  {/* Top Products */}
                  <div className="bg-green-100 rounded-2xl p-4">
                    <div className="font-semibold text-sm text-gray-900">
                      TOP PRODUCTS THIS
                    </div>
                    <div className="font-semibold text-sm text-gray-900">
                      MONTH
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FashionApp;
