import React, { useState } from 'react';
import { Calendar, Users, Briefcase, Bell } from 'lucide-react';
import TalentPoolForm from './TalentPoolForm';

export default function NoPositionsAvailable() {
  const [showTalentForm, setShowTalentForm] = useState(false);

  return (
    <>
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm tracking-[0.3em] text-[#00B14F] mb-6 block">CAREER OPPORTUNITIES</span>
            <h2 className="text-3xl font-medium text-gray-900 mb-8" id="open-positions">
              Building Our <span className="font-playfair italic">Next Chapter</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              While we don't have any open positions at the moment, we're always excited to connect
              with talented individuals who share our passion for crafting exceptional liqueurs.
            </p>
          </div>

          <div className="relative h-[500px] rounded-2xl overflow-hidden mb-16">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
              alt="Team collaboration"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
            <div className="relative h-full flex items-center">
              <div className="px-8 md:px-12 lg:px-16 max-w-3xl">
                <div className="flex items-center space-x-2 mb-6">
                  <Calendar className="h-5 w-5 text-[#00B14F]" />
                  <span className="text-white text-sm tracking-wider">NEXT HIRING CYCLE</span>
                </div>
                <h3 className="text-3xl font-medium text-white mb-6">
                  New Opportunities Opening Q2 2025
                </h3>
                <p className="text-gray-200 text-lg leading-relaxed mb-8">
                  We're planning to expand our team in the second quarter of 2025. Join our talent pool
                  to be among the first to know when new positions become available.
                </p>
                <button
                  onClick={() => setShowTalentForm(true)}
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#00B14F] text-sm tracking-wider text-white hover:bg-[#009B44] transition-colors duration-300 rounded-lg"
                >
                  JOIN TALENT POOL
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="w-14 h-14 bg-[#00B14F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-7 w-7 text-[#00B14F]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Connected</h3>
              <p className="text-gray-600 leading-relaxed">
                Join our talent pool and we'll reach out when opportunities align with your skills and interests.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center">
              <div className="w-14 h-14 bg-[#00B14F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="h-7 w-7 text-[#00B14F]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Notified</h3>
              <p className="text-gray-600 leading-relaxed">
                Be the first to know when new positions open up. We'll send you email updates about opportunities.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center">
              <div className="w-14 h-14 bg-[#00B14F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-7 w-7 text-[#00B14F]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Future Roles</h3>
              <p className="text-gray-600 leading-relaxed">
                We're anticipating openings in Marketing, Sales, Operations, and Product Development.
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#00B14F]/5 to-transparent rounded-2xl p-12">
              <h3 className="text-2xl font-medium text-gray-900 mb-6">
                Ready to Join Our <span className="font-playfair italic">Journey?</span>
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Submit your details to our talent pool and tell us about your passion for the
                premium spirits industry. We review all submissions and keep them on file for
                future opportunities.
              </p>
              <button
                onClick={() => setShowTalentForm(true)}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#00B14F] text-sm tracking-wider text-white hover:bg-[#009B44] transition-colors duration-300 rounded-lg"
              >
                SUBMIT YOUR PROFILE
              </button>
              <p className="text-sm text-gray-500 mt-6">
                Applications typically reviewed within 5 business days
              </p>
            </div>
          </div>
        </div>
      </section>

      {showTalentForm && (
        <TalentPoolForm onClose={() => setShowTalentForm(false)} />
      )}
    </>
  );
}
