import React from 'react';
import { Phone, Mail, MapPin, Clock, Globe } from 'lucide-react';

interface NAPData {
  name: string;
  address: {
    street: string;
    city: string;
    region: string;
    postal: string;
    country: string;
  };
  phone: string;
  email: string;
  website?: string;
  hours?: string;
}

interface NAPInfoProps {
  variant?: 'full' | 'minimal' | 'inline';
  showIcons?: boolean;
  showWebsite?: boolean;
  showHours?: boolean;
  className?: string;
  structured?: boolean; // Add microdata markup
}

export const defaultNAPData: NAPData = {
  name: "Nativis Group Pte Ltd",
  address: {
    street: "2 Sims Close, #04-06, Gemini @ Sims",
    city: "Singapore",
    region: "Singapore",
    postal: "387298",
    country: "Singapore"
  },
  phone: "+65 8621 4041",
  email: "din@nativisgp.com",
  website: "https://nativisgp.com",
  hours: "Monday - Friday: 9:00 AM - 6:00 PM SGT"
};

export default function NAPInfo({ 
  variant = 'full', 
  showIcons = true, 
  showWebsite = false,
  showHours = false,
  className = '',
  structured = true
}: NAPInfoProps) {
  const napData = defaultNAPData;

  const microdata = structured ? {
    itemScope: true,
    itemType: "https://schema.org/LocalBusiness"
  } : {};

  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-center space-x-2 ${className}`} {...microdata}>
        {structured && <meta itemProp="name" content={napData.name} />}
        <span itemProp={structured ? "telephone" : undefined}>
          {napData.phone}
        </span>
        <span className="text-gray-300">•</span>
        <span itemProp={structured ? "email" : undefined}>
          {napData.email}
        </span>
        <span className="text-gray-300">•</span>
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

  if (variant === 'minimal') {
    return (
      <div className={`space-y-2 ${className}`} {...microdata}>
        {structured && <meta itemProp="name" content={napData.name} />}
        <div className={`flex items-center ${showIcons ? 'space-x-3' : ''}`}>
          {showIcons && <Phone className="h-4 w-4 text-[#00B14F] flex-shrink-0" />}
          <a 
            href={`tel:${napData.phone}`}
            className="text-[#00B14F] hover:text-[#009B44] transition-colors"
            itemProp={structured ? "telephone" : undefined}
          >
            {napData.phone}
          </a>
        </div>
        <div className={`flex items-center ${showIcons ? 'space-x-3' : ''}`}>
          {showIcons && <Mail className="h-4 w-4 text-[#00B14F] flex-shrink-0" />}
          <a 
            href={`mailto:${napData.email}`}
            className="text-[#00B14F] hover:text-[#009B44] transition-colors"
            itemProp={structured ? "email" : undefined}
          >
            {napData.email}
          </a>
        </div>
        <div className={`flex items-start ${showIcons ? 'space-x-3' : ''}`}>
          {showIcons && <MapPin className="h-4 w-4 text-[#00B14F] mt-0.5 flex-shrink-0" />}
          <div itemProp={structured ? "address" : undefined} itemScope={structured} itemType={structured ? "https://schema.org/PostalAddress" : undefined}>
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`} {...microdata}>
      {structured && <meta itemProp="name" content={napData.name} />}
      
      <div className="flex items-center space-x-3">
        {showIcons && <Phone className="h-5 w-5 text-[#00B14F]" />}
        <div>
          <div className="font-medium text-gray-900">Phone</div>
          <a 
            href={`tel:${napData.phone}`}
            className="text-[#00B14F] hover:text-[#009B44] transition-colors"
            itemProp={structured ? "telephone" : undefined}
          >
            {napData.phone}
          </a>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {showIcons && <Mail className="h-5 w-5 text-[#00B14F]" />}
        <div>
          <div className="font-medium text-gray-900">Email</div>
          <a 
            href={`mailto:${napData.email}`}
            className="text-[#00B14F] hover:text-[#009B44] transition-colors"
            itemProp={structured ? "email" : undefined}
          >
            {napData.email}
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

      {showHours && napData.hours && (
        <div className="flex items-center space-x-3">
          {showIcons && <Clock className="h-5 w-5 text-[#00B14F]" />}
          <div>
            <div className="font-medium text-gray-900">Business Hours</div>
            <div className="text-gray-600" itemProp={structured ? "openingHours" : undefined}>
              {napData.hours}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}