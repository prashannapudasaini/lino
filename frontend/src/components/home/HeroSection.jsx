import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Car, Plane, Building2, ArrowRight, PlusCircle } from 'lucide-react';
import gsap from 'gsap';

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Professional Chauffeurs",
    desc: "Courteous and experienced"
  },
  {
    icon: Car,
    title: "Luxury Fleet",
    desc: "Exceptional vehicles"
  },
  {
    icon: Plane,
    title: "Airport Transfers",
    desc: "Reliable and stress-free"
  },
  {
    icon: Building2,
    title: "Business & Corporate",
    desc: "Travel with confidence"
  }
];

const HeroSection = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current?.querySelectorAll('.hero-fade'),
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.15
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-8 overflow-hidden bg-luxury-bg text-white"
    >
      {/* Background Image: Jet + Luxury Vehicle on Tarmac */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2200&q=85"
          alt="Everest Executive Private Jet & Chauffeur on Tarmac"
          className="w-full h-full object-cover object-right-bottom filter brightness-[0.52] contrast-[1.12]"
          loading="eager"
        />
        {/* Gradients to blend smoothly and keep text readable on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-bg via-luxury-bg/60 to-transparent w-full md:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-transparent to-black/60" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div ref={textRef} className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
          {/* Eyebrow */}
          <div className="hero-fade inline-block mb-3">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-luxury-gold">
              PREMIUM CHAUFFEUR SERVICES
            </span>
          </div>

          {/* Heading */}
          <h1 className="hero-fade font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.1] mb-5">
            Arrive in Comfort.<br />
            Travel in <span className="italic text-luxury-gold font-serif">Excellence.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-fade text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-xl mx-auto md:mx-0 mb-8 font-normal">
            Executive transportation designed for your time, comfort, and peace of mind.
          </p>

          {/* Pill Action Buttons */}
          <div className="hero-fade flex flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 mb-8">
            <Link
              to="/quote"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-luxury-goldHover transition-all duration-200 shadow-luxury-gold active:scale-95"
            >
              <span>Request a Ride</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/fleet"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs sm:text-sm tracking-wider transition-all duration-200 active:scale-95"
            >
              <span>Explore Our Fleet</span>
            </Link>
          </div>
        </div>

        {/* Mobile Featured Image: Shown between text and trust indicators */}
        <div className="md:hidden mt-4 mb-8 rounded-2xl overflow-hidden border border-luxury-border shadow-2xl relative">
          <img
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80"
            alt="Private Jet and Executive Chauffeur"
            className="w-full h-56 object-cover object-center filter brightness-[0.65]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-transparent to-transparent" />
        </div>
      </div>

      {/* Hero Bottom Trust Bar & Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto pt-6">
        {/* Trust Strip */}
        <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {trustItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-luxury-gold/15 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                      {item.title}
                    </div>
                    <div className="text-[10px] sm:text-xs text-zinc-400 truncate">
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll to Explore Indicator */}
        <div className="hidden sm:flex items-center justify-center gap-2 pt-4 text-[10px] uppercase tracking-[0.25em] text-zinc-400">
          <PlusCircle className="w-3.5 h-3.5 text-luxury-gold" />
          <span>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
