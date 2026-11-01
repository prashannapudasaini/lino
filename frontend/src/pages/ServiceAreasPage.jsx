import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, CheckCircle2, ArrowRight, ShieldCheck, Plane } from 'lucide-react';
import PageHero from '../components/common/PageHero';

const regions = [
  {
    id: "pa",
    state: "Pennsylvania",
    status: "Primary Operations Base",
    cities: [
      "Harrisburg (State Capitol & Central PA Operations)",
      "Hershey (The Hotel Hershey & Medical Center)",
      "Lancaster (Historic Downtown & Commercial Corridors)",
      "York (Industrial & Executive Centers)",
      "Center City Philadelphia & Main Line (Wayne, Radnor, Villanova)",
      "Mechanicsburg, Camp Hill & Cumberland Valley"
    ],
    airports: ["MDT (Harrisburg)", "PHL (Philadelphia)"],
    description: "Our core operational territory and fleet staging headquarters. Serving corporate executives, government officials, healthcare leadership, and private travelers 24 hours a day, 7 days a week."
  },
  {
    id: "ny",
    state: "New York",
    status: "Confirmed Tri-State Region",
    cities: [
      "Manhattan (Midtown, Financial District, Hudson Yards)",
      "Brooklyn (DUMBO, Brooklyn Heights)",
      "Queens & Long Island Regional Access",
      "White Plains & Westchester Executive Parks"
    ],
    airports: ["JFK (John F. Kennedy)", "LGA (LaGuardia)"],
    description: "Scheduled point-to-point executive charters between Pennsylvania and New York City. Avoid crowded Amtrak cars or flight delays with private, quiet cabin transit."
  },
  {
    id: "nj",
    state: "New Jersey",
    status: "Confirmed Transit Corridor",
    cities: [
      "Princeton (University & Pharmaceutical Research Campuses)",
      "Newark & Jersey City Financial Waterfront",
      "Morristown, Summit & Somerset Corporate Corridors",
      "Cherry Hill & Mount Laurel Corporate Centers"
    ],
    airports: ["EWR (Newark Liberty)"],
    description: "Dedicated chauffeured transportation along the I-95 and New Jersey Turnpike corridors, connecting major life sciences campuses, financial offices, and Newark Airport."
  },
  {
    id: "dc",
    state: "Washington D.C.",
    status: "Confirmed Capital Region",
    cities: [
      "Downtown Washington D.C. (K Street, Penn Quarter)",
      "Capitol Hill & Federal Agency Headquarters",
      "Georgetown & Embassy Row",
      "Arlington & Alexandria, VA (Crystal City, Pentagon City)"
    ],
    airports: ["Direct Regional Connection to PA Hubs"],
    description: "Executive ground transit for trade delegations, corporate leadership, and state officials traveling between Central Pennsylvania and the nation's capital."
  }
];

const ServiceAreasPage = () => {
  const [selectedRegion, setSelectedRegion] = useState("pa");
  const activeRegion = regions.find((r) => r.id === selectedRegion) || regions[0];

  return (
    <div className="bg-luxury-bg text-white">
      {/* Hero */}
      <PageHero
        eyebrow="SERVICE COVERAGE"
        title="Wherever Your Journey Takes You."
        subtitle="Explore the locations and destinations served by Everest Executive Limo."
        breadcrumb={[{ name: "Service Areas" }]}
        backgroundImage="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2200&q=85"
      />

      {/* 1. Introduction */}
      <section className="py-20 md:py-24 bg-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
              REGIONAL EXCELLENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
              Focused Ground Coverage Across the Mid-Atlantic
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              We do not claim vague nationwide coverage. We concentrate our fleet, chauffeurs, and dispatch intelligence strictly across four confirmed, high-demand regional territories: Pennsylvania, New York, New Jersey, and Washington D.C.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Regional Explorer */}
      <section className="py-20 md:py-28 bg-[#151517] border-y border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Region Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12 sm:mb-16">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 focus:outline-none ${
                  selectedRegion === region.id
                    ? 'bg-luxury-gold text-luxury-bg shadow-luxury-gold'
                    : 'bg-luxury-card text-zinc-400 hover:text-white border border-luxury-border'
                }`}
              >
                {region.state}
              </button>
            ))}
          </div>

          {/* Active Region Detailed Layout */}
          <div className="bg-luxury-card border border-luxury-border rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Region Details */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="px-3.5 py-1 rounded-full bg-luxury-gold/15 border border-luxury-gold/30 text-[10px] uppercase tracking-wider text-luxury-gold font-semibold inline-block mb-3">
                    {activeRegion.status}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white">
                    {activeRegion.state}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                  {activeRegion.description}
                </p>

                {/* Airport Hub Connections */}
                <div className="p-4 rounded-xl bg-luxury-surface border border-luxury-border">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-luxury-gold mb-2">
                    <Plane className="w-4 h-4" />
                    <span>Connected Airport Gateways:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeRegion.airports.map((ap, apIdx) => (
                      <span
                        key={apIdx}
                        className="px-3 py-1 rounded-lg bg-black/50 border border-white/10 text-xs text-zinc-200"
                      >
                        {ap}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/book-now"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs uppercase tracking-wider hover:bg-luxury-goldHover transition-all shadow-luxury-gold"
                  >
                    <span>Request Travel in {activeRegion.state}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Confirmed Cities & Corridors */}
              <div className="lg:col-span-6 bg-luxury-surface border border-luxury-border rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white">
                  <MapPin className="w-4 h-4 text-luxury-gold" />
                  <span>Key Cities & Commercial Corridors</span>
                </div>

                <ul className="divide-y divide-white/5 space-y-3 pt-2">
                  {activeRegion.cities.map((city, cIdx) => (
                    <li key={cIdx} className="pt-3 flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                      <span>{city}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Location-Based Enquiry CTA */}
      <section className="py-20 md:py-28 bg-[#0B0B0C] text-center border-t border-luxury-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4 tracking-tight">
            Planning a Route Beyond Our Core Corridors?
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-8 font-normal">
            For specialized long-distance charters, multi-day roadshows, or interstate itineraries originating in our coverage zones, our executive dispatch desk will craft a customized itinerary.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book-now"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-luxury-goldHover transition-all shadow-luxury-gold hover:shadow-luxury-glow w-full sm:w-auto"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs sm:text-sm tracking-wider transition-all w-full sm:w-auto"
            >
              <span>Contact Dispatch</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceAreasPage;
