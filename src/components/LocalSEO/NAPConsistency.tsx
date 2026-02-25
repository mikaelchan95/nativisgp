import React from 'react';
import { Phone, Mail, MapPin, Clock, Globe, CreditCard } from 'lucide-react';

interface NAPData {
  name: string;
  address: {
    street: string;
    city: string;
    region: string;
    postal: string;
    country: string;
    full: string;
  };
  phone: {
    primary: string;
    formatted: string;
    international: string;
  };
  email: {
    general: string;
    sales: string;
    support: string;
  };
  website: string;
  hours: {
    weekdays: string;
    weekend: string;
    timezone: string;
  };
  social: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
}

interface NAPConsistencyProps {
  variant?: 'full' | 'minimal' | 'inline' | 'footer' | 'header' | 'contact';
  showIcons?: boolean;
  showWebsite?: boolean;
  showHours?: boolean;
  showSocial?: boolean;
  showPayment?: boolean;
  className?: string;
  structured?: boolean;
  clickable?: boolean;
}

export const masterNAPData: NAPData = {
  name: "Nativis Group Pte Ltd",
  address: {
    street: "2 Sims Close, #04-06, Gemini @ Sims",
    city: "Singapore",
    region: "Singapore",
    postal: "387298",
    country: "Singapore",
    full: "2 Sims Close, #04-06, Gemini @ Sims, Singapore 387298"
  },
  phone: {
    primary: "+65 8621 4041",
    formatted: "(+65) 8621 4041",
    international: "+65 8621 4041"
  },
  email: {
    general: "din@nativisgp.com",
    sales: "din@nativisgp.com",
    support: "din@nativisgp.com"
  },
  website: "https://nativisgp.com",
  hours: {
    weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
    weekend: "Closed",
    timezone: "SGT (GMT+8)"
  },
  social: {
    linkedin: "https://www.linkedin.com/company/nativis",
    facebook: "https://www.facebook.com/nativisgroup",
    instagram: "https://www.instagram.com/nativisgroup"
  }
};

export default function NAPConsistency({ 
  variant = 'full', 
  showIcons = true, 
  showWebsite = false,
  showHours = false,
  showSocial = false,
  showPayment = false,
  className = '',
  structured = true,
  clickable = true
}: NAPConsistencyProps) {
  const napData = masterNAPData;

  const microdata = structured ? {
    itemScope: true,
    itemType: "https://schema.org/LocalBusiness"
  } : {};

  // Inline variant for headers/footers
  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-center space-x-4 text-sm ${className}`} {...microdata}>
        {structured && <meta itemProp="name" content={napData.name} />}
        
        <span className="flex items-center space-x-1">
          {showIcons && <Phone className="h-3 w-3" />}
          {clickable ? (
            <a 
              href={`tel:${napData.phone.primary}`}
              className="hover:text-[#00B14F] transition-colors"
              itemProp={structured ? "telephone" : undefined}
            >
              {napData.phone.formatted}
            </a>
          ) : (
            <span itemProp={structured ? "telephone" : undefined}>
              {napData.phone.formatted}
            </span>
          )}
        </span>

        <span className="flex items-center space-x-1">
          {showIcons && <Mail className="h-3 w-3" />}
          {clickable ? (
            <a 
              href={`mailto:${napData.email.general}`}
              className="hover:text-[#00B14F] transition-colors"
              itemProp={structured ? "email" : undefined}
            >
              {napData.email.general}
            </a>
          ) : (
            <span itemProp={structured ? "email" : undefined}>
              {napData.email.general}
            </span>
          )}
        </span>

        <span itemProp={structured ? "address" : undefined} itemScope={structured} itemType={structured ? "https://schema.org/PostalAddress" : undefined}>
          <span itemProp={structured ? "addressLocality" : undefined}>{napData.address.city}</span>
          {structured && (
            <>
              <meta itemProp="streetAddress" content={napData.address.street} />
              <meta itemProp="addressRegion" content={napData.address.region} />
              <meta itemProp="postalCode" content={napData.address.postal} />
              <meta itemProp="addressCountry" content={napData.address.country} />
            </>
          )}
        </span>
      </span>
    );
  }

  // Header variant
  if (variant === 'header') {
    return (
      <div className={`flex items-center space-x-6 text-sm text-gray-600 ${className}`} {...microdata}>
        {structured && <meta itemProp="name" content={napData.name} />}
        
        <a 
          href={`tel:${napData.phone.primary}`}
          className="flex items-center space-x-2 hover:text-[#00B14F] transition-colors"
          itemProp={structured ? "telephone" : undefined}
        >
          <Phone className="h-4 w-4" />
          <span>{napData.phone.formatted}</span>
        </a>

        <a 
          href={`mailto:${napData.email.general}`}
          className="flex items-center space-x-2 hover:text-[#00B14F] transition-colors"
          itemProp={structured ? "email" : undefined}
        >
          <Mail className="h-4 w-4" />
          <span>{napData.email.general}</span>
        </a>

        {showHours && (
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span itemProp={structured ? "openingHours" : undefined}>
              {napData.hours.weekdays}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Contact page variant
  if (variant === 'contact') {
    return (
      <div className={`space-y-8 ${className}`} {...microdata}>
        {structured && <meta itemProp="name" content={napData.name} />}
        
        {/* Primary Contact */}
        <div className="bg-[#00B14F]/5 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-[#00B14F] mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">Phone</div>
                  <a 
                    href={`tel:${napData.phone.primary}`}
                    className="text-[#00B14F] hover:text-[#009B44] transition-colors"
                    itemProp={structured ? "telephone" : undefined}
                  >
                    {napData.phone.formatted}
                  </a>
                  <div className="text-sm text-gray-500">Direct line</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-[#00B14F] mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">Email</div>
                  <a 
                    href={`mailto:${napData.email.general}`}
                    className="text-[#00B14F] hover:text-[#009B44] transition-colors"
                    itemProp={structured ? "email" : undefined}
                  >
                    {napData.email.general}
                  </a>
                  <div className="text-sm text-gray-500">General inquiries</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#00B14F] mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">Address</div>
                  <a 
                    href="https://maps.google.com/?q=Gemini+@+Sims,+2+Sims+Cl,+%2304-06,+Singapore+387298"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#00B14F] transition-colors"
                    itemProp={structured ? "address" : undefined}
                    itemScope={structured}
                    itemType={structured ? "https://schema.org/PostalAddress" : undefined}
                  >
                    <div itemProp={structured ? "streetAddress" : undefined}>
                      {napData.address.street}
                    </div>
                    <div>
                      <span itemProp={structured ? "addressLocality" : undefined}>
                        {napData.address.city}
                      </span>{' '}
                      <span itemProp={structured ? "postalCode" : undefined}>
                        {napData.address.postal}
                      </span>
                    </div>
                    {structured && (
                      <>
                        <meta itemProp="addressRegion" content={napData.address.region} />
                        <meta itemProp="addressCountry" content={napData.address.country} />
                      </>
                    )}
                  </a>
                </div>
              </div>

              {showHours && (
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-[#00B14F] mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Business Hours</div>
                    <div className="text-gray-600" itemProp={structured ? "openingHours" : undefined}>
                      <div>{napData.hours.weekdays}</div>
                      <div>{napData.hours.weekend}</div>
                      <div className="text-sm text-gray-500">{napData.hours.timezone}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {showSocial && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="font-medium text-gray-900 mb-3">Follow Us</div>
              <div className="flex space-x-4">
                {napData.social.linkedin && (
                  <a 
                    href={napData.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#00B14F] transition-colors"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
                {napData.social.facebook && (
                  <a 
                    href={napData.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#00B14F] transition-colors"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full variant (default)
  return (
    <div className={`space-y-4 ${className}`} {...microdata}>
      {structured && <meta itemProp="name" content={napData.name} />}
      
      <div className="flex items-center space-x-3">
        {showIcons && <Phone className="h-5 w-5 text-[#00B14F]" />}
        <div>
          <div className="font-medium text-gray-900">Phone</div>
          <a 
            href={`tel:${napData.phone.primary}`}
            className="text-[#00B14F] hover:text-[#009B44] transition-colors"
            itemProp={structured ? "telephone" : undefined}
          >
            {napData.phone.formatted}
          </a>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {showIcons && <Mail className="h-5 w-5 text-[#00B14F]" />}
        <div>
          <div className="font-medium text-gray-900">Email</div>
          <a 
            href={`mailto:${napData.email.general}`}
            className="text-[#00B14F] hover:text-[#009B44] transition-colors"
            itemProp={structured ? "email" : undefined}
          >
            {napData.email.general}
          </a>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        {showIcons && <MapPin className="h-5 w-5 text-[#00B14F] mt-0.5" />}
        <div>
          <div className="font-medium text-gray-900">Address</div>
          <a 
            href="https://maps.google.com/?q=Gemini+@+Sims,+2+Sims+Cl,+%2304-06,+Singapore+387298"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#00B14F] transition-colors"
            itemProp={structured ? "address" : undefined}
            itemScope={structured}
            itemType={structured ? "https://schema.org/PostalAddress" : undefined}
          >
            <div itemProp={structured ? "streetAddress" : undefined}>{napData.address.street}</div>
            <div>
              <span itemProp={structured ? "addressLocality" : undefined}>{napData.address.city}</span>{' '}
              <span itemProp={structured ? "postalCode" : undefined}>{napData.address.postal}</span>
            </div>
            {structured && (
              <>
                <meta itemProp="addressRegion" content={napData.address.region} />
                <meta itemProp="addressCountry" content={napData.address.country} />
              </>
            )}
          </a>
        </div>
      </div>

      {showWebsite && napData.website && (
        <div className="flex items-center space-x-3">
          {showIcons && <Globe className="h-5 w-5 text-[#00B14F]" />}
          <div>
            <div className="font-medium text-gray-900">Website</div>
            <a 
              href={napData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00B14F] hover:text-[#009B44] transition-colors"
              itemProp={structured ? "url" : undefined}
            >
              nativisgp.com
            </a>
          </div>
        </div>
      )}

      {showHours && (
        <div className="flex items-start space-x-3">
          {showIcons && <Clock className="h-5 w-5 text-[#00B14F] mt-0.5" />}
          <div>
            <div className="font-medium text-gray-900">Business Hours</div>
            <div className="text-gray-600" itemProp={structured ? "openingHours" : undefined}>
              <div>{napData.hours.weekdays}</div>
              <div>{napData.hours.weekend}</div>
              <div className="text-sm text-gray-500">{napData.hours.timezone}</div>
            </div>
          </div>
        </div>
      )}

      {showPayment && (
        <div className="flex items-start space-x-3">
          {showIcons && <CreditCard className="h-5 w-5 text-[#00B14F] mt-0.5" />}
          <div>
            <div className="font-medium text-gray-900">Payment Methods</div>
            <div className="text-gray-600">
              Credit Card, Bank Transfer, Cash
            </div>
          </div>
        </div>
      )}
    </div>
  );
}