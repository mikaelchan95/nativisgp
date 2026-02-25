import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import StructuredData from '../components/LocalSEO/StructuredData';
import NAPInfo from '../components/LocalSEO/NAPInfo';
import RelatedContent from '../components/RelatedContent';
import InternalLink from '../components/InternalLinkHelper';
import SEOHead from '../components/SEO/SEOHead';
import { seoConfig } from '../utils/seoData';

const leaders = [
  {
    name: "Din Hassan",
    title: "Co-Founder/COO",
    image: "https://images.squarespace-cdn.com/content/v1/665d31c70f92397e75c6a2be/8f7db0e7-d68a-4fbf-b8a1-de361aac0c5a/DinHassan%5B37%5D.jpg?format=1500w",
    description: `Din's experience extends far beyond our previous collaborations. Din is a luminary in the bar industry in his region, akin to a rock star, and wields significant influence globally within the trade. In today's avant-garde cocktail bars, Din has contributed to some of the most creative and innovative establishments. He has also served as a Brand Consultant, Trainer, and Ambassador for esteemed spirits companies including Remy Cointreau, Domaine De Canton, Drambuie, Edrington, Diageo etc.`,
    experience: `He has been invited to judge cocktail competitions across Asia, Japan, Italy, and London. Notably, Din is an academy member of The World's 50 Best Bars, Asia's 50 Best Bars, and serves on the seminar committee for Tales Of The Cocktails 2018. In recognition of his contributions, he was honoured as the People's Choice "The Ultimate Brand Ambassador" in 2023. Today he works at Nativis Group together with Vincent Hong who also have an impressive background in the industry.`
  },
  {
    name: "Vincent Hong",
    title: "Co-Founder/Director",
    image: "https://images.squarespace-cdn.com/content/v1/665d31c70f92397e75c6a2be/14b724cd-dac4-4b1d-a3ac-8de5edd947db/IMG_8072.jpeg?format=1500w",
    description: `As the founder of Barworks Wine & Spirits Pte Ltd, Vincent played a crucial role in transforming the company into one of Singapore's top five assorted wine and spirits distributors. Under his leadership, Barworks not only expanded its market reach but also built a reputation for quality and exceptional customer service. Vincent's innovative approach and dedication were instrumental in driving the company's growth and success in a competitive market.`,
    experience: `In December 2023, Vincent transitioned from Barworks to Nativis GP Pte Ltd, where he now assumes a pivotal leadership role. His wealth of experience and proven expertise in the alcohol distribution industry position him well to lead Nativis GP Pte Ltd into its next phase of growth and development. Vincent's strategic insights and deep industry knowledge continue to be invaluable assets as he navigates new challenges and opportunities in his current role.`,
    phone: "+65 9022 1220",
    email: "vincent.hong@nativisgp.com"
  }
];

export default function People() {
  const personSchemas = leaders.map((leader, index) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `https://nativisgp.com/people#${leader.name.toLowerCase().replace(' ', '-')}`,
    name: leader.name,
    jobTitle: leader.title,
    description: leader.description + ' ' + leader.experience,
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://nativisgp.com/#organization',
      name: 'Nativis Group Pte Ltd'
    },
    telephone: leader.phone,
    email: leader.email,
    image: leader.image,
    url: `https://nativisgp.com/people#${leader.name.toLowerCase().replace(' ', '-')}`,
    knowsAbout: index === 0
      ? ['Brand Ambassador', 'Cocktail Culture', 'Bar Industry', 'Spirits Education', 'Hospitality Training', 'Product Development']
      : ['Spirits Distribution', 'Wine Industry', 'Business Development', 'Luxury Beverages', 'Market Expansion', 'Strategic Partnerships'],
    award: index === 0
      ? ['Ultimate Brand Ambassador 2023', 'World\'s 50 Best Bars Academy Member', 'Asia\'s 50 Best Bars Academy Member']
      : undefined,
    memberOf: index === 0
      ? [
          {
            '@type': 'Organization',
            name: 'World\'s 50 Best Bars Academy'
          },
          {
            '@type': 'Organization',
            name: 'Asia\'s 50 Best Bars Academy'
          }
        ]
      : undefined,
    alumniOf: index === 1
      ? {
          '@type': 'Organization',
          name: 'Barworks Wine & Spirits Pte Ltd'
        }
      : undefined
  }));

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://nativisgp.com/people#aboutpage',
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://nativisgp.com/#organization',
      name: 'Nativis Group Pte Ltd',
      employee: leaders.map(leader => ({
        '@id': `https://nativisgp.com/people#${leader.name.toLowerCase().replace(' ', '-')}`
      }))
    }
  };

  const allSchemas = [...personSchemas, aboutPageSchema];

  return (
    <div className="pt-32 pb-24 bg-white">
      <SEOHead
        title={seoConfig.people.title}
        description={seoConfig.people.description}
        keywords={seoConfig.people.keywords}
        canonicalUrl={seoConfig.people.canonicalUrl}
        ogType="website"
        structuredData={allSchemas}
      />
      <StructuredData pageType="about" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm tracking-[0.3em] text-[#00B14F] mb-6 block">OUR LEADERSHIP</span>
          <h1 className="text-4xl font-light text-gray-900 mb-8" id="leadership-team">
            Meet Our <span className="font-playfair italic">Leadership</span> Team
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our leadership team has decades of spirits industry experience. 
            They combine innovation with deep market knowledge. This expertise 
            drives Nativis forward in the premium liqueurs market.
          </p>
        </div>

        {/* Leadership Profiles */}
        <div className="space-y-32">
          {leaders.map((leader, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className={`relative h-[600px] rounded-2xl overflow-hidden ${
                index % 2 === 1 ? 'lg:order-2' : ''
              }`}>
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h2 className="text-2xl font-medium mb-2">{leader.name}</h2>
                  <p className="text-[#00B14F] tracking-wider text-sm bg-white/90 px-2 py-1 rounded inline-block">{leader.title}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <span className="text-sm tracking-[0.3em] text-[#00B14F] mb-4 block">
                    {index === 0 ? "A VETERAN OF SINGAPORE'S NIGHTLIFE INDUSTRY" : "A GUIDING FORCE IN ASIA'S ALCOHOL DISTRIBUTION INDUSTRY"}
                  </span>
                  <div className="prose prose-lg">
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {leader.description}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {leader.experience}
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 space-y-4">
                  {leader.phone || leader.email ? (
                    <div className="space-y-2">
                      {leader.phone && (
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-[#00B14F]" />
                          <a
                            href={`tel:${leader.phone}`}
                            className="text-[#00B14F] hover:text-[#009B44] transition-colors"
                          >
                            {leader.phone}
                          </a>
                        </div>
                      )}
                      {leader.email && (
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-[#00B14F]" />
                          <a
                            href={`mailto:${leader.email}`}
                            className="text-[#00B14F] hover:text-[#009B44] transition-colors"
                          >
                            {leader.email}
                          </a>
                        </div>
                      )}
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-[#00B14F] mt-0.5" />
                        <div className="text-gray-600">
                          <div>2 Sims Close, #04-06, Gemini @ Sims</div>
                          <div>Singapore 387298</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NAPInfo variant="minimal" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cross-linking Section */}
        <div className="mt-24 bg-[#00B14F]/5 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-medium text-gray-900 mb-4" id="connect-with-us">
              Ready to <span className="font-playfair italic">Connect?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're interested in our products, partnership opportunities, 
              or joining our team, we'd love to hear from you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InternalLink 
              to="/where-to-buy"
              className="block text-center p-8 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 group"
              title="Find authorized retailers and distributors"
            >
              <div className="text-2xl font-light text-gray-900 group-hover:text-[#00B14F] transition-colors mb-3">
                Find Authorized Retailers
              </div>
              <p className="text-gray-600">
                Connect with our trusted network of retailers and distributors worldwide.
              </p>
            </InternalLink>
            
            <InternalLink 
              to="/careers"
              className="block text-center p-8 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 group"
              title="Explore career opportunities at Nativis"
            >
              <div className="text-2xl font-light text-gray-900 group-hover:text-[#00B14F] transition-colors mb-3">
                Career Opportunities
              </div>
              <p className="text-gray-600">
                Be part of our mission to create exceptional spirits experiences.
              </p>
            </InternalLink>
          </div>
        </div>
      </div>

      {/* Related Content */}
      <RelatedContent currentPage="/people" />
    </div>
  );
}