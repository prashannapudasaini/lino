import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, CheckCircle2, ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import CtaBanner from '../components/home/CtaBanner';
import { getServiceAreas } from '../services/api';

const defaultAreas = [
  {
    name: "Central Pennsylvania & Capital Region",
    state: "Pennsylvania",
    region: "Primary Hub",
    description: "Our operational foundation and primary fleet staging area. We provide round-the-clock executive transfers across Harrisburg, Hershey Medical Center, Lancaster County, York, and Cumberland County.",
    cities: [
      "Harrisburg (State Capitol & Business District)",
      "Hershey (The Hershey Hotel, Milton S. Hershey Medical Center)",
      "Lancaster (Historic Downtown & Commercial Centers)",
      "York (Industrial & Executive Corridors)",
      "Mechanicsburg & Camp Hill",
      "Carlisle & Enola",
      "Lebanon & Surrounding Municipalities"
    ]
  },
  {
    name: "Greater Philadelphia & The Main Line",
    state: "Pennsylvania",
    region: "Delaware Valley",
    description: "Daily chauffeured connectivity between Center City Philadelphia corporate suites, prestigious Main Line residences, King of Prussia business corridors, and Philadelphia International Airport (PHL).",
    cities: [
      "Center City Philadelphia (Financial & Historic Districts)",
      "King of Prussia & Valley Forge Corporate Centers",
      "The Main Line (Wayne, Bryn Mawr, Villanova, Radnor)",
      "Conshohocken & Plymouth Meeting",
      "Chesterbrook & Malvern Corporate Parks",
      "Bucks County & Montgomery County"
    ]
  },
  {
    name: "New York City & Tri-State Corridor",
    state: "New York",
    region: "Tri-State Metro",
    description: "Direct long-distance luxury transport connecting Central Pennsylvania to Midtown Manhattan luxury hotels, Wall Street financial headquarters, Brooklyn, and New York airports (JFK and LGA).",
    cities: [
      "Manhattan (Midtown, Financial District, Hudson Yards)",
      "Brooklyn & Queens Executive Terminals",
      "Long Island & Hamptons Transit",
      "White Plains & Westchester County Corporate Hubs"
    ]
  },
  {
    name: "New Jersey Corridor",
    state: "New Jersey",
    region: "Garden State",
    description: "Serving key corporate corridors along the New Jersey Turnpike and I-95, connecting major pharmaceutical campuses, Princeton University, Newark Liberty Airport (EWR), and waterfront corporate centers.",
    cities: [
      "Princeton (University & Corporate Research Centers)",
      "Newark & Newark Liberty International (EWR)",
      "Jersey City & Hoboken Financial Centers",
      "Cherry Hill & Mount Laurel",
      "Trenton (State Offices)",
      "Morristown & Somerset Business Corridors"
    ]
  },
  {
    name: "Washington D.C. & Capital Region",
    state: "District of Columbia",
    region: "Mid-Atlantic",
    description: "Dedicated executive mobility for government contractors, trade delegations, visiting dignitaries, and legal conferences traveling between Pennsylvania and the nation's capital.",
    cities: [
      "Downtown Washington D.C. & K Street",
      "Capitol Hill & Congressional Offices",
      "Georgetown & Embassy Row",
      "Arlington, VA (Crystal City, Pentagon City)",
      "Bethesda & Silver Spring, MD"
    ]
  }
];

const ServiceAreasPage = () => {
  const [areasList, setAreasList] = useState(defaultAreas);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const data = await getServiceAreas();
        if (data && data.length > 0) {
          const parsed = data.map(item => ({
            ...item,
            cities: typeof item.key_cities_json === 'string' ? JSON.parse(item.key_cities_json || '[]') : []
          }));
          setAreasList(parsed);
        }
      } catch (err) {
        // Keeps defaults
      }
    };
    fetchAreas();
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Coverage Directory"
        title="Regional Service Areas & Travel Corridors"
        subtitle="Serving Pennsylvania, New York, New Jersey, and Washington D.C. with dependable executive chauffeur and limousine transportation."
        breadcrumb={[{ name: "Service Areas" }]}
        backgroundImage="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Coverage Overview */}
      <section className="py-20 md:py-28 bg-luxury-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Confirmed Geographic Coverage"
            title="Strategic Regional Transportation Hubs"
            subtitle="Explore our verified primary service areas and cities. We specialize in point-to-point intercity travel, executive roadshows, and airport connections."
            align="center"
          />

          <div className="space-y-12">
            {areasList.map((area, index) => (
              <div
                key={index}
                className="bg-luxury-surface border border-luxury-border rounded-2xl p-6 sm:p-10 shadow-luxury hover:border-luxury-gold/40 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Info */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-luxury-gold font-semibold">
                      <Navigation className="w-4 h-4" />
                      <span>{area.region || area.state}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-luxury-textPrimary">
                      {area.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
                      {area.description}
                    </p>

                    <div className="pt-2">
                      <Link to="/quote">
                        <Button size="sm" variant="primary" className="text-xs uppercase tracking-wider font-bold">
                          Request Ride in {area.state} <ArrowRight className="w-3.5 h-3.5 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Right Cities List */}
                  <div className="lg:col-span-7 bg-luxury-card/70 border border-luxury-border/60 rounded-xl p-5 sm:p-6">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-luxury-textPrimary mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-luxury-gold" />
                      Key Service Municipalities & Destinations:
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {area.cities && area.cities.map((city, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center gap-2 p-2 rounded-lg bg-luxury-surface border border-luxury-border text-xs text-luxury-textPrimary"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                          <span>{city}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-luxury-border/50 text-[11px] text-luxury-textMuted flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                      <span>Custom regional itineraries and multi-city stops available upon request.</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Unlisted Area Note */}
          <div className="mt-16 bg-gradient-to-r from-luxury-surface via-luxury-card to-luxury-surface border border-luxury-border rounded-xl p-6 sm:p-8 text-center max-w-3xl mx-auto shadow-luxury">
            <h4 className="font-serif text-xl text-luxury-textPrimary mb-2">
              Traveling to a Location Outside Our Primary Hubs?
            </h4>
            <p className="text-xs sm:text-sm text-luxury-textSecondary mb-6 leading-relaxed">
              We frequently accommodate long-distance interstate transfers and executive travel throughout neighboring Mid-Atlantic corridors. Submit your pickup and drop-off addresses for a custom quote.
            </p>
            <Link to="/quote">
              <Button size="md" variant="secondary" className="text-xs uppercase tracking-wider">
                Submit Custom Itinerary Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
};

export default ServiceAreasPage;
