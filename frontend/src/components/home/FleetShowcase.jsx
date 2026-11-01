import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, Check, ArrowRight, Sparkles } from 'lucide-react';

const featuredVehicles = [
  {
    name: "Executive Luxury Sedan",
    subtitle: "Mercedes-Benz S-Class / Cadillac CT6",
    category: "Sedan",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    passengers: 3,
    luggage: 3,
    features: ["Acoustic Double-Glazing", "Nappa Leather Recliners", "Wi-Fi & Fast Charging"]
  },
  {
    name: "Executive Luxury SUV",
    subtitle: "Cadillac Escalade ESV / Lincoln Navigator L",
    category: "SUV",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85",
    passengers: 6,
    luggage: 6,
    features: ["Extended Wheelbase Luggage", "Second-Row Captain Chairs", "All-Wheel Drive Traction"]
  },
  {
    name: "Mercedes Executive Sprinter",
    subtitle: "Custom Executive Jet-Class Cabin",
    category: "Executive Van",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
    passengers: 14,
    luggage: 12,
    features: ["Full 6'4\" Standing Cabin", "Executive Worktables", "4K Media & HDMI Presentation"]
  }
];

const FleetShowcase = () => {
  return (
    <section className="py-20 md:py-28 bg-[#151517] text-white relative overflow-hidden border-t border-luxury-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-luxury-gold inline-block"></span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
                OUR FLEET
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.12]">
              Travel in a Class of Its Own
            </h2>
          </div>

          <div className="max-w-md space-y-3">
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
              Our curated fleet of pristine executive vehicles offers the ideal harmony of understated elegance, cutting-edge acoustic isolation, and uncompromising safety.
            </p>
            <Link
              to="/fleet"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-luxury-gold hover:text-luxury-goldHover transition-colors group"
            >
              <span>Explore Full Fleet Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 3 Luxury Automotive Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredVehicles.map((vehicle, idx) => (
            <div
              key={idx}
              className="bg-luxury-card border border-luxury-border rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-luxury-gold/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Vehicle Photography */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-black/80">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider font-semibold text-luxury-gold">
                      {vehicle.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-white group-hover:text-luxury-gold transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {vehicle.subtitle}
                    </p>
                  </div>

                  {/* Capacities */}
                  <div className="flex items-center gap-4 py-3 border-y border-white/5 text-xs text-zinc-300">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-luxury-gold" />
                      <span>Up to {vehicle.passengers} Passengers</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-luxury-gold" />
                      <span>{vehicle.luggage} Bags</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-1.5 text-xs text-zinc-400">
                    {vehicle.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-6 pt-0">
                <Link
                  to="/book-now"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-luxury-gold hover:text-luxury-bg border border-white/10 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-200"
                >
                  <span>Request This Vehicle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-12 text-center">
          <Link
            to="/fleet"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs uppercase tracking-wider hover:bg-luxury-goldHover transition-all shadow-luxury-gold hover:shadow-luxury-glow"
          >
            <span>Explore Our Fleet</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FleetShowcase;
