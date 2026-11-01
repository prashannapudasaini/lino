import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import PageHero from '../components/common/PageHero';
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    <div className="bg-luxury-bg text-white">
      {/* Hero */}
      <PageHero
        eyebrow="CLIENT CONCIERGE & DISPATCH"
        title="We're Here to Assist Your Journey."
        subtitle="Our dispatch team and client concierge are at your service for corporate inquiries, custom regional itineraries, and reservation assistance."
        breadcrumb={[{ name: "Contact" }]}
        backgroundImage="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=2200&q=85"
      />

      {/* Main Contact Section */}
      <section className="py-20 md:py-28 bg-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Contact Info & Dispatch Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold block mb-2">
                  DIRECT ASSISTANCE
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-4">
                  Connect With Executive Dispatch
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  Whether planning a multi-vehicle executive roadshow, inquiring about airport transfer procedures, or organizing private celebrations, our dispatch coordinators provide personalized attention.
                </p>
              </div>

              {/* Direct Info Cards */}
              <div className="space-y-4">
                <a
                  href="tel:+17175550199"
                  className="flex items-start gap-4 p-5 rounded-2xl bg-luxury-surface border border-luxury-border hover:border-luxury-gold/50 transition-colors group shadow-luxury"
                >
                  <div className="w-12 h-12 rounded-xl bg-luxury-card border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0 group-hover:border-luxury-gold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-medium">
                      24/7 Telephone Dispatch
                    </span>
                    <span className="text-base font-semibold text-white group-hover:text-luxury-gold transition-colors">
                      +1 (717) 555-0199
                    </span>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Direct telephone support for urgent travel and schedule adjustments.
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:reservations@everestlimo.com"
                  className="flex items-start gap-4 p-5 rounded-2xl bg-luxury-surface border border-luxury-border hover:border-luxury-gold/50 transition-colors group shadow-luxury"
                >
                  <div className="w-12 h-12 rounded-xl bg-luxury-card border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0 group-hover:border-luxury-gold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-medium">
                      Reservations & Inquiries
                    </span>
                    <span className="text-base font-semibold text-white group-hover:text-luxury-gold transition-colors">
                      reservations@everestlimo.com
                    </span>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Fast email response for quotations, corporate billing, and receipts.
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-luxury-surface border border-luxury-border shadow-luxury">
                  <div className="w-12 h-12 rounded-xl bg-luxury-card border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-medium">
                      Headquarters & Coverage
                    </span>
                    <span className="text-sm font-semibold text-white">
                      Harrisburg, Pennsylvania
                    </span>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Serving PA, NY, NJ, and Washington D.C., with 24/7 airport connections.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-luxury-surface border border-luxury-border shadow-luxury">
                  <div className="w-12 h-12 rounded-xl bg-luxury-card border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-medium">
                      Operating Hours
                    </span>
                    <span className="text-sm font-semibold text-white">
                      24 Hours / 7 Days a Week
                    </span>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Continuous dispatch coverage for early-morning flights and late-night arrivals.
                    </p>
                  </div>
                </div>
              </div>

              {/* Supporting Chauffeur Visual */}
              <div className="rounded-2xl overflow-hidden border border-luxury-border shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85"
                  alt="Everest Executive Chauffeur"
                  className="w-full h-52 object-cover object-center filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <p className="text-xs text-zinc-300 font-serif italic">
                    "Every client is escorted with discretion, courtesy, and respect."
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-luxury-card border border-luxury-border rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="mb-8">
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold block mb-2">
                  CLIENT INQUIRY FORM
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  Send a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Fill out the form below and an executive coordinator will respond promptly.
                </p>
              </div>

              {success ? (
                <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-2xl font-normal text-white">
                    Message Received
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                    Thank you for reaching out. Our dispatch team has received your message and will follow up promptly via email or phone.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 rounded-full bg-luxury-gold text-luxury-bg text-xs font-semibold uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-200 flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Name"
                        className="w-full px-4 py-3 rounded-xl bg-luxury-surface border border-luxury-border text-white text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-luxury-surface border border-luxury-border text-white text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+977
                  "
                        className="w-full px-4 py-3 rounded-xl bg-luxury-surface border border-luxury-border text-white text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                        Subject / Topic
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Corporate Account Inquiry"
                        className="w-full px-4 py-3 rounded-xl bg-luxury-surface border border-luxury-border text-white text-sm focus:outline-none focus:border-luxury-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Please share details about your travel dates, preferred vehicle, or specific inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-luxury-surface border border-luxury-border text-white text-sm focus:outline-none focus:border-luxury-gold transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs uppercase tracking-wider hover:bg-luxury-goldHover transition-all shadow-luxury-gold disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <span>Submit Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Request a Quote CTA Box */}
              <div className="mt-8 pt-8 border-t border-luxury-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-zinc-400">
                  Ready to book an exact itinerary?
                </span>
                <Link
                  to="/book-now"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-luxury-gold hover:text-luxury-goldHover transition-colors"
                >
                  <span>Request a Custom Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
