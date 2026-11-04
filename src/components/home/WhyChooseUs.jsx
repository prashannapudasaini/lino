import React from 'react';
import { Armchair, UserCheck, Clock, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Armchair,
    title: 'Comfort & Convenience',
    description: 'Acoustic cabin isolation, climate pre-conditioning, and fine leather recliners.'
  },
  {
    icon: UserCheck,
    title: 'Professional Service',
    description: 'Experienced, discreet chauffeurs dressed in formal executive attire.'
  },
  {
    icon: Clock,
    title: 'Dependable Transportation',
    description: 'Flight monitoring and chauffeurs staged 15 minutes before scheduled departure.'
  },
  {
    icon: ShieldCheck,
    title: 'Personalized Travel',
    description: 'Customized itineraries, point-to-point routes, and dedicated 24/7 dispatch.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-28 bg-[#151517] text-white border-y border-[#242428] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Eyebrow, Heading, Description, 2x2 Feature Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A46D] block mb-3">
                WHY CHOOSE EVEREST
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.12]">
                More Than a Ride —<br />
                <span className="italic font-serif text-[#C5A46D]">A Premium Experience</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal max-w-xl">
              We are committed to providing a superior travel experience with professional chauffeurs, an immaculate luxury fleet, and an unwavering focus on your comfort and peace of mind.
            </p>

            {/* 2x2 Circular Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {features.map((feat, idx) => {
                const IconComp = feat.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-[#1D1D20] border border-[#2A2A2E] hover:border-[#C5A46D]/40 transition-colors">
                    <div className="w-11 h-11 rounded-full border border-[#C5A46D] bg-[#C5A46D]/15 flex items-center justify-center text-[#C5A46D] shrink-0">
                      <IconComp className="w-5 h-5 stroke-[1.6]" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-white leading-tight">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
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
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#2A2A2E] bg-zinc-900 group">
              <img
                src="/images/custom/why-passenger.jpg"
                alt="Executive passenger relaxing in luxury leather chauffeur cabin"
                className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-bold block mb-1">
                  FIRST-CLASS CABIN
                </span>
                <p className="text-xs text-zinc-300">
                  Quiet acoustic isolation, Nappa leather seating, and USB-C laptop power.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
