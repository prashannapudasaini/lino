import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';

const airports = [
  {
    code: "MDT",
    name: "Harrisburg International Airport",
    location: "Harrisburg / Middletown, PA",
    desc: "Our primary regional hub. Fast, streamlined transfers for Central PA business leaders and families.",
    features: "Curbside or baggage claim meet-and-greet"
  },
  {
    code: "PHL",
    name: "Philadelphia International Airport",
    location: "Philadelphia, PA",
    desc: "Connecting Greater Philadelphia, Center City corporate suites, and regional hubs to Terminals A–F.",
    features: "Direct commercial & private terminal transfers"
  },
  {
    code: "EWR",
    name: "Newark Liberty International Airport",
    location: "Newark / NJ Metro",
    desc: "Transatlantic and domestic business gateway. Avoid train transfers with direct door-to-terminal chauffeured luxury.",
    features: "Serving Terminals A, B, and C"
  },
  {
    code: "JFK",
    name: "John F. Kennedy International Airport",
    location: "Queens, New York, NY",
    desc: "Premier international airport connection. Smooth regional intercity transport directly between NYC and PA.",
    features: "International flight monitoring & luggage assistance"
  },
  {
    code: "LGA",
    name: "LaGuardia Airport",
    location: "Queens, New York, NY",
    desc: "Efficient domestic connections to New York financial centers and Mid-Atlantic destinations.",
    features: "Expedited luxury pickup zones"
  }
];

const AirportCoverage = () => {
  return (
    <section className="py-20 md:py-28 bg-luxury-surface border-y border-luxury-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Aviation & Airport Logistics"
          title="Direct Chauffeured Airport Transfers"
          subtitle="Skip long taxi queues, airport parking decks, and train connections. Enjoy private door-to-terminal luxury across the Mid-Atlantic."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {airports.map((airport, index) => (
            <div
              key={index}
              className="bg-luxury-bg border border-luxury-border rounded-xl p-6 hover:border-luxury-gold/50 transition-all duration-300 flex flex-col justify-between group shadow-luxury"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-bold text-luxury-gold tracking-wider group-hover:text-luxury-goldHover transition-colors">
                    {airport.code}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-luxury-card border border-luxury-border flex items-center justify-center text-luxury-gold">
                    <Plane className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-lg font-semibold text-luxury-textPrimary mb-1">
                  {airport.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-luxury-gold/80 mb-3">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{airport.location}</span>
                </div>

                <p className="text-xs text-luxury-textSecondary leading-relaxed mb-4">
                  {airport.desc}
                </p>

                <div className="text-[11px] text-luxury-textMuted bg-luxury-card/70 border border-luxury-border/60 rounded-lg p-2.5 mb-6">
                  {airport.features}
                </div>
              </div>

              <Link to="/quote">
                <Button size="sm" variant="secondary" className="w-full justify-center text-xs tracking-wider uppercase">
                  Book Airport Transfer
                </Button>
              </Link>
            </div>
          ))}

          {/* Special Private Aviation Card */}
          <div className="bg-gradient-to-br from-luxury-card to-luxury-surface border border-luxury-gold/40 rounded-xl p-6 flex flex-col justify-between shadow-luxury">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xl font-bold text-luxury-gold tracking-wider">
                  PRIVATE FBO
                </span>
                <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                  <Plane className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-serif text-lg font-semibold text-luxury-textPrimary mb-1">
                Private Jet & Charter Aviation
              </h3>
              <p className="text-xs text-luxury-gold/80 mb-3">
                Signature Flight Support, Atlantic Aviation & FBOs
              </p>
              <p className="text-xs text-luxury-textSecondary leading-relaxed mb-6">
                Direct tarmac and FBO hangar transfers tailored for private jet passengers, pilots, and chartered aircraft arrivals across regional airfields.
              </p>
            </div>

            <Link to="/quote">
              <Button size="sm" variant="primary" className="w-full justify-center text-xs tracking-wider uppercase font-semibold">
                Request FBO Chauffeur
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirportCoverage;
