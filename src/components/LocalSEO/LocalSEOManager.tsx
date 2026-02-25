import React from 'react';
import EnhancedStructuredData from './EnhancedStructuredData';
import NAPConsistency from './NAPConsistency';
import LocationSpecificContent from './LocationSpecificContent';
import GoogleBusinessOptimization from './GoogleBusinessOptimization';

interface LocalSEOManagerProps {
  page: 'homepage' | 'about' | 'contact' | 'products' | 'locations';
  location?: 'singapore' | 'malaysia' | 'hongkong' | 'philippines';
  showGoogleBusiness?: boolean;
  showLocationContent?: boolean;
  customBusinessData?: any;
  products?: Array<{
    name: string;
    description: string;
    price: string;
    image?: string;
    brand: string;
  }>;
  className?: string;
}

export default function LocalSEOManager({
  page,
  location = 'singapore',
  showGoogleBusiness = false,
  showLocationContent = false,
  customBusinessData,
  products,
  className = ''
}: LocalSEOManagerProps) {
  // Sample reviews data
  const sampleReviews = [
    {
      author: "James Lim",
      datePublished: "2024-01-20",
      reviewRating: 5,
      reviewBody: "Exceptional service and premium quality liqueurs. Perfect for our hotel's premium bar."
    },
    {
      author: "Sarah Chen", 
      datePublished: "2024-01-15",
      reviewRating: 5,
      reviewBody: "Professional service from start to finish. Fast delivery and excellent products."
    },
    {
      author: "Ahmed Rahman",
      datePublished: "2024-01-10", 
      reviewRating: 4,
      reviewBody: "Good selection of premium spirits. The consultation service was very helpful."
    }
  ];

  // Sample services data
  const sampleServices = [
    {
      name: "Premium Spirits Distribution",
      description: "Professional distribution of craft liqueurs and premium spirits across Southeast Asia",
      provider: "Nativis Group Pte Ltd",
      areaServed: ["Singapore", "Malaysia", "Hong Kong", "Philippines"]
    },
    {
      name: "Corporate Event Planning",
      description: "Professional consultation and planning for corporate events and premium beverage service",
      provider: "Nativis Group Pte Ltd", 
      areaServed: ["Singapore"]
    },
    {
      name: "Bulk Order Management",
      description: "Specialized bulk ordering service for restaurants, hotels, and bars",
      provider: "Nativis Group Pte Ltd",
      areaServed: ["Singapore", "Malaysia"]
    }
  ];

  return (
    <div className={className}>
      {/* Enhanced Structured Data - Always included */}
      <EnhancedStructuredData
        businessData={customBusinessData}
        pageType={page === 'homepage' ? 'website' : page === 'products' ? 'product' : page}
        products={products}
        services={sampleServices}
        reviews={sampleReviews}
      />

      {/* Location-specific content */}
      {showLocationContent && (
        <div className="mb-12">
          <LocationSpecificContent 
            location={location}
            variant={page === 'homepage' ? 'hero' : 'service'}
          />
        </div>
      )}

      {/* Google Business Profile Integration */}
      {showGoogleBusiness && (
        <div className="mb-12">
          <GoogleBusinessOptimization variant="full" />
        </div>
      )}

      {/* NAP Information - Always consistent */}
      <div className="sr-only">
        <NAPConsistency 
          variant="full"
          structured={true}
          showWebsite={true}
          showHours={true}
          showSocial={true}
        />
      </div>
    </div>
  );
}

// Export utility functions for manual implementation
export const getLocalSEOData = (location: string) => {
  const baseData = {
    name: "Nativis Group Pte Ltd",
    phone: "+65 8621 4041",
    email: "din@nativisgp.com",
    website: "https://nativisgp.com"
  };

  const locationData: Record<string, any> = {
    singapore: {
      ...baseData,
      address: "2 Sims Close, #04-06, Gemini @ Sims, Singapore 387298",
      geo: { latitude: 1.3339, longitude: 103.8855 },
      serviceArea: ["Singapore CBD", "Marina Bay", "Orchard", "Clarke Quay"],
      keywords: ["singapore premium spirits", "singapore liqueur distributor", "craft spirits singapore"]
    },
    malaysia: {
      ...baseData,
      serviceArea: ["Kuala Lumpur", "Penang", "Johor Bahru"],
      keywords: ["malaysia premium spirits", "kuala lumpur liqueurs", "premium alcohol malaysia"]
    },
    hongkong: {
      ...baseData,
      serviceArea: ["Central", "Tsim Sha Tsui", "Causeway Bay"],
      keywords: ["hong kong premium spirits", "hong kong liqueur distributor", "craft spirits hk"]
    },
    philippines: {
      ...baseData,
      serviceArea: ["Makati", "BGC", "Quezon City"],
      keywords: ["philippines premium spirits", "manila liqueurs", "premium alcohol philippines"]
    }
  };

  return locationData[location] || locationData.singapore;
};

// Utility for generating location-specific meta tags
export const generateLocalMetaTags = (location: string, pageType: string) => {
  const data = getLocalSEOData(location);
  
  return {
    title: `${pageType === 'homepage' ? 'Premium Spirits Distributor' : pageType} - ${data.name}`,
    description: `${data.name} - Premier distributor of craft liqueurs and premium spirits in ${location}. Serving ${data.serviceArea.join(', ')} with exceptional European spirits.`,
    keywords: data.keywords.join(', '),
    canonical: `${data.website}${pageType === 'homepage' ? '' : `/${pageType}`}`,
    hreflang: [
      { lang: 'en-SG', url: `${data.website}` },
      { lang: 'en-MY', url: `${data.website}/my` },
      { lang: 'en-HK', url: `${data.website}/hk` },
      { lang: 'en-PH', url: `${data.website}/ph` }
    ]
  };
};