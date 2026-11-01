import React from 'react';
import { Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import MultiStepBookingForm from '../components/booking/MultiStepBookingForm';

const QuotePage = () => {
  return (
    <div>
      <PageHero
        eyebrow="Quotation & Reservation Request"
        title="Request Your Executive Chauffeur"
        subtitle="Submit your travel requirements below to receive a personalized, all-inclusive quotation from our executive dispatch team."
        breadcrumb={[{ name: "Get a Quote" }]}
        backgroundImage="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 md:py-24 bg-luxury-bg">
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
                  Immediate Assistance
                </span>
                <h3 className="font-serif text-xl font-normal text-luxury-textPrimary mb-3">
                  Need a Same-Day or Immediate Dispatch?
                </h3>
                <p className="text-xs text-luxury-textSecondary leading-relaxed mb-6">
                  For last-minute airport transfers or trips within the next 6 hours, please call our executive dispatch desk directly for expedited assistance.
                </p>

                <a
                  href="tel:+17175550199"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-luxury-gold text-luxury-bg font-semibold text-xs tracking-wider uppercase hover:bg-luxury-goldHover transition-colors shadow-luxury-gold"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call (717) 555-0199</span>
                </a>
              </div>

              {/* Booking Process Reassurance */}
              <div className="bg-luxury-surface border border-luxury-border rounded-2xl p-6 shadow-luxury space-y-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-luxury-textPrimary">
                  What Happens Next:
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                    <p className="text-luxury-textSecondary">
                      <strong className="text-luxury-textPrimary">No Instant Charges:</strong> Submitting is completely free with zero financial obligation.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                    <p className="text-luxury-textSecondary">
                      <strong className="text-luxury-textPrimary">Dispatch Verification:</strong> We calculate route conditions, timing, and vehicle class.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                    <p className="text-luxury-textSecondary">
                      <strong className="text-luxury-textPrimary">Guaranteed Discretion:</strong> All corporate and personal travel data remains strictly confidential.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Areas Summary */}
              <div className="bg-luxury-card/60 border border-luxury-border/60 rounded-xl p-5 text-xs text-luxury-textSecondary space-y-2">
                <div className="flex items-center gap-2 text-luxury-gold font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Serving PA, NY, NJ & Washington D.C.</span>
                </div>
                <p className="text-[11px] leading-relaxed text-luxury-textMuted">
                  Primary regional hub: Harrisburg, PA. Servicing MDT, PHL, Newark Liberty, JFK, and LaGuardia.
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
