import React, { useState } from 'react';
import { X, Send, Phone, Mail, MapPin, Loader2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [activeTab, setActiveTab] = useState<'message' | 'connect'>('message');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showCopyFallback, setShowCopyFallback] = useState(false);
  const [compiledMessage, setCompiledMessage] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    setIsSubmitting(true);

    // Compile message
    const messageContent = `
To: din@nativisgp.com
Subject: Contact Form: ${formData.subject}

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}`;

    setCompiledMessage(messageContent);

    // Create mailto link
    const mailtoLink = `mailto:din@nativisgp.com?subject=${encodeURIComponent(`Contact Form: ${formData.subject}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;

    try {
      window.location.href = mailtoLink;
      // Show fallback after a short delay if the mailto didn't work
      setTimeout(() => setShowCopyFallback(true), 500);
    } catch (error) {
      setShowCopyFallback(true);
    }
    
    setIsSubmitting(false);
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(compiledMessage);
      setSubmitted(true);
      
      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setSubmitted(false);
        setShowCopyFallback(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  };

  if (!isOpen) return null;

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      info: "+65 8621 4041",
      link: "tel:+6586214041",
      label: "Direct Line",
      availability: "Monday - Friday, 9am - 6pm SGT"
    },
    {
      icon: Mail,
      title: "Email",
      info: "din@nativisgp.com",
      link: "mailto:din@nativisgp.com",
      label: "General Inquiries",
      availability: "Response within 24 hours"
    },
    {
      icon: MapPin,
      title: "Visit",
      info: "Gemini @ Sims",
      link: "https://maps.google.com/?q=Gemini+@+Sims,+2+Sims+Cl,+%2304-06,+Singapore+387298",
      label: "2 Sims Close, #04-06, Singapore 387298",
      availability: "By appointment only"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl w-full max-w-4xl shadow-xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-8">
            {!submitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-light text-gray-900 mb-4">
                    Connect with <span className="font-playfair italic">Nativis</span>
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Whether you're interested in our products, partnerships, or simply want to 
                    learn more about what we do, we'd love to hear from you.
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                  <div className="inline-flex rounded-lg p-1 bg-gray-50">
                    {[
                      { id: 'message', label: 'SEND MESSAGE' },
                      { id: 'connect', label: 'DIRECT CONNECT' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as 'message' | 'connect')}
                        className={`px-6 py-2 text-sm tracking-wider rounded-lg transition-all duration-300 ${
                          activeTab === tab.id
                            ? 'bg-white text-[#00B14F] shadow-sm'
                            : 'text-gray-600 hover:text-[#00B14F]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {activeTab === 'message' ? (
                  <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
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
                          } focus:outline-none focus:ring-2 focus:ring-[#00B14F]/20 focus:border-[#00B14F] transition-colors`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>

                      {/* Email Field */}
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
                          } focus:outline-none focus:ring-2 focus:ring-[#00B14F]/20 focus:border-[#00B14F] transition-colors`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.subject ? 'border-red-300' : 'border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-[#00B14F]/20 focus:border-[#00B14F] transition-colors`}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.message ? 'border-red-300' : 'border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-[#00B14F]/20 focus:border-[#00B14F] transition-colors`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-[#00B14F] text-sm tracking-wider text-white hover:bg-[#009B44] transition-all duration-300 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          SENDING...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          SEND MESSAGE
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  showCopyFallback ? (
                    <div className="max-w-2xl mx-auto">
                      <div className="mb-6 text-center">
                        <h4 className="text-lg font-medium text-gray-900 mb-2">
                          Copy Your Message
                        </h4>
                        <p className="text-gray-600">
                          It seems your device doesn't support automatic email. Please copy the message below and send it manually.
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg mb-6 font-mono text-sm whitespace-pre-wrap">
                        {compiledMessage}
                      </div>
                      <button
                        onClick={handleCopyMessage}
                        className="w-full px-8 py-4 bg-[#00B14F] text-sm tracking-wider text-white hover:bg-[#009B44] transition-all duration-300 rounded-lg flex items-center justify-center"
                      >
                        COPY MESSAGE
                      </button>
                    </div>
                  ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {contactMethods.map((method, index) => (
                      <a
                        key={index}
                        href={method.link}
                        className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
                        target={method.icon === MapPin ? "_blank" : undefined}
                        rel={method.icon === MapPin ? "noopener noreferrer" : undefined}
                      >
                        <method.icon className="h-8 w-8 text-[#00B14F] mb-6" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{method.label}</p>
                        <p className="text-xs text-gray-400">{method.availability}</p>
                      </a>
                    ))}
                  </div>
                  )
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-4">
                  Thank You for Reaching Out
                </h3>
                <p className="text-gray-600">
                  Your message has been received. We'll get back to you within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}