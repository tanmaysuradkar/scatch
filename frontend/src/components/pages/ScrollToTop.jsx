import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 50; // smaller = slower
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 16); // ~60fps
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          onMouseEnter={() => {
            props.sethover(true);
          }}
          onMouseLeave={() => {
            props.sethover(false);
          }}
          className="flex z-50 absolute bottom-20 right-10 items-center gap-3 text-black font-medium hover:text-gray-900 transition-colors"
        >
          BACK TO TOP
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-black transition-colors">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              ></path>
            </svg>
          </div>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
