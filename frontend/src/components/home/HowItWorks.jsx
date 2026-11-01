import React from 'react';
import { FileText, Search, Send, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const steps = [
  {
    step: "01",
    icon: FileText,
    title: "Submit Ride Request",
    desc: "Provide your itinerary, preferred vehicle category, passenger count, and optional airport details through our streamlined form."
  },
  {
    step: "02",
    icon: Search,
    title: "Executive Review",
    desc: "Our dispatch specialists verify optimal routing, vehicle suitability, and airport terminal coordination for your exact itinerary."
  },
  {
    step: "03",
    icon: Send,
    title: "Receive Custom Quote",
    desc: "You receive a transparent, all-inclusive personalized quote and trip summary via email with zero hidden fees."
  },
  {
    step: "04",
    icon: CheckCircle2,
    title: "Confirm With Dispatch",
    desc: "Accept your quotation to officially secure your chauffeur. Your assigned driver's contact details are provided prior to pickup."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28 bg-luxury-surface border-y border-luxury-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Frictionless Booking Process"
          title="How Your Journey is Arranged"
          subtitle="A clear, transparent four-step process ensuring every detail of your transportation is verified and managed by experienced dispatchers."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((st, idx) => {
            const IconComp = st.icon;
            return (
              <div
                key={idx}
                className="bg-luxury-bg border border-luxury-border rounded-xl p-6 relative flex flex-col justify-between hover:border-luxury-gold/50 transition-all duration-300 shadow-luxury group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-bold text-luxury-gold/40 group-hover:text-luxury-gold transition-colors">
                      {st.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center text-luxury-gold group-hover:border-luxury-gold/40 transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-luxury-textPrimary mb-2">
                    {st.title}
                  </h3>

                  <p className="text-xs text-luxury-textSecondary leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Notice */}
        <div className="mt-10 p-4 rounded-xl bg-luxury-card border border-luxury-border max-w-2xl mx-auto text-center text-xs text-luxury-textSecondary">
          <strong className="text-luxury-textPrimary">Please Note:</strong> Submitting a request initiates a formal quotation inquiry. Your booking is finalized upon mutual agreement with our executive team.
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
