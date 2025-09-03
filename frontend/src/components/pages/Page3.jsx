import React from 'react'

const Page3 = () => {
  return (
    <section className="py-6 -mb-5 bg-gray-50">
      <div className="max-w-[1345px] h-[90%] mx-auto px-2">
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-2">
          {/* Product 1 - Bolsas */}
          <div className="bg-white w-full h-48 rounded-2xl overflow-hidden">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Canvas Bag with owl design" 
                className="w-full h-48 object-cover"
              />
              <div className=" absolute bottom-10 right-10  transform  bg-white h-10 w-60 text-black text-center flex justify-center items-center rounded-full text-sm font-light cursor-pointer shadow-lg">
                Bolsas
              </div>
            </div>
          </div>

          {/* Product 2 - Pants */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Outdoor backpack" 
                className="w-full h-100 object-cover"
              />
              <div className=" absolute bottom-10 left-10 bg-white h-10 w-60 text-black text-center flex justify-center items-center rounded-full text-sm font-light cursor-pointer shadow-lg">
                Pants
              </div>
            </div>
          </div>

          {/* Product 3 - Dresses */}
          <div className="bg-white rounded-2xl -mt-51.5 overflow-hidden">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Black leather tote bag" 
                className="w-full rounded-2xl h-100 object-cover"
              />
              <div className=" absolute bottom-10 right-10 bg-white h-10 w-60 text-black text-center flex justify-center items-center rounded-full text-sm font-light cursor-pointer shadow-lg">
                Dresses
              </div>
            </div>
          </div>

          {/* Product 4 - Outwear */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Leather handbag" 
                className="w-full rounded-2xl h-48 object-cover"
              />
              <div className=" absolute bottom-10 right-10 bg-white h-10 w-60 text-black text-center flex justify-center items-center rounded-full text-sm font-light cursor-pointer shadow-lg">
                Outwear
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )};

export default Page3