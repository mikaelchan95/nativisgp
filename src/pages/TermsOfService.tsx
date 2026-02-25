import React from 'react';
import { Scale, AlertCircle, ShieldCheck, FileText } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import { seoConfig } from '../utils/seoData';

export default function TermsOfService() {
  return (
    <div className="pt-32 pb-24 bg-white">
      <SEOHead
        title={seoConfig.termsOfService.title}
        description={seoConfig.termsOfService.description}
        keywords={seoConfig.termsOfService.keywords}
        canonicalUrl={seoConfig.termsOfService.canonicalUrl}
        ogType="website"
        noindex={true}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] text-amber-700 mb-6 block">TERMS OF SERVICE</span>
          <h1 className="text-4xl font-light text-gray-900 mb-8">
            Our Legal <span className="font-playfair italic">Agreement</span>
          </h1>
        </div>

        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: Scale,
              title: "Legal Compliance",
              description: "Our terms ensure compliance with all applicable laws and regulations"
            },
            {
              icon: AlertCircle,
              title: "Age Verification",
              description: "Strict age verification requirements for accessing our content"
            },
            {
              icon: ShieldCheck,
              title: "User Protection",
              description: "Clear guidelines to protect both users and our services"
            },
            {
              icon: FileText,
              title: "Transparency",
              description: "Clear and comprehensive terms written in plain language"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300"
            >
              <item.icon className="h-8 w-8 text-amber-700 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Terms Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing or using the Nativis website, you agree to be bound by these Terms of 
              Service. If you disagree with any part of these terms, you may not access our website 
              or use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">2. Age Restrictions</h2>
            <p className="text-gray-600 leading-relaxed">
              Our website and services are intended for users who are 21 years of age or older. 
              By accessing our website, you represent and warrant that you are at least 21 years old. 
              We reserve the right to verify your age at any time.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">3. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All content on this website, including but not limited to text, graphics, logos, 
              images, and software, is the property of Nativis and is protected by applicable 
              intellectual property laws.
            </p>
            <ul className="space-y-4 text-gray-600">
              <li>You may not use our content without express written permission</li>
              <li>Our trademarks and trade dress may not be used without written consent</li>
              <li>Unauthorized use may violate trademark and copyright laws</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">4. User Responsibilities</h2>
            <p className="text-gray-600 leading-relaxed mb-4">When using our website, you agree to:</p>
            <ul className="space-y-4 text-gray-600">
              <li>Provide accurate age verification information</li>
              <li>Not attempt to circumvent our age verification system</li>
              <li>Use our website and services responsibly</li>
              <li>Not engage in any unlawful or prohibited activities</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">5. Responsible Drinking</h2>
            <p className="text-gray-600 leading-relaxed">
              Nativis promotes responsible alcohol consumption. We encourage our users to:
            </p>
            <ul className="space-y-4 text-gray-600 mt-4">
              <li>Never drink and drive</li>
              <li>Consume alcohol in moderation</li>
              <li>Respect local alcohol laws and regulations</li>
              <li>Not share content with underage individuals</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">6. Disclaimer of Warranties</h2>
            <p className="text-gray-600 leading-relaxed">
              Our website and services are provided "as is" without any warranties, expressed 
              or implied. Nativis does not warrant that our website will be uninterrupted, 
              timely, secure, or error-free.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">7. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              Nativis shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use or inability to use our website or services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">8. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any 
              material changes by posting the new Terms of Service on this page.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">9. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 p-6 bg-gray-50 rounded-xl">
              <p className="text-gray-600">
                Email: din@nativisgp.com<br />
                Address: 2 Sims Close, #03-06, Singapore 387298<br />
                Phone: +65 8621 4041
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}