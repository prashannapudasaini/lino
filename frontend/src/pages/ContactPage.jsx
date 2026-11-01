import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import Button from '../components/common/Button';
import { submitContact } from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please complete your name, email, and message.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await submitContact(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error("Contact submission error:", err);
      setError("Unable to deliver message at this time. Please call dispatch directly at +1 (717) 555-0199.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHero
        eyebrow="Client Concierge Desk"
        title="Contact Everest Executive Limo"
        subtitle="Our dispatch team and client concierge are at your service for corporate inquiries, custom regional itineraries, and reservation assistance."
        breadcrumb={[{ name: "Contact" }]}
        backgroundImage="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-20 md:py-28 bg-luxury-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Contact Info & Dispatch Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-luxury-gold block mb-2">
                  Direct Inquiries
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-luxury-textPrimary mb-4">
                  We Are Ready to Assist You
                </h2>
                <p className="text-sm text-luxury-textSecondary leading-relaxed">
                  Have a specific itinerary question or corporate fleet partnership in mind? Contact our team directly or submit a message below.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:+17175550199"
                  className="flex items-start gap-4 p-5 rounded-2xl bg-luxury-surface border border-luxury-border hover:border-luxury-gold/50 transition-colors group shadow-luxury"
                >
                  <div className="w-12 h-12 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center text-luxury-gold shrink-0 group-hover:border-luxury-gold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-luxury-textMuted block font-medium">
                      24/7 Executive Dispatch
                    </span>
                    <span className="text-base font-semibold text-luxury-textPrimary group-hover:text-luxury-gold transition-colors">
                      +1 (717) 555-0199
                    </span>
                    <p className="text-xs text-luxury-textSecondary mt-0.5">
                      Direct telephone support for urgent travel and schedule changes.
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:reservations@everestlimo.com"
                  className="flex items-start gap-4 p-5 rounded-2xl bg-luxury-surface border border-luxury-border hover:border-luxury-gold/50 transition-colors group shadow-luxury"
                >
                  <div className="w-12 h-12 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center text-luxury-gold shrink-0 group-hover:border-luxury-gold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-luxury-textMuted block font-medium">
                      Reservations & Quotes
                    </span>
                    <span className="text-base font-semibold text-luxury-textPrimary group-hover:text-luxury-gold transition-colors">
                      reservations@everestlimo.com
                    </span>
                    <p className="text-xs text-luxury-textSecondary mt-0.5">
                      Quote requests and corporate account inquiries.
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-luxury-surface border border-luxury-border shadow-luxury">
                  <div className="w-12 h-12 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center text-luxury-gold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-luxury-textMuted block font-medium">
                      Operational Headquarters
                    </span>
                    <span className="text-base font-semibold text-luxury-textPrimary">
                      Harrisburg, Pennsylvania
                    </span>
                    <p className="text-xs text-luxury-textSecondary mt-0.5">
                      Serving Central PA, Philadelphia, New York City, New Jersey, and Washington D.C.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-luxury-surface border border-luxury-border rounded-2xl p-6 sm:p-10 shadow-2xl">
              <h3 className="font-serif text-2xl text-luxury-textPrimary mb-2">
                Send a Message to Client Concierge
              </h3>
              <p className="text-xs text-luxury-textSecondary mb-6">
                Fill out the form below and an operations specialist will respond shortly.
              </p>

              {success && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  <div>
                    <strong className="block text-emerald-200">Message Delivered Successfully</strong>
                    <span>Thank you for contacting Everest Executive Limo LLC. A concierge coordinator will review your note and respond promptly.</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Eleanor Roosevelt"
                      required
                      className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2.5 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. client@company.com"
                      required
                      className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2.5 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (717) 555-0199"
                      className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2.5 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Corporate Account Inquiry"
                      className="w-full bg-luxury-card border border-luxury-border rounded-xl px-4 py-2.5 text-sm text-luxury-textPrimary focus:outline-none focus:border-luxury-gold min-h-[44px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-luxury-textSecondary mb-2">
                    Message / Travel Requirements *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your itinerary, group requirements, or questions..."
                    required
                    className="w-full bg-luxury-card border border-luxury-border rounded-xl p-3 text-sm text-luxury-textPrimary placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={loading}
                    className="w-full sm:w-auto text-xs uppercase tracking-wider font-bold"
                  >
                    Send Message <Send className="w-3.5 h-3.5 ml-2" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
