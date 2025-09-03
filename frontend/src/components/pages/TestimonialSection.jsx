import React from 'react';

const TestimonialSection = () => {
  return (
    <section className="relative bg-purple-100 rounded-3xl py-16 px-6 md:px-10 lg:px-20 my-16 overflow-hidden">
      {/* Background vectors */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 17 }).map((_, index) => (
          <img 
            key={index} 
            src={`/images/vector${index + 1}.svg`} 
            alt="" 
            className="absolute" 
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: Math.random() * 0.5 + 0.5
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">What Our Client Says</h2>
        <p className="text-lg text-gray-600">
          Incredible styles and impeccable quality! [Brand Name] exceeds expectations. 
          Their fashion resonates with my unique taste, making every wear a confident statement. 
          Truly a brand I trust
        </p>
      </div>
      
      {/* Testimonial Card */}
      <div className="relative z-10 max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <img src="/images/testimonial-image.svg" alt="Testimonial" className="w-full h-full object-cover" />
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-gray-600 italic mb-4">
                "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. 
                Por scientie, musica, sport etc."
              </p>
              <p className="text-purple-600 font-medium">@accountname</p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Putre Marrisa</h4>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <img key={index} src="/images/star.svg" alt="Star" className="w-5 h-5" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;