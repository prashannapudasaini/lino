import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const stats = [
  {
    value: "10+",
    label: "Years of Excellence"
  },
  {
    value: "50K+",
    label: "Happy Clients"
  },
  {
    value: "99.9%",
    label: "On-Time Rate"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-28 md:py-36 bg-[#0B0B0C] text-white overflow-hidden border-t border-[#1E1E22]">
      {/* Background: Majestic Himalayan Mountain Peaks with Dark Atmospheric Twilight */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2400&q=85"
          alt="Majestic snowy Himalayan mountain peaks under dramatic twilight"
          className="w-full h-full object-cover object-center filter brightness-[0.40] contrast-[1.25]"
          loading="lazy"
        />
        {/* Subtle gradients to keep text legible while maintaining cinematic mountain clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C]/90 via-[#0B0B0C]/60 to-[#0B0B0C]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-[#0B0B0C]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Gold CTA Button */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A46D] block">
              WHY CHOOSE EVEREST
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-[1.08]">
              More Than a Ride —<br />
              <span className="text-white">A Premium Experience</span>
            </h2>

            <div className="pt-2">
              <Link
                to="/fleet"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C5A46D] hover:bg-[#D5B982] text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-luxury-gold hover:shadow-luxury-glow active:scale-95"
              >
                <span>Show Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Three Large Gold Statistics with Vertical Dividers */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
              {stats.map((item, idx) => (
                <div
                  key={idx}
                  className={`pt-4 sm:pt-0 ${idx !== 0 ? 'sm:pl-8' : ''} space-y-1`}
                >
                  <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#C5A46D] tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#A7A5A0] font-normal leading-snug">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
