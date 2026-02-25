import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import { seoConfig } from '../utils/seoData';

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 bg-white">
      <SEOHead
        title={seoConfig.privacyPolicy.title}
        description={seoConfig.privacyPolicy.description}
        keywords={seoConfig.privacyPolicy.keywords}
        canonicalUrl={seoConfig.privacyPolicy.canonicalUrl}
        ogType="website"
        noindex={true}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] text-amber-700 mb-6 block">PRIVACY POLICY</span>
          <h1 className="text-4xl font-light text-gray-900 mb-8">
            Your Privacy is Our <span className="font-playfair italic">Priority</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: Shield,
              title: "Data Protection",
              description: "We implement robust security measures to protect your personal information"
            },
            {
              icon: Lock,
              title: "Secure Processing",
              description: "Your data is processed securely and in accordance with applicable laws"
            },
            {
              icon: Eye,
              title: "Transparency",
              description: "We're clear about how we collect, use, and protect your information"
            },
            {
              icon: FileText,
              title: "Your Rights",
              description: "You have full control over your personal data and how it's used"
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

        {/* Policy Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              At Nativis, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when 
              you visit our website or interact with our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Information We Collect</h2>
            <ul className="space-y-4 text-gray-600">
              <li>
                <strong className="text-gray-900">Personal Information:</strong> Name, email address, 
                phone number, and age verification data.
              </li>
              <li>
                <strong className="text-gray-900">Technical Data:</strong> IP address, browser type, 
                device information, and cookies.
              </li>
              <li>
                <strong className="text-gray-900">Usage Data:</strong> Information about how you 
                interact with our website and services.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">How We Use Your Information</h2>
            <ul className="space-y-4 text-gray-600">
              <li>To verify your age and eligibility to view our content</li>
              <li>To process and respond to your inquiries and requests</li>
              <li>To send you marketing communications (with your consent)</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Data Protection</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational measures to ensure a level of 
              security appropriate to the risk, including:
            </p>
            <ul className="space-y-4 text-gray-600 mt-4">
              <li>Encryption of personal data</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication measures</li>
              <li>Staff training on data protection</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Under applicable data protection laws, you have the following rights:
            </p>
            <ul className="space-y-4 text-gray-600">
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please 
              contact us at:
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