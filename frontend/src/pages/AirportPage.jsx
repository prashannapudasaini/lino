import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane, MapPin, Clock, ShieldCheck, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import CtaBanner from '../components/home/CtaBanner';
import { getAirports } from '../services/api';

const defaultAirports = [
  {
    code: "MDT",
    name: "Harrisburg International Airport",
    city: "Harrisburg (Middletown), PA",
    description: "Our primary regional operational hub. Direct transfers for state government officials, corporate executives, medical leaders, and Central Pennsylvania residents.",
    terminal_info: "Chauffeur meets passengers at lower-level baggage claim with tablet name display, or coordinates rapid curbside pickup outside passenger terminal exit."
  },
  {
    code: "PHL",
    name: "Philadelphia International Airport",
    city: "Philadelphia, PA",
    description: "Connecting Greater Philadelphia, Center City, and Pennsylvania regional hubs to Terminals A through F for domestic and international flights.",
    terminal_info: "Pre-arranged limousine pick-up zones located outside each terminal or baggage claim baggage level escort."
  },
  {
    code: "EWR",
    name: "Newark Liberty International Airport",
    city: "Newark, NJ / NYC Metro",
    description: "Major transatlantic commercial hub. Eliminate multi-train connections or cramped airport buses with private luxury door-to-terminal chauffeured travel.",
    terminal_info: "Serving modern Terminals A, B, and C with expedited passenger meet-and-greet and private limousine staging."
  },
  {
    code: "JFK",
    name: "John F. Kennedy International Airport",
    city: "Queens, New York, NY",
    description: "Premier international gateway. Executive long-distance and regional transfers tailored to corporate leaders, international diplomats, and private travelers.",
    terminal_info: "Coordinated limousine pickup outside Terminals 1, 4, 5, 7, and 8 with automated flight tracking."
  },
  {
    code: "LGA",
    name: "LaGuardia Airport",
    city: "Queens, New York, NY",
    description: "Serving Terminals A, B, and C with seamless domestic business travel connections between New York financial centers and Pennsylvania.",
    terminal_info: "Designated luxury vehicle staging garages with immediate chauffeur escort and luggage coordination."
  }
];

const airportFaqs = [
  {
    q: "How does Everest Executive Limo track incoming flights?",
    a: "When you provide your airline and flight number during quote confirmation, our dispatch system tracks your flight's progress. If your flight is delayed or lands early, your chauffeur's pickup schedule is automatically adjusted accordingly."
  },
  {
    q: "Where will my chauffeur meet me at the airport?",
    a: "We offer two convenient options: Inside Terminal Meet & Greet (your chauffeur waits at baggage claim holding an executive tablet with your name), or Curbside Pickup (your chauffeur stages nearby and pulls up to the designated luxury passenger pickup door as soon as you step outside)."
  },
  {
    q: "Is there a complimentary waiting period for airport arrivals?",
    a: "Yes. We provide a complimentary 45-minute grace period for domestic commercial flights and up to 60 minutes for international commercial arrivals to allow ample time for deplaning and baggage retrieval."
  },
  {
    q: "Do you service private aviation and FBO airfields?",
    a: "Yes, we regularly provide luxury chauffeured transfers directly to Signature Flight Support, Atlantic Aviation, and regional private FBO hangars across PA, NJ, NY, and Washington D.C."
  }
];

const AirportPage = () => {
  const [airportsList, setAirportsList] = useState(defaultAirports);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await getAirports();
        if (data && data.length > 0) {
          setAirportsList(data);
        }
      } catch (err) {
        // Keeps defaults
      }
    };
    fetchAirports();
  }, []);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div>
      <PageHero
        eyebrow="Aviation Ground Logistics"
        title="Direct Chauffeured Airport Transportation"
        subtitle="Experience seamless, stress-free terminal arrivals and executive departures connecting Pennsylvania, New York, New Jersey, and Washington D.C."
        breadcrumb={[{ name: "Airports" }]}
        backgroundImage="https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Airport Value Proposition */}
      <section className="py-20 md:py-24 bg-luxury-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="bg-luxury-surface border border-luxury-border p-6 sm:p-8 rounded-2xl shadow-luxury">
              <div className="w-10 h-10 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center text-luxury-gold mb-5">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-normal text-luxury-textPrimary mb-2">
                Flight Schedule Tracking
              </h3>
              <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
                Dispatch continuously tracks your flight status, ensuring your chauffeur is in position before you touch down, regardless of flight delays.
              </p>
            </div>

            <div className="bg-luxury-surface border border-luxury-border p-6 sm:p-8 rounded-2xl shadow-luxury">
              <div className="w-10 h-10 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center text-luxury-gold mb-5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-normal text-luxury-textPrimary mb-2">
                Terminal Meet & Greet
              </h3>
              <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
                Choose between inside baggage claim meet-and-greet with name boards or prompt curbside staging outside your terminal door.
              </p>
            </div>

            <div className="bg-luxury-surface border border-luxury-border p-6 sm:p-8 rounded-2xl shadow-luxury">
              <div className="w-10 h-10 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center text-luxury-gold mb-5">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-normal text-luxury-textPrimary mb-2">
                Baggage Assistance
              </h3>
              <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
                Full luggage handling from baggage claim to vehicle trunk, allowing you to relax immediately after long-haul flights.
              </p>
            </div>
          </div>

          {/* Confirmed Airports Section */}
          <SectionHeading
            eyebrow="Confirmed Major Hubs"
            title="Commercial & Regional Airports Serviced"
            subtitle="Reliable executive connections linking Central Pennsylvania directly to primary international and domestic hubs."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {airportsList.map((airport, index) => (
              <div
                key={index}
                className="bg-luxury-surface border border-luxury-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-luxury-gold/50 transition-all duration-300 shadow-luxury group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-3xl font-bold text-luxury-gold tracking-wider group-hover:text-luxury-goldHover transition-colors">
                      {airport.code}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded bg-luxury-card border border-luxury-border text-luxury-textSecondary">
                      Confirmed Hub
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-luxury-textPrimary mb-1">
                    {airport.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-xs text-luxury-gold/80 mb-4">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{airport.city}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed mb-4">
                    {airport.description}
                  </p>

                  <div className="bg-luxury-card/70 border border-luxury-border/60 rounded-xl p-3.5 text-xs text-luxury-textMuted mb-6">
                    <strong className="text-luxury-textPrimary block mb-1">Terminal Pickup Protocol:</strong>
                    {airport.terminal_info}
                  </div>
                </div>

                <Link to="/quote">
                  <Button size="sm" variant="primary" className="w-full justify-center text-xs tracking-wider uppercase font-semibold">
                    Request {airport.code} Transfer Quote
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Airport FAQs Section */}
          <div className="max-w-3xl mx-auto pt-10">
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-luxury-gold block mb-2">
                Airport Transfers FAQ
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-luxury-textPrimary">
                Frequently Asked Airport Travel Questions
              </h3>
            </div>

            <div className="space-y-3">
              {airportFaqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-luxury-surface border border-luxury-border rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-sm font-semibold text-luxury-textPrimary hover:text-luxury-gold transition-colors focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-luxury-gold shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-luxury-textSecondary shrink-0" />
                    )}
                  </button>

                  {openFaq === i && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-luxury-textSecondary leading-relaxed border-t border-luxury-border/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
};

export default AirportPage;
