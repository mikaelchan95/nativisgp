// Local SEO Components Export Index

// Core Components
export { default as EnhancedStructuredData } from './EnhancedStructuredData';
export { default as NAPConsistency } from './NAPConsistency';
export { default as LocationSpecificContent } from './LocationSpecificContent';
export { default as GoogleBusinessOptimization } from './GoogleBusinessOptimization';

// Manager and Utilities
export { default as LocalSEOManager, getLocalSEOData, generateLocalMetaTags } from './LocalSEOManager';

// Data and Types
export { masterNAPData } from './NAPConsistency';

// Example Implementation
export { default as LocalSEOExample } from '../pages/LocalSEOExample';

// Usage Examples:

/*
// Basic Implementation
import { LocalSEOManager } from './components/LocalSEO';

<LocalSEOManager
  page="homepage"
  location="singapore"
  showGoogleBusiness={true}
  showLocationContent={true}
  products={products}
/>

// Individual Components
import { 
  NAPConsistency, 
  LocationSpecificContent,
  GoogleBusinessOptimization 
} from './components/LocalSEO';

<NAPConsistency variant="header" showHours={true} />
<LocationSpecificContent location="singapore" variant="hero" />
<GoogleBusinessOptimization variant="widget" />

// Utility Functions
import { getLocalSEOData, generateLocalMetaTags } from './components/LocalSEO';

const seoData = getLocalSEOData('singapore');
const metaTags = generateLocalMetaTags('singapore', 'products');
*/