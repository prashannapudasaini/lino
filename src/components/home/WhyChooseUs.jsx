import React from 'react';
import { Armchair, UserCheck, Clock, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Armchair,
    title: 'Comfort & Convenience',
    description: 'Relax and enjoy the journey.'
  },
  {
    icon: UserCheck,
    title: 'Professional Service',
    description: 'Experienced and courteous chauffeurs.'
  },
  {
    icon: Clock,
    title: 'Dependable Transportation',
    description: 'Always here when you need us.'
  },
  {
    icon: ShieldCheck,
    title: 'Personalized Travel',
    description: 'Tailored to your specific needs.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F7F5F0] text-[#141416] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Eyebrow, Heading, Description, 2x2 Feature Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#9E7D47] block mb-3">
                WHY CHOOSE EVEREST
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#141416] leading-[1.12]">
                More Than a Ride —<br />
                A Premium Experience
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal max-w-xl">
              We are committed to providing a superior travel experience with, professional service, luxury vehicles, and a focus on your comfort.
            </p>

            {/* 2x2 Circular Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {features.map((feat, idx) => {
                const IconComp = feat.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full border border-[#C5A46D] bg-[#C5A46D]/10 flex items-center justify-center text-[#9E7D47] shrink-0">
                      <IconComp className="w-5 h-5 stroke-[1.6]" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-[#141416] leading-tight">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Passenger in Executive Leather Rear Cabin */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-zinc-900 group">
              <img
                src="/images/custom/why-passenger.jpg"
                alt="Executive passenger relaxing in luxury leather chauffeur cabin"
                className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
