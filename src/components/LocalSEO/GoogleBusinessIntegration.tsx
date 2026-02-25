import React from 'react';
import { ExternalLink, Star, MessageCircle, MapPin, Clock } from 'lucide-react';

interface GoogleBusinessIntegrationProps {
  className?: string;
}

export default function GoogleBusinessIntegration({ className = '' }: GoogleBusinessIntegrationProps) {
  const businessData = {
    name: "Nativis Group Pte Ltd",
    rating: 4.8,
    reviewCount: 24,
    address: "2 Sims Close, #04-06, Singapore 387298",
    phone: "+65 8621 4041",
    hours: "9:00 AM - 6:00 PM",
    category: "Premium Spirits Distributor"
  };

  const handleGetDirections = () => {
    const address = encodeURIComponent(businessData.address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
  };

  const handleCallBusiness = () => {
    window.location.href = `tel:${businessData.phone}`;
  };

  const handleWriteReview = () => {
    // In a real implementation, this would link to the actual Google Business Profile
    window.open('https://search.google.com/local/writereview?placeid=ChIJd7zZQjMZ2jERqzHHXOOmFP0', '_blank');
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
      {/* Header with business info */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {businessData.name}
            </h3>
            <p className="text-gray-600 mb-3">{businessData.category}</p>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(businessData.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {businessData.rating} ({businessData.reviewCount} reviews)
              </span>
            </div>

            {/* Contact info */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-[#00B14F]" />
                <span>{businessData.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-[#00B14F]" />
                <span>Open until 6:00 PM • {businessData.hours}</span>
              </div>
            </div>
          </div>

          {/* Google logo */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Powered by</span>
            <div className="text-xs">
              <span className="text-blue-500 font-semibold">G</span>
              <span className="text-red-500 font-semibold">o</span>
              <span className="text-yellow-500 font-semibold">o</span>
              <span className="text-blue-500 font-semibold">g</span>
              <span className="text-green-500 font-semibold">l</span>
              <span className="text-red-500 font-semibold">e</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={handleGetDirections}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-[#00B14F] text-white rounded-lg hover:bg-[#009B44] transition-colors"
          >
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Directions</span>
          </button>
          
          <button
            onClick={handleCallBusiness}
            className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm font-medium">Call</span>
          </button>
          
          <button
            onClick={handleWriteReview}
            className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Review</span>
          </button>
        </div>
      </div>

      {/* Recent reviews preview */}
      <div className="px-6 pb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Reviews</h4>
        <div className="space-y-3">
          <div className="text-sm">
            <div className="flex items-center space-x-2 mb-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-500">• 2 days ago</span>
            </div>
            <p className="text-gray-700">
              "Excellent service and premium quality liqueurs. Highly recommend for special occasions."
            </p>
          </div>
          
          <div className="text-sm">
            <div className="flex items-center space-x-2 mb-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-500">• 1 week ago</span>
            </div>
            <p className="text-gray-700">
              "Professional team, great location in Singapore CBD. Fast delivery service."
            </p>
          </div>
        </div>
        
        <button 
          onClick={handleWriteReview}
          className="mt-4 text-sm text-[#00B14F] hover:text-[#009B44] font-medium flex items-center space-x-1"
        >
          <span>See all reviews</span>
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}