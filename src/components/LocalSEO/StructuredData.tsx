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
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  priceRange?: string;
  servedCuisine?: string[];
  acceptsReservations?: boolean;
}

interface StructuredDataProps {
  businessData?: Partial<LocalBusinessData>;
  pageType?: 'website' | 'product' | 'about' | 'contact';
  products?: Array<{
    name: string;
    description: string;
    price: string;
    image?: string;
    brand: string;
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
  geo: {
    latitude: 1.3339,
    longitude: 103.8855
  },
  openingHours: [
    "Mo-Fr 09:00-18:00"
  ],
  priceRange: "$$$",
  servedCuisine: ["Premium Spirits", "Craft Liqueurs"],
  acceptsReservations: true
};

export default function StructuredData({ businessData, pageType = 'website', products }: StructuredDataProps) {
  const business = { ...defaultBusinessData, ...businessData };

  // Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${business.website}#business`,
    "name": business.name,
    "description": business.description,
    "url": business.website,
    "telephone": business.phone,
    "email": business.email,
    "image": business.image,
    "logo": business.image,
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
    "openingHoursSpecification": business.openingHours?.map(hours => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": hours.split(' ')[0],
      "opens": hours.split(' ')[1]?.split('-')[0],
      "closes": hours.split(' ')[1]?.split('-')[1]
    })),
    "priceRange": business.priceRange,
    "servedCuisine": business.servedCuisine,
    "acceptsReservations": business.acceptsReservations,
    "sameAs": [
      "https://www.linkedin.com/company/nativis",
      "https://www.facebook.com/nativisgroup"
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${business.website}#organization`,
    "name": business.name,
    "url": business.website,
    "logo": business.image,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": business.phone,
      "contactType": "customer service",
      "email": business.email,
      "availableLanguage": ["English"],
      "areaServed": ["Singapore", "Malaysia", "Hong Kong", "Philippines"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address.streetAddress,
      "addressLocality": business.address.addressLocality,
      "addressRegion": business.address.addressRegion,
      "postalCode": business.address.postalCode,
      "addressCountry": business.address.addressCountry
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${business.website}#website`,
    "url": business.website,
    "name": `${business.name} - Premium Spirits & Liqueurs`,
    "description": business.description,
    "publisher": {
      "@id": `${business.website}#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${business.website}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Product Schema (for shop page)
  const productSchemas = products?.map(product => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${product.name} Premium Liqueur`,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "manufacturer": {
      "@id": `${business.website}#organization`
    },
    "image": product.image,
    "offers": {
      "@type": "Offer",
      "price": product.price.replace('$', ''),
      "priceCurrency": "SGD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@id": `${business.website}#organization`
      }
    },
    "category": "Premium Liqueurs"
  }));

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": business.website
      }
    ]
  };

  return (
    <Helmet>
      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema, null, 2)}
      </script>
      
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema, null, 2)}
      </script>
      
      {/* Website Schema */}
      {pageType === 'website' && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema, null, 2)}
        </script>
      )}
      
      {/* Product Schemas */}
      {products && productSchemas?.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema, null, 2)}
        </script>
      ))}
      
      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema, null, 2)}
      </script>

      {/* Open Graph Local Business */}
      <meta property="og:type" content="business.business" />
      <meta property="og:title" content={business.name} />
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

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={business.name} />
      <meta name="twitter:description" content={business.description} />
      <meta name="twitter:image" content={business.image} />

      {/* Local SEO Meta Tags */}
      <meta name="geo.region" content="SG-01" />
      <meta name="geo.placename" content="Singapore" />
      <meta name="geo.position" content={`${business.geo?.latitude};${business.geo?.longitude}`} />
      <meta name="ICBM" content={`${business.geo?.latitude}, ${business.geo?.longitude}`} />
    </Helmet>
  );
}