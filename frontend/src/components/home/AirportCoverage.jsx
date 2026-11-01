import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, ArrowRight } from 'lucide-react';

const airports = [
  {
    code: "MDT",
    city: "Harrisburg",
    fullName: "International Airport"
  },
  {
    code: "PHL",
    city: "Philadelphia",
    fullName: "International Airport"
  },
  {
    code: "JFK",
    city: "John F. Kennedy",
    fullName: "International Airport"
  },
  {
    code: "LGA",
    city: "LaGuardia",
    fullName: "Airport"
  },
  {
    code: "EWR",
    city: "Newark Liberty",
    fullName: "International Airport"
  }
];

const AirportCoverage = () => {
  return (
    <section className="py-20 md:py-24 bg-[#0B0B0C] text-white relative overflow-hidden">
      {/* Background Tarmac Atmosphere Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1600&q=80"
          alt="Airport Runway Lights at Twilight"
          className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/85 to-[#0B0B0C]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Action */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-luxury-gold block">
              AIRPORT TRANSPORTATION
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.1]">
              Seamless Airport Transfers
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal max-w-md">
              We provide reliable transportation to and from major airports, ensuring a smooth and stress-free journey.
            </p>

            <div className="pt-2">
              <Link
                to="/airport-transportation"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs uppercase tracking-wider hover:bg-luxury-goldHover transition-all shadow-luxury-gold active:scale-95"
              >
                <span>View Airport Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 5 Glass Airport Cards */}
          <div className="lg:col-span-7">
            {/* Desktop: 5 Cards in a Single Row */}
            <div className="hidden sm:grid grid-cols-5 gap-3">
              {airports.map((airport, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-luxury-gold/50 hover:bg-white/10 transition-all text-center group min-h-[160px]"
                >
                  <div className="w-7 h-7 mx-auto rounded-full bg-luxury-gold/15 flex items-center justify-center text-luxury-gold mb-2">
                    <Plane className="w-3.5 h-3.5" />
                  </div>

                  <div>
                    <div className="font-mono text-xl font-bold text-white group-hover:text-luxury-gold transition-colors tracking-wide">
                      {airport.code}
                    </div>
                    <div className="text-[11px] font-medium text-zinc-300 mt-1">
                      {airport.city}
                    </div>
                    <div className="text-[9px] text-zinc-400 mt-0.5 leading-tight">
                      {airport.fullName}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile: Sleek List Format (Matching Right Mockup) */}
            <div className="sm:hidden space-y-2.5">
              {airports.map((airport, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                >
                  <Plane className="w-4 h-4 text-luxury-gold shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="font-mono font-bold text-luxury-gold mr-2">{airport.code}</span>
                    <span className="text-zinc-200">{airport.city} {airport.fullName}</span>
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

export default AirportCoverage;
