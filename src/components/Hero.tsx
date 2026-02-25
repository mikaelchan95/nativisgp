import React from 'react';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="w-full h-full">
          <img 
            src="/imgs/homepage hero.jpg"
            alt="Premium Spirits"
            className="absolute w-full h-full object-cover bg-black"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto flex items-center px-4 sm:px-6 lg:px-8">
        <div className="text-white max-w-3xl">
          <p className="text-sm tracking-[0.3em] mb-8">INNOVATION</p>
          <h1 className="hero-title font-light mb-8" id="main-heading">
            We move at <span className="font-playfair italic">pace</span>
            <br />with the latest trends
          </h1>
          <p className="text-lg leading-relaxed text-gray-200 max-w-2xl font-light">
            We build on great innovation. We create premium spirits for every celebration.
            From established favorites to exciting new flavors, we craft experiences 
            that bring people together for memorable moments.
          </p>
          <div className="mt-12 flex space-x-8">
            <button 
              onClick={() => scrollToSection('brands')}
              className="px-12 py-4 border border-white text-sm tracking-wider hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              DISCOVER
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="group px-12 py-4 text-sm tracking-wider hover:text-[#00B14F] transition-all duration-300 flex items-center"
            >
              LEARN MORE 
              <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div 
          className="animate-bounce cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <div className="w-[2px] h-8 bg-white/50 mx-auto mb-2"></div>
          <p className="text-white/70 text-xs tracking-wider text-center">SCROLL</p>
        </div>
      </div>
    </div>
  );
}