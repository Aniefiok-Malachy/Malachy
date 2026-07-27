import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle, AlertTriangle, MessageSquare, User, HelpCircle, Phone, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError(null);
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Please enter your name.';
    if (!formData.email.trim()) return 'Please enter your email.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address.';
    if (!formData.subject.trim()) return 'Please enter a subject.';
    if (!formData.message.trim()) return 'Please enter a message.';
    if (formData.message.trim().length < 10) return 'Your message must be at least 10 characters long.';
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setValidationError(error);
      return;
    }

    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error occurred while sending message.');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Could not send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="mb-16 text-center md:text-left">
        <h2 className="font-display font-bold text-3xl md:text-5xl text-gray-900 dark:text-white mb-4">
          Initiate Contact
        </h2>
        <div className="h-1.5 w-20 bg-blue-500 rounded-full mx-auto md:mx-0 mb-6" />
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl text-lg leading-relaxed">
          Reach out for engineering consultations, architectural design advising, 
          or direct project collaboration contracts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-6 md:p-8 rounded-2xl glass">
            <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-6">
              Contact Details
            </h3>
            
            <div className="space-y-6">
              {/* Email Address Block */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/15">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    General Enquiries
                  </h4>
                  <a
                    id="contact-email-link"
                    href={`mailto:${PERSONAL_INFO.socials.email}`}
                    className="text-base font-semibold text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors mt-0.5 block"
                  >
                    {PERSONAL_INFO.socials.email}
                  </a>
                </div>
              </div>

              {/* Phone Block */}
              {PERSONAL_INFO.phone && (
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Phone Number
                    </h4>
                    <a
                      id="contact-phone-link"
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-base font-semibold text-gray-900 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors mt-0.5 block"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Location Block */}
              {PERSONAL_INFO.location && (
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/15">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Location
                    </h4>
                    <span className="text-base font-semibold text-gray-900 dark:text-white mt-0.5 block">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>
              )}

              {/* Telegram Username Block */}
              {PERSONAL_INFO.socials.telegram && (
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/15">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Telegram Username
                    </h4>
                    <a
                      id="contact-telegram-link"
                      href={PERSONAL_INFO.socials.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors mt-0.5 block"
                    >
                      @{PERSONAL_INFO.socials.telegram.split('/').pop()}
                    </a>
                  </div>
                </div>
              )}

              {/* Telegram Bot Block */}
              {PERSONAL_INFO.socials.telegramBot && (
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/15">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Telegram Live Bot
                    </h4>
                    <a
                      id="contact-telegram-bot-link"
                      href={PERSONAL_INFO.socials.telegramBot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-gray-900 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors mt-0.5 block"
                    >
                      @{PERSONAL_INFO.socials.telegramBot.split('/').pop()}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Secure Handshake Notice */}
          <div className="p-6 rounded-2xl border border-blue-500/10 bg-blue-500/5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            <p className="font-semibold text-gray-900 dark:text-white mb-1">
              End-to-End Delivery Guaranteed
            </p>
            Your details are sent securely directly to my workspace database inbox. I personally respond to all qualified consulting and employment inquiries within 48 business hours.
          </div>
        </div>

        {/* Contact Form Container */}
        <div className="lg:col-span-7">
          <form id="contact-form" onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl glass space-y-6">
            <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">
              Send a Secure Message
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              All form fields are validated in real-time.
            </p>

            {/* Error alerts */}
            {validationError && (
              <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/5 text-sm text-red-600 dark:text-red-400 flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/5 text-sm text-red-600 dark:text-red-400 flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success alert */}
            {status === 'success' && (
              <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2.5">
                <CheckCircle className="w-4.5 h-4.5 shrink-0" />
                <span>Your message has been delivered successfully. Thank you!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Alex Mercer"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="alex@company.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-2">
              <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                Subject Line
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Consultation regarding platform engineering contract"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Provide details about your project scope, timeline, and requirements..."
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              id="submit-contact-btn"
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm cursor-pointer transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing Delivery...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Deliver Secure Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
