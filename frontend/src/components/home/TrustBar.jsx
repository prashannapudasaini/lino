import React from 'react';
import { Gem, ShieldCheck, Clock, Headphones } from 'lucide-react';

const trustItems = [
  {
    icon: Gem,
    title: "Premium Fleet",
    desc: "Luxury vehicles for every journey"
  },
  {
    icon: ShieldCheck,
    title: "Professional Chauffeurs",
    desc: "Courteous, experienced, and discreet"
  },
  {
    icon: Clock,
    title: "On-Time Guarantee",
    desc: "Because your time matters"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Always here, always ready"
  }
];

const clientLogos = [
  "Google",
  "Microsoft",
  "Meta",
  "Tesla",
  "Amazon"
];

const TrustBar = () => {
  return (
    <section className="bg-[#0B0B0C] border-y border-[#1E1E22] py-8 sm:py-10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Trusted by Leading Professionals Worldwide */}
        <div className="text-center space-y-3 pb-6 border-b border-[#1E1E22]">
          <span className="text-[11px] text-[#A7A5A0] tracking-wider uppercase font-medium">
            Trusted by leading professionals worldwide
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-zinc-500 font-serif text-lg sm:text-xl tracking-wider select-none opacity-60">
            {clientLogos.map((brand, idx) => (
              <span key={idx} className="hover:text-zinc-300 transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* 4 Feature Values with Gold Line Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-2">
          {trustItems.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-2 rounded-xl group"
              >
                <div className="text-[#C5A46D] shrink-0 mt-0.5">
                  <IconComp className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A7A5A0] mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
