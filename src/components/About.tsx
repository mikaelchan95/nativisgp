import React, { useState } from 'react';
import { Gem, Leaf, Sparkles, Phone, Mail, MapPin, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import InternalLink from './InternalLinkHelper';
import { useAnchorText } from './InternalLinkHelper';

interface GalleryMedia {
  url: string;
  type: 'image' | 'video';
  alt: string;
  posterUrl?: string;
}

export default function About() {
  const [selectedMedia, setSelectedMedia] = useState<{ media: GalleryMedia; index: number } | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const galleryMedia: GalleryMedia[] = [
    {
      url: "https://jnlciwmbqgfpiztiaxba.supabase.co/storage/v1/object/public/Nativis%20GP/IMAGES/2024-11-21_ODB_0074.jpg",
      type: "image",
      alt: "Craftsmanship 1"
    },
    {
      url: "https://jnlciwmbqgfpiztiaxba.supabase.co/storage/v1/object/public/Nativis%20GP/IMAGES/IMG_4653.jpg",
      type: "image",
      alt: "Craftsmanship 2"
    },
    {
      url: "https://jnlciwmbqgfpiztiaxba.supabase.co/storage/v1/object/public/Nativis%20GP/Video/WhatsApp%20Video%202025-10-15%20at%2023.05.16.mp4",
      type: "video",
      alt: "Craftsmanship Video",
      posterUrl: "https://jnlciwmbqgfpiztiaxba.supabase.co/storage/v1/object/public/Nativis%20GP/IMAGES/IMG_4653.jpg"
    },
    {
      url: "https://jnlciwmbqgfpiztiaxba.supabase.co/storage/v1/object/public/Nativis%20GP/IMAGES/IMG_4675.jpg",
      type: "image",
      alt: "Craftsmanship 3"
    },
    {
      url: "https://jnlciwmbqgfpiztiaxba.supabase.co/storage/v1/object/public/Nativis%20GP/IMAGES/IMG_4741.jpg",
      type: "image",
      alt: "Craftsmanship 4"
    },
    {
      url: "https://jnlciwmbqgfpiztiaxba.supabase.co/storage/v1/object/public/Nativis%20GP/IMAGES/IMG_4775.jpg",
      type: "image",
      alt: "Craftsmanship 5"
    }
  ];

  const openModal = (media: GalleryMedia, index: number) => {
    setSelectedMedia({ media, index });
    setIsVideoPlaying(false);
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setIsVideoPlaying(false);
  };

  const navigateMedia = (direction: 'prev' | 'next') => {
    if (!selectedMedia) return;
    const newIndex = direction === 'prev'
      ? (selectedMedia.index - 1 + galleryMedia.length) % galleryMedia.length
      : (selectedMedia.index + 1) % galleryMedia.length;
    setSelectedMedia({ media: galleryMedia[newIndex], index: newIndex });
    setIsVideoPlaying(false);
  };

  const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.paused) {
      video.play();
      setIsVideoPlaying(true);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heritage Section */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <span className="text-sm tracking-[0.3em] text-[#00B14F] mb-6 block">OUR STORY</span>
          <h2 className="text-4xl font-light text-gray-900 mb-8" id="our-story">
            How <span className="font-playfair italic">everything</span> started
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our story starts in Europe. Here, traditional distilling methods meet modern innovation.
            We combine time-tested techniques with fresh ideas. This creates exceptional 
            premium liqueurs that honor the past while embracing the future.
          </p>
        </div>

        {/* Craftsmanship Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative h-[600px] rounded-2xl overflow-hidden">
            <a
              href="https://luminaorange.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block absolute inset-0"
            >
              <img
                src="https://i.imgur.com/DufKM48.jpeg"
                alt="Traditional Distillery"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </a>
          </div>
          <div className="space-y-8">
            <div>
              <span className="text-sm tracking-[0.3em] text-[#00B14F] mb-4 block">CRAFTSMANSHIP</span>
              <h3 className="text-2xl font-medium text-gray-900 mb-6">
                Dedication to <span className="font-playfair italic">Excellence</span>
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Great liqueurs start with great ingredients. We source the finest botanicals, 
                fruits, and spices worldwide. Every ingredient is carefully selected. 
                This ensures each sip delivers exceptional quality and taste.
              </p>
            </div>
            <div className="pt-8 border-t border-gray-100">
              <p className="text-gray-600 leading-relaxed">
                Our master distillers bring expertise and passion to every step. 
                They oversee the entire production process. Each batch meets our 
                strict quality standards. This guarantees consistency and excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm tracking-[0.3em] text-[#00B14F] mb-6 block">OUR VALUES</span>
          <h2 className="text-3xl font-light text-gray-900 mb-8" id="our-values">
            Guided by <span className="font-playfair italic">Purpose</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our values guide everything we do. They show our commitment to three key areas:
            excellence in quality, innovation in craft, and sustainability for the future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {[
            {
              icon: Gem,
              title: "Craftsmanship",
              description: "We are dedicated to producing liqueurs of the highest quality. Every step of our process reflects our commitment to excellence."
            },
            {
              icon: Sparkles,
              title: "Innovation",
              description: "We embrace creativity to craft unique liqueurs. We honor traditional techniques while exploring new possibilities."
            },
            {
              icon: Leaf,
              title: "Sustainability",
              description: "We use sustainable sourcing and eco-friendly production. Our goal is to protect the environment for future generations."
            }
          ].map((value, index) => (
            <div 
              key={index}
              className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <value.icon className="h-8 w-8 text-[#00B14F] mb-6" />
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] text-[#00B14F] mb-6 block">GET IN TOUCH</span>
            <h2 className="text-3xl font-light text-gray-900 mb-8" id="contact-us">
              Connect with <span className="font-playfair italic">Nativis</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We'd love to hear from you. Contact us about our premium liqueurs, 
              partnership opportunities, or any questions you have. Our team is 
              ready to help with your spirits needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Phone,
                title: "Call Us",
                info: "+65 8621 4041",
                link: "tel:+6586214041",
                label: "Direct Line"
              },
              {
                icon: Mail,
                title: "Email",
                info: "din@nativisgp.com",
                link: "mailto:din@nativisgp.com",
                label: "General Inquiries"
              },
              {
                icon: MapPin,
                title: "Visit",
                info: "Gemini @ Sims",
                link: "https://maps.google.com/?q=Gemini+@+Sims,+2+Sims+Cl,+%2304-06,+Singapore+387298",
                label: "2 Sims Close, #04-06, Singapore 387298",
                sublabel: "Headquarters"
              }
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.link}
                className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 text-center"
                target={contact.icon === MapPin ? "_blank" : undefined}
                rel={contact.icon === MapPin ? "noopener noreferrer" : undefined}
              >
                <contact.icon className="h-8 w-8 text-[#00B14F] mb-6 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{contact.title}</h3>
                <p className="text-[#00B14F] font-medium mb-2">{contact.info}</p>
                <p className="text-sm text-gray-500 mb-1">{contact.label}</p>
                {contact.sublabel && (
                  <p className="text-sm text-gray-400">{contact.sublabel}</p>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="max-w-4xl mx-auto mt-24 text-center">
          <blockquote className="text-2xl font-light text-gray-900 italic font-playfair">
            "We don't strive to be the biggest, only to be the finest in our craft."
          </blockquote>
          
          {/* Internal Links */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <InternalLink 
              to="/where-to-buy" 
              className="text-[#00B14F] hover:text-[#009B44] font-medium"
              title="Find authorized retailers near you"
            >
              Find Retailers Near You
            </InternalLink>
            <InternalLink 
              to="/people" 
              className="text-[#00B14F] hover:text-[#009B44] font-medium"
              title="Meet our leadership team"
            >
              Meet Our Leadership Team
            </InternalLink>
          </div>
        </div>

        {/* Bottled with Passion Gallery */}
        <div className="max-w-7xl mx-auto mt-24">
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] text-[#00B14F] mb-6 block">GALLERY</span>
            <h2 className="text-3xl font-light text-gray-900 mb-8">
              Bottled with <span className="font-playfair italic">Passion</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryMedia.map((media, index) => (
              <div
                key={index}
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => openModal(media, index)}
              >
                {media.type === 'image' ? (
                  <img
                    src={media.url}
                    alt={media.alt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${media.posterUrl})` }}
                    />
                    <video
                      src={media.url}
                      poster={media.posterUrl}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      muted
                      loop
                      playsInline
                      preload="none"
                      onMouseEnter={(e) => {
                        const video = e.currentTarget;
                        video.play().catch(() => {});
                      }}
                      onMouseLeave={(e) => {
                        const video = e.currentTarget;
                        video.pause();
                        video.currentTime = 0;
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-white/90 rounded-full p-4">
                        <Play className="h-8 w-8 text-gray-900" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {selectedMedia && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
              onClick={closeModal}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-8 w-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateMedia('prev');
                }}
                className="absolute left-4 z-50 text-white hover:text-gray-300 transition-colors"
                aria-label="Previous media"
              >
                <ChevronLeft className="h-12 w-12" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateMedia('next');
                }}
                className="absolute right-4 z-50 text-white hover:text-gray-300 transition-colors"
                aria-label="Next media"
              >
                <ChevronRight className="h-12 w-12" />
              </button>

              <div
                className="relative max-w-7xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedMedia.media.type === 'image' ? (
                  <img
                    src={selectedMedia.media.url}
                    alt={selectedMedia.media.alt}
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="relative w-full">
                    <video
                      src={selectedMedia.media.url}
                      poster={selectedMedia.media.posterUrl}
                      controls
                      className="w-full h-full object-contain rounded-lg max-h-[90vh]"
                      autoPlay
                      playsInline
                      onClick={handleVideoClick}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}