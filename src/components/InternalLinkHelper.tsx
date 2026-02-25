import React from 'react';
import { Link } from 'react-router-dom';

interface InternalLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  anchor?: string;
  nofollow?: boolean;
}

/**
 * SEO-optimized internal link component with proper attributes
 */
export default function InternalLink({ 
  to, 
  children, 
  className = '', 
  title,
  anchor,
  nofollow = false
}: InternalLinkProps) {
  const href = anchor ? `${to}#${anchor}` : to;
  
  const linkProps: any = {
    to: href,
    className: `hover:text-[#00B14F] transition-colors ${className}`,
    ...(title && { title }),
    ...(nofollow && { rel: 'nofollow' })
  };

  return <Link {...linkProps}>{children}</Link>;
}

/**
 * Generate contextual anchor text variations
 */
export const anchorTextVariations = {
  whereToBuy: [
    'find a retailer near you',
    'locate our products',
    'where to buy',
    'find authorized dealers',
    'purchase locations'
  ],
  people: [
    'meet our team',
    'our leadership',
    'about our people',
    'company leadership',
    'the team behind Nativis'
  ],
  careers: [
    'join our team',
    'career opportunities',
    'work with us',
    'explore careers',
    'open positions'
  ],
  about: [
    'our story',
    'about Nativis',
    'company heritage',
    'learn more about us',
    'discover our mission'
  ],
  brands: [
    'our brands',
    'explore our portfolio',
    'premium liqueurs',
    'signature brands',
    'brand collection'
  ]
};

/**
 * Hook for getting random anchor text
 */
export const useAnchorText = (category: keyof typeof anchorTextVariations) => {
  const variations = anchorTextVariations[category];
  return variations[Math.floor(Math.random() * variations.length)];
};