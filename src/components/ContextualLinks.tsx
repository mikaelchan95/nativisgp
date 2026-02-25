import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ContextualLinkProps {
  text: string;
  href: string;
  context: string;
  className?: string;
}

const ContextualLink: React.FC<ContextualLinkProps> = ({ text, href, context, className = '' }) => (
  <Link
    to={href}
    className={`inline-flex items-center text-[#00B14F] hover:text-[#009B44] font-medium transition-colors group ${className}`}
    title={context}
  >
    {text}
    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
  </Link>
);

interface ContextualLinksProps {
  content: string;
  page: string;
}

/**
 * Component that adds contextual internal links to content
 */
export default function ContextualLinks({ content, page }: ContextualLinksProps) {
  // Define link opportunities based on keywords
  const linkOpportunities = [
    {
      keywords: ['where to buy', 'purchase', 'retailers'],
      href: '/where-to-buy',
      anchor: 'find authorized retailers',
      context: 'Locate authorized retailers and distributors'
    },
    {
      keywords: ['our team', 'leadership', 'founders'],
      href: '/people',
      anchor: 'meet our leadership team',
      context: 'Learn about our company leadership'
    },
    {
      keywords: ['careers', 'join', 'opportunities'],
      href: '/careers',
      anchor: 'explore career opportunities',
      context: 'Discover career opportunities at Nativis'
    },
    {
      keywords: ['heritage', 'story', 'mission'],
      href: '/#about',
      anchor: 'discover our story',
      context: 'Learn about our company heritage and mission'
    }
  ];

  // Process content to add contextual links (simplified example)
  let processedContent = content;
  
  linkOpportunities.forEach(opportunity => {
    // Skip if current page matches the opportunity
    if (opportunity.href === page || opportunity.href.includes(page)) return;
    
    const keyword = opportunity.keywords[0];
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    
    if (processedContent.match(regex)) {
      // Replace first occurrence with a link (in a real implementation, you'd be more sophisticated)
      processedContent = processedContent.replace(
        regex,
        `<a href="${opportunity.href}" class="text-[#00B14F] hover:text-[#009B44] font-medium transition-colors" title="${opportunity.context}">${keyword}</a>`
      );
    }
  });

  return <div dangerouslySetInnerHTML={{ __html: processedContent }} />;
}

/**
 * Quick Links component for sidebars or content areas
 */
export const QuickLinks: React.FC<{ page: string }> = ({ page }) => {
  const getQuickLinks = (currentPage: string) => {
    const baseLinks = [
      { href: '/where-to-buy', text: 'Find Retailers', description: 'Locate our products' },
      { href: '/people', text: 'Our Leadership', description: 'Meet the team' },
      { href: '/careers', text: 'Join Our Team', description: 'Career opportunities' }
    ];

    return baseLinks.filter(link => !link.href.includes(currentPage.replace('/', '')));
  };

  const links = getQuickLinks(page);

  return (
    <div className="bg-[#00B14F]/5 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
      <div className="space-y-3">
        {links.map((link, index) => (
          <ContextualLink
            key={index}
            text={link.text}
            href={link.href}
            context={link.description}
            className="block"
          />
        ))}
      </div>
    </div>
  );
};