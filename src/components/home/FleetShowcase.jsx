import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, ArrowRight, Sparkles } from 'lucide-react';

const fleetCards = [
  {
    id: 'sedan',
    name: 'Executive Sedan',
    exteriorImage: '/images/custom/fleet-sedan.jpg',
    cabinImage: '/images/custom/why-passenger.jpg',
    cabinFeature: 'First-Class Nappa Leather Recliners • Acoustic Isolation',
    passengers: 3,
    luggage: 3,
    link: '/fleet'
  },
  {
    id: 'suv',
    name: 'Luxury SUV',
    exteriorImage: '/images/custom/fleet-suv.jpg',
    cabinImage: '/images/custom/service-events.jpg',
    cabinFeature: 'VIP Executive Staging • Extended Wheelbase Legroom',
    passengers: 6,
    luggage: 6,
    link: '/fleet'
  }
];

const FleetShowcase = () => {
  const [activeViews, setActiveViews] = useState({
    sedan: 'exterior',
    suv: 'exterior'
  });

  const toggleView = (id, mode, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveViews((prev) => ({ ...prev, [id]: mode }));
  };

  return (
    <section className="py-20 md:py-28 bg-[#0B0B0C] text-white relative overflow-hidden border-t border-[#1E1E22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Dramatic Escalade Front + Text Block */}
          <div className="lg:col-span-6 relative flex flex-col justify-between">
            {/* Escalade Front Image */}
            <div className="relative rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-2xl bg-black group">
              <img
                src="/images/custom/fleet-escalade-front.jpg"
                alt="Cadillac Escalade Executive Grille and LED Headlights"
                className="w-full h-64 sm:h-80 object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent opacity-80" />
            </div>

            {/* Editorial Copy */}
            <div className="space-y-4">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A46D] block">
                OUR FLEET
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.12]">
                Travel in a Class<br />
                of Its Own
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg font-normal">
                Our fleet of premium vehicles offers the perfect combination of luxury, comfort, and reliability. Choose the vehicle that fits your journey.
              </p>

              <div className="pt-2">
                <Link
                  to="/fleet"
                  className="relative overflow-hidden group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C5A46D] hover:bg-[#D5B982] text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-luxury-gold hover:shadow-luxury-glow active:scale-95"
                >
                  <span className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-shimmer pointer-events-none" />
                  <span className="relative z-10">Explore Our Fleet</span>
                  <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Vehicle Cards with Exterior/Cabin Interactive Switcher */}
          <div className="lg:col-span-6 space-y-6">
            {fleetCards.map((car) => {
              const currentMode = activeViews[car.id];
              const currentImg = currentMode === 'cabin' ? car.cabinImage : car.exteriorImage;

              return (
                <Link
                  key={car.id}
                  to={car.link}
                  className="group block bg-[#151517] border border-[#242428] hover:border-[#C5A46D]/60 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1 relative"
                >
                  {/* Vehicle Image Container */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-black/70">
                    <img
                      key={currentImg}
                      src={currentImg}
                      alt={`${car.name} ${currentMode}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 animate-fadeIn"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151517] via-transparent to-transparent opacity-85" />

                    {/* Interactive View Pill Toggle: [Exterior | Executive Cabin] */}
                    <div className="absolute top-4 right-4 z-20 flex items-center bg-black/80 backdrop-blur-md rounded-full p-0.5 border border-white/20 shadow-xl">
                      <button
                        type="button"
                        onClick={(e) => toggleView(car.id, 'exterior', e)}
                        className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-all ${
                          currentMode === 'exterior'
                            ? 'bg-[#C5A46D] text-[#0B0B0C] shadow-sm'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Exterior
                      </button>
                      <button
                        type="button"
                        onClick={(e) => toggleView(car.id, 'cabin', e)}
                        className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-all ${
                          currentMode === 'cabin'
                            ? 'bg-[#C5A46D] text-[#0B0B0C] shadow-sm'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Cabin
                      </button>
                    </div>

                    {/* Cabin Feature Badge if in Cabin Mode */}
                    {currentMode === 'cabin' && (
                      <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A46D]/40 text-[10px] text-[#C5A46D] flex items-center gap-1.5 font-medium animate-fadeIn">
                        <Sparkles className="w-3 h-3 text-[#C5A46D]" />
                        <span>{car.cabinFeature}</span>
                      </div>
                    )}
                  </div>

                  {/* Vehicle Meta Bar */}
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-white group-hover:text-[#C5A46D] transition-colors">
                        {car.name}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-zinc-400 mt-1.5">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#C5A46D]" />
                          <span>{car.passengers} Passengers</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-[#C5A46D]" />
                          <span>{car.luggage} Bags</span>
                        </span>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:border-[#C5A46D] group-hover:bg-[#C5A46D] group-hover:text-[#0B0B0C] transition-all">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Mobile View CTA button */}
            <div className="block lg:hidden pt-2 text-center">
              <Link
                to="/fleet"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-xs font-semibold uppercase tracking-wider hover:border-[#C5A46D] hover:text-[#C5A46D] transition-colors"
              >
                <span>View Full Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetShowcase;
