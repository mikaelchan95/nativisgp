import React from 'react';
import { MapPin, Phone, Globe } from 'lucide-react';

interface RegionalData {
  region: string;
  description: string;
  benefits: string[];
  contact?: {
    phone?: string;
    email?: string;
  };
}

const regionalData: Record<string, RegionalData> = {
  Singapore: {
    region: 'Singapore',
    description: 'Nativis is headquartered in Singapore, bringing premium spirits and craft liqueurs to the heart of Southeast Asia. Our Singapore operations serve as the hub for distribution across the region.',
    benefits: [
      'Same-day delivery available in Singapore',
      'Local partnerships with premium bars and restaurants',
      'Direct access to our Singapore distribution center',
      'Regular tasting events and masterclasses in Singapore'
    ],
    contact: {
      phone: '+65 8621 4041',
      email: 'din@nativisgp.com'
    }
  },
  'Hong Kong': {
    region: 'Hong Kong',
    description: 'Expanding our premium spirits portfolio to Hong Kong, we partner with established distributors to bring Nativis liqueurs to Hong Kong\'s vibrant bar and restaurant scene.',
    benefits: [
      'Available through authorized Hong Kong distributors',
      'Premium placement in top Hong Kong establishments',
      'Growing network of Hong Kong retail partners',
      'Regular brand activations in Hong Kong'
    ]
  },
  Philippines: {
    region: 'Philippines',
    description: 'Nativis is proud to serve the Philippines market with our exceptional range of premium liqueurs, partnering with leading distributors to bring world-class spirits to discerning Filipino consumers and establishments nationwide.',
    benefits: [
      'Extensive distribution network across Metro Manila and key Philippine cities',
      'Strategic partnerships with premium hotels, bars, and restaurants throughout the Philippines',
      'Expanding presence in Luzon, Visayas, and Mindanao regions',
      'Dedicated local customer support and service for Philippine partners'
    ]
  },
  Malaysia: {
    region: 'Malaysia',
    description: 'Our Malaysia operations bring Nativis premium spirits to key markets including Kuala Lumpur, Penang, and Johor, with comprehensive distribution coverage.',
    benefits: [
      'Coverage across major Malaysian cities',
      'Established partnerships with leading Malaysian distributors',
      'Regular product training for Malaysian partners',
      'Strong presence in Malaysia\'s hospitality sector'
    ]
  }
};

interface RegionalContentProps {
  region?: 'Singapore' | 'Hong Kong' | 'Philippines' | 'Malaysia';
  showAllRegions?: boolean;
}

export default function RegionalContent({ region, showAllRegions = false }: RegionalContentProps) {
  const regions = showAllRegions
    ? Object.values(regionalData)
    : region && regionalData[region]
      ? [regionalData[region]]
      : [];

  if (regions.length === 0) return null;

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 gap-12">
        {regions.map((data) => (
          <div key={data.region} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-6 w-6 text-[#00B14F]" />
              <h3 className="text-2xl font-medium text-gray-900">
                Nativis in {data.region}
              </h3>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              {data.description}
            </p>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Regional Benefits
              </h4>
              <ul className="space-y-3">
                {data.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00B14F] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {data.contact && (
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  {data.region} Contact
                </h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  {data.contact.phone && (
                    <a
                      href={`tel:${data.contact.phone}`}
                      className="flex items-center gap-2 text-[#00B14F] hover:text-[#009B44] transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      <span>{data.contact.phone}</span>
                    </a>
                  )}
                  {data.contact.email && (
                    <a
                      href={`mailto:${data.contact.email}`}
                      className="flex items-center gap-2 text-[#00B14F] hover:text-[#009B44] transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      <span>{data.contact.email}</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
