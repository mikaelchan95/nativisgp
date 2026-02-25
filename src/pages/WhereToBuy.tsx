import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Phone, Globe, Clock, AlertTriangle, Mail, User, Search, Filter, ChevronDown } from 'lucide-react';
import StructuredData from '../components/LocalSEO/StructuredData';
import LocalContent from '../components/LocalSEO/LocalContent';
import GoogleBusinessIntegration from '../components/LocalSEO/GoogleBusinessIntegration';
import RelatedContent from '../components/RelatedContent';
import InternalLink from '../components/InternalLinkHelper';
import SEOHead from '../components/SEO/SEOHead';
import { seoConfig } from '../utils/seoData';

interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  phone?: string;
  website?: string;
  email?: string;
  fax?: string;
  hours?: string;
  contactPerson?: string;
  area?: string;
  type: 'distributor' | 'retail' | 'bar';
  country: 'Singapore' | 'Hong Kong' | 'Philippines' | 'Malaysia';
  brands: ('Eldoria' | 'Lumina' | 'Lush' | 'Hofman')[];
}

const locations: Location[] = [
  {
    id: 'sg-barworks',
    name: 'Barworks Wine & Spirits Pte Ltd',
    address: '2 Yishun Industrial Street 1, Northpoint Bizhub #07-26, Singapore 768159',
    coordinates: { lat: 1.4304, lng: 103.8354 },
    phone: '+65 6534 1995',
    website: 'https://barworks.com.sg',
    type: 'distributor',
    country: 'Singapore',
    brands: ['Eldoria', 'Lumina', 'Lush', 'Hofman']
  },
  {
    id: 'sg-epicowine',
    name: 'Epico Wine & Spirits Pte Ltd',
    address: '2 Sims Close #04-06 Gemini @ Sims, Singapore 387298',
    coordinates: { lat: 1.3339, lng: 103.8855 },
    email: 'contactus@epicowine.com',
    website: 'https://epicowine.com',
    type: 'distributor',
    country: 'Singapore',
    brands: ['Eldoria', 'Lumina', 'Lush', 'Hofman']
  },
  {
    id: 'sg-infinite',
    name: 'Infinite Beverages Pte Ltd',
    address: '1 Corporation Dr, #09-10 Revv Building, Singapore 619775',
    coordinates: { lat: 1.3139, lng: 103.7621 },
    email: 'salesandfinance@infinitebeverages.com.sg',
    website: 'https://www.infinitebeverages.com.sg/',
    type: 'distributor',
    country: 'Singapore',
    brands: ['Eldoria', 'Lumina', 'Lush', 'Hofman']
  },
  {
    id: 'sg-magnum',
    name: 'Magnum Spirits & Wine',
    address: '8 Jalan Kilang Timor, #01-07 Kewalram House, Singapore 159305',
    coordinates: { lat: 1.2904, lng: 103.8089 },
    phone: '+65 6488 1270',
    email: 'marketing@magnum.com.sg',
    website: 'https://magnum.com.sg',
    type: 'distributor',
    country: 'Singapore',
    brands: ['Eldoria', 'Lumina', 'Lush', 'Hofman']
  },
  {
    id: 'hk-universal',
    name: 'Universal Exports (Far East) Limited',
    address: 'Hong Kong',
    coordinates: { lat: 22.3193, lng: 114.1694 },
    phone: '+852 2314 1110',
    fax: '+852 2314 1117',
    email: 'Info@UniversalXport.com',
    website: 'https://www.universalxport.com/',
    type: 'distributor',
    country: 'Hong Kong',
    brands: ['Eldoria', 'Lumina', 'Lush', 'Hofman']
  },
  {
    id: 'ph-savoroso',
    name: 'Savoroso',
    address: 'Salinlahi 2, Congressional Ave. Ext., Quezon City, Metro Manila, Philippines 1128',
    coordinates: { lat: 14.6760, lng: 121.0437 },
    email: 'contact@savoroso.com.ph',
    website: 'https://savoroso.com.ph/',
    type: 'distributor',
    country: 'Philippines',
    brands: ['Eldoria', 'Lumina', 'Lush', 'Hofman']
  },
  {
    id: 'my-drinksconnexion',
    name: 'Drinks Connexion',
    address: 'D10, 06-01, Jalan PJU 1a/46, Pusat Perdagangan Dana 1, 47301 Petaling Jaya, Selangor, Malaysia',
    coordinates: { lat: 3.1319, lng: 101.5860 },
    phone: '+60 3-7832 7272',
    website: 'https://www.facebook.com/drinksconnexion',
    contactPerson: 'Adrean',
    area: 'Head of Sales',
    type: 'distributor',
    country: 'Malaysia',
    brands: ['Eldoria', 'Lumina', 'Lush', 'Hofman']
  },
  {
    id: 'my-drinksconnexion-pj',
    name: 'Drinks Connexion - PJ Area',
    address: 'Petaling Jaya, Selangor, Malaysia',
    coordinates: { lat: 3.1073, lng: 101.6067 },
    phone: '+60 16-668 4103',
    website: 'https://www.facebook.com/drinksconnexion',
    area: 'Petaling Jaya Area',
    type: 'distributor',
    country: 'Malaysia',
    brands: ['Eldoria', 'Lumina', 'Lush', 'Hofman']
  },
  {
    id: 'my-drinksconnexion-kl',
    name: 'Drinks Connexion - KL Area',
    address: 'Kuala Lumpur, Malaysia',
    coordinates: { lat: 3.1390, lng: 101.6869 },
    phone: '+60 11-1121 1229',
    website: 'https://www.facebook.com/drinksconnexion',
    area: 'Kuala Lumpur Area',
    type: 'distributor',
    country: 'Malaysia',
    brands: ['Eldoria', 'Lumina', 'Lush', 'Hofman']
  },
  {
    id: 'my-drinksconnexion-horeca',
    name: 'Drinks Connexion - HORECA',
    address: 'Malaysia',
    coordinates: { lat: 3.0738, lng: 101.5183 },
    phone: '+60 14-328 7036',
    website: 'https://www.facebook.com/drinksconnexion',
    area: 'HORECA (Hotels, Restaurants, Cafés)',
    type: 'distributor',
    country: 'Malaysia',
    brands: ['Eldoria', 'Lumina', 'Lush', 'Hofman']
  },
  {
    id: 'my-drinksconnexion-penang',
    name: 'Drinks Connexion - Penang',
    address: 'Penang, Malaysia',
    coordinates: { lat: 5.4141, lng: 100.3292 },
    phone: '+60 12-470 8989',
    website: 'https://www.facebook.com/drinksconnexion',
    contactPerson: 'Dollores DC',
    area: 'Penang Area',
    type: 'distributor',
    country: 'Malaysia',
    brands: ['Eldoria', 'Lumina', 'Lush', 'Hofman']
  },
  {
    id: 'my-drinksconnexion-johor',
    name: 'Drinks Connexion - Johor',
    address: 'Johor, Malaysia',
    coordinates: { lat: 1.4927, lng: 103.7414 },
    phone: '+60 16-233 2008',
    website: 'https://www.facebook.com/drinksconnexion',
    area: 'Johor Area',
    type: 'distributor',
    country: 'Malaysia',
    brands: ['Eldoria', 'Lumina', 'Lush', 'Hofman']
  }
];

const brandColors = {
  Eldoria: '#00B14F',
  Lumina: '#FF8C00', 
  Lush: '#FF69B4',
  Hofman: '#FFAB91'
};

const brandLogos = {
  Eldoria: 'https://i.imgur.com/ln9ipPv.png',
  Lumina: 'https://i.imgur.com/Tv4BpiT.png',
  Lush: '/imgs/Lush_Logo_v2.png',
  Hofman: '/imgs/HOFMAN NAME.png'
};

const countryCenters = {
  All: { lat: 10.7500, lng: 106.6667, zoom: 4 },
  Singapore: { lat: 1.3521, lng: 103.8198, zoom: 11 },
  'Hong Kong': { lat: 22.3193, lng: 114.1694, zoom: 11 },
  Philippines: { lat: 12.8797, lng: 121.7740, zoom: 6 },
  Malaysia: { lat: 4.2105, lng: 101.9758, zoom: 7 }
};

const FilterButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      active
        ? 'bg-[#00B14F] text-white shadow-sm'
        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 active:bg-gray-200'
    }`}
  >
    {children}
  </button>
);

const BrandSelector: React.FC<{
  brands: Array<{ id: string; label: string; logo: string | null }>;
  activeBrand: string;
  onBrandChange: (brand: string) => void;
}> = ({ brands, activeBrand, onBrandChange }) => (
  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
    {brands.map(brand => (
      <button
        key={brand.id}
        onClick={() => onBrandChange(brand.id)}
        className={`group relative flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${
          activeBrand === brand.id
            ? 'bg-[#00B14F]/5 border-2 border-[#00B14F] scale-105'
            : 'bg-white border border-gray-200 hover:border-gray-300 hover:scale-105 active:scale-95'
        }`}
      >
        <div className="w-16 h-16 mb-3 flex items-center justify-center">
          {brand.logo ? (
            <img 
              src={brand.logo} 
              alt={brand.label}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-600 text-center">ALL</span>
            </div>
          )}
        </div>
        <span className="text-sm font-medium text-gray-900">{brand.label}</span>
        {activeBrand === brand.id && (
          <div className="absolute -bottom-1 w-6 h-1 bg-[#00B14F] rounded-full" />
        )}
      </button>
    ))}
  </div>
);

const LocationCard: React.FC<{
  location: Location;
  onClick: () => void;
}> = ({ location, onClick }) => (
  <div
    onClick={onClick}
    className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden active:scale-95"
  >
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#00B14F] transition-colors">
            {location.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{location.country}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          location.type === 'distributor' ? 'bg-green-50 text-green-700' :
          location.type === 'retail' ? 'bg-blue-50 text-blue-700' :
          'bg-purple-50 text-purple-700'
        }`}>
          {location.type === 'distributor' ? 'Distributor' :
           location.type === 'retail' ? 'Retail' :
           'Bar & Restaurant'}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600 leading-relaxed">{location.address}</p>
        </div>
        
        {location.contactPerson && (
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-600">{location.contactPerson}</span>
          </div>
        )}
        
        {location.phone && (
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <a href={`tel:${location.phone}`} className="text-sm text-[#00B14F] hover:text-[#009B44]">
              {location.phone}
            </a>
          </div>
        )}
        
        {location.email && (
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <a href={`mailto:${location.email}`} className="text-sm text-[#00B14F] hover:text-[#009B44] truncate">
              {location.email}
            </a>
          </div>
        )}
        
        {location.website && (
          <div className="flex items-center gap-3">
            <Globe className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <a href={location.website} target="_blank" rel="noopener noreferrer" 
               className="text-sm text-[#00B14F] hover:text-[#009B44]">
              Visit Website
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function WhereToBuy() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [activeCountryFilter, setActiveCountryFilter] = useState<string>('All');
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>('all');
  const [activeBrandFilter, setActiveBrandFilter] = useState<string>('All');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(locations);
  const [markerIcons, setMarkerIcons] = useState<Record<string, google.maps.Icon>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  const containerStyle = {
    width: '100%',
    height: '600px'
  };

  const handleMarkerClick = useCallback((location: Location) => {
    setSelectedLocation(location);
  }, []);

  const handleCloseInfoWindow = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    setMapLoaded(true);
    setMapError(false);
    mapRef.current = map;
  }, []);

  const handleMapError = useCallback(() => {
    setMapError(true);
  }, []);

  // Create HD custom marker icons for each brand
  useEffect(() => {
    if (!mapLoaded || typeof google === 'undefined') return;

    const createHDMarker = (brand: string, color: string) => {
      const dpr = window.devicePixelRatio || 1;
      const baseSize = 40;
      const scaledSize = baseSize * Math.min(dpr, 3); // Cap at 3x for performance
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size for HD rendering
      canvas.width = scaledSize;
      canvas.height = (scaledSize * 50) / 40; // Maintain aspect ratio
      
      // Scale context for crisp rendering
      ctx.scale(scaledSize / baseSize, scaledSize / baseSize);
      
      // Enable high-quality rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Clear canvas
      ctx.clearRect(0, 0, baseSize, 50);

      // Pin shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.beginPath();
      ctx.ellipse(20, 47, 8, 3, 0, 0, 2 * Math.PI);
      ctx.fill();

      // Pin body with gradient
      const gradient = ctx.createLinearGradient(6, 4, 34, 32);
      const lightColor = color === '#00B14F' ? '#00D15A' : 
                        color === '#FF8C00' ? '#FFA500' :
                        color === '#FF69B4' ? '#FFB6C1' : '#FFCCCB';
      gradient.addColorStop(0, lightColor);
      gradient.addColorStop(1, color);
      
      ctx.fillStyle = gradient;
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(20, 18, 14, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();

      // Pin point
      ctx.beginPath();
      ctx.moveTo(20, 32);
      ctx.lineTo(12, 40);
      ctx.lineTo(28, 40);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Inner circle for logo
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(20, 18, 10, 0, 2 * Math.PI);
      ctx.fill();

      // Load and draw logo
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          ctx.save();
          
          // Create circular clip for logo
          ctx.beginPath();
          ctx.arc(20, 18, 9, 0, 2 * Math.PI);
          ctx.clip();
          
          // Draw logo with proper scaling
          const logoSize = 16;
          const logoX = 20 - logoSize / 2;
          const logoY = 18 - logoSize / 2;
          
          ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
          ctx.restore();

          // Create icon with proper scaling
          const iconUrl = canvas.toDataURL('image/png');
          setMarkerIcons(prev => ({
            ...prev,
            [brand]: {
            url: iconUrl,
            scaledSize: new google.maps.Size(baseSize, 50),
            anchor: new google.maps.Point(20, 50),
            labelOrigin: new google.maps.Point(20, 60)
            }
          }));
        } catch (error) {
          console.warn('Failed to load logo, using fallback');
          // Create fallback without logo
          ctx.fillStyle = color;
          ctx.font = 'bold 8px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('N', 20, 18);

          const iconUrl = canvas.toDataURL('image/png');
          setMarkerIcons(prev => ({
            ...prev,
            [brand]: {
            url: iconUrl,
            scaledSize: new google.maps.Size(baseSize, 50),
            anchor: new google.maps.Point(20, 50)
            }
          }));
        }
      };
      
      img.onerror = () => {
        console.warn('Logo failed to load, using fallback text');
        // Fallback with text
        ctx.fillStyle = color;
        ctx.font = 'bold 8px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('N', 20, 18);

        const iconUrl = canvas.toDataURL('image/png');
        setMarkerIcons(prev => ({
          ...prev,
          [brand]: {
          url: iconUrl,
          scaledSize: new google.maps.Size(baseSize, 50),
          anchor: new google.maps.Point(20, 50)
          }
        }));
      };
      
      // Try to load the SVG logo
      img.src = '/imgs/nativis logo.svg';
    };

    // Create markers for each brand
    Object.entries(brandColors).forEach(([brand, color]) => {
      createHDMarker(brand, color);
    });
  }, [mapLoaded]);

  // Apply filters
  const applyFilters = useCallback(() => {
    let filtered = [...locations];
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(location => 
        location.name.toLowerCase().includes(query) ||
        location.address.toLowerCase().includes(query) ||
        location.country.toLowerCase().includes(query) ||
        location.area?.toLowerCase().includes(query) ||
        location.contactPerson?.toLowerCase().includes(query)
      );
    }
    
    if (activeBrandFilter !== 'All') {
      filtered = filtered.filter(location => location.brands.includes(activeBrandFilter as any));
    }
    
    if (activeCountryFilter !== 'All') {
      filtered = filtered.filter(location => location.country === activeCountryFilter);
    }
    
    if (activeTypeFilter !== 'all') {
      filtered = filtered.filter(location => location.type === activeTypeFilter);
    }
    
    setFilteredLocations(filtered);

    // Update map view
    setTimeout(() => {
      if (!mapRef.current) return;

      if (filtered.length === 0) {
        const country = countryCenters[activeCountryFilter as keyof typeof countryCenters] || countryCenters.All;
        mapRef.current.setCenter(country);
        mapRef.current.setZoom(country.zoom);
      } else if (filtered.length === 1) {
        mapRef.current.setCenter(filtered[0].coordinates);
        mapRef.current.setZoom(12);
      } else {
        const bounds = new google.maps.LatLngBounds();
        filtered.forEach(location => {
          bounds.extend(new google.maps.LatLng(location.coordinates.lat, location.coordinates.lng));
        });
        mapRef.current.fitBounds(bounds, 50);
      }
    }, 100);
  }, [activeCountryFilter, activeTypeFilter, activeBrandFilter, searchQuery]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const resetFilters = useCallback(() => {
    setActiveCountryFilter('All');
    setActiveTypeFilter('all');
    setActiveBrandFilter('All');
    setSearchQuery('');
  }, []);

  const brandFilterOptions = [
    { id: 'All', label: 'All Brands', logo: null },
    { id: 'Eldoria', label: 'Eldoria', logo: brandLogos.Eldoria },
    { id: 'Lumina', label: 'Lumina', logo: brandLogos.Lumina },
    { id: 'Lush', label: 'Lush', logo: brandLogos.Lush },
    { id: 'Hofman', label: 'Hofman', logo: brandLogos.Hofman }
  ];

  const countryOptions = ['All', 'Singapore', 'Hong Kong', 'Philippines', 'Malaysia'];
  const typeOptions = [
    { id: 'all', label: 'All Types' },
    { id: 'distributor', label: 'Distributors' },
    { id: 'retail', label: 'Retail' },
    { id: 'bar', label: 'Bars & Restaurants' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={seoConfig.whereToBuy.title}
        description={seoConfig.whereToBuy.description}
        keywords={seoConfig.whereToBuy.keywords}
        canonicalUrl={seoConfig.whereToBuy.canonicalUrl}
        ogType="website"
      />
      <StructuredData pageType="about" />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh] overflow-hidden bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1597290282695-edc43d0e7129?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Global Network"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl pt-20">
            <span className="text-sm tracking-[0.3em] text-[#00B14F] mb-6 block">GLOBAL NETWORK</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight" id="find-retailers">
              Find Nativis Premium Liqueurs
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
              Discover our growing presence with esteemed partners across Southeast Asia.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Search and Filters */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search locations, partners, or contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00B14F]/20 focus:border-[#00B14F] text-base"
            />
          </div>

          {/* Brand Filter */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">Browse by Brand</h3>
            <BrandSelector 
              brands={brandFilterOptions}
              activeBrand={activeBrandFilter}
              onBrandChange={setActiveBrandFilter}
            />
          </div>

          {/* More Filters Toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">More Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-8 pt-8 border-t border-gray-100 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Country</h4>
                <div className="flex flex-wrap gap-2">
                  {countryOptions.map(country => (
                    <FilterButton
                      key={country}
                      active={activeCountryFilter === country}
                      onClick={() => setActiveCountryFilter(country)}
                    >
                      {country}
                    </FilterButton>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Partner Type</h4>
                <div className="flex flex-wrap gap-2">
                  {typeOptions.map(type => (
                    <FilterButton
                      key={type.id}
                      active={activeTypeFilter === type.id}
                      onClick={() => setActiveTypeFilter(type.id)}
                    >
                      {type.label}
                    </FilterButton>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#00B14F]/10 rounded-full flex items-center justify-center">
              <MapPin className="h-4 w-4 text-[#00B14F]" />
            </div>
            <span className="text-lg font-medium text-gray-900">
              {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} found
            </span>
          </div>
          
          {(activeCountryFilter !== 'All' || activeTypeFilter !== 'all' || activeBrandFilter !== 'All' || searchQuery) && (
            <button
              onClick={resetFilters}
              className="text-sm text-[#00B14F] hover:text-[#009B44] font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Map */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-12">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <h2 className="text-xl font-medium text-gray-900" id="retailer-map">Retailer Location Map</h2>
            <p className="text-gray-600 text-sm mt-1">Tap any marker for details</p>
          </div>
          
          {!mapError ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={countryCenters.All}
              zoom={countryCenters.All.zoom}
              onLoad={handleMapLoad}
              onError={handleMapError}
              options={{
                styles: [
                  { featureType: 'all', elementType: 'geometry', stylers: [{ saturation: -40 }] },
                  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#e8f4fd' }] },
                  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f8f9fa' }] }
                ],
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
                zoomControl: true,
                gestureHandling: 'greedy',
                disableDefaultUI: false
              }}
            >
              {mapLoaded && filteredLocations.map(location => (
                <React.Fragment key={location.id}>
                  {activeBrandFilter === 'All' ? (
                    // Show one marker for each brand when "All" is selected
                    location.brands.map((brand, index) => (
                      <Marker
                        key={`${location.id}-${brand}`}
                        position={{
                          lat: location.coordinates.lat + (index * 0.0001), // Slight offset for visibility
                          lng: location.coordinates.lng + (index * 0.0001)
                        }}
                        onClick={() => handleMarkerClick(location)}
                        icon={markerIcons[brand]}
                        title={`${location.name} - ${brand}`}
                        optimized={false}
                      />
                    ))
                  ) : (
                    // Show single marker with selected brand color
                    <Marker
                      key={location.id}
                  position={location.coordinates}
                  onClick={() => handleMarkerClick(location)}
                      icon={markerIcons[activeBrandFilter]}
                  title={location.name}
                  optimized={false}
                    />
                  )}
                </React.Fragment>
              ))}

              {selectedLocation && (
                <InfoWindow
                  position={selectedLocation.coordinates}
                  onCloseClick={handleCloseInfoWindow}
                >
                  <div className="p-4 max-w-xs">
                    <h3 className="font-semibold text-[#00B14F] mb-2">{selectedLocation.name}</h3>
                    <p className="text-sm text-gray-700 mb-3">{selectedLocation.address}</p>
                    
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Available Premium Liqueurs:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedLocation.brands.map(brand => (
                          <span 
                            key={brand}
                            className="text-xs px-2 py-1 rounded-full text-white"
                            style={{ backgroundColor: brandColors[brand] }}
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {selectedLocation.contactPerson && (
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="h-3 w-3 mr-2" />
                          <span>{selectedLocation.contactPerson}</span>
                        </div>
                      )}
                      
                      {selectedLocation.phone && (
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-2" />
                          <a href={`tel:${selectedLocation.phone}`} className="text-[#00B14F] hover:underline">
                            {selectedLocation.phone}
                          </a>
                        </div>
                      )}
                      
                      {selectedLocation.email && (
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-2" />
                          <a href={`mailto:${selectedLocation.email}`} className="text-[#00B14F] hover:underline">
                            Email
                          </a>
                        </div>
                      )}
                      
                      {selectedLocation.website && (
                        <div className="flex items-center text-sm">
                          <Globe className="h-3 w-3 mr-2" />
                          <a href={selectedLocation.website} target="_blank" rel="noopener noreferrer" 
                             className="text-[#00B14F] hover:underline">
                            Website
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedLocation.type === 'distributor' ? 'bg-green-50 text-green-700' :
                        selectedLocation.type === 'retail' ? 'bg-blue-50 text-blue-700' :
                        'bg-purple-50 text-purple-700'
                      }`}>
                        {selectedLocation.type === 'distributor' ? 'Distributor' :
                         selectedLocation.type === 'retail' ? 'Retail' :
                         'Bar & Restaurant'}
                      </span>
                      <span className="text-xs text-gray-500">{selectedLocation.country}</span>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          ) : (
            <div className="w-full h-[600px] bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
              <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Map Unavailable</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Unable to load the interactive map. Please view our location listings below.
              </p>
              <a 
                href="mailto:din@nativisgp.com" 
                className="text-[#00B14F] hover:text-[#009B44] font-medium"
              >
                Contact us for assistance
              </a>
            </div>
          )}
        </div>

        {/* Locations Grid */}
        {filteredLocations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map(location => (
              <LocationCard
                key={location.id}
                location={location}
                onClick={() => handleMarkerClick(location)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">No Locations Found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Try adjusting your search criteria or filters to find locations near you.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-[#00B14F] text-white rounded-xl font-medium hover:bg-[#009B44] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-medium text-white mb-4">
              Interested in <span className="font-playfair italic">Partnership?</span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our growing network of premium partners and bring Nativis to your customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:din@nativisgp.com?subject=Partnership%20Inquiry"
                className="px-8 py-3 bg-[#00B14F] text-white rounded-xl font-medium hover:bg-[#009B44] transition-colors"
              >
                Become a Partner
              </a>
              <a
                href="mailto:din@nativisgp.com?subject=Distribution%20Inquiry"
                className="px-8 py-3 border border-white text-white rounded-xl font-medium hover:bg-white hover:text-gray-900 transition-colors"
              >
                Distribution Inquiry
              </a>
            </div>
          </div>
        </div>

        {/* Internal Links Section */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-100">
          <h2 className="text-xl font-medium text-gray-900 mb-6 text-center">
            Explore More
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <InternalLink 
              to="/shop" 
              className="block p-6 rounded-xl bg-gray-50 hover:bg-[#00B14F]/5 transition-colors"
              title="Browse our premium liqueur collection"
            >
              <div className="text-lg font-medium text-gray-900 mb-2">Shop Premium Liqueurs</div>
              <div className="text-sm text-gray-600">Discover our exceptional collection</div>
            </InternalLink>
            
            <InternalLink 
              to="/people" 
              className="block p-6 rounded-xl bg-gray-50 hover:bg-[#00B14F]/5 transition-colors"
              title="Meet our leadership team"
            >
              <div className="text-lg font-medium text-gray-900 mb-2">Meet Our Team</div>
              <div className="text-sm text-gray-600">Learn about our leadership</div>
            </InternalLink>
            
            <InternalLink 
              to="/careers" 
              className="block p-6 rounded-xl bg-gray-50 hover:bg-[#00B14F]/5 transition-colors"
              title="Explore career opportunities"
            >
              <div className="text-lg font-medium text-gray-900 mb-2">Join Our Network</div>
              <div className="text-sm text-gray-600">Career opportunities await</div>
            </InternalLink>
          </div>
        </div>

        {/* Google Business Integration */}
        <div className="mt-12">
          <GoogleBusinessIntegration />
        </div>

        {/* Local Content Section */}
        <div className="mt-16">
          <LocalContent variant="regional" />
        </div>
      </div>

      {/* Related Content */}
      <RelatedContent currentPage="/where-to-buy" />
    </div>
  );
}