import React from 'react';
import { Helmet } from 'react-helmet-async';
import LocalSEOManager, { generateLocalMetaTags } from '../components/LocalSEO/LocalSEOManager';
import NAPConsistency from '../components/LocalSEO/NAPConsistency';
import LocationSpecificContent from '../components/LocalSEO/LocationSpecificContent';
import GoogleBusinessOptimization from '../components/LocalSEO/GoogleBusinessOptimization';

export default function LocalSEOExample() {
  // Example products data
  const products = [
    {
      name: "Eldoria Premium Elderflower Liqueur",
      description: "A refined elderflower liqueur capturing the subtle sweetness of hand-picked elderflowers",
      price: "$55.00",
      image: "https://i.imgur.com/ln9ipPv.png",
      brand: "Eldoria",
      availability: "https://schema.org/InStock",
      condition: "https://schema.org/NewCondition"
    },
    {
      name: "Lumina Premium Triple Sec",
      description: "Premium triple-sec crafted from Mediterranean oranges, delivering bright and complex citrus notes",
      price: "$42.00", 
      image: "https://i.imgur.com/Tv4BpiT.png",
      brand: "Lumina",
      availability: "https://schema.org/InStock",
      condition: "https://schema.org/NewCondition"
    }
  ];

  // Generate local meta tags
  const metaData = generateLocalMetaTags('singapore', 'products');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Local SEO Meta Tags */}
      <Helmet>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <link rel="canonical" href={metaData.canonical} />
        
        {metaData.hreflang.map((lang, index) => (
          <link key={index} rel="alternate" hrefLang={lang.lang} href={lang.url} />
        ))}

        {/* Additional Local SEO Meta Tags */}
        <meta name="geo.region" content="SG-01" />
        <meta name="geo.placename" content="Singapore" />
        <meta name="ICBM" content="1.3339, 103.8855" />
        <meta name="DC.title" content="Nativis Group Pte Ltd" />
      </Helmet>

      {/* Comprehensive Local SEO Implementation */}
      <LocalSEOManager
        page="products"
        location="singapore"
        showGoogleBusiness={true}
        showLocationContent={true}
        products={products}
        className="pt-32 pb-24"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header with Local Context */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] text-[#00B14F] mb-6 block">
            SINGAPORE'S PREMIER SPIRITS DISTRIBUTOR
          </span>
          <h1 className="text-4xl font-light text-gray-900 mb-8">
            Local SEO Implementation <span className="font-playfair italic">Example</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            This page demonstrates comprehensive local SEO implementation including 
            structured data, NAP consistency, location-specific content, and Google Business Profile integration.
          </p>
        </div>

        {/* Location-Specific Hero Content */}
        <section className="mb-24">
          <LocationSpecificContent 
            location="singapore"
            variant="hero"
          />
        </section>

        {/* NAP Consistency Examples */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
              NAP Consistency Examples
            </h2>
            <p className="text-xl text-gray-600">
              Consistent business information across all implementations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Full NAP */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Full NAP Display</h3>
              <NAPConsistency 
                variant="full"
                showWebsite={true}
                showHours={true}
                showSocial={true}
              />
            </div>

            {/* Minimal NAP */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Minimal NAP Display</h3>
              <NAPConsistency 
                variant="minimal"
                showIcons={true}
              />
            </div>

            {/* Header NAP */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Header NAP Display</h3>
              <NAPConsistency 
                variant="header"
                showHours={true}
              />
            </div>
          </div>
        </section>

        {/* Google Business Profile Integration */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
              Google Business Profile Integration
            </h2>
            <p className="text-xl text-gray-600">
              Enhanced visibility and engagement through Google My Business
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Full Google Business Display */}
            <div className="lg:col-span-2">
              <GoogleBusinessOptimization variant="full" />
            </div>

            {/* Sidebar Components */}
            <div className="space-y-6">
              <GoogleBusinessOptimization variant="widget" />
              <GoogleBusinessOptimization variant="summary" />
            </div>
          </div>
        </section>

        {/* Location-Specific Content Examples */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
              Multi-Location Content
            </h2>
            <p className="text-xl text-gray-600">
              Tailored content for different markets
            </p>
          </div>

          <div className="space-y-12">
            {(['singapore', 'malaysia', 'hongkong'] as const).map((location) => (
              <div key={location} className="bg-white rounded-xl p-8 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 capitalize">
                  {location} Market
                </h3>
                <LocationSpecificContent 
                  location={location}
                  variant="service"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section with Full NAP */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-xl text-gray-600">
              Complete contact details with structured data markup
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <NAPConsistency 
              variant="contact"
              showHours={true}
              showSocial={true}
              showPayment={true}
            />
          </div>
        </section>

        {/* Implementation Notes */}
        <section className="bg-[#00B14F]/5 rounded-3xl p-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-8 text-center">
            Local SEO Implementation Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Structured Data</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• LocalBusiness Schema</li>
                <li>• Organization Schema</li>
                <li>• Product Schema</li>
                <li>• Review Schema</li>
                <li>• Service Schema</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">NAP Consistency</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Centralized data source</li>
                <li>• Multiple display variants</li>
                <li>• Microdata markup</li>
                <li>• Consistent formatting</li>
                <li>• Click-to-call/email</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Location Content</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Regional customization</li>
                <li>• Local landmarks</li>
                <li>• Service area mapping</li>
                <li>• Cultural adaptation</li>
                <li>• Local testimonials</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}