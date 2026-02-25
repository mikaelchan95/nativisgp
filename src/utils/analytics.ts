declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || '';

export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const initGA = () => {
  if (!GA_TRACKING_ID) return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    send_page_view: false,
  });
};

export const trackEvent = {
  productView: (productName: string) => {
    event({
      action: 'view_item',
      category: 'Product',
      label: productName,
    });
  },

  locationSearch: (searchTerm: string) => {
    event({
      action: 'search',
      category: 'Location',
      label: searchTerm,
    });
  },

  contactClick: (contactType: 'email' | 'phone') => {
    event({
      action: 'contact_click',
      category: 'Engagement',
      label: contactType,
    });
  },

  applicationStart: (position: string) => {
    event({
      action: 'application_start',
      category: 'Careers',
      label: position,
    });
  },

  applicationSubmit: (position: string) => {
    event({
      action: 'application_submit',
      category: 'Careers',
      label: position,
    });
  },

  downloadAsset: (assetName: string) => {
    event({
      action: 'download',
      category: 'Asset',
      label: assetName,
    });
  },

  socialShare: (platform: string, page: string) => {
    event({
      action: 'share',
      category: 'Social',
      label: `${platform} - ${page}`,
    });
  },

  outboundClick: (url: string) => {
    event({
      action: 'click',
      category: 'Outbound',
      label: url,
    });
  },
};
