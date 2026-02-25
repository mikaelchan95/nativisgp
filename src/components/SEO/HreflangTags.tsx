import React from 'react';
import { Helmet } from 'react-helmet-async';

interface HreflangTag {
  hreflang: string;
  href: string;
}

interface HreflangTagsProps {
  currentUrl: string;
  alternateUrls?: HreflangTag[];
}

export default function HreflangTags({ currentUrl, alternateUrls = [] }: HreflangTagsProps) {
  const defaultAlternates: HreflangTag[] = [
    { hreflang: 'en-SG', href: currentUrl },
    { hreflang: 'en-HK', href: currentUrl },
    { hreflang: 'en-PH', href: currentUrl },
    { hreflang: 'en-MY', href: currentUrl },
    { hreflang: 'x-default', href: currentUrl },
  ];

  const tags = alternateUrls.length > 0 ? alternateUrls : defaultAlternates;

  return (
    <Helmet>
      {tags.map((tag) => (
        <link
          key={tag.hreflang}
          rel="alternate"
          hrefLang={tag.hreflang}
          href={tag.href}
        />
      ))}
    </Helmet>
  );
}
