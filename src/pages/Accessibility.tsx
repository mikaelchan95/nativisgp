import React from 'react';
import { Eye, Keyboard, Volume2, Monitor } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import { seoConfig } from '../utils/seoData';

export default function Accessibility() {
  return (
    <div className="pt-32 pb-24 bg-white">
      <SEOHead
        title={seoConfig.accessibility.title}
        description={seoConfig.accessibility.description}
        keywords={seoConfig.accessibility.keywords}
        canonicalUrl={seoConfig.accessibility.canonicalUrl}
        ogType="website"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] text-[#00B14F] mb-6 block">ACCESSIBILITY</span>
          <h1 className="text-4xl font-light text-gray-900 mb-8">
            Access for <span className="font-playfair italic">Everyone</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We are committed to ensuring our website is accessible to all users, 
            regardless of technology or ability.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: Eye,
              title: "Visual Accessibility",
              description: "Support for screen readers, high contrast options, and text scaling"
            },
            {
              icon: Keyboard,
              title: "Keyboard Navigation",
              description: "Full keyboard accessibility and clear focus indicators"
            },
            {
              icon: Volume2,
              title: "Audio & Video",
              description: "Captions and transcripts for multimedia content"
            },
            {
              icon: Monitor,
              title: "Device Compatibility",
              description: "Responsive design that works across all devices"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-md transition-all duration-300"
            >
              <item.icon className="h-8 w-8 text-[#00B14F] mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Content Sections */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Our Commitment</h2>
            <p className="text-gray-600 leading-relaxed">
              Nativis is committed to providing a website that is accessible to the widest 
              possible audience, regardless of technology or ability. We aim to comply with 
              WCAG 2.1 Level AA standards and are continuously working to improve the 
              accessibility of our content.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Accessibility Features</h2>
            <div className="space-y-6">
              <div className="bg-[#00B14F]/5 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-[#00B14F] mb-3">Navigation</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Clear and consistent navigation structure</li>
                  <li>Skip to main content link</li>
                  <li>Logical tab order</li>
                  <li>Descriptive link text</li>
                </ul>
              </div>

              <div className="bg-[#00B14F]/5 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-[#00B14F] mb-3">Visual Design</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>High color contrast ratios</li>
                  <li>Resizable text without loss of functionality</li>
                  <li>Alternative text for images</li>
                  <li>Clear visual hierarchy</li>
                </ul>
              </div>

              <div className="bg-[#00B14F]/5 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-[#00B14F] mb-3">Forms and Interactions</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Clear form labels and instructions</li>
                  <li>Error identification and suggestions</li>
                  <li>Sufficient time to complete actions</li>
                  <li>No autoplay media</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Keyboard Shortcuts</h2>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: "Tab", action: "Navigate through elements" },
                  { key: "Enter/Space", action: "Activate buttons and links" },
                  { key: "Esc", action: "Close modals and popups" },
                  { key: "Arrow Keys", action: "Navigate within components" }
                ].map((shortcut, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <kbd className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600">
                      {shortcut.key}
                    </kbd>
                    <span className="text-gray-600">{shortcut.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Assistive Technologies</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our website is designed to be compatible with various assistive technologies, including:
            </p>
            <ul className="space-y-4 text-gray-600">
              <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Alternative input devices</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Known Issues</h2>
            <p className="text-gray-600 leading-relaxed">
              We are actively working to maintain and improve the accessibility of our website. 
              If you encounter any accessibility barriers, please let us know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light text-gray-900 mb-6">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you have any questions, suggestions, or encounter any accessibility issues, 
              please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-600">
                Email: accessibility@nativisgp.com<br />
                Phone: +65 8621 4041
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}