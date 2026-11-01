import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

const airports = [
  {
    code: "MDT",
    city: "Harrisburg",
    fullName: "Harrisburg International Airport",
    hub: "Central PA Operational Hub"
  },
  {
    code: "PHL",
    city: "Philadelphia",
    fullName: "Philadelphia International Airport",
    hub: "Commercial & International Flights"
  },
  {
    code: "JFK",
    city: "New York City",
    fullName: "John F. Kennedy International Airport",
    hub: "Global Transatlantic Gateway"
  },
  {
    code: "LGA",
    city: "New York City",
    fullName: "LaGuardia Airport",
    hub: "Executive Domestic Hub"
  },
  {
    code: "EWR",
    city: "Newark",
    fullName: "Newark Liberty International Airport",
    hub: "Tri-State & Regional Flights"
  }
];

const AirportCoverage = () => {
  return (
    <section className="py-24 md:py-32 bg-[#0B0B0C] text-white relative overflow-hidden">
      {/* Background: Runway at Sunset with Private Aircraft & Executive Transportation */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=2200&q=85"
          alt="Executive private jet and limousine on airport runway at sunset"
          className="w-full h-full object-cover object-center filter brightness-[0.28] contrast-[1.2]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/90 to-[#0B0B0C]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-[#0B0B0C]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(197,164,109,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-luxury-gold inline-block"></span>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
              AVIATION GROUND LOGISTICS
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12] mb-4">
            Seamless Airport Transfers
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
            Experience convenient and comfortable transportation to and from your destination. We coordinate curbside staging, terminal meet-and-greet, and generous waiting periods for all major regional commercial hubs and private FBO airfields.
          </p>
        </div>

        {/* 5 Airport Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 mb-12">
          {airports.map((airport, idx) => (
            <div
              key={idx}
              className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-luxury-gold/60 hover:bg-white/[0.08] transition-all duration-300 group shadow-2xl min-h-[190px]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-bold text-white group-hover:text-luxury-gold transition-colors tracking-wider">
                    {airport.code}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-luxury-gold/15 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-luxury-bg transition-colors">
                    <Plane className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-sm font-medium text-white mb-1 leading-snug">
                  {airport.city}
                </div>
                <div className="text-xs text-zinc-400 leading-snug">
                  {airport.fullName}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 text-[10px] uppercase tracking-wider text-luxury-gold/80 font-medium">
                {airport.hub}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-luxury-gold/15 flex items-center justify-center text-luxury-gold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-sm text-zinc-300">
              <strong className="text-white">Complimentary Flight Buffer:</strong> Up to 45 minutes complimentary wait time for domestic arrivals.
            </p>
          </div>

          <Link
            to="/airport-transportation"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs uppercase tracking-wider hover:bg-luxury-goldHover transition-all shadow-luxury-gold shrink-0"
          >
            <span>View Airport Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AirportCoverage;
