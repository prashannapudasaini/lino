import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, MapPin, Clock, ShieldCheck, ArrowRight, HelpCircle, ChevronDown, CheckCircle2, Car, Compass } from 'lucide-react';
import PageHero from '../components/common/PageHero';

const confirmedAirports = [
  {
    code: "MDT",
    city: "Harrisburg, PA",
    name: "Harrisburg International Airport",
    hubType: "Primary Regional Hub",
    serviceDetails: "Direct executive sedan and SUV service connecting Harrisburg, Hershey, Lancaster, York, and the State Capitol. Full FBO support for AvFlight and private arrivals.",
    pickupInfo: "Curbside staging or inside baggage claim meet-and-greet with executive digital name placard.",
    dropoffInfo: "Direct terminal drop-off right outside airline ticketing counters with immediate luggage unloading.",
    image: "/images/custom/service-airport.jpg"
  },
  {
    code: "PHL",
    city: "Philadelphia, PA",
    name: "Philadelphia International Airport",
    hubType: "Commercial & International Gateway",
    serviceDetails: "Serving Terminals A through F and Atlantic Aviation private FBO. Point-to-point non-stop transfers between Central PA, Philadelphia Center City, and South Jersey.",
    pickupInfo: "Baggage claim meet-and-greet or pre-arranged limousine lane pickup outside designated baggage claim zones.",
    dropoffInfo: "Expedited upper-level departures ramp drop-off adjacent to your carrier's check-in gates.",
    image: "/images/custom/airport-tarmac.jpg"
  },
  {
    code: "JFK",
    city: "Queens, New York",
    name: "John F. Kennedy International Airport",
    hubType: "Global International Hub",
    serviceDetails: "Interstate long-distance transfers connecting Pennsylvania directly to JFK's international terminals. Pre-arranged limousine permits for smooth staging.",
    pickupInfo: "Driver staged in commercial holding lot, dispatched to curbside pickup zone the moment you clear customs and retrieve luggage.",
    dropoffInfo: "Front-row terminal curbside departure drop-off tailored to your airline terminal (Terminals 1, 4, 5, 7, or 8).",
    image: "/images/custom/hero-jet-limo.jpg"
  },
  {
    code: "LGA",
    city: "Queens, New York",
    name: "LaGuardia Airport",
    hubType: "Domestic Business Gateway",
    serviceDetails: "Serving modernized Terminals A, B, and C. Quiet, stress-free road travel between New York financial centers and Pennsylvania corporate offices.",
    pickupInfo: "Terminal B and C dedicated limousine staging facilities with prompt meet-up coordination via SMS or phone.",
    dropoffInfo: "Direct drop-off at departure gates with driver baggage retrieval and curbside assistance.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85"
  },
  {
    code: "EWR",
    city: "Newark, New Jersey",
    name: "Newark Liberty International Airport",
    hubType: "Tri-State Transit Hub",
    serviceDetails: "Serving Terminals A, B, and C as well as Signature Flight Support FBO. Direct transit along the I-78 and I-95 corridors without train transfers.",
    pickupInfo: "Inside arrivals hall greeting or fast-track ground transportation curbside passenger pickup.",
    dropoffInfo: "Level 3 departure curbside positioning for rapid security access and luggage transfer.",
    image: "/images/custom/fleet-suv.jpg"
  },
  {
    code: "BWI",
    city: "Baltimore, MD",
    name: "Baltimore/Washington International",
    hubType: "Mid-Atlantic Regional Connection",
    serviceDetails: "Serving Central Pennsylvania travelers departing or arriving through BWI Thurgood Marshall Airport and Signature Flight Support.",
    pickupInfo: "Lower level baggage claim passenger loading zones with active flight coordination.",
    dropoffInfo: "Upper level departures roadway with swift unloading directly at ticketing.",
    image: "/images/custom/fleet-sedan.jpg"
  }
];

const faqs = [
  {
    q: "How does Everest Executive Limo monitor flight schedules?",
    a: "When you provide your airline and flight number during your quotation request, our dispatch team actively monitors your flight's published schedule using live radar tracking. If your flight arrives early or is delayed, your chauffeur's staging schedule is adjusted automatically."
  },
  {
    q: "Where will my chauffeur meet me at the airport?",
    a: "We offer two convenient arrangements: Inside Baggage Claim Meet & Greet (your chauffeur waits at your carousel holding a personalized executive name tablet) or Curbside Staging (your chauffeur is parked nearby and pulls up to your terminal door the moment you exit)."
  },
  {
    q: "Is there a complimentary waiting period for airport pickups?",
    a: "Yes. We include a complimentary 45-minute grace period for domestic commercial flights and up to 60 minutes for international commercial flights from touchdown time to allow ample time for deplaning and baggage claim."
  },
  {
    q: "Do you service private aviation FBOs?",
    a: "Yes. We frequently provide direct apron and hangar pickups at Signature Flight Support, Atlantic Aviation, AvFlight, and regional private aviation FBOs across PA, NY, NJ, and Washington D.C."
  }
];

const AirportPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="bg-[#0B0B0C] text-white">
      {/* 1. Hero */}
      <PageHero
        eyebrow="AIRPORT TRANSPORTATION"
        title="Airport Transfers, Elevated."
        subtitle="Enjoy a smooth, quiet, and dependable journey with professional executive ground transportation."
        breadcrumb={[{ name: "Airport Transportation" }]}
        backgroundImage="/images/custom/hero-jet-limo.jpg"
      />

      {/* 2. Introduction */}
      <section className="py-20 md:py-24 bg-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A46D]">
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

      {/* 3. Confirmed Airport Coverage & Cards */}
      <section className="py-20 md:py-28 bg-[#151517] border-y border-[#242428]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A46D] block mb-2">
                VERIFIED REGIONAL HUBS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
                Supported Airports & Terminals
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
              We provide scheduled private chauffeur service to all major international and domestic commercial airports across PA, NY, NJ, and DC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {confirmedAirports.map((airport, idx) => (
              <div
                key={idx}
                className="bg-[#1D1D20] border border-[#2A2A2E] rounded-3xl overflow-hidden flex flex-col justify-between hover:border-[#C5A46D]/50 transition-all duration-300 shadow-2xl group"
              >
                <div>
                  {/* Airport Card Image */}
                  <div className="relative h-44 w-full overflow-hidden bg-black/60">
                    <img
                      src={airport.image}
                      alt={airport.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D20] via-transparent to-transparent opacity-90" />
                    
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="font-mono text-xl font-bold px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-[#C5A46D]/40 text-[#C5A46D]">
                        {airport.code}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider text-zinc-300">
                        {airport.hubType}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-white group-hover:text-[#C5A46D] transition-colors leading-snug">
                        {airport.name}
                      </h3>
                      <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
                        <span>{airport.city}</span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                      {airport.serviceDetails}
                    </p>

                    {/* Explicit Pickup & Dropoff Information */}
                    <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs">
                      <div className="bg-[#151517] p-3 rounded-xl border border-white/5 space-y-1">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C5A46D] block">
                          Arrival Pickup Procedure:
                        </span>
                        <p className="text-zinc-300 text-[11px] leading-relaxed">
                          {airport.pickupInfo}
                        </p>
                      </div>

                      <div className="bg-[#151517] p-3 rounded-xl border border-white/5 space-y-1">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-300 block">
                          Departure Drop-Off:
                        </span>
                        <p className="text-zinc-400 text-[11px] leading-relaxed">
                          {airport.dropoffInfo}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Request Button */}
                <div className="p-6 sm:p-7 pt-0">
                  <Link
                    to={`/book-now?service=Airport%20Transportation&airport=${airport.code}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#C5A46D] text-[#0B0B0C] font-semibold text-xs uppercase tracking-wider hover:bg-[#D5B982] transition-colors shadow-luxury-gold"
                  >
                    <span>Request Airport Transportation ({airport.code})</span>
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
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#242428] group">
                <img
                  src="/images/custom/service-airport.jpg"
                  alt="Airport terminal pickup experience"
                  className="w-full h-[440px] sm:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A46D] block">
                SEAMLESS TRANSITIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-[1.15]">
                The Airport Meet & Greet Experience
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                Whether arriving on a late transatlantic flight or catching an early morning departure, our team coordinates with terminal authorities and private FBO concierges for effortless passage.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#151517] border border-[#242428]">
                  <div className="w-9 h-9 rounded-lg bg-[#1D1D20] border border-[#C5A46D]/30 flex items-center justify-center text-[#C5A46D] shrink-0">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Departure Drop-Offs</h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Curbside luggage unloading right outside your specific airline ticketing door.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#151517] border border-[#242428]">
                  <div className="w-9 h-9 rounded-lg bg-[#1D1D20] border border-[#C5A46D]/30 flex items-center justify-center text-[#C5A46D] shrink-0">
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
      <section className="py-20 md:py-28 bg-[#151517] border-t border-[#242428]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A46D] block mb-2">
              HELPFUL INFORMATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
              Airport Transportation FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#1D1D20] border border-[#2A2A2E] rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif text-lg font-medium text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C5A46D] transition-transform duration-300 shrink-0 ${
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
      <section className="py-20 md:py-28 bg-[#0B0B0C] text-center border-t border-[#242428]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4 tracking-tight">
            Reserve Your Airport Transfer
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-8 font-normal">
            Submit your flight details to receive a customized quotation from our executive operations team.
          </p>
          <Link
            to="/book-now?service=Airport%20Transportation"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C5A46D] text-[#0B0B0C] font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#D5B982] transition-all shadow-luxury-gold hover:shadow-luxury-glow"
          >
            <span>Book Airport Transportation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AirportPage;
