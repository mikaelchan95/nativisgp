import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, X, Upload } from 'lucide-react';
import { supabase, TalentPoolSubmission } from '../utils/supabase';

type FormStep = 'details' | 'review' | 'submitted';

interface TalentPoolFormProps {
  onClose: () => void;
}

const ROLE_INTERESTS = [
  'Marketing',
  'Sales & Business Development',
  'Operations & Supply Chain',
  'Product Development',
  'Finance & Accounting',
  'Human Resources',
  'Customer Service',
  'Digital & Technology'
];

export default function TalentPoolForm({ onClose }: TalentPoolFormProps) {
  const [step, setStep] = useState<FormStep>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    areasOfInterest: [] as string[],
    coverMessage: '',
    resume: null as File | null,
    subscribeToUpdates: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (formData.areasOfInterest.length === 0) {
      newErrors.areasOfInterest = 'Please select at least one area of interest';
    }

    if (!formData.coverMessage.trim()) {
      newErrors.coverMessage = 'Please tell us why you\'re interested';
    } else if (formData.coverMessage.trim().length < 50) {
      newErrors.coverMessage = 'Please provide at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep('review');
    }
  };

  const handleBack = () => {
    setStep('details');
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      areasOfInterest: prev.areasOfInterest.includes(interest)
        ? prev.areasOfInterest.filter(i => i !== interest)
        : [...prev.areasOfInterest, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let resumeUrl = '';

      if (formData.resume) {
        const fileExt = formData.resume.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(filePath, formData.resume);

        if (uploadError) {
          console.error('Resume upload error:', uploadError);
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('resumes')
            .getPublicUrl(filePath);
          resumeUrl = publicUrl;
        }
      }

      const submission: TalentPoolSubmission = {
        candidate_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        linkedin_url: formData.linkedin || undefined,
        resume_url: resumeUrl || undefined,
        areas_of_interest: formData.areasOfInterest,
        cover_message: formData.coverMessage
      };

      const { error: insertError } = await supabase
        .from('talent_pool')
        .insert([submission]);

      if (insertError) {
        throw insertError;
      }

      if (formData.subscribeToUpdates) {
        await supabase
          .from('job_notifications')
          .insert([{ email: formData.email }])
          .select();
      }

      const edgeFunctionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/notify-talent-submission`;
      await fetch(edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submission: {
            ...submission,
            resume_url: resumeUrl
          }
        })
      });

      setStep('submitted');

      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl w-full max-w-3xl shadow-xl max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-8">
            {step === 'details' ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-medium text-gray-900 mb-4">
                    Join Our Talent Pool
                  </h2>
                  <p className="text-gray-600">
                    We'd love to hear from you! Share your details and we'll reach out when opportunities arise.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
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
                        Email Address *
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Areas of Interest * <span className="text-gray-500 text-xs">(Select all that apply)</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {ROLE_INTERESTS.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            formData.areasOfInterest.includes(interest)
                              ? 'bg-[#00B14F] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                    {errors.areasOfInterest && (
                      <p className="mt-2 text-sm text-red-600">{errors.areasOfInterest}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resume (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00B14F]/20 focus:border-[#00B14F] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-[#00B14F]/10 file:text-[#00B14F] hover:file:bg-[#00B14F]/20"
                      />
                      {formData.resume && (
                        <p className="mt-2 text-sm text-gray-600 flex items-center">
                          <Upload className="h-4 w-4 mr-2" />
                          {formData.resume.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Why are you interested in joining Nativis? *
                    </label>
                    <textarea
                      value={formData.coverMessage}
                      onChange={(e) => setFormData({ ...formData, coverMessage: e.target.value })}
                      rows={5}
                      placeholder="Tell us about your passion for the spirits industry, relevant experience, and what excites you about Nativis..."
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.coverMessage ? 'border-red-300' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-[#00B14F]/20 focus:border-[#00B14F]`}
                    />
                    <div className="flex justify-between mt-1">
                      {errors.coverMessage && (
                        <p className="text-sm text-red-600">{errors.coverMessage}</p>
                      )}
                      <p className="text-sm text-gray-500 ml-auto">
                        {formData.coverMessage.length} characters (min. 50)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="subscribe"
                      checked={formData.subscribeToUpdates}
                      onChange={(e) => setFormData({ ...formData, subscribeToUpdates: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-[#00B14F] focus:ring-[#00B14F]"
                    />
                    <label htmlFor="subscribe" className="ml-3 text-sm text-gray-600">
                      Send me email notifications when new job opportunities become available at Nativis
                    </label>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full px-8 py-4 bg-[#00B14F] text-sm tracking-wider text-white hover:bg-[#009B44] transition-all duration-300 rounded-lg flex items-center justify-center"
                  >
                    REVIEW SUBMISSION
                  </button>
                </div>
              </>
            ) : step === 'review' ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-medium text-gray-900 mb-4">
                    Review Your Submission
                  </h2>
                  <p className="text-gray-600">
                    Please review your details before submitting.
                  </p>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Full Name</h3>
                      <p className="text-gray-900">{formData.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Email</h3>
                      <p className="text-gray-900">{formData.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Phone</h3>
                      <p className="text-gray-900">{formData.phone}</p>
                    </div>
                    {formData.linkedin && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-1">LinkedIn</h3>
                        <a
                          href={formData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00B14F] hover:text-[#009B44] text-sm"
                        >
                          View Profile
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Areas of Interest</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.areasOfInterest.map((interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1 bg-[#00B14F]/10 text-[#00B14F] rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {formData.resume && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Resume</h3>
                      <p className="text-gray-900 flex items-center">
                        <Upload className="h-4 w-4 mr-2" />
                        {formData.resume.name}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Your Message</h3>
                    <p className="text-gray-900 whitespace-pre-wrap">{formData.coverMessage}</p>
                  </div>

                  {formData.subscribeToUpdates && (
                    <div className="bg-[#00B14F]/5 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        ✓ You will receive email notifications about new job opportunities
                      </p>
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
                        SUBMIT
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
                <h2 className="text-2xl font-medium text-gray-900 mb-4">
                  Thank You!
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Your submission has been received. We'll review your profile and reach out when opportunities align with your interests.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
