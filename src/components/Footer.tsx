import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowUpRight, ChevronUp, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import NAPInfo from './LocalSEO/NAPInfo';

export default function Footer() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left Column - Brand */}
          <div className="space-y-8">
            <div>
              <span className="text-3xl font-light tracking-wider">NATIVIS</span>
              <p className="mt-6 text-gray-600 leading-relaxed max-w-md">
                Crafting exceptional spirits for memorable moments. A world-class portfolio
                of premium spirits and liqueurs, delivering extraordinary experiences.
              </p>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-sm tracking-wider mb-4">CONNECT WITH US</h3>
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.instagram.com/nativis.group/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-[#00B14F] transition-all duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.facebook.com/p/Nativis-Group-61562074942441/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-[#00B14F] transition-all duration-300"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://sg.linkedin.com/company/nativis-group-pte-ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-[#00B14F] transition-all duration-300"
                  aria-label="Connect with us on LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Contact Information */}
            <NAPInfo variant="minimal" showWebsite={true} showHours={true} />
          </div>

          {/* Right Column - Navigation */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm tracking-wider mb-8">EXPLORE</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Our Brands', href: '/#brands' },
                  { name: 'About Us', href: '/#about' },
                  { name: 'Where to Buy', href: '/where-to-buy' },
                  { name: 'Our People', href: '/people' },
                  { name: 'Careers', href: '/careers' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      to={item.href}
                      className="group flex items-center text-gray-600 hover:text-[#00B14F] transition-colors"
                      onMouseEnter={() => setHoveredSection(item.name)}
                      onMouseLeave={() => setHoveredSection(null)}
                      title={`Visit ${item.name}`}
                    >
                      <span className="relative">
                        {item.name}
                        <span 
                          className={`absolute -bottom-1 left-0 w-full h-px bg-[#00B14F] transform origin-left transition-transform duration-300 ${
                            hoveredSection === item.name ? 'scale-x-100' : 'scale-x-0'
                          }`}
                        ></span>
                      </span>
                      <ArrowUpRight className={`h-4 w-4 ml-2 transition-opacity duration-300 ${
                        hoveredSection === item.name ? 'opacity-100' : 'opacity-0'
                      }`} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm tracking-wider mb-8">LEGAL</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Privacy Policy', href: '/privacy-policy' },
                  { name: 'Terms of Service', href: '/terms-of-service' },
                  { name: 'Responsible Drinking', href: '/responsible-drinking' },
                  { name: 'Accessibility', href: '/accessibility' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.href}
                    className="group flex items-center text-gray-600 hover:text-[#00B14F] transition-colors"
                      onMouseEnter={() => setHoveredSection(item.name)}
                    onMouseLeave={() => setHoveredSection(null)}
                      title={`Read our ${item.name}`}
                  >
                    <span className="relative">
                        {item.name}
                      <span 
                        className={`absolute -bottom-1 left-0 w-full h-px bg-[#00B14F] transform origin-left transition-transform duration-300 ${
                            hoveredSection === item.name ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      ></span>
                    </span>
                    <ArrowUpRight className={`h-4 w-4 ml-2 transition-opacity duration-300 ${
                        hoveredSection === item.name ? 'opacity-100' : 'opacity-0'
                    }`} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Nativis. All rights reserved. Please drink responsibly.
          </p>
          <button 
            onClick={scrollToTop}
            className="group flex items-center space-x-2 text-sm text-gray-500 hover:text-[#00B14F] transition-colors"
          >
            <span>Back to top</span>
            <ChevronUp className="h-4 w-4 transform group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="h-1 w-full bg-gradient-to-r from-[#00B14F]/0 via-[#00B14F]/20 to-[#00B14F]/0"></div>
    </footer>
  );
}