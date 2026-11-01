import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, Check, ArrowRight, ShieldCheck, Wifi, Sparkles } from 'lucide-react';
import PageHero from '../components/common/PageHero';

const fleetData = [
  {
    id: "sedan",
    name: "Executive Luxury Sedan",
    subtitle: "Mercedes-Benz S-Class / Cadillac CT6",
    category: "Sedan",
    passengers: 3,
    luggage: 3,
    image: "/images/custom/fleet-sedan.jpg",
    interiorImage: "/images/custom/why-passenger.jpg",
    description: "The gold standard of executive mobility. Engineered for corporate executives, solo travelers, and couples who require acoustic quietness, handcrafted leather seating, and seamless mobile connectivity for work or rest.",
    features: [
      "Acoustic noise-insulated double glazing",
      "Handcrafted Nappa leather reclining seating",
      "Individual dual-zone rear climate controls",
      "Complimentary high-speed in-cabin Wi-Fi",
      "Fast USB-C and 110V laptop power ports",
      "Chilled bottled spring water & executive amenities"
    ]
  },
  {
    id: "suv",
    name: "Executive Luxury SUV",
    subtitle: "Cadillac Escalade ESV / Lincoln Navigator L",
    category: "SUV",
    passengers: 6,
    luggage: 6,
    image: "/images/custom/fleet-suv.jpg",
    interiorImage: "/images/custom/service-events.jpg",
    description: "Commanding road authority and opulent first-class comfort. Boasting an extended wheelbase for massive luggage capacity, captain recliners, and panoramic visibility for corporate delegations and airport transfers.",
    features: [
      "Extended wheelbase with maximum luggage capacity",
      "Second-row heated & ventilated captain chairs",
      "Panoramic glass roof with power privacy blinds",
      "Intelligent all-wheel drive for all-weather traction",
      "Bespoke multi-color ambient interior illumination",
      "Ample space for 6 standard suitcases & carry-ons"
    ]
  },
  {
    id: "sprinter",
    name: "Mercedes Executive Sprinter",
    subtitle: "Custom Executive Jet-Class Cabin",
    category: "Executive Van",
    passengers: 14,
    luggage: 12,
    image: "/images/custom/service-chauffeur.jpg",
    interiorImage: "/images/custom/why-passenger.jpg",
    description: "A private jet cabin on wheels. Tailored for corporate board roadshows, executive delegations, and discerning group itineraries requiring full standing height, worktables, and unmatched luxury.",
    features: [
      "Full 6'4\" standing headroom cabin",
      "Hand-stitched leather captain recliners",
      "Retractable executive worktables for laptops",
      "43-inch 4K Smart Media Monitor with HDMI presentation",
      "Substantial dedicated rear luggage hold",
      "Full privacy partition & enhanced acoustic isolation"
    ]
  },
  {
    id: "limo",
    name: "Executive Stretch Limousine",
    subtitle: "Lincoln Presidential Stretch",
    category: "Limousine",
    passengers: 8,
    luggage: 6,
    image: "/images/custom/hero-jet-limo.jpg",
    interiorImage: "/images/custom/service-events.jpg",
    description: "Timeless elegance and celebratory prestige. Tailored for milestone galas, black-tie celebrations, weddings, and high-profile VIP arrivals where an unforgettable entrance is paramount.",
    features: [
      "Custom J-lounge seating in fine stitched leather",
      "Chilled glassware console & executive beverage bar",
      "Fiber-optic starlight ceiling with ambient dimming",
      "Premium Bluetooth surround acoustic sound system",
      "Deep tinted security glass for complete passenger privacy",
      "Full chauffeur privacy partition"
    ]
  }
];

const FleetPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredFleet = activeFilter === "All"
    ? fleetData
    : fleetData.filter(v => v.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div className="bg-luxury-bg text-white">
      {/* Hero */}
      <PageHero
        eyebrow="OUR FLEET"
        title="Travel in a Class of Its Own."
        subtitle="Discover the comfort and elegance of our executive transportation fleet."
        breadcrumb={[{ name: "Our Fleet" }]}
        backgroundImage="/images/custom/fleet-escalade-front.jpg"
      />

      {/* Fleet Introduction & Filter */}
      <section className="py-16 md:py-20 bg-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-luxury-border">
            <div className="max-w-xl">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold block mb-2">
                LUXURY AUTOMOTIVE SHOWCASE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
                Curated Executive Vehicles
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {["All", "Sedan", "SUV", "Executive Van", "Limousine"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all focus:outline-none ${
                    activeFilter === cat
                      ? 'bg-luxury-gold text-luxury-bg shadow-luxury-gold'
                      : 'bg-luxury-surface text-zinc-400 hover:text-white border border-luxury-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Editorial Vehicle Showcases */}
      <div className="py-12 md:py-20 space-y-24 md:space-y-32">
        {filteredFleet.map((vehicle, index) => {
          const isEven = index % 2 === 0;
          return (
            <section key={vehicle.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-luxury-card border border-luxury-border rounded-3xl overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  {/* Vehicle Hero Photography */}
                  <div className={`lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover object-center filter brightness-95"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:hidden" />
                    <div className="absolute top-6 left-6">
                      <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider font-semibold text-luxury-gold">
                        {vehicle.category}
                      </span>
                    </div>
                  </div>

                  {/* Specifications & Editorial Content */}
                  <div className={`lg:col-span-5 p-8 sm:p-10 md:p-12 flex flex-col justify-between ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white">
                          {vehicle.name}
                        </h3>
                        <p className="text-xs text-luxury-gold font-medium mt-1">
                          {vehicle.subtitle}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                        {vehicle.description}
                      </p>

                      {/* Passenger & Luggage Specs */}
                      <div className="flex items-center gap-6 py-4 border-y border-white/10 text-xs text-zinc-300">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-luxury-gold" />
                          <span><strong>{vehicle.passengers}</strong> Passengers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-luxury-gold" />
                          <span><strong>{vehicle.luggage}</strong> Luggage</span>
                        </div>
                      </div>

                      {/* Interior Features */}
                      <div className="space-y-2">
                        <h4 className="text-[11px] uppercase tracking-wider font-semibold text-luxury-gold">
                          In-Cabin Amenities:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                          {vehicle.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-luxury-gold shrink-0 mt-0.5" />
                              <span className="leading-tight">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-8">
                      <Link
                        to="/book-now"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs uppercase tracking-wider hover:bg-luxury-goldHover transition-all shadow-luxury-gold"
                      >
                        <span>Request This Vehicle</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <section className="py-20 md:py-28 bg-[#0B0B0C] border-t border-luxury-border text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4 tracking-tight">
            Have a Specific Vehicle Requirement?
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-8 font-normal">
            For specialized delegation motorcades or multiple vehicles, our dispatch team will tailor an arrangement for your exact group size.
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

export default FleetPage;
