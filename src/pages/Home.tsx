import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Brands from '../components/Brands';
import StructuredData from '../components/LocalSEO/StructuredData';
import LocalContent from '../components/LocalSEO/LocalContent';
import SEOHead from '../components/SEO/SEOHead';
import HreflangTags from '../components/SEO/HreflangTags';
import RegionalContent from '../components/SEO/RegionalContent';
import { seoConfig, organizationSchema, websiteSchema, faqSchema } from '../utils/seoData';

export default function Home() {
  const products = [
    {
      name: "Eldoria",
      description: "A refined elderflower liqueur capturing the subtle sweetness of hand-picked elderflowers.",
      price: "$55.00",
      image: "https://i.imgur.com/ln9ipPv.png",
      brand: "Eldoria"
    },
    {
      name: "Lumina",
      description: "Premium triple-sec crafted from Mediterranean oranges, delivering bright and complex citrus notes.",
      price: "$42.00",
      image: "https://i.imgur.com/Tv4BpiT.png",
      brand: "Lumina"
    },
    {
      name: "Lush",
      description: "With a soft delicate sweetness and romantic fragrant charm, it offers a taste that embodies the allure of love immortalised in flavour.",
      price: "$42.00",
      image: "/imgs/Lush_Logo_v2.png",
      brand: "Lush"
    },
    {
      name: "Hofman",
      description: "With a soft delicate sweetness and romantic fragrant charm, it offers a taste that embodies the allure of love immortalised in flavour.",
      price: "$42.00",
      image: "/imgs/HOFMAN NAME.png",
      brand: "Hofman"
    }
  ];
  return (
    <>
      <SEOHead
        title={seoConfig.home.title}
        description={seoConfig.home.description}
        keywords={seoConfig.home.keywords}
        canonicalUrl={seoConfig.home.canonicalUrl}
        ogType="website"
        structuredData={[organizationSchema, websiteSchema, faqSchema]}
      />
      <HreflangTags currentUrl={seoConfig.home.canonicalUrl} />
      <StructuredData
        pageType="website"
        products={products}
      />
      <Hero />
      <About />
      <Brands />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <RegionalContent showAllRegions={true} />
      </div>
    </>
  );
}