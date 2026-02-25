import React, { useState } from 'react';
import { Briefcase, Users, Sparkles, GraduationCap, Send, Loader2, X, CheckCircle } from 'lucide-react';
import StructuredData from '../components/LocalSEO/StructuredData';
import LocalContent from '../components/LocalSEO/LocalContent';
import RelatedContent from '../components/RelatedContent';
import InternalLink from '../components/InternalLinkHelper';
import SEOHead from '../components/SEO/SEOHead';
import { seoConfig } from '../utils/seoData';
import NoPositionsAvailable from '../components/NoPositionsAvailable';

const positions: Array<{
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}> = [];

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [applicationStep, setApplicationStep] = useState<'details' | 'review' | 'submitted'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: '',
    linkedin: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';
    if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setApplicationStep('review');
    }
  };

  const handleBack = () => {
    setApplicationStep('details');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare email content
    const emailSubject = `Job Application: ${positions[selectedPosition!].title}`;
    const emailBody = `
New application received for ${positions[selectedPosition!].title}

Applicant Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
${formData.linkedin ? `- LinkedIn: ${formData.linkedin}` : ''}

Cover Letter:
${formData.coverLetter}

Please review the attached resume.
`.trim();

    setIsSubmitting(true);
    
    // Send email using mailto link
    const mailtoLink = `mailto:din@nativisgp.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    setIsSubmitting(false);
    setApplicationStep('submitted');

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        resume: null,
        coverLetter: '',
        linkedin: ''
      });
      setApplicationStep('details');
      setSelectedPosition(null);
    }, 3000);
  };

  const jobPostingSchema = positions.map(position => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: position.title,
    description: position.description,
    datePosted: '2025-10-05',
    employmentType: position.type.toUpperCase().replace('-', '_'),
    hiringOrganization: {
      '@type': 'Organization',
      '@id': 'https://nativisgp.com/#organization',
      name: 'Nativis Group Pte Ltd',
      sameAs: 'https://nativisgp.com'
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: position.location,
        addressCountry: 'SG'
      }
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'SGD',
      value: {
        '@type': 'QuantitativeValue',
        unitText: 'YEAR'
      }
    },
    responsibilities: position.responsibilities.join('; '),
    skills: position.requirements.join('; ')
  }));

  return (
    <div>
      <SEOHead
        title={seoConfig.careers.title}
        description={seoConfig.careers.description}
        keywords={seoConfig.careers.keywords}
        canonicalUrl={seoConfig.careers.canonicalUrl}
        ogType="website"
        structuredData={jobPostingSchema}
      />
      <StructuredData pageType="about" />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80"
            alt="Careers at Nativis"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl pt-20">
            <span className="text-sm tracking-[0.3em] text-white mb-6 block">CAREERS</span>
            <h1 className="text-4xl font-light text-white mb-8" id="careers-nativis">
              Craft Your <span className="font-playfair italic">Future</span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Join our passionate team. We craft exceptional liqueurs and create memorable experiences. 
              Together, we'll push innovation boundaries in the premium spirits industry. 
              Build your career with industry leaders.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-sm tracking-[0.3em] text-[#00B14F] mb-6 block">WHY JOIN US</span>
            <h2 className="text-3xl font-medium text-gray-900 mb-8" id="company-culture">
              Our <span className="font-playfair italic">Culture</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We create an environment where creativity thrives. Excellence is our standard. 
              Every team member's contribution matters. Join us and make your mark 
              in the premium spirits industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Innovation",
                description: "Push boundaries and bring fresh ideas to life"
              },
              {
                icon: Users,
                title: "Collaboration",
                description: "Work with passionate experts across disciplines"
              },
              {
                icon: GraduationCap,
                title: "Growth",
                description: "Continuous learning and development opportunities"
              },
              {
                icon: Briefcase,
                title: "Impact",
                description: "Make a real difference in the liqueurs industry"
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <value.icon className="h-8 w-8 text-[#00B14F] mb-6" />
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions or Talent Pool */}
      {positions.length === 0 ? (
        <NoPositionsAvailable />
      ) : (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-sm tracking-[0.3em] text-[#00B14F] mb-6 block">OPPORTUNITIES</span>
            <h2 className="text-3xl font-medium text-gray-900 mb-8" id="open-positions">
              Open <span className="font-playfair italic">Positions</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore our current opportunities and find your perfect role in crafting 
              exceptional liqueurs.
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {positions.map((position, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 text-sm bg-[#00B14F]/5 text-[#00B14F] rounded-full">
                        {position.department}
                      </span>
                      <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                        {position.location}
                      </span>
                      <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                        {position.type}
                      </span>
                    </div>
                    <p className="text-gray-600">{position.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPosition(index)}
                    className="flex-shrink-0 px-6 py-3 text-sm tracking-wider text-[#00B14F] border border-[#00B14F] rounded-lg hover:bg-[#00B14F] hover:text-white transition-colors"
                  >
                    APPLY NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Internal Linking Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LocalContent variant="global" />
          
          <div className="mt-16 bg-gradient-to-r from-[#00B14F]/5 to-transparent rounded-3xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InternalLink 
                to="/people"
                className="flex items-start p-6 bg-white rounded-xl hover:shadow-md transition-all duration-300 group"
                title="Meet our leadership team and company culture"
              >
                <div className="w-12 h-12 bg-[#00B14F]/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#00B14F]/20 transition-colors">
                  <Users className="h-6 w-6 text-[#00B14F]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#00B14F] transition-colors mb-2">
                    Meet Our Leadership
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Get to know the experienced team you'll be working with.
                  </p>
                </div>
              </InternalLink>
              
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedPosition !== null && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedPosition(null)}></div>

          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div 
              className="relative bg-white rounded-2xl w-full max-w-2xl shadow-xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPosition(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="p-8">
                {applicationStep === 'details' ? (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-xl font-medium text-gray-900 mb-4">
                        Apply for {positions[selectedPosition].title}
                      </h2>
                      <p className="text-gray-600">
                        Join our team and be part of crafting exceptional liqueurs experiences.
                      </p>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Position Requirements</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {positions[selectedPosition].requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Responsibilities</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {positions[selectedPosition].responsibilities.map((resp, index) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.name ? 'border-red-300' : 'border-gray-200'
                            } focus:outline-none focus:ring-2 focus:ring-[#00B14F]/20 focus:border-[#00B14F]`}
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.email ? 'border-red-300' : 'border-gray-200'
                            } focus:outline-none focus:ring-2 focus:ring-[#00B14F]/20 focus:border-[#00B14F]`}
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          LinkedIn Profile (Optional)
                        </label>
                        <input
                          type="url"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          placeholder="https://linkedin.com/in/yourprofile"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00B14F]/20 focus:border-[#00B14F]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.phone ? 'border-red-300' : 'border-gray-200'
                          } focus:outline-none focus:ring-2 focus:ring-[#00B14F]/20 focus:border-[#00B14F]`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Resume
                        </label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.resume ? 'border-red-300' : 'border-gray-200'
                          } focus:outline-none focus:ring-2 focus:ring-[#00B14F]/20 focus:border-[#00B14F]`}
                        />
                        {errors.resume && (
                          <p className="mt-1 text-sm text-red-600">{errors.resume}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cover Letter
                        </label>
                        <textarea
                          value={formData.coverLetter}
                          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                          rows={4}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.coverLetter ? 'border-red-300' : 'border-gray-200'
                          } focus:outline-none focus:ring-2 focus:ring-[#00B14F]/20 focus:border-[#00B14F]`}
                        />
                        {errors.coverLetter && (
                          <p className="mt-1 text-sm text-red-600">{errors.coverLetter}</p>
                        )}
                      </div>

                      <button
                        onClick={handleNext}
                        className="w-full px-8 py-4 bg-[#00B14F] text-sm tracking-wider text-white hover:bg-[#009B44] transition-all duration-300 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        NEXT STEP
                      </button>
                    </div>
                  </>
                ) : applicationStep === 'review' ? (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-xl font-medium text-gray-900 mb-4">
                        Review Your Application
                      </h2>
                      <p className="text-gray-600">
                        Please review your application details before submitting.
                      </p>
                    </div>

                    <div className="space-y-6 mb-8">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-base font-medium text-gray-700">Full Name</h3>
                          <p className="text-gray-900">{formData.name}</p>
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-gray-700">Email</h3>
                          <p className="text-gray-900">{formData.email}</p>
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-gray-700">Phone</h3>
                          <p className="text-gray-900">{formData.phone}</p>
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-gray-700">Resume</h3>
                          <p className="text-gray-900">{formData.resume?.name}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium text-gray-700">Cover Letter</h3>
                        <p className="text-gray-900 whitespace-pre-wrap">{formData.coverLetter}</p>
                      </div>

                      {formData.linkedin && (
                        <div>
                          <h3 className="text-base font-medium text-gray-700">LinkedIn Profile</h3>
                          <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" 
                             className="text-[#00B14F] hover:text-[#009B44]">
                            {formData.linkedin}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={handleBack}
                        className="flex-1 px-8 py-4 border border-[#00B14F] text-sm tracking-wider text-[#00B14F] hover:bg-[#00B14F]/5 transition-all duration-300 rounded-lg"
                      >
                        BACK
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 px-8 py-4 bg-[#00B14F] text-sm tracking-wider text-white hover:bg-[#009B44] transition-all duration-300 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            SUBMITTING...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            SUBMIT APPLICATION
                          </>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h2 className="text-xl font-medium text-gray-900 mb-4">
                      Application Submitted
                    </h2>
                    <p className="text-gray-600">
                      Thank you for your interest in joining Nativis. Our team will review your 
                      application and contact you within 5 business days.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Content */}
      <RelatedContent currentPage="/careers" />
    </div>
  );
}