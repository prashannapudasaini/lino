import React from 'react';
import { Shield, Sparkles, Clock, Compass, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const pillars = [
  {
    icon: Shield,
    title: "Executive Discretion & Vetting",
    desc: "Every chauffeur undergoes stringent background checks, defensive driving certifications, and non-disclosure privacy agreements."
  },
  {
    icon: Clock,
    title: "Meticulous Schedule Planning",
    desc: "Dispatch plans routes well in advance, tracking regional traffic conditions and terminal flight gates to ensure punctual arrivals."
  },
  {
    icon: Sparkles,
    title: "Pristine Vehicle Sanitation",
    desc: "Every vehicle in our fleet is cleaned and detailed before every trip, stocked with chilled bottled water and mobile charging stations."
  },
  {
    icon: Compass,
    title: "Bespoke Personalized Itineraries",
    desc: "Direct communication with our operations team allows for flexible multi-city stops, custom luggage accommodations, and tailored schedules."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-28 bg-luxury-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading and Image Composition */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-[1px] bg-luxury-gold/60 inline-block"></span>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-luxury-gold">
                The Everest Standard
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-luxury-textPrimary leading-tight">
              A Culture of Restraint, Polish & Precision.
            </h2>

            <p className="text-sm sm:text-base text-luxury-textSecondary leading-relaxed">
              We do not view executive transportation as a mere ride from point A to point B. It is an extension of your professional reputation, personal peace of mind, and valuable time.
            </p>

            <div className="relative rounded-2xl overflow-hidden border border-luxury-border shadow-2xl pt-6">
              <img
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80"
                alt="Executive chauffeur opening luxury sedan door"
                className="w-full h-64 object-cover object-center filter brightness-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-transparent to-transparent" />
            </div>
          </div>

          {/* Right Column: 4 Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  className="bg-luxury-surface border border-luxury-border p-6 rounded-2xl hover:border-luxury-gold/40 transition-all duration-300 shadow-luxury"
                >
                  <div className="w-12 h-12 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center text-luxury-gold mb-5">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-luxury-textPrimary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
