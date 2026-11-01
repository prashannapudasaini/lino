import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, ArrowRight } from 'lucide-react';

const airports = [
  {
    code: 'MDT',
    name: 'Harrisburg International Airport'
  },
  {
    code: 'PHL',
    name: 'Philadelphia International Airport'
  },
  {
    code: 'JFK',
    name: 'John F. Kennedy International Airport'
  },
  {
    code: 'LGA',
    name: 'LaGuardia Airport'
  },
  {
    code: 'EWR',
    name: 'Newark Liberty International Airport'
  }
];

const AirportCoverage = () => {
  return (
    <section className="py-20 md:py-28 bg-[#0B0B0C] text-white relative overflow-hidden border-t border-[#1E1E22]">
      {/* Background Airport Tarmac & Lights Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/custom/airport-tarmac.jpg"
          alt="Airport Runway and Tarmac Twilight"
          className="w-full h-full object-cover object-center filter brightness-[0.22] contrast-[1.2]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/90 to-[#0B0B0C]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-[#0B0B0C]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Description, CTA Button */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A46D] block">
              AIRPORT TRANSPORTATION
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.12]">
              Seamless Airport Transfers
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal max-w-md">
              We provide reliable transportation to and from major airports, ensuring a smooth and stress-free journey.
            </p>

            <div className="pt-2">
              <Link
                to="/airport-transportation"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C5A46D] hover:bg-[#D5B982] text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-luxury-gold active:scale-95"
              >
                <span>View Airport Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 5 Glass Airport Cards */}
          <div className="lg:col-span-7">
            {/* Desktop / Tablet Grid: 5 horizontal cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {airports.map((airport, idx) => (
                <Link
                  key={idx}
                  to="/airport-transportation"
                  className="bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#C5A46D]/60 hover:bg-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 group min-h-[160px] shadow-lg"
                >
                  <div className="text-[#C5A46D] mb-3">
                    <Plane className="w-5 h-5 -rotate-45 group-hover:scale-110 transition-transform" />
                  </div>

                  <div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-white group-hover:text-[#C5A46D] transition-colors tracking-wide">
                      {airport.code}
                    </div>
                    <div className="text-[11px] sm:text-xs text-zinc-400 mt-1 leading-snug line-clamp-2">
                      {airport.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirportCoverage;
