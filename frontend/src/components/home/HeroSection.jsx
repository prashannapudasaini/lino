import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Star, Award, Phone } from 'lucide-react';
import Button from '../common/Button';
import gsap from 'gsap';

const HeroSection = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.hero-anim'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Photography with Luxury Vignette & Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2000&q=85"
          alt="Everest Executive Limousine on quiet evening road"
          className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.08] scale-105 transform animate-fade-in"
          loading="eager"
        />
        {/* Layered Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-luxury-bg/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-bg/90 via-luxury-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(11,11,12,0.85)_100%)]" />
      </div>

      {/* Content Container */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 sm:pt-6">
        <div className="max-w-3xl">
          {/* Eyebrow Badge */}
          <div className="hero-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-luxury-surface/90 border border-luxury-gold/40 text-luxury-gold text-xs tracking-widest uppercase font-semibold mb-6 shadow-luxury backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse"></span>
            <span>Executive Chauffeur & Limousine Service</span>
          </div>

          {/* Headline */}
          <h1 className="hero-anim font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-luxury-textPrimary tracking-tight leading-[1.1] mb-6">
            Arrive in Comfort. <br />
            <span className="text-gold-gradient italic font-normal">
              Travel in Excellence.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="hero-anim text-base sm:text-lg md:text-xl text-luxury-textSecondary leading-relaxed font-normal mb-8 max-w-2xl">
            Premium executive transportation and private chauffeur services designed around your comfort, discretion, and schedule across Pennsylvania, New York, New Jersey, and Washington D.C.
          </p>

          {/* CTAs */}
          <div className="hero-anim flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <Link to="/quote">
              <Button size="lg" variant="primary" className="w-full sm:w-auto tracking-wider uppercase text-xs font-bold shadow-luxury-gold">
                Request a Ride <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link to="/fleet">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto tracking-wider uppercase text-xs">
                Explore Our Fleet
              </Button>
            </Link>
          </div>

          {/* Verified Trust Strip */}
          <div className="hero-anim grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-luxury-border/60 text-xs text-luxury-textSecondary">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-luxury-gold/15 flex items-center justify-center text-luxury-gold shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span>Professional Vetted Chauffeurs</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-luxury-gold/15 flex items-center justify-center text-luxury-gold shrink-0">
                <Award className="w-3.5 h-3.5" />
              </div>
              <span>Immaculate Luxury Fleet</span>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-luxury-gold/15 flex items-center justify-center text-luxury-gold shrink-0">
                <Star className="w-3.5 h-3.5" />
              </div>
              <span>MDT, PHL, EWR, JFK & LGA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
