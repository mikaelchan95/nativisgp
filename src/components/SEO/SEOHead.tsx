import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'product' | 'business.business';
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: object | object[];
}

const defaultProps = {
  title: 'Nativis - Premium Spirits & Liqueurs | Singapore',
  description: 'Nativis - A world-class portfolio of premium spirits and liqueurs, delivering exceptional experiences to consumers worldwide. Discover Eldoria, Lumina, Lush, and Hofman.',
  keywords: [
    'premium spirits',
    'craft liqueurs',
    'Singapore spirits',
    'Nativis',
    'Eldoria',
    'Lumina',
    'Lush liqueur',
    'Hofman',
    'premium liqueurs Singapore',
    'craft spirits Asia',
    'luxury spirits distributor'
  ],
  canonicalUrl: 'https://nativisgp.com',
  ogType: 'website' as const,
  ogImage: 'https://nativisgp.com/android-chrome-512x512.png',
  ogImageAlt: 'Nativis Premium Spirits & Liqueurs',
  twitterCard: 'summary_large_image' as const
};

export default function SEOHead({
  title = defaultProps.title,
  description = defaultProps.description,
  keywords = defaultProps.keywords,
  canonicalUrl = defaultProps.canonicalUrl,
  ogType = defaultProps.ogType,
  ogImage = defaultProps.ogImage,
  ogImageAlt = defaultProps.ogImageAlt,
  twitterCard = defaultProps.twitterCard,
  noindex = false,
  nofollow = false,
  structuredData
}: SEOProps) {
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow'
  ].join(', ');

  const fullTitle = title.includes('Nativis') ? title : `${title} | Nativis`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:site_name" content="Nativis" />
      <meta property="og:locale" content="en_SG" />
      <meta property="og:locale:alternate" content="en_HK" />
      <meta property="og:locale:alternate" content="en_PH" />
      <meta property="og:locale:alternate" content="en_MY" />
      <meta property="article:publisher" content="https://www.facebook.com/nativisgroup" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@nativis" />
      <meta name="twitter:creator" content="@nativis" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      <meta name="twitter:domain" content="nativisgp.com" />

      <meta name="author" content="Nativis Group Pte Ltd" />
      <meta name="publisher" content="Nativis Group Pte Ltd" />
      <meta name="copyright" content="Nativis Group Pte Ltd" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="referrer" content="origin-when-cross-origin" />

      <meta name="geo.region" content="SG-01" />
      <meta name="geo.placename" content="Singapore" />
      <meta name="geo.position" content="1.3339;103.8855" />
      <meta name="ICBM" content="1.3339, 103.8855" />

      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="width" />

      {structuredData && (
        Array.isArray(structuredData) ? (
          structuredData.map((data, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(data)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )
      )}
    </Helmet>
  );
}
