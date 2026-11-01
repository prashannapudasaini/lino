import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, ArrowRight, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';

const serviceRegions = [
  {
    id: 'pa',
    name: 'Pennsylvania (Primary Hub)',
    highlight: 'Harrisburg & Philadelphia',
    desc: 'Our operational headquarters and fleet base. Full daily coverage across Central Pennsylvania, Capitol Hill, Hershey Medical Center, Lancaster, York, and Greater Philadelphia.',
    cities: ['Harrisburg', 'Philadelphia', 'Hershey', 'Lancaster', 'York', 'Mechanicsburg', 'Carlisle', 'King of Prussia']
  },
  {
    id: 'ny',
    name: 'New York City & Metro',
    highlight: 'Manhattan & Tri-State',
    desc: 'Direct chauffeured transit connecting Pennsylvania to Manhattan financial districts, corporate headquarters, JFK, LGA, and Westchester.',
    cities: ['Manhattan (Midtown & Financial)', 'Brooklyn', 'Queens', 'Long Island', 'White Plains']
  },
  {
    id: 'nj',
    name: 'New Jersey Corridor',
    highlight: 'Newark & Princeton Corridor',
    desc: 'Serving corporate pharmaceutical and tech corridors across Princeton, Newark Liberty International, Jersey City, and Cherry Hill.',
    cities: ['Princeton', 'Newark', 'Jersey City', 'Hoboken', 'Cherry Hill', 'Trenton', 'Morristown']
  },
  {
    id: 'dc',
    name: 'Washington D.C. Region',
    highlight: 'Capital District & Northern VA',
    desc: 'Executive mobility for government affairs, embassies, legal firms, and corporate delegations traveling between PA and D.C.',
    cities: ['Downtown Washington D.C.', 'Capitol Hill', 'Georgetown', 'Arlington, VA', 'Bethesda, MD']
  }
];

const ServiceAreasMap = () => {
  const [activeTab, setActiveTab] = useState('pa');
  const activeRegion = serviceRegions.find(r => r.id === activeTab) || serviceRegions[0];

  return (
    <section className="py-20 md:py-28 bg-luxury-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Regional Service Coverage"
          title="Connecting Key East Coast Corridors"
          subtitle="Everest Executive Limo operates seamlessly throughout Pennsylvania, New York, New Jersey, and Washington D.C."
          align="center"
        />

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {serviceRegions.map((region) => (
            <button
              key={region.id}
              onClick={() => setActiveTab(region.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all min-h-[44px] ${
                activeTab === region.id
                  ? 'bg-luxury-gold text-luxury-bg shadow-luxury-gold font-bold'
                  : 'bg-luxury-surface border border-luxury-border text-luxury-textSecondary hover:text-luxury-textPrimary hover:border-luxury-gold/40'
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>

        {/* Region Card Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-luxury-surface border border-luxury-border rounded-2xl p-6 sm:p-10 shadow-luxury">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-luxury-gold font-semibold">
              <Navigation className="w-4 h-4" />
              <span>{activeRegion.highlight}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-luxury-textPrimary">
              {activeRegion.name}
            </h3>

            <p className="text-sm text-luxury-textSecondary leading-relaxed">
              {activeRegion.desc}
            </p>

            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-luxury-textPrimary mb-3">
                Key Towns, Business Centers & Corridors:
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeRegion.cities.map((city, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-luxury-card border border-luxury-border text-xs text-luxury-textPrimary"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-luxury-gold" />
                    <span>{city}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link to="/quote">
                <Button size="md" variant="primary" className="text-xs uppercase tracking-wider font-bold">
                  Request a Ride in This Region <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Button>
              </Link>
              <Link to="/service-areas">
                <Button size="md" variant="secondary" className="text-xs uppercase tracking-wider">
                  View Full Coverage Map
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual Graphic / Route Matrix */}
          <div className="lg:col-span-5 bg-luxury-card border border-luxury-border rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-full blur-2xl pointer-events-none" />
            
            <span className="text-[10px] uppercase tracking-widest font-semibold text-luxury-gold block mb-3">
              Corridor Hub Specifications
            </span>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-lg bg-luxury-bg/70 border border-luxury-border/80">
                <span className="text-luxury-textMuted block text-[10px] uppercase">Direct Dispatch Hub</span>
                <span className="font-semibold text-luxury-textPrimary">Harrisburg, PA (Central Dispatch)</span>
              </div>
              <div className="p-3 rounded-lg bg-luxury-bg/70 border border-luxury-border/80">
                <span className="text-luxury-textMuted block text-[10px] uppercase">Service Type Available</span>
                <span className="font-semibold text-luxury-textPrimary">Point-to-Point, Hourly & Airport Transfers</span>
              </div>
              <div className="p-3 rounded-lg bg-luxury-bg/70 border border-luxury-border/80">
                <span className="text-luxury-textMuted block text-[10px] uppercase">Fleet Availability</span>
                <span className="font-semibold text-luxury-textPrimary">Executive Sedans, SUVs, Sprinters & Limos</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-luxury-border/60 text-[11px] text-luxury-textSecondary">
              Need service to an unlisted municipality in PA, NY, NJ, or DC? Simply note your address in our quote form and our dispatch will review it promptly.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasMap;

