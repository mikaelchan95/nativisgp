import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const calculateTimeLeft = (targetDate: string) => {
  const difference = new Date(targetDate).getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60)
  };
};

const brands = [
  {
    name: "Eldoria",
    logo: "https://i.imgur.com/ln9ipPv.png",
    tagline: "Elderflower",
    description: "A refined elderflower liqueur capturing the subtle sweetness of hand-picked elderflowers.",
    year: "2024",
    website: "https://eldoriatales.com"
  },
  {
    name: "Lumina",
    logo: "https://i.imgur.com/Tv4BpiT.png",
    tagline: "Triple Sec",
    description: "Premium triple-sec crafted from Mediterranean oranges, delivering bright and complex citrus notes.",
    year: "2024",
    website: "https://luminaorange.com"
  },
  {
    name: "Lush",
    logo: "/imgs/Lush_Logo_v2.png",
    tagline: "Lychee",
    description: "With a soft delicate sweetness and romantic fragrant charm, it offers a taste that embodies the allure of love immortalised in flavour.",
    year: "2025",
    website: "https://lushlychee.com"
  },
  {
    name: "Hofman",
    logo: "/imgs/HOFMAN NAME.png",
    tagline: "Peach",
    description: "Each sip, infused with the bold essence of sun-drenched peaches, mirrors the vibrant pulse of life — a delicate dance of nature's beauty.",
    year: "2025",
    website: "https://hofmanpeach.com"
  },
  {
    name: "1933",
    logo: "/imgs/1933_Logo.png",
    tagline: "Coffee",
    description: "Crafted slowly, with purpose, it's a bold pause in a fast-moving world.",
    year: "2025"
  },
  {
    name: "Cocotoo",
    logo: "/imgs/Cocotoo_Logo.png",
    tagline: "Coconut",
    description: "A truly joyful and intimate experience, offering a rich, smooth blend that celebrates love, connection, and the spirit of togetherness.",
    year: "2025"
  },
  {
    name: "Back To The Roots",
    logo: "/imgs/BackToTheRoots_Logo.png",
    tagline: "Root Beer",
    description: "A journey across generations, cultures, and traditions.",
    year: "2025"
  },
  {
    name: "iki",
    logo: "https://jnlciwmbqgfpiztiaxba.supabase.co/storage/v1/object/public/Nativis%20GP/IMAGES/Iki.png",
    tagline: "Yuzu",
    description: "Capturing the distinctive citrus essence of Japanese yuzu, delivering a unique and refreshing taste experience.",
    year: "2025"
  }
];

export default function Brands() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeBrand, setActiveBrand] = useState(0);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(brands[activeBrand]?.launchDate || ''));

  useEffect(() => {
    if (brands[activeBrand]?.comingSoon && brands[activeBrand]?.launchDate) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(brands[activeBrand].launchDate));
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [activeBrand]);

  useEffect(() => {
    if (brands[activeBrand]?.comingSoon && brands[activeBrand]?.launchDate) {
      setTimeLeft(calculateTimeLeft(brands[activeBrand].launchDate));
    }
  }, [activeBrand]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    const newScrollLeft = direction === 'left' 
      ? scrollRef.current.scrollLeft - scrollAmount
      : scrollRef.current.scrollLeft + scrollAmount;
    
    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleBrandClick = (index: number) => {
    setActiveBrand(index);
  };

  return (
    <section id="brands" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm tracking-[0.3em] text-[#00B14F] mb-6 block">OUR PORTFOLIO</span>
          <h2 className="text-4xl font-light text-gray-900 mb-8" id="premium-liqueurs">
            Premium <span className="font-playfair italic">Liqueurs</span> Collection
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our premium liqueur collection combines tradition with innovation. 
            Each bottle delivers extraordinary flavors. Every sip creates memorable experiences.
          </p>
        </div>

        {/* Draggable Brand Carousel */}
        <div className="relative mb-16">
          {/* Navigation Arrows */}
          <button
            onClick={() => scrollTo('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-shadow"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button
            onClick={() => scrollTo('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-shadow"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Scrollable Brand Container */}
          <div
            ref={scrollRef}
            className="flex space-x-8 overflow-x-auto hide-scrollbar py-8 px-16 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {brands.map((brand, index) => (
              <div
                key={index}
                onClick={() => handleBrandClick(index)}
                className={`flex-shrink-0 w-80 h-96 bg-gradient-to-br from-[#00B14F]/5 to-transparent rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
                  index === activeBrand 
                    ? 'ring-2 ring-[#00B14F] shadow-xl scale-105' 
                    : 'hover:shadow-lg hover:scale-102'
                }`}
              >
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-48 h-48 mb-6 flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain"
                      draggable={false}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{brand.name}</h3>
                  <p className="text-[#00B14F] text-sm tracking-wider mb-2">{brand.tagline}</p>
                  <span className="text-xs text-gray-500">EST. {brand.year}</span>
                  
                  {brand.comingSoon && (
                    <div className="mt-4 bg-[#00B14F]/10 px-3 py-1 rounded-full">
                      <span className="text-xs text-[#00B14F] font-medium">
                        {brand.tagline === "Coming Soon" ? "COMING SOON" : brand.tagline.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Brand Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Brand Details */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-sm tracking-[0.3em] text-[#00B14F]">EST. {brands[activeBrand].year}</span>
                <h3 className="text-3xl font-medium text-gray-900">
                  {brands[activeBrand].name} - {brands[activeBrand].tagline}
                </h3>
                
                {brands[activeBrand].comingSoon && (
                  <div className="mt-6 bg-[#00B14F]/5 p-6 rounded-xl">
                    {brands[activeBrand].launchDate ? (
                      <>
                        <p className="text-[#00B14F] font-medium mb-4">
                          Launching {brands[activeBrand].tagline}
                        </p>
                        <div className="flex space-x-6 text-sm">
                          <div className="text-center">
                            <span className="block text-3xl font-semibold text-[#00B14F]">{timeLeft.days}</span>
                            <span className="text-gray-500">Days</span>
                          </div>
                          <div className="text-center">
                            <span className="block text-3xl font-semibold text-[#00B14F]">{timeLeft.hours}</span>
                            <span className="text-gray-500">Hours</span>
                          </div>
                          <div className="text-center">
                            <span className="block text-3xl font-semibold text-[#00B14F]">{timeLeft.minutes}</span>
                            <span className="text-gray-500">Minutes</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <p className="text-[#00B14F] font-medium text-lg">Coming Soon</p>
                        <p className="text-gray-600 mt-2">Stay tuned for updates on our launch date</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {brands[activeBrand].description}
              </p>
              
              {brands[activeBrand].website && !brands[activeBrand].comingSoon && (
                <a
                  href={brands[activeBrand].website}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-2 text-[#00B14F] hover:text-[#009B44] transition-colors group"
                >
                  <span className="text-sm tracking-wider">DISCOVER MORE</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </div>
          </div>

          {/* Right: Large Brand Visual */}
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00B14F]/10 to-transparent rounded-2xl"></div>
            <div className="relative h-full flex items-center justify-center p-12">
              {brands[activeBrand].website && !brands[activeBrand].comingSoon ? (
                <a 
                  href={brands[activeBrand].website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transform transition-all duration-500 hover:scale-110"
                >
                  <img
                    src={brands[activeBrand].logo}
                    alt={brands[activeBrand].name}
                    className="max-w-[80%] max-h-[80%] object-contain mx-auto"
                  />
                </a>
              ) : (
                <img
                  src={brands[activeBrand].logo}
                  alt={brands[activeBrand].name}
                  className="max-w-[80%] max-h-[80%] object-contain mx-auto transform transition-all duration-500"
                />
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="relative">
          <div className="bg-gray-900 rounded-2xl overflow-hidden">
            <div className="relative h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80"
                alt="Premium Liqueurs Collection"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
              <div className="relative h-full flex items-center">
                <div className="px-8 md:px-12 lg:px-16 max-w-2xl">
                  <h3 className="text-2xl font-medium text-white mb-6">
                    Discover Our <span className="font-playfair italic">Collection</span>
                  </h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    Experience our complete portfolio of premium liqueurs and learn about 
                    our commitment to exceptional quality and craftsmanship.
                  </p>
                  <a 
                    href="mailto:din@nativisgp.com?subject=Portfolio%20Request" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#00B14F] text-sm tracking-wider text-white hover:bg-[#009B44] transition-colors duration-300"
                  >
                    REQUEST PORTFOLIO
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}