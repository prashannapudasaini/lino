import React from 'react';
import { Armchair, UserCheck, Clock, Compass } from 'lucide-react';

const benefits = [
  {
    icon: Armchair,
    title: "Comfort & Convenience",
    desc: "Relax and enjoy the journey."
  },
  {
    icon: UserCheck,
    title: "Professional Service",
    desc: "Experienced and courteous chauffeurs."
  },
  {
    icon: Clock,
    title: "Dependable Transportation",
    desc: "Always here when you need us."
  },
  {
    icon: Compass,
    title: "Personalized Travel",
    desc: "Tailored to your specific needs."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-24 bg-[#F7F5F0] text-[#141416] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Content & 4 Features */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#8C7449] block mb-2">
                WHY CHOOSE EVEREST
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#141416] leading-[1.15] mb-4">
                More Than a Ride —<br />
                A Premium Experience
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal max-w-lg">
                We are committed to providing a superior travel experience with professional service, luxury vehicles, and a focus on your comfort.
              </p>
            </div>

            {/* 4 Feature Points in 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {benefits.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full border border-[#C5A46D] flex items-center justify-center text-[#8C7449] shrink-0 bg-white/60 shadow-sm">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#141416] tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: High-Res Passenger Interior Cabin Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85"
                alt="Executive passenger relaxing in luxury chauffeur cabin"
                className="w-full h-[380px] sm:h-[460px] object-cover object-center filter brightness-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
