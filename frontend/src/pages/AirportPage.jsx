import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, MapPin, Clock, ShieldCheck, ArrowRight, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/common/PageHero';

const confirmedAirports = [
  {
    code: "MDT",
    city: "Harrisburg, PA",
    name: "Harrisburg International Airport",
    hubType: "Primary Regional Hub",
    description: "Our core operational base. Seamless curbside pickups or inside baggage claim meet-and-greets for Central Pennsylvania business leaders, state officials, and private residents."
  },
  {
    code: "PHL",
    city: "Philadelphia, PA",
    name: "Philadelphia International Airport",
    hubType: "Commercial & International",
    description: "Serving Terminals A through F. Direct non-stop connections between Greater Philadelphia, Center City, Lancaster, Hershey, and South Jersey."
  },
  {
    code: "JFK",
    city: "Queens, New York",
    name: "John F. Kennedy International Airport",
    hubType: "Global Aviation Hub",
    description: "Pre-arranged limousine staging outside all active terminals. Long-distance executive transfers connecting Pennsylvania directly to international flights."
  },
  {
    code: "LGA",
    city: "Queens, New York",
    name: "LaGuardia Airport",
    hubType: "Domestic Business Gateway",
    description: "Serving modern Terminals A, B, and C. Relaxed, quiet travel between New York financial centers and Mid-Atlantic regional headquarters."
  },
  {
    code: "EWR",
    city: "Newark, New Jersey",
    name: "Newark Liberty International Airport",
    hubType: "Tri-State Hub",
    description: "Serving Terminals A, B, and C with expedited curb access. Avoid crowded trains or multi-leg commutes with private point-to-point comfort."
  }
];

const faqs = [
  {
    q: "How does Everest Executive Limo coordinate flight schedules?",
    a: "When you provide your airline and flight number during your quotation request, our dispatch team actively monitors your flight's published schedule. If your flight arrives early or is delayed, your chauffeur's staging schedule is adjusted accordingly."
  },
  {
    q: "Where will my chauffeur meet me at the airport?",
    a: "We offer two convenient arrangements: Inside Baggage Claim Meet & Greet (your chauffeur waits at your carousel holding a personalized executive name tablet) or Curbside Staging (your chauffeur is parked nearby and pulls up to your terminal door the moment you walk out)."
  },
  {
    q: "Is there a complimentary waiting period for airport pickups?",
    a: "Yes. We include a complimentary 45-minute grace period for domestic commercial flights and up to 60 minutes for international commercial flights to allow ample time for deplaning and baggage claim."
  },
  {
    q: "Do you service private aviation FBOs?",
    a: "Yes. We frequently provide direct apron and hangar pickups at Signature Flight Support, Atlantic Aviation, and regional private aviation FBOs across PA, NY, NJ, and Washington D.C."
  }
];

const AirportPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="bg-luxury-bg text-white">
      {/* 1. Hero */}
      <PageHero
        eyebrow="AIRPORT TRANSPORTATION"
        title="Airport Transfers, Elevated."
        subtitle="Enjoy a smooth and comfortable journey with professional executive transportation."
        breadcrumb={[{ name: "Airport Transportation" }]}
        backgroundImage="/images/custom/hero-jet-limo.jpg"
      />

      {/* 2. Introduction */}
      <section className="py-20 md:py-24 bg-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
              RELIABLE AIRPORT LOGISTICS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
              A Serene Beginning and Conclusion to Every Flight
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              Navigating airport traffic, crowded parking shuttles, and unpredictable rideshare availability adds unnecessary fatigue to your journey. Everest Executive Limo delivers door-to-terminal peace of mind, managing every ground transition with precision.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Confirmed Airport Coverage & Codes */}
      <section className="py-20 md:py-28 bg-[#151517] border-y border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold block mb-2">
                VERIFIED REGIONAL HUBS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
                Confirmed Airport Coverage
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
              We provide scheduled private chauffeur service to all major international and domestic commercial airports across the region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {confirmedAirports.map((airport, idx) => (
              <div
                key={idx}
                className="bg-luxury-card border border-luxury-border rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-luxury-gold/50 transition-all duration-300 shadow-luxury group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-3xl font-bold text-luxury-gold tracking-wider">
                      {airport.code}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-zinc-300">
                      {airport.hubType}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-white mb-1 group-hover:text-luxury-gold transition-colors">
                    {airport.name}
                  </h3>
                  <div className="text-xs text-zinc-400 mb-4 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
                    <span>{airport.city}</span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {airport.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5">
                  <Link
                    to="/book-now"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-luxury-gold hover:text-luxury-goldHover transition-colors"
                  >
                    <span>Request Transfer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pickup and Drop-off Experience */}
      <section className="py-20 md:py-28 bg-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-luxury-border group">
                <img
                  src="/images/custom/service-airport.jpg"
                  alt="Airport terminal pickup experience"
                  className="w-full h-[440px] sm:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold block">
                SEAMLESS TRANSITIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-[1.15]">
                The Pickup & Drop-Off Experience
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                Whether arriving on a late transatlantic flight or catching an early morning departure, our team coordinates with terminal authorities and private FBO concierges for effortless passage.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-luxury-surface border border-luxury-border">
                  <div className="w-9 h-9 rounded-lg bg-luxury-card border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Departure Drop-Offs</h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Curbside luggage unloading right outside your specific airline ticketing door.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-luxury-surface border border-luxury-border">
                  <div className="w-9 h-9 rounded-lg bg-luxury-card border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Arrival Meet & Greet</h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Chauffeur waiting at baggage claim with a customized digital tablet display.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="py-20 md:py-28 bg-[#151517] border-t border-luxury-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold block mb-2">
              HELPFUL INFORMATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-luxury-card border border-luxury-border rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif text-lg font-medium text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-luxury-gold transition-transform duration-300 shrink-0 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openFaq === idx && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Booking CTA */}
      <section className="py-20 md:py-28 bg-[#0B0B0C] text-center border-t border-luxury-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4 tracking-tight">
            Reserve Your Airport Transfer
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-8 font-normal">
            Submit your flight details to receive a customized quotation from our executive team.
          </p>
          <Link
            to="/book-now"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-luxury-goldHover transition-all shadow-luxury-gold hover:shadow-luxury-glow"
          >
            <span>Book Your Ride</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AirportPage;
