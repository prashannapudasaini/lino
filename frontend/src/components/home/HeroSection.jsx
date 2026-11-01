import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

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
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden bg-[#0B0B0C] text-white"
    >
      {/* Background: Wet Tarmac with Mercedes Sedan & Private Jet at Twilight */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2400&q=85"
          alt="Everest Executive Private Jet & Chauffeur on Tarmac"
          className="w-full h-full object-cover object-[80%_center] md:object-right-bottom filter brightness-[0.52] contrast-[1.15]"
          loading="eager"
        />
        {/* Editorial Vignette & Left Gradient to keep text completely readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/80 to-transparent w-full md:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(197,164,109,0.12)_0%,transparent_50%)]" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div ref={textRef} className="max-w-2xl text-left">
          {/* Eyebrow */}
          <div className="hero-fade mb-3">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A46D]">
              EVEREST EXECUTIVE LIMO
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-fade font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-normal tracking-tight text-white leading-[1.06] mb-5">
            Luxury Travel,<br />
            <span className="italic text-[#C5A46D] font-serif">Redefined.</span>
          </h1>

          {/* Description */}
          <p className="hero-fade text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-xl mb-8 font-normal">
            Premium chauffeur services for business, leisure, and special occasions. Travel in comfort, arrive in style.
          </p>

          {/* Action Buttons Matching Reference 1 */}
          <div className="hero-fade flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
            <Link
              to="/book-now"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C5A46D] hover:bg-[#D5B982] text-[#0B0B0C] font-semibold text-xs sm:text-sm tracking-wider transition-all duration-200 shadow-luxury-gold hover:shadow-luxury-glow active:scale-95"
            >
              <span>Book Your Ride</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/fleet"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-transparent hover:bg-white/10 border border-white/20 text-white font-medium text-xs sm:text-sm tracking-wider transition-all duration-200 active:scale-95 backdrop-blur-sm group"
            >
              <span>Explore Fleet</span>
              <span className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center text-xs group-hover:border-[#C5A46D] group-hover:text-[#C5A46D] transition-colors">
                <ChevronRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
