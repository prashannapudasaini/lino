import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Car, Plane, Building2, Plus } from 'lucide-react';

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Professional Chauffeurs',
    subtitle: 'Courteous and experienced'
  },
  {
    icon: Car,
    title: 'Luxury Fleet',
    subtitle: 'Exceptional vehicles'
  },
  {
    icon: Plane,
    title: 'Airport Transfers',
    subtitle: 'Reliable and stress-free'
  },
  {
    icon: Building2,
    title: 'Business & Corporate',
    subtitle: 'Travel with confidence'
  }
];

const HeroSection = () => {
  const handleScrollDown = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-6 overflow-hidden bg-[#0B0B0C] text-white">
      {/* Background Photography: Jet & Chauffeur holding door of Mercedes S-Class on Wet Tarmac */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/custom/hero-jet-limo.jpg"
          alt="Everest Executive Chauffeur & Private Jet on Tarmac"
          className="w-full h-full object-cover object-[75%_center] lg:object-center filter brightness-[0.62] contrast-[1.12]"
          loading="eager"
        />
        {/* Cinematic gradients to make typography stand out effortlessly */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C]/95 via-[#0B0B0C]/75 to-transparent w-full lg:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-black/60" />
      </div>

      {/* Main Hero Editorial Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-10 lg:py-16">
        <div className="max-w-2xl text-left">
          {/* Eyebrow */}
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#C5A46D]">
              PREMIUM CHAUFFEUR SERVICES
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-normal tracking-tight text-white leading-[1.08] mb-5">
            Arrive in Comfort.<br />
            Travel in <span className="italic text-[#C5A46D] font-serif">Excellence.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-xl mb-8 font-normal">
            Executive transportation designed for your time, comfort, and peace of mind.
          </p>

          {/* Action Pill Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/book-now"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C5A46D] hover:bg-[#D5B982] text-[#0B0B0C] font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-luxury-gold active:scale-95"
            >
              <span>Request a Ride</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/fleet"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-black/40 hover:bg-white/10 border border-white/20 text-white font-medium text-xs sm:text-sm tracking-wider transition-all duration-200 active:scale-95 backdrop-blur-md"
            >
              <span>Explore Our Fleet</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Integrated Bottom Trust Bar & Scroll Indicator */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="border-t border-white/10 bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {trustItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex items-start gap-3">
                  <div className="text-[#C5A46D] mt-0.5 shrink-0">
                    <IconComp className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wide leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={handleScrollDown}
          className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-zinc-400 hover:text-[#C5A46D] transition-colors pb-2 cursor-pointer focus:outline-none"
        >
          <Plus className="w-3.5 h-3.5 text-[#C5A46D]" />
          <span>SCROLL TO EXPLORE</span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
