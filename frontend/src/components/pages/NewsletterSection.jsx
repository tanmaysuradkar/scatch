import React from 'react';
import Button from './Button';

const NewsletterSection = () => {
  return (
    <section className="py-10 w-[90%] absolute left-1/2 transform -translate-x-1/2 rounded-4xl bg-black">
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <h2 className="!text-white !text-4xl lg:text-3xl !font-bold mb-6 lg:mb-0">
            STAY UPTO DATE ABOUT<br />
            OUR LATEST OFFERS
          </h2>
          <div className="!bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
            follower on Instagram
          </div>
        </div>
      </div>
    </section>);
  };

export default NewsletterSection;