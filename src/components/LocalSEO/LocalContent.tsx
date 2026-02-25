import React from 'react';
import { MapPin, Users, Award, Globe } from 'lucide-react';

interface LocalContentProps {
  variant?: 'singapore' | 'regional' | 'global';
  className?: string;
}

export default function LocalContent({ variant = 'singapore', className = '' }: LocalContentProps) {
  const singaporeContent = {
    title: "Premium Spirits Distribution in Singapore",
    description: "Based in the heart of Singapore's business district, Nativis Group serves as the premier distributor of craft liqueurs across Southeast Asia.",
    stats: [
      { icon: MapPin, value: "4", label: "Countries Served", detail: "Singapore, Malaysia, Hong Kong, Philippines" },
      { icon: Users, value: "50+", label: "Local Partners", detail: "Authorized distributors and retailers" },
      { icon: Award, value: "2024", label: "Est. Singapore", detail: "Locally established business" },
      { icon: Globe, value: "24/7", label: "Support", detail: "Local customer service" }
    ],
    features: [
      "Singapore-based premium spirits distributor",
      "Same-day delivery within Singapore CBD",
      "Local expertise in Southeast Asian markets",
      "Authorized by Singapore customs and trade authorities",
      "Member of Singapore Spirits Association"
    ]
  };

  const regionalContent = {
    title: "Southeast Asia's Premium Liqueur Network",
    description: "From our Singapore headquarters, we've built strong partnerships across Southeast Asia, bringing premium craft liqueurs to discerning customers throughout the region.",
    regions: [
      {
        country: "Singapore",
        description: "Headquarters and primary distribution center",
        partners: "12+ premium retailers and bars"
      },
      {
        country: "Malaysia",
        description: "Extensive network covering KL, Penang, and Johor",
        partners: "8+ authorized distributors"
      },
      {
        country: "Hong Kong",
        description: "Serving Hong Kong's sophisticated spirits market",
        partners: "2+ premium distributors"
      },
      {
        country: "Philippines",
        description: "Growing presence in Manila's premium sector",
        partners: "1+ exclusive distributor"
      }
    ]
  };

  if (variant === 'regional') {
    return (
      <div className={`bg-gradient-to-br from-[#00B14F]/5 to-transparent rounded-3xl p-8 md:p-12 ${className}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
              {regionalContent.title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {regionalContent.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regionalContent.regions.map((region, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#00B14F] mb-3">
                  {region.country}
                </h3>
                <p className="text-gray-600 mb-4">{region.description}</p>
                <div className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                  {region.partners}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'global') {
    return (
      <div className={`${className}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-gray-900 mb-4">
            Global Reach, Local Excellence
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            While we source the finest ingredients from around the world, our commitment 
            to local markets and regional preferences drives everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#00B14F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-8 w-8 text-[#00B14F]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Local Presence</h3>
            <p className="text-gray-600">
              Deep understanding of Southeast Asian markets and consumer preferences
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[#00B14F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="h-8 w-8 text-[#00B14F]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Global Standards</h3>
            <p className="text-gray-600">
              International quality standards with local market adaptation
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[#00B14F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-[#00B14F]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Regional Partnerships</h3>
            <p className="text-gray-600">
              Strong relationships with local distributors and premium retailers
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-medium text-gray-900 mb-4">
          {singaporeContent.title}
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {singaporeContent.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {singaporeContent.stats.map((stat, index) => (
          <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <stat.icon className="h-8 w-8 text-[#00B14F] mx-auto mb-4" />
            <div className="text-2xl font-semibold text-[#00B14F] mb-2">{stat.value}</div>
            <div className="font-medium text-gray-900 mb-1">{stat.label}</div>
            <div className="text-sm text-gray-600">{stat.detail}</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Why Choose Nativis in Singapore
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {singaporeContent.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#00B14F] rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}