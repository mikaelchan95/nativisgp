import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface RelatedLink {
  title: string;
  href: string;
  description: string;
  external?: boolean;
  category?: string;
}

interface RelatedContentProps {
  currentPage: string;
  className?: string;
}

const relatedContentMap: Record<string, RelatedLink[]> = {
  '/where-to-buy': [
    {
      title: 'Our People',
      href: '/people',
      description: 'Meet the team behind our exceptional spirits',
      category: 'Company'
    },
    {
      title: 'Careers',
      href: '/careers',
      description: 'Join our growing network of partners',
      category: 'Opportunities'
    }
  ],
  '/people': [
    {
      title: 'Careers',
      href: '/careers',
      description: 'Explore opportunities to join our team',
      category: 'Opportunities'
    },
    {
      title: 'Our Story',
      href: '/#about',
      description: 'Discover our journey and values',
      category: 'Company'
    },
    {
      title: 'Contact Us',
      href: '/#about',
      description: 'Get in touch with our leadership team',
      category: 'Contact'
    }
  ],
  '/careers': [
    {
      title: 'Our People',
      href: '/people',
      description: 'Meet our leadership team and company culture',
      category: 'Company'
    },
    {
      title: 'About Nativis',
      href: '/#about',
      description: 'Learn about our mission and values',
      category: 'Company'
    },
    {
      title: 'Where to Buy',
      href: '/where-to-buy',
      description: 'Explore our global network of partners',
      category: 'Network'
    }
  ]
};

export default function RelatedContent({ currentPage, className = '' }: RelatedContentProps) {
  const relatedLinks = relatedContentMap[currentPage];

  if (!relatedLinks || relatedLinks.length === 0) {
    return null;
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            You Might Also <span className="font-playfair italic">Enjoy</span>
          </h2>
          <p className="text-gray-600">Explore more of what Nativis has to offer</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-[#00B14F]/20 hover:shadow-lg transition-all duration-300"
              title={`Learn more about ${link.title}`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-medium text-[#00B14F] bg-[#00B14F]/5 px-2 py-1 rounded-full">
                  {link.category}
                </span>
                {link.external ? (
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-[#00B14F] transition-colors" />
                ) : (
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#00B14F] group-hover:translate-x-1 transition-all" />
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#00B14F] transition-colors mb-2">
                {link.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}