import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

const CtaBanner = () => {
  return (
    <section className="py-24 md:py-32 bg-[#0B0B0C] text-white relative overflow-hidden border-t border-luxury-border">
      {/* Background with Subtle Luxury Vehicle Image & Deep Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2200&q=85"
          alt="Everest Executive luxury vehicle at twilight"
          className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-[1.2]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/85 to-[#0B0B0C]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-[#0B0B0C]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,164,109,0.12)_0%,transparent_60%)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-8 h-[1px] bg-luxury-gold inline-block"></span>
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
            ELEVATE YOUR TRAVEL
          </span>
          <span className="w-8 h-[1px] bg-luxury-gold inline-block"></span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white mb-6 tracking-tight leading-[1.12]">
          Your Journey Deserves the Exceptional.
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Experience executive transportation designed around your comfort and convenience. Receive a tailored, all-inclusive quotation for your corporate itinerary or airport transfer.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/book-now"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-luxury-goldHover transition-all duration-200 shadow-luxury-gold hover:shadow-luxury-glow active:scale-95 w-full sm:w-auto"
          >
            <span>Request Your Ride</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="tel:+17175550199"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs sm:text-sm tracking-wider transition-all duration-200 active:scale-95 backdrop-blur-sm w-full sm:w-auto"
          >
            <Phone className="w-4 h-4 text-luxury-gold" />
            <span>Speak with Dispatch</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
