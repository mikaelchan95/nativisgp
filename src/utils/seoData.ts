export const seoConfig = {
  home: {
    title: 'Premium Spirits & Craft Liqueurs Singapore | Nativis',
    description: 'Nativis delivers world-class premium spirits across Southeast Asia. Explore Eldoria elderflower, Lumina triple-sec, Lush & Hofman liqueurs. Trusted by top bars & retailers.',
    keywords: [
      'premium spirits Singapore',
      'craft liqueurs',
      'Eldoria liqueur',
      'Lumina triple-sec',
      'Lush liqueur',
      'Hofman spirits',
      'luxury spirits distributor',
      'premium liqueurs Asia',
      'craft spirits Singapore',
      'elderflower liqueur',
      'buy premium liqueurs Singapore',
      'craft spirits distributor Southeast Asia',
      'artisan liqueurs Singapore',
      'premium spirits supplier Asia',
      'luxury liqueur brands',
      'craft elderflower liqueur',
      'premium triple sec Singapore',
      'best craft spirits Singapore',
      'luxury spirits Singapore online',
      'premium spirits Hong Kong Malaysia Philippines'
    ],
    canonicalUrl: 'https://nativisgp.com'
  },
  people: {
    title: 'Leadership Team: Industry Veterans | Nativis',
    description: 'Meet Din Hassan & Vincent Hong, award-winning spirits industry leaders. 30+ years combined experience in luxury liqueurs, bar innovation & distribution across Asia.',
    keywords: [
      'Nativis leadership',
      'Din Hassan',
      'Vincent Hong',
      'spirits industry experts',
      'liqueur company team',
      'bar industry Singapore',
      'spirits distribution leaders',
      'Din Hassan brand ambassador',
      'Vincent Hong spirits distributor',
      'World\'s 50 Best Bars',
      'spirits industry leaders Asia',
      'premium liqueur company founders',
      'bar industry influencers Singapore',
      'Barworks Wine & Spirits founder',
      'cocktail industry Singapore experts',
      'Tales of the Cocktails committee member'
    ],
    canonicalUrl: 'https://nativisgp.com/people'
  },
  careers: {
    title: 'Careers in Premium Spirits | Join Nativis Team',
    description: 'Build your spirits industry career with Nativis. Brand Ambassador, Distribution & Marketing roles. Join Singapore\'s fastest-growing premium liqueur company. Apply now.',
    keywords: [
      'Nativis careers',
      'spirits industry jobs Singapore',
      'liqueur company jobs',
      'brand ambassador jobs',
      'hospitality careers Singapore',
      'premium spirits jobs',
      'beverage industry careers',
      'brand ambassador jobs Singapore',
      'spirits brand ambassador',
      'liqueur marketing jobs',
      'spirits distribution jobs Singapore',
      'F&B careers Singapore',
      'wine and spirits jobs',
      'bar industry jobs Singapore',
      'hospitality brand ambassador',
      'alcohol beverage sales jobs',
      'spirits industry Singapore careers',
      'premium liqueur company jobs'
    ],
    canonicalUrl: 'https://nativisgp.com/careers'
  },
  whereToBuy: {
    title: 'Find Nativis Liqueurs Near You | Authorized Retailers',
    description: 'Buy Nativis premium liqueurs at authorized retailers across Singapore, Hong Kong, Philippines & Malaysia. Find Eldoria, Lumina, Lush & Hofman near you today.',
    keywords: [
      'buy Nativis liqueurs',
      'where to buy premium spirits Singapore',
      'Eldoria retailers',
      'Lumina distributors',
      'luxury spirits shops Singapore',
      'premium liqueur stores',
      'craft spirits retailers Asia',
      'buy Eldoria liqueur Singapore',
      'buy Lumina triple sec',
      'Nativis stockists Singapore',
      'premium spirits retailers Hong Kong',
      'craft liqueurs Philippines stores',
      'luxury spirits Malaysia',
      'where to buy elderflower liqueur',
      'premium liqueur distributors Asia',
      'Nativis authorized dealers',
      'craft spirits shops near me',
      'buy premium liqueurs online Singapore',
      'luxury spirits stores Southeast Asia'
    ],
    canonicalUrl: 'https://nativisgp.com/where-to-buy'
  },
  privacyPolicy: {
    title: 'Privacy Policy | Nativis',
    description: 'Read Nativis privacy policy. Learn how we protect your data, comply with PDPA regulations, and safeguard your personal information. Updated 2025.',
    keywords: ['Nativis privacy policy', 'data protection', 'privacy compliance', 'PDPA compliance Singapore', 'data security', 'personal information protection'],
    canonicalUrl: 'https://nativisgp.com/privacy-policy'
  },
  termsOfService: {
    title: 'Terms of Service | Nativis',
    description: 'Review Nativis terms of service. Website usage terms, legal disclaimers, and conditions for accessing our premium spirits content and services.',
    keywords: ['Nativis terms', 'terms of service', 'website terms', 'legal terms conditions', 'user agreement'],
    canonicalUrl: 'https://nativisgp.com/terms-of-service'
  },
  responsibleDrinking: {
    title: 'Responsible Drinking Guidelines | Nativis',
    description: 'Nativis advocates responsible alcohol consumption. Safe drinking tips, health guidelines, and resources for mindful enjoyment of premium spirits.',
    keywords: [
      'responsible drinking',
      'alcohol consumption guidelines',
      'drink responsibly',
      'safe alcohol use',
      'responsible alcohol consumption',
      'safe drinking tips',
      'alcohol health guidelines Singapore',
      'mindful drinking',
      'drink responsibly campaign'
    ],
    canonicalUrl: 'https://nativisgp.com/responsible-drinking'
  },
  accessibility: {
    title: 'Website Accessibility Statement | Nativis',
    description: 'Nativis commitment to web accessibility. WCAG 2.1 compliance, inclusive design features, and our ongoing efforts for accessible digital experiences.',
    keywords: ['website accessibility', 'inclusive design', 'WCAG compliance', 'web accessibility standards', 'accessible website', 'digital accessibility'],
    canonicalUrl: 'https://nativisgp.com/accessibility'
  }
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://nativisgp.com/#organization',
  name: 'Nativis Group Pte Ltd',
  legalName: 'Nativis Group Pte Ltd',
  url: 'https://nativisgp.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://nativisgp.com/imgs/nativis%20logo.svg',
    width: '250',
    height: '100'
  },
  image: 'https://nativisgp.com/android-chrome-512x512.png',
  description: 'Premium spirits and liqueurs distributor in Singapore. Crafting exceptional spirits experiences with our world-class portfolio including Eldoria, Lumina, Lush, and Hofman premium liqueurs.',
  foundingDate: '2023',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Singapore',
      addressCountry: 'SG'
    }
  },
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: '10-50'
  },
  slogan: 'Crafting Exceptional Spirits Experiences',
  keywords: 'premium spirits, craft liqueurs, Eldoria, Lumina, Lush, Hofman, spirits distributor Singapore, premium liqueurs Asia',
  founders: [
    {
      '@type': 'Person',
      '@id': 'https://nativisgp.com/people#vincent-hong',
      name: 'Vincent Hong',
      jobTitle: 'Co-Founder/Director',
      worksFor: {
        '@id': 'https://nativisgp.com/#organization'
      },
      description: 'Founder of Barworks Wine & Spirits, Vincent Hong is a leading figure in Singapore\'s premium spirits distribution industry with extensive experience in luxury beverages.',
      knowsAbout: ['Spirits Distribution', 'Wine & Spirits Industry', 'Business Development', 'Luxury Beverages'],
      url: 'https://nativisgp.com/people#vincent-hong'
    },
    {
      '@type': 'Person',
      '@id': 'https://nativisgp.com/people#din-hassan',
      name: 'Din Hassan',
      jobTitle: 'Co-Founder/COO',
      worksFor: {
        '@id': 'https://nativisgp.com/#organization'
      },
      description: 'Award-winning bar industry expert and brand ambassador. Academy member of The World\'s 50 Best Bars and Asia\'s 50 Best Bars. Recognized as Ultimate Brand Ambassador 2023.',
      knowsAbout: ['Brand Ambassador', 'Cocktail Culture', 'Bar Industry', 'Spirits Education', 'Hospitality'],
      award: ['Ultimate Brand Ambassador 2023', 'World\'s 50 Best Bars Academy Member'],
      url: 'https://nativisgp.com/people#din-hassan'
    }
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2 Sims Close, #04-06, Gemini @ Sims',
    addressLocality: 'Singapore',
    addressRegion: 'Singapore',
    postalCode: '387298',
    addressCountry: 'SG'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '1.3339',
    longitude: '103.8855'
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+65 8621 4041',
      contactType: 'customer service',
      email: 'din@nativisgp.com',
      availableLanguage: ['English'],
      areaServed: ['SG', 'HK', 'PH', 'MY'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    },
    {
      '@type': 'ContactPoint',
      telephone: '+65 9022 1220',
      contactType: 'sales',
      email: 'vincent.hong@nativisgp.com',
      availableLanguage: ['English'],
      areaServed: ['SG', 'HK', 'PH', 'MY']
    }
  ],
  sameAs: [
    'https://www.linkedin.com/company/nativis',
    'https://www.facebook.com/nativisgroup'
  ],
  brand: [
    {
      '@type': 'Brand',
      '@id': 'https://nativisgp.com/#brand-eldoria',
      name: 'Eldoria',
      description: 'Premium elderflower liqueur capturing the subtle sweetness of hand-picked elderflowers',
      logo: 'https://i.imgur.com/ln9ipPv.png',
      url: 'https://nativisgp.com/#eldoria'
    },
    {
      '@type': 'Brand',
      '@id': 'https://nativisgp.com/#brand-lumina',
      name: 'Lumina',
      description: 'Premium triple-sec liqueur crafted from Mediterranean oranges',
      logo: 'https://i.imgur.com/Tv4BpiT.png',
      url: 'https://nativisgp.com/#lumina'
    },
    {
      '@type': 'Brand',
      '@id': 'https://nativisgp.com/#brand-lush',
      name: 'Lush',
      description: 'Premium liqueur with romantic fragrant charm and delicate sweetness',
      logo: 'https://nativisgp.com/imgs/Lush_Logo_v2.png',
      url: 'https://nativisgp.com/#lush'
    },
    {
      '@type': 'Brand',
      '@id': 'https://nativisgp.com/#brand-hofman',
      name: 'Hofman',
      description: 'Premium craft liqueur offering sophisticated taste and elegance',
      logo: 'https://nativisgp.com/imgs/HOFMAN%20NAME.png',
      url: 'https://nativisgp.com/#hofman'
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1'
  }
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://nativisgp.com/#website',
  url: 'https://nativisgp.com',
  name: 'Nativis - Premium Spirits & Liqueurs',
  alternateName: 'Nativis Group',
  description: 'Premium spirits and liqueurs distributor in Singapore, serving Southeast Asia with world-class brands',
  publisher: {
    '@id': 'https://nativisgp.com/#organization'
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://nativisgp.com/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  },
  inLanguage: 'en-SG',
  datePublished: '2023-01-01',
  dateModified: '2025-10-22',
  about: {
    '@type': 'Thing',
    name: 'Premium Spirits and Liqueurs',
    description: 'Craft spirits, premium liqueurs, and luxury beverages'
  }
};

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where can I buy Nativis premium liqueurs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nativis premium liqueurs are available through authorized distributors and retailers across Singapore, Hong Kong, Philippines, and Malaysia. Visit our Where to Buy page to find a location near you.'
      }
    },
    {
      '@type': 'Question',
      name: 'What brands does Nativis offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nativis offers a premium portfolio including Eldoria elderflower liqueur, Lumina triple-sec, Lush liqueur, and Hofman craft spirits. Each brand is crafted to deliver exceptional taste and quality.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does Nativis distribute internationally?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Nativis distributes premium spirits across Southeast Asia, including Singapore, Hong Kong, Philippines, and Malaysia. We are continuously expanding our distribution network.'
      }
    },
    {
      '@type': 'Question',
      name: 'How can I become a Nativis distributor or retail partner?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We welcome partnership inquiries from qualified distributors and retailers. Please contact us at din@nativisgp.com with details about your business and distribution capabilities.'
      }
    }
  ]
};
