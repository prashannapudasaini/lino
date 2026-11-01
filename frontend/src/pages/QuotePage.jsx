import React from 'react';
import { Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import MultiStepBookingForm from '../components/booking/MultiStepBookingForm';

const QuotePage = () => {
  return (
    <div className="bg-luxury-bg text-white">
      <PageHero
        eyebrow="RESERVATION & QUOTATION ENQUIRY"
        title="Your Journey Begins Here."
        subtitle="Tell us about your transportation needs. Our team will review your request and provide a personalized response."
        breadcrumb={[{ name: "Book a Ride / Quote" }]}
        backgroundImage="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2200&q=85"
      />

      <section className="py-16 md:py-24 bg-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Multi-Step Booking Form */}
            <div className="lg:col-span-8">
              <MultiStepBookingForm />
            </div>

            {/* Right Column: Reassurance & Direct Assistance */}
            <div className="lg:col-span-4 space-y-6">
              {/* Direct Dispatch Box */}
              <div className="bg-luxury-surface border border-luxury-border rounded-2xl p-6 shadow-luxury">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-luxury-gold block mb-2">
                  IMMEDIATE DISPATCH DESK
                </span>
                <h3 className="font-serif text-xl font-normal text-white mb-2">
                  Need a Same-Day Transfer?
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-normal">
                  For last-minute airport transfers or trips within the next 6 hours, please call our executive dispatch desk directly for expedited assistance.
                </p>

                <a
                  href="tel:+17175550199"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-luxury-gold text-luxury-bg font-semibold text-xs tracking-wider uppercase hover:bg-luxury-goldHover transition-colors shadow-luxury-gold"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call (717) 555-0199</span>
                </a>
              </div>

              {/* Booking Process Reassurance */}
              <div className="bg-luxury-surface border border-luxury-border rounded-2xl p-6 shadow-luxury space-y-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
                  What Happens Next:
                </h4>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                    <p className="text-zinc-400 leading-normal">
                      <strong className="text-white">Zero Obligation:</strong> Submitting a request is completely free with no upfront card charge.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                    <p className="text-zinc-400 leading-normal">
                      <strong className="text-white">Dispatch Verification:</strong> We calculate route traffic, flight buffers, and optimal vehicle suitability.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                    <p className="text-zinc-400 leading-normal">
                      <strong className="text-white">Strict Discretion:</strong> All corporate itinerary details and client contact information remain confidential.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Areas Summary */}
              <div className="bg-luxury-card border border-luxury-border rounded-xl p-5 text-xs text-zinc-400 space-y-2">
                <div className="flex items-center gap-2 text-luxury-gold font-semibold uppercase tracking-wider text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Operating Regions</span>
                </div>
                <p className="leading-relaxed">
                  Pennsylvania, New York, New Jersey, and Washington D.C., with 24/7 airport connections to MDT, PHL, JFK, LGA, and EWR.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuotePage;
