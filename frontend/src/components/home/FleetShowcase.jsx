import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, ArrowRight } from 'lucide-react';

const featuredVehicles = [
  {
    name: "Executive Sedan",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    passengers: 3,
    bags: 3,
    href: "/fleet"
  },
  {
    name: "Luxury SUV",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    passengers: 6,
    bags: 6,
    href: "/fleet"
  }
];

const FleetShowcase = () => {
  return (
    <section className="py-20 md:py-24 bg-[#0B0B0C] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Dramatic Front Grille Photo & Editorial Text */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden bg-[#151517] border border-white/10 min-h-[420px] flex flex-col justify-end p-8 sm:p-10 shadow-2xl">
            {/* Background Cadillac Escalade Grille Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85"
                alt="Cadillac Escalade Luxury SUV Grille"
                className="w-full h-full object-cover object-left-top filter brightness-[0.45] contrast-[1.2]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0B0B0C]/40 to-[#0B0B0C]" />
            </div>

            {/* Overlaid Editorial Content */}
            <div className="relative z-10 max-w-md space-y-4">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-luxury-gold block">
                OUR FLEET
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.1]">
                Travel in a Class of Its Own
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                Our fleet of premium vehicles offers the perfect combination of luxury, comfort, and reliability. Choose the vehicle that fits your journey.
              </p>

              <div className="pt-2">
                <Link
                  to="/fleet"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs uppercase tracking-wider hover:bg-luxury-goldHover transition-all shadow-luxury-gold active:scale-95"
                >
                  <span>Explore Our Fleet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Two Featured Vehicle Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {featuredVehicles.map((vehicle, idx) => (
              <div
                key={idx}
                className="bg-[#151517] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-luxury-gold/50 transition-all duration-300"
              >
                {/* Vehicle Studio Photography */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-black/60 flex items-center justify-center p-4">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-lg filter brightness-95"
                  />
                </div>

                {/* Card Bottom: Title, Capacities, and Arrow */}
                <div className="p-5 flex items-center justify-between gap-3 border-t border-white/5 bg-[#121214]">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-white group-hover:text-luxury-gold transition-colors">
                      {vehicle.name}
                    </h3>

                    <div className="flex items-center gap-3 text-[11px] text-zinc-400 mt-1">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-luxury-gold" />
                        <span>{vehicle.passengers} Passengers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-luxury-gold" />
                        <span>{vehicle.bags} Bags</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/quote"
                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-zinc-300 group-hover:bg-luxury-gold group-hover:text-luxury-bg group-hover:border-luxury-gold transition-all shrink-0"
                    title="Select Vehicle"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Full Fleet Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/fleet"
            className="inline-flex items-center justify-center gap-1.5 w-full py-3 rounded-full border border-white/20 text-xs uppercase tracking-wider text-white font-semibold"
          >
            <span>View Full Fleet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FleetShowcase;
