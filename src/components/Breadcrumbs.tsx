import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/shop': 'Shop',
  '/where-to-buy': 'Where to Buy',
  '/people': 'Our People',
  '/careers': 'Careers',
  '/privacy-policy': 'Privacy Policy',
  '/terms-of-service': 'Terms of Service',
  '/responsible-drinking': 'Responsible Drinking',
  '/accessibility': 'Accessibility'
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];

  // Build breadcrumb trail
  let currentPath = '';
  pathnames.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathnames.length - 1;
    const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    breadcrumbs.push({
      label,
      href: currentPath,
      current: isLast
    });
  });

  return (
    <nav 
      className="bg-gray-50 py-4 border-b border-gray-100"
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2 flex-shrink-0" />
              )}
              
              {crumb.current ? (
                <span 
                  className="text-[#00B14F] font-medium"
                  aria-current="page"
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1 inline" />}
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.href}
                  className="text-gray-600 hover:text-[#00B14F] transition-colors flex items-center"
                  title={`Go to ${crumb.label}`}
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1" />}
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}