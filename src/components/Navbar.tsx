import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ContactModal from './ContactModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'ABOUT', href: '/' },
    { name: 'WHERE TO BUY', href: '/where-to-buy' },
    { name: 'PEOPLE', href: '/people' },
    { name: 'CAREERS', href: '/careers' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    if (href === '/') {
      const hash = location.pathname === '/' ? window.location.hash : '';
      const section = hash ? document.getElementById(hash.substring(1)) : null;
      
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <nav 
        className="fixed w-full z-50 bg-white py-4 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl tracking-wider text-gray-900"
            >
              <span className="font-light">NATIVIS</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => {
                    if (item.href.includes('#')) {
                      e.preventDefault();
                      handleNavigation(item.href.split('/').pop() || '');
                    }
                  }}
                  className={`relative px-4 py-2 text-sm tracking-wider group transition-colors duration-300 ${
                    (location.pathname === '/' && item.href.startsWith('/#')) ||
                    (location.pathname === item.href)
                      ? 'text-[#00B14F]'
                      : 'text-gray-900 hover:text-[#00B14F]'
                  }`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
              ))}
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="ml-4 px-6 py-2 text-sm tracking-wider border border-[#00B14F] text-[#00B14F] hover:bg-[#00B14F] hover:text-white transition-all duration-300"
              >
                CONNECT
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-900 transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden absolute w-full left-0 top-full transition-all duration-300 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-sm border-t border-gray-100 py-4 px-4 shadow-lg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-3 text-sm tracking-wider transition-colors ${
                  (location.pathname === '/' && item.href.startsWith('/#')) ||
                  (location.pathname === item.href)
                    ? 'text-[#00B14F]'
                    : 'text-gray-900 hover:text-[#00B14F]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsContactModalOpen(true);
              }}
              className="block w-full mt-4 px-6 py-3 text-sm tracking-wider text-center border border-[#00B14F] text-[#00B14F] hover:bg-[#00B14F] hover:text-white transition-all duration-300"
            >
              CONNECT
            </button>
          </div>
        </div>
      </nav>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}