import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import Navbar from './components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';
import Footer from './components/Footer';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ResponsibleDrinking from './pages/ResponsibleDrinking';
import Accessibility from './pages/Accessibility';
import People from './pages/People';
import CareersPage from './pages/CareersPage';
import WhereToBuy from './pages/WhereToBuy';
import AgeVerification from './components/AgeVerification';
import SkipToContent from './components/Accessibility/SkipToContent';
import { initGA, pageview } from './utils/analytics';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    pageview(pathname);
  }, [pathname]);

  return null;
}

function App() {
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isVerified = localStorage.getItem('ageVerified') === 'true';
    setShowAgeVerification(!isVerified);
    setIsLoading(false);
    initGA();
  }, []);

  const handleVerification = () => {
    setShowAgeVerification(false);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <span className="text-3xl font-light tracking-wider text-amber-700">NATIVIS</span>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen">
        <LoadScript googleMapsApiKey="AIzaSyCFGKSxWSWtHvIthAXldpVb_OpjE2nuitg">
          <ScrollToTop />
          <SkipToContent />
          <AgeVerification
            isOpen={showAgeVerification}
            onVerify={handleVerification}
          />
          {!showAgeVerification && (
            <>
              <Navbar />
              <Breadcrumbs />
              <main id="main-content" role="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/people" element={<People />} />
                <Route path="/where-to-buy" element={<WhereToBuy />} />
                <Route path="/brands" element={<Navigate to="#brands" replace />} />
                <Route path="/about" element={<Navigate to="#about" replace />} />
                <Route path="/growth" element={<Navigate to="#growth" replace />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/responsible-drinking" element={<ResponsibleDrinking />} />
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              </main>
              <Footer />
            </>
          )}
        </LoadScript>
      </div>
    </Router>
  );
}

export default App;