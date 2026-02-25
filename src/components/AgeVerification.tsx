import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface AgeVerificationProps {
  isOpen: boolean;
  onVerify: () => void;
}

export default function AgeVerification({ isOpen, onVerify }: AgeVerificationProps) {
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  const legalYear = currentYear - 21;

  const handleVerify = async () => {
    const birthYear = parseInt(year);
    
    if (!year || isNaN(birthYear)) {
      setError('Please enter a valid year');
      return;
    }

    if (birthYear > currentYear || birthYear < minYear) {
      setError('Please enter a valid birth year');
      return;
    }

    if (birthYear > legalYear) {
      setError('You must be 21 or older to enter this site');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 800));
    
    localStorage.setItem('ageVerified', 'true');
    onVerify();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md"></div>

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-xl">
          <div className="p-8 md:p-12">
            {/* Logo */}
            <div className="text-center mb-8">
              <span className="text-3xl font-light tracking-wider">NATIVIS</span>
            </div>

            {/* Content */}
            <div className="text-center mb-12">
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                Welcome to <span className="font-playfair italic">Nativis</span>
              </h3>
              <p className="text-gray-600">
                Please verify your age to explore our collection of premium spirits.
              </p>
            </div>

            {/* Year Input */}
            <div className="max-w-xs mx-auto mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                Enter Your Birth Year
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => {
                  setError('');
                  setYear(e.target.value);
                }}
                placeholder="YYYY"
                maxLength={4}
                className={`w-full px-4 py-3 text-center text-2xl rounded-lg border ${
                  error ? 'border-red-300' : 'border-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors`}
              />
              {error && (
                <div className="mt-2 flex items-center justify-center text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleVerify}
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-amber-700 text-sm tracking-wider text-white hover:bg-amber-600 transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'VERIFYING...' : 'ENTER SITE'}
              </button>
              <a
                href="https://www.google.com"
                className="block w-full px-8 py-4 text-sm tracking-wider text-center text-gray-600 hover:text-amber-700 transition-colors"
              >
                EXIT SITE
              </a>
            </div>

            {/* Disclaimer */}
            <p className="mt-8 text-xs text-gray-500 text-center">
              By entering this site, you agree to our Terms of Service and Privacy Policy. 
              Please drink responsibly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}