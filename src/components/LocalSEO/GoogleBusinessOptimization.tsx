import React, { useState } from 'react';
import { ExternalLink, Star, MessageCircle, MapPin, Clock, Phone, Calendar, Image, Camera } from 'lucide-react';

interface GoogleBusinessOptimizationProps {
  className?: string;
  variant?: 'full' | 'widget' | 'summary';
}

interface BusinessPhoto {
  id: string;
  url: string;
  category: 'interior' | 'exterior' | 'product' | 'team' | 'menu';
  alt: string;
  uploadDate: string;
}

export default function GoogleBusinessOptimization({ 
  className = '', 
  variant = 'full' 
}: GoogleBusinessOptimizationProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'photos' | 'posts' | 'insights'>('overview');

  const businessData = {
    name: "Nativis Group Pte Ltd",
    rating: 4.8,
    reviewCount: 47,
    address: "2 Sims Close, #04-06, Singapore 387298",
    phone: "+65 8621 4041",
    website: "https://nativisgp.com",
    hours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM", 
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 6:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    category: "Premium Spirits Distributor",
    description: "Singapore's premier distributor of craft liqueurs and premium spirits. Serving restaurants, bars, hotels, and discerning consumers across Southeast Asia with exceptional European liqueurs including Eldoria, Lumina, Lush, and Hofman.",
    attributes: [
      "Wheelchair accessible",
      "Free Wi-Fi",
      "Accepts credit cards",
      "Appointment required",
      "Business delivery available"
    ],
    services: [
      "Premium spirits consultation",
      "Bulk ordering for restaurants",
      "Corporate event planning",
      "Same-day delivery (CBD)",
      "Product training sessions"
    ]
  };

  const recentReviews = [
    {
      id: "1",
      author: "James Lim",
      rating: 5,
      date: "2 days ago",
      text: "Exceptional service and premium quality liqueurs. The team's expertise helped us curate the perfect selection for our hotel bar. Highly recommend for any hospitality business.",
      helpful: 12
    },
    {
      id: "2", 
      author: "Sarah Chen",
      rating: 5,
      date: "1 week ago",
      text: "Professional service from start to finish. Fast delivery and the Eldoria liqueur is absolutely fantastic. Will definitely be ordering again.",
      helpful: 8
    },
    {
      id: "3",
      author: "Ahmed Rahman",
      rating: 4,
      date: "2 weeks ago", 
      text: "Good selection of premium spirits. The consultation service was very helpful in choosing the right products for our restaurant.",
      helpful: 5
    }
  ];

  const businessPhotos: BusinessPhoto[] = [
    {
      id: "1",
      url: "/imgs/nativis logo.svg",
      category: "exterior",
      alt: "Nativis Group office entrance",
      uploadDate: "2024-01-15"
    },
    {
      id: "2", 
      url: "https://i.imgur.com/ln9ipPv.png",
      category: "product",
      alt: "Eldoria premium liqueur bottle",
      uploadDate: "2024-01-10"
    },
    {
      id: "3",
      url: "https://i.imgur.com/Tv4BpiT.png", 
      category: "product",
      alt: "Lumina triple-sec bottle",
      uploadDate: "2024-01-10"
    }
  ];

  const businessPosts = [
    {
      id: "1",
      type: "update",
      title: "New Premium Liqueur Collection Available",
      content: "Introducing our latest premium European liqueurs - perfect for the holiday season. Contact us for wholesale pricing.",
      date: "3 days ago",
      image: "/imgs/Lush_Logo_v2.png"
    },
    {
      id: "2",
      type: "offer", 
      title: "Bulk Order Discount - Limited Time",
      content: "Get 15% off on bulk orders over $500. Perfect for restaurants and bars looking to upgrade their spirits selection.",
      date: "1 week ago",
      cta: "Contact Us"
    }
  ];

  const handleGetDirections = () => {
    const address = encodeURIComponent(businessData.address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
  };

  const handleCallBusiness = () => {
    window.location.href = `tel:${businessData.phone}`;
  };

  const handleWriteReview = () => {
    // In production, this would link to the actual Google Business Profile
    window.open('https://search.google.com/local/writereview?placeid=ChIJd7zZQjMZ2jERqzHHXOOmFP0', '_blank');
  };

  const handleVisitWebsite = () => {
    window.open(businessData.website, '_blank');
  };

  if (variant === 'widget') {
    return (
      <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-sm ${className}`}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 text-sm">{businessData.name}</h3>
            <div className="flex items-center text-xs text-gray-500">
              <span>Powered by</span>
              <div className="ml-1 text-[10px] font-bold">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(businessData.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-600">
              {businessData.rating} ({businessData.reviewCount})
            </span>
          </div>
          
          <p className="text-xs text-gray-600 mb-3">{businessData.category}</p>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleGetDirections}
              className="flex items-center justify-center space-x-1 px-3 py-2 bg-[#00B14F] text-white rounded-lg hover:bg-[#009B44] transition-colors text-xs"
            >
              <MapPin className="h-3 w-3" />
              <span>Directions</span>
            </button>
            
            <button
              onClick={handleCallBusiness}
              className="flex items-center justify-center space-x-1 px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs"
            >
              <Phone className="h-3 w-3" />
              <span>Call</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'summary') {
    return (
      <div className={`bg-white rounded-xl border border-gray-100 p-6 ${className}`}>
        <h3 className="font-semibold text-gray-900 mb-4">Google Business Profile</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Current Rating</span>
            <div className="flex items-center space-x-2">
              <div className="flex">
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
              <span className="text-sm font-medium">{businessData.rating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Reviews</span>
            <span className="text-sm font-medium">{businessData.reviewCount}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Photos Uploaded</span>
            <span className="text-sm font-medium">{businessPhotos.length}</span>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={() => window.open('https://business.google.com', '_blank')}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[#00B14F] text-white rounded-lg hover:bg-[#009B44] transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Manage Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{businessData.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Powered by</span>
                <div className="text-xs font-bold">
                  <span className="text-blue-500">G</span>
                  <span className="text-red-500">o</span>
                  <span className="text-yellow-500">o</span>
                  <span className="text-blue-500">g</span>
                  <span className="text-green-500">l</span>
                  <span className="text-red-500">e</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{businessData.category}</p>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(businessData.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium">{businessData.rating}</span>
              <span className="text-gray-600">({businessData.reviewCount} reviews)</span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-[#00B14F]" />
                <span>{businessData.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#00B14F]" />
                <span>{businessData.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-[#00B14F]" />
                <span>Open • Closes 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <button
            onClick={handleGetDirections}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-[#00B14F] text-white rounded-lg hover:bg-[#009B44] transition-colors"
          >
            <MapPin className="h-4 w-4" />
            <span>Directions</span>
          </button>
          
          <button
            onClick={handleCallBusiness}
            className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>Call</span>
          </button>
          
          <button
            onClick={handleVisitWebsite}
            className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Website</span>
          </button>
          
          <button
            onClick={handleWriteReview}
            className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Review</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-100">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: 'Overview', icon: MapPin },
            { id: 'photos', label: 'Photos', icon: Image },
            { id: 'posts', label: 'Posts', icon: Calendar },
            { id: 'insights', label: 'Insights', icon: Star }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#00B14F] text-[#00B14F]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">About</h4>
              <p className="text-gray-600 leading-relaxed">{businessData.description}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Services</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {businessData.services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#00B14F] rounded-full"></div>
                    <span className="text-gray-600">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recent Reviews</h4>
              <div className="space-y-4">
                {recentReviews.slice(0, 2).map((review) => (
                  <div key={review.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="font-medium text-gray-900">{review.author}</span>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Business Photos</h4>
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#00B14F] text-white rounded-lg hover:bg-[#009B44] transition-colors">
                <Camera className="h-4 w-4" />
                <span>Add Photos</span>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {businessPhotos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Recent Posts</h4>
              <button className="px-4 py-2 bg-[#00B14F] text-white rounded-lg hover:bg-[#009B44] transition-colors">
                Create Post
              </button>
            </div>
            <div className="space-y-4">
              {businessPosts.map((post) => (
                <div key={post.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#00B14F] capitalize">{post.type}</span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h5 className="font-medium text-gray-900 mb-2">{post.title}</h5>
                  <p className="text-gray-600 text-sm">{post.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Performance Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00B14F] mb-2">{businessData.reviewCount}</div>
                <div className="text-sm text-gray-600">Total Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00B14F] mb-2">{businessData.rating}</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00B14F] mb-2">156</div>
                <div className="text-sm text-gray-600">Monthly Views</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}