import React from "react";

const Page2 = () => {
  return (
    <section className="lg:py-5 -mt-8 lg:mt-5 lg:h-screen h-1/2 flex items-center justify-center text-center bg-white">
      <div className="w-[99%] h-full rounded-2xl bg-[#F0EFE9] flex items-center justify-center mx-auto">
        <div className="grid grid-cols-3 gap-10 lg:gap-42 justify-between items-center">
          {/* Product Image */}
          <div className=" relative lg:h-140 md:h-120 flex items-center justify-center">
            <div className="h-[100%] w-[100%] lg:w-[50%]">
              <img
                src="./img/Page1.png"
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="text-center flex items-center flex-col justify-center">
            <h2 className="text-4xl lg:text-4xl font-medium text-gray-900 mb-1">
              SCRATCH
              <br />
              <span className="text-2xl text-gray-700">BAG</span>
            </h2>
            <div className="w-[30%] h-0.5 bg-gray-600 mx-auto"></div>
            <p className="text-black mb-6 max-w-md mx-auto">
              Make your everyday look prettier
              <span>with Scratch Bag Made</span>
            </p>
          </div>
          {/* Second Product Image */}
         <div className=" relative lg:h-140 md:h-120 flex items-center justify-center">
            <div className="h-[100%] w-[100%] lg:w-[50%]">
              <img
                src="./img/Page2.png"
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page2;
