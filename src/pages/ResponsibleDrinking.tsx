import React from 'react';
import { ShieldCheck, HeartPulse, AlertTriangle, Glasses } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import { seoConfig } from '../utils/seoData';

export default function ResponsibleDrinking() {
  return (
    <div className="pt-32 pb-24 bg-white">
      <SEOHead
        title={seoConfig.responsibleDrinking.title}
        description={seoConfig.responsibleDrinking.description}
        keywords={seoConfig.responsibleDrinking.keywords}
        canonicalUrl={seoConfig.responsibleDrinking.canonicalUrl}
        ogType="website"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] text-[#00B14F] mb-6 block">RESPONSIBLE DRINKING</span>
          <h1 className="text-4xl font-light text-gray-900 mb-8">
            Enjoy <span className="font-playfair italic">Responsibly</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            At Nativis, we believe that the enjoyment of our premium spirits comes with 
            the responsibility to consume them mindfully and safely.
          </p>
        </div>

        {/* Key Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: ShieldCheck,
              title: "Legal Age",
              description: "We strictly enforce age verification to ensure our products are only accessible to those of legal drinking age"
            },
            {
              icon: HeartPulse,
              title: "Health First",
              description: "We encourage moderate consumption and awareness of personal limits"
            },
            {
              icon: AlertTriangle,
              title: "Zero Tolerance",
              description: "Never drink and drive - always plan ahead for safe transportation"
            },
            {
              icon: Glasses,
              title: "Mindful Consumption",
              description: "Savor the experience, drink slowly, and stay hydrated"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-md transition-all duration-300"
            >
              <item.icon className="h-8 w-8 text-amber-700 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Guidelines Section */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Our Commitment</h2>
            <p className="text-gray-600 leading-relaxed">
              As a producer of premium spirits, we are committed to promoting responsible 
              drinking habits and providing clear information about alcohol consumption. 
              We believe that our products should be enjoyed as part of a balanced lifestyle.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Guidelines for Safe Consumption</h2>
            <div className="space-y-6">
              <div className="bg-amber-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-[#00B14F] mb-3">Know Your Limits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Understand standard drink measurements</li>
                  <li>Be aware of your personal tolerance</li>
                  <li>Consider factors like body weight and metabolism</li>
                  <li>Never pressure others to drink</li>
                </ul>
              </div>

              <div className="bg-amber-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-[#00B14F] mb-3">Safe Drinking Tips</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Eat before and while drinking</li>
                  <li>Alternate alcoholic drinks with water</li>
                  <li>Pace yourself - sip, don't gulp</li>
                  <li>Keep track of your drinks</li>
                </ul>
              </div>

              <div className="bg-amber-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-[#00B14F] mb-3">When Not to Drink</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>When driving or operating machinery</li>
                  <li>When pregnant or trying to conceive</li>
                  <li>When taking certain medications</li>
                  <li>When feeling unwell or stressed</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Signs to Watch For</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Be mindful of these signs that indicate it's time to stop drinking:
            </p>
            <ul className="space-y-4 text-gray-600">
              <li>Feeling dizzy or disoriented</li>
              <li>Slurred speech or difficulty concentrating</li>
              <li>Impaired judgment or coordination</li>
              <li>Emotional changes or mood swings</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Getting Help</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you or someone you know needs support with alcohol-related issues, 
              these resources are available:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">National Addictions Management Service (NAMS)</h3>
                <p className="text-gray-600">All Day Helpline: 6-RECOVER (6-7326837)</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Alcoholics Anonymous Singapore</h3>
                <p className="text-gray-600">24-hour Hotline: 6475 0890</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Our Standards</h2>
            <p className="text-gray-600 leading-relaxed">
              Nativis adheres to strict marketing standards that promote responsible 
              consumption. We never:
            </p>
            <ul className="space-y-4 text-gray-600 mt-4">
              <li>Target underage individuals</li>
              <li>Promote excessive consumption</li>
              <li>Link alcohol consumption with driving</li>
              <li>Suggest that alcohol enhances social or physical performance</li>
            </ul>
          </section>
        </div>

        {/* Emergency Contact Box */}
        <div className="mt-12 bg-red-50 p-8 rounded-xl">
          <h3 className="text-xl font-semibold text-red-700 mb-4">Emergency Contacts</h3>
          <div className="space-y-4 text-gray-600">
            <p><strong>Emergency Services:</strong> 995 (Ambulance) / 999 (Police)</p>
            <p><strong>Non-Emergency Ambulance:</strong> 1777</p>
            <p><strong>Road Safety:</strong> Never drink and drive. Call a taxi or ride-sharing service.</p>
          </div>
        </div>
      </div>
    </div>
  );
}