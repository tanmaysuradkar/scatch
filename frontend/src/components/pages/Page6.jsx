import { Star } from 'lucide-react';
import React from 'react'

const Page6 = () => {
  return (
    <section className="py-16 m-2 rounded-2xl bg-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          WHAT OUR CLIENT SAYS
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Incredible styles and impeccable quality! [Brand Name] exceeds expectations. Their fashion resonates with my unique taste, making every wear a confident statement. Truly a brand I trust.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "PUTRE MARRISA", username: "@courseafrfonte", rating: 4.6 },
            { name: "MARISAO ANDRE", username: "@courseafrfonte", rating: 4.8 },
            { name: "ANDRIINA ANGEL", username: "@courseafrfonte", rating: 4.9 },
            { name: "GOGONIYA ANDI", username: "@courseafrfonte", rating: 4.8 },
            { name: "ELLISA WANDAI", username: "@courseafrfonte", rating: 4.6 },
            { name: "GEORGE MASER", username: "@courseafrfonte", rating: 4.8 }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  // src={`https://images.unsplash.com/photo-${1507003211169 + index}0-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`} 
                  src="./img/review1.png" 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.username}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                "Li European lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc."
              </p>
              <div className="flex justify-center items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium">{testimonial.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) };

export default Page6