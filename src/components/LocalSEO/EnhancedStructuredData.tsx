import React from 'react';
import { Helmet } from 'react-helmet-async';

interface LocalBusinessData {
  name: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  phone: string;
  email: string;
  website: string;
  description: string;
  image?: string;
  logo?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  priceRange?: string;
  paymentAccepted?: string[];
  currenciesAccepted?: string[];
  areaServed?: string[];
  serviceArea?: {
    name: string;
    geo: {
      latitude: number;
      longitude: number;
    };
  }[];
}

interface EnhancedStructuredDataProps {
  businessData?: Partial<LocalBusinessData>;
  pageType?: 'website' | 'product' | 'about' | 'contact' | 'service';
  products?: Array<{
    name: string;
    description: string;
    price: string;
    image?: string;
    brand: string;
    availability?: string;
    condition?: string;
  }>;
  services?: Array<{
    name: string;
    description: string;
    provider: string;
    areaServed?: string[];
  }>;
  reviews?: Array<{
    author: string;
    datePublished: string;
    reviewRating: number;
    reviewBody: string;
  }>;
}

const defaultBusinessData: LocalBusinessData = {
  name: "Nativis Group Pte Ltd",
  address: {
    streetAddress: "2 Sims Close, #04-06, Gemini @ Sims",
    addressLocality: "Singapore",
    addressRegion: "Singapore",
    postalCode: "387298",
    addressCountry: "SG"
  },
  phone: "+65 8621 4041",
  email: "din@nativisgp.com",
  website: "https://nativisgp.com",
  description: "Premium spirits and liqueurs distributor in Singapore. Crafting exceptional spirits experiences with our world-class portfolio including Eldoria, Lumina, Lush, and Hofman premium liqueurs.",
  image: "https://nativisgp.com/imgs/nativis%20logo.svg",
  logo: "https://nativisgp.com/imgs/nativis%20logo.svg",
  geo: {
    latitude: 1.3339,
    longitude: 103.8855
  },
  openingHours: [
    "Mo-Fr 09:00-18:00"
  ],
  priceRange: "$$$",
  paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
  currenciesAccepted: ["SGD", "USD"],
  areaServed: ["Singapore", "Malaysia", "Hong Kong", "Philippines"],
  serviceArea: [
    {
      name: "Singapore",
      geo: { latitude: 1.3521, longitude: 103.8198 }
    },
    {
      name: "Kuala Lumpur",
      geo: { latitude: 3.1390, longitude: 101.6869 }
    },
    {
      name: "Hong Kong",
      geo: { latitude: 22.3193, longitude: 114.1694 }
    },
    {
      name: "Manila",
      geo: { latitude: 14.5995, longitude: 120.9842 }
    }
  ]
};

export default function EnhancedStructuredData({ 
  businessData, 
  pageType = 'website', 
  products,
  services,
  reviews
}: EnhancedStructuredDataProps) {
  const business = { ...defaultBusinessData, ...businessData };

  // Enhanced Local Business Schema with more details
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization", "Store"],
    "@id": `${business.website}#business`,
    "name": business.name,
    "alternateName": "Nativis",
    "description": business.description,
    "url": business.website,
    "telephone": business.phone,
    "email": business.email,
    "image": business.image,
    "logo": business.logo,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address.streetAddress,
      "addressLocality": business.address.addressLocality,
      "addressRegion": business.address.addressRegion,
      "postalCode": business.address.postalCode,
      "addressCountry": business.address.addressCountry
    },
    "geo": business.geo ? {
      "@type": "GeoCoordinates",
      "latitude": business.geo.latitude,
      "longitude": business.geo.longitude
    } : undefined,
    "openingHoursSpecification": business.openingHours?.map(hours => {
      const [days, timeRange] = hours.split(' ');
      const [opens, closes] = timeRange.split('-');
      return {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": days.split('-').map(day => {
          const dayMap: { [key: string]: string } = {
            'Mo': 'Monday', 'Tu': 'Tuesday', 'We': 'Wednesday',
            'Th': 'Thursday', 'Fr': 'Friday', 'Sa': 'Saturday', 'Su': 'Sunday'
          };
          return dayMap[day] || day;
        }),
        "opens": opens,
        "closes": closes
      };
    }),
    "priceRange": business.priceRange,
    "paymentAccepted": business.paymentAccepted,
    "currenciesAccepted": business.currenciesAccepted,
    "areaServed": business.areaServed?.map(area => ({
      "@type": "City",
      "name": area
    })),
    "serviceArea": business.serviceArea?.map(area => ({
      "@type": "GeoCircle",
      "name": area.name,
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": area.geo.latitude,
        "longitude": area.geo.longitude
      },
      "geoRadius": "50000" // 50km radius
    })),
    "sameAs": [
      "https://www.linkedin.com/company/nativis",
      "https://www.facebook.com/nativisgroup",
      "https://www.instagram.com/nativisgroup"
    ],
    "foundingDate": "2024",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 10,
      "maxValue": 50
    },
    "memberOf": {
      "@type": "Organization",
      "name": "Singapore Business Federation"
    }
  };

  // Enhanced Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${business.website}#organization`,
    "name": business.name,
    "url": business.website,
    "logo": business.logo,
    "description": business.description,
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "Vincent Hong",
        "jobTitle": "Founder"
      },
      {
        "@type": "Person", 
        "name": "Din Hassan",
        "jobTitle": "Chief Commercial Officer"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": business.phone,
        "contactType": "customer service",
        "email": business.email,
        "availableLanguage": ["English", "Mandarin", "Malay"],
        "areaServed": business.areaServed,
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": business.email,
        "availableLanguage": ["English"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address.streetAddress,
      "addressLocality": business.address.addressLocality,
      "addressRegion": business.address.addressRegion,
      "postalCode": business.address.postalCode,
      "addressCountry": business.address.addressCountry
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Premium Liqueurs",
      "itemListElement": products?.map((product, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": product.name,
          "description": product.description,
          "brand": product.brand,
          "image": product.image
        },
        "price": product.price.replace('$', ''),
        "priceCurrency": "SGD",
        "availability": product.availability || "https://schema.org/InStock",
        "itemCondition": product.condition || "https://schema.org/NewCondition"
      }))
    }
  };

  // Service Schema for distribution services
  const serviceSchemas = services?.map(service => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@id": `${business.website}#organization`
    },
    "areaServed": service.areaServed?.map(area => ({
      "@type": "City",
      "name": area
    })),
    "serviceType": "Premium Spirits Distribution",
    "category": "Beverage Distribution"
  }));

  // Review Schema
  const reviewSchemas = reviews?.map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "datePublished": review.datePublished,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.reviewRating,
      "bestRating": 5,
      "worstRating": 1
    },
    "reviewBody": review.reviewBody,
    "itemReviewed": {
      "@id": `${business.website}#business`
    }
  }));

  // Aggregate Rating if reviews exist
  const aggregateRating = reviews && reviews.length > 0 ? {
    "@type": "AggregateRating",
    "ratingValue": (reviews.reduce((sum, review) => sum + review.reviewRating, 0) / reviews.length).toFixed(1),
    "reviewCount": reviews.length,
    "bestRating": 5,
    "worstRating": 1
  } : undefined;

  // Add aggregate rating to business schema
  if (aggregateRating) {
    (localBusinessSchema as any).aggregateRating = aggregateRating;
  }

  return (
    <Helmet>
      {/* Enhanced Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema, null, 2)}
      </script>
      
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema, null, 2)}
      </script>
      
      {/* Service Schemas */}
      {serviceSchemas?.map((schema, index) => (
        <script key={`service-${index}`} type="application/ld+json">
          {JSON.stringify(schema, null, 2)}
        </script>
      ))}
      
      {/* Review Schemas */}
      {reviewSchemas?.map((schema, index) => (
        <script key={`review-${index}`} type="application/ld+json">
          {JSON.stringify(schema, null, 2)}
        </script>
      ))}

      {/* Enhanced Open Graph Local Business */}
      <meta property="og:type" content="business.business" />
      <meta property="og:title" content={`${business.name} - Premium Spirits Distributor Singapore`} />
      <meta property="og:description" content={business.description} />
      <meta property="og:url" content={business.website} />
      <meta property="og:image" content={business.image} />
      <meta property="business:contact_data:street_address" content={business.address.streetAddress} />
      <meta property="business:contact_data:locality" content={business.address.addressLocality} />
      <meta property="business:contact_data:region" content={business.address.addressRegion} />
      <meta property="business:contact_data:postal_code" content={business.address.postalCode} />
      <meta property="business:contact_data:country_name" content={business.address.addressCountry} />
      <meta property="business:contact_data:phone_number" content={business.phone} />
      <meta property="business:contact_data:email" content={business.email} />
      <meta property="place:location:latitude" content={business.geo?.latitude.toString()} />
      <meta property="place:location:longitude" content={business.geo?.longitude.toString()} />

      {/* Twitter Cards with Local Business */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${business.name} - Premium Spirits Singapore`} />
      <meta name="twitter:description" content={business.description} />
      <meta name="twitter:image" content={business.image} />

      {/* Enhanced Local SEO Meta Tags */}
      <meta name="geo.region" content="SG-01" />
      <meta name="geo.placename" content="Singapore" />
      <meta name="geo.position" content={`${business.geo?.latitude};${business.geo?.longitude}`} />
      <meta name="ICBM" content={`${business.geo?.latitude}, ${business.geo?.longitude}`} />
      <meta name="DC.title" content={business.name} />
      
      {/* Local Business Categories */}
      <meta name="business-type" content="Alcohol Distributor" />
      <meta name="business-category" content="Premium Spirits" />
      <meta name="service-area" content={business.areaServed?.join(', ')} />
      
      {/* Currency and Payment Info */}
      <meta name="currency" content="SGD" />
      <meta name="payment-methods" content={business.paymentAccepted?.join(', ')} />
    </Helmet>
  );
}