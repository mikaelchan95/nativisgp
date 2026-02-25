import React from 'react';
import { MapPin, Users, Award, Globe, Truck, Clock, Phone, Star } from 'lucide-react';

interface LocationData {
  city: string;
  country: string;
  description: string;
  landmarks: string[];
  serviceArea: string[];
  deliveryTime: string;
  localPhone?: string;
  specialties: string[];
  testimonial?: {
    text: string;
    author: string;
    location: string;
  };
}

interface LocationSpecificContentProps {
  location?: 'singapore' | 'malaysia' | 'hongkong' | 'philippines';
  variant?: 'hero' | 'service' | 'about' | 'footer';
  className?: string;
}

const locationData: Record<string, LocationData> = {
  singapore: {
    city: "Singapore",
    country: "Singapore",
    description: "Based in Singapore's CBD, Nativis Group serves as the premier distributor of craft liqueurs across Southeast Asia. Our Singapore headquarters provides same-day delivery within the CBD and next-day delivery island-wide.",
    landmarks: ["Marina Bay", "Orchard Road", "Clarke Quay", "Raffles Place"],
    serviceArea: ["Central Business District", "Orchard", "Marina Bay", "Sentosa", "Jurong", "Tampines"],
    deliveryTime: "Same-day delivery in CBD, Next-day island-wide",
    localPhone: "+65 8621 4041",
    specialties: ["Premium spirits consultation", "Corporate event planning", "Bulk orders for restaurants"],
    testimonial: {
      text: "Excellent service and premium quality liqueurs. Perfect for our hotel's premium bar.",
      author: "James Lim",
      location: "Marina Bay Hotel Manager"
    }
  },
  malaysia: {
    city: "Kuala Lumpur",
    country: "Malaysia",
    description: "Serving Malaysia's vibrant hospitality scene through our network of authorized distributors in Kuala Lumpur, Penang, and Johor. We bring European craft liqueurs to Malaysia's most prestigious establishments.",
    landmarks: ["Petronas Twin Towers", "Bukit Bintang", "KLCC", "Mont Kiara"],
    serviceArea: ["Kuala Lumpur", "Selangor", "Penang", "Johor Bahru", "Ipoh"],
    deliveryTime: "2-3 business days nationwide",
    specialties: ["Halal-certified facilities", "Local distributor network", "Regional event support"],
    testimonial: {
      text: "Their premium liqueurs have elevated our cocktail menu significantly.",
      author: "Ahmad Rahman", 
      location: "KL Restaurant Owner"
    }
  },
  hongkong: {
    city: "Hong Kong",
    country: "Hong Kong",
    description: "Hong Kong's sophisticated market demands the finest spirits. Through our authorized distributors, we supply premium liqueurs to Hong Kong's elite establishments and discerning consumers.",
    landmarks: ["Central", "Tsim Sha Tsui", "Causeway Bay", "Wan Chai"],
    serviceArea: ["Hong Kong Island", "Kowloon", "New Territories"],
    deliveryTime: "24-48 hours",
    specialties: ["Premium import handling", "Duty-paid warehouse", "Exclusive brand partnerships"],
    testimonial: {
      text: "Nativis provides the exclusive spirits our clientele expects.",
      author: "Catherine Wong",
      location: "Central District Bar Manager"
    }
  },
  philippines: {
    city: "Manila",
    country: "Philippines",
    description: "Expanding into the Philippines market, we partner with select distributors to introduce our premium European liqueurs to Manila's growing luxury hospitality sector.",
    landmarks: ["Makati", "BGC", "Ortigas", "Quezon City"],
    serviceArea: ["Metro Manila", "Cebu City", "Davao"],
    deliveryTime: "3-5 business days",
    specialties: ["Import permit assistance", "Local regulatory compliance", "Premium hotel partnerships"],
    testimonial: {
      text: "The quality and service from Nativis exceeds our expectations.",
      author: "Maria Santos",
      location: "Manila Hotel Beverage Director"
    }
  }
};

export default function LocationSpecificContent({ 
  location = 'singapore', 
  variant = 'service',
  className = '' 
}: LocationSpecificContentProps) {
  const data = locationData[location];

  if (variant === 'hero') {
    return (
      <div className={`bg-gradient-to-r from-[#00B14F]/10 to-transparent rounded-3xl p-8 md:p-12 ${className}`}>
        <div className="max-w-4xl">
          <div className="flex items-center space-x-3 mb-6">
            <MapPin className="h-6 w-6 text-[#00B14F]" />
            <span className="text-sm tracking-[0.3em] text-[#00B14F]">
              PROUDLY SERVING {data.country.toUpperCase()}
            </span>
          </div>
          
          <h2 className="text-3xl font-medium text-gray-900 mb-6">
            Premium Spirits Distribution in <span className="font-playfair italic">{data.city}</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {data.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <Truck className="h-8 w-8 text-[#00B14F] mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">{data.deliveryTime}</p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <Globe className="h-8 w-8 text-[#00B14F] mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Service Areas</h3>
              <p className="text-gray-600 text-sm">{data.serviceArea.slice(0, 2).join(', ')} & more</p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <Phone className="h-8 w-8 text-[#00B14F] mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Local Support</h3>
              <p className="text-gray-600 text-sm">
                {data.localPhone || "+65 8621 4041"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'service') {
    return (
      <div className={`${className}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-gray-900 mb-4">
            Serving {data.city} with Excellence
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center bg-white rounded-xl p-6 shadow-sm">
            <MapPin className="h-8 w-8 text-[#00B14F] mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Coverage Areas</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {data.serviceArea.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>

          <div className="text-center bg-white rounded-xl p-6 shadow-sm">
            <Clock className="h-8 w-8 text-[#00B14F] mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Delivery Time</h3>
            <p className="text-sm text-gray-600">{data.deliveryTime}</p>
          </div>

          <div className="text-center bg-white rounded-xl p-6 shadow-sm">
            <Award className="h-8 w-8 text-[#00B14F] mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Specialties</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {data.specialties.slice(0, 2).map((specialty, index) => (
                <li key={index}>{specialty}</li>
              ))}
            </ul>
          </div>

          <div className="text-center bg-white rounded-xl p-6 shadow-sm">
            <Users className="h-8 w-8 text-[#00B14F] mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Local Landmarks</h3>
            <p className="text-sm text-gray-600">
              Near {data.landmarks.slice(0, 2).join(', ')}
            </p>
          </div>
        </div>

        {/* Customer Testimonial */}
        {data.testimonial && (
          <div className="bg-[#00B14F]/5 rounded-2xl p-8 text-center">
            <Star className="h-8 w-8 text-[#00B14F] mx-auto mb-4" />
            <blockquote className="text-lg text-gray-900 mb-4 italic">
              "{data.testimonial.text}"
            </blockquote>
            <div className="text-sm text-gray-600">
              <div className="font-medium">{data.testimonial.author}</div>
              <div>{data.testimonial.location}</div>
            </div>
          </div>
        )}

        {/* Local SEO Content */}
        <div className="mt-12 bg-gray-50 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Why Choose Nativis in {data.city}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Local Expertise</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Deep understanding of {data.country} market preferences</li>
                <li>• Established relationships with local establishments</li>
                <li>• Knowledge of local regulations and compliance</li>
                <li>• Cultural sensitivity in service delivery</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Premium Service</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Curated selection of European craft liqueurs</li>
                <li>• Professional consultation and recommendations</li>
                <li>• Flexible delivery options and scheduling</li>
                <li>• Ongoing support and relationship management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'about') {
    return (
      <div className={`bg-white rounded-xl border border-gray-100 p-6 ${className}`}>
        <div className="flex items-center space-x-3 mb-4">
          <MapPin className="h-5 w-5 text-[#00B14F]" />
          <h3 className="font-semibold text-gray-900">Our {data.city} Presence</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {data.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Service Areas:</span>
            <span className="text-gray-900">{data.serviceArea.length}+ locations</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Delivery:</span>
            <span className="text-gray-900">{data.deliveryTime}</span>
          </div>

          {data.localPhone && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Local Contact:</span>
              <a href={`tel:${data.localPhone}`} className="text-[#00B14F] hover:text-[#009B44]">
                {data.localPhone}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Footer variant
  return (
    <div className={`${className}`}>
      <h4 className="font-semibold text-white mb-4">Serving {data.city}</h4>
      <div className="space-y-2 text-gray-300 text-sm">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>{data.serviceArea.slice(0, 3).join(', ')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>{data.deliveryTime}</span>
        </div>
        {data.localPhone && (
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <a href={`tel:${data.localPhone}`} className="hover:text-white transition-colors">
              {data.localPhone}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}