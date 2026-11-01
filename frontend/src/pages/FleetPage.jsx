import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, Check, ArrowRight, ShieldCheck, Sparkles, Wifi } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import CtaBanner from '../components/home/CtaBanner';
import { getFleet } from '../services/api';

const defaultFleetData = [
  {
    id: 1,
    name: "Executive Luxury Sedan",
    category: "Sedan",
    subtitle: "Mercedes-Benz S-Class / Cadillac CT6",
    passenger_capacity: 3,
    luggage_capacity: 3,
    image_url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    description: "The gold standard of executive mobility. Engineered for business leaders, solo executives, and couples who require acoustic quietness, handcrafted leather seating, and seamless mobile connectivity.",
    features: [
      "Complimentary High-Speed Wi-Fi",
      "Handcrafted Nappa Leather Recliners",
      "Individual Rear Dual-Zone Climate Controls",
      "Acoustic Noise-Insulated Double Glazing",
      "Mobile Device Fast-Charging Ports & USB-C",
      "Chilled Bottled Spring Water & Press"
    ],
    hourly_rate_estimate: "Starting from $95/hr"
  },
  {
    id: 2,
    name: "Executive Luxury SUV",
    category: "SUV",
    subtitle: "Cadillac Escalade ESV / Lincoln Navigator L",
    passenger_capacity: 6,
    luggage_capacity: 6,
    image_url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    description: "Commanding road authority and opulent first-class comfort. Boasts extended wheelbase luggage capacity, captain recliners, and panoramic visibility for corporate delegations and family airport transfers.",
    features: [
      "Extended Wheelbase with Superior Luggage Capacity",
      "Heated & Ventilated Second-Row Captain Chairs",
      "Panoramic Sunroof with Power Privacy Shades",
      "All-Wheel Drive Traction for All Weather Conditions",
      "Bespoke Interior Ambient LED Lighting",
      "Ample Space for 6 Standard Suitcases & Carry-ons"
    ],
    hourly_rate_estimate: "Starting from $120/hr"
  },
  {
    id: 3,
    name: "Mercedes-Benz Executive Sprinter",
    category: "Van",
    subtitle: "Executive Jet Class Custom Sprinter",
    passenger_capacity: 14,
    luggage_capacity: 12,
    image_url: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
    description: "A private jet cabin on wheels. Tailored for corporate executive delegations, board roadshows, and discerning group itineraries requiring full standing height, worktables, and unmatched luxury.",
    features: [
      "Full 6'4\" Standing Headroom Cabin",
      "Custom Hand-Stitched Leather Captain Recliners",
      "Retractable Executive Worktables for Laptops",
      "43-inch 4K Smart Media Monitor with HDMI Input",
      "Substantial Dedicated Rear Luggage Compartment",
      "Privacy Partition & Enhanced Acoustic Insulation"
    ],
    hourly_rate_estimate: "Starting from $165/hr"
  },
  {
    id: 4,
    name: "Executive Stretch Limousine",
    category: "Limousine",
    subtitle: "Lincoln MKT Presidential Stretch",
    passenger_capacity: 8,
    luggage_capacity: 6,
    image_url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    description: "Timeless elegance and celebratory prestige. Designed for milestone galas, black-tie occasions, weddings, and VIP arrivals where making a grand impression is essential.",
    features: [
      "Custom J-Seating in Hand-Stitched Fine Leather",
      "Integrated Bar & Chilled Glassware Console",
      "Fiber-Optic Starlight Ceiling & Ambient Dimming",
      "Premium Bluetooth Surround Audio System",
      "Full Driver Privacy Partition",
      "Deep Tinted Security Glass for Total Discretion"
    ],
    hourly_rate_estimate: "Starting from $145/hr"
  }
];

const FleetPage = () => {
  const [vehicles, setVehicles] = useState(defaultFleetData);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const data = await getFleet();
        if (data && data.length > 0) {
          const formatted = data.map(v => ({
            ...v,
            features: typeof v.features_json === 'string' ? JSON.parse(v.features_json || '[]') : []
          }));
          setVehicles(formatted);
        }
      } catch (err) {
        // Keeps defaults
      }
    };
    fetchFleet();
  }, []);

  const categories = ["All", "Sedan", "SUV", "Van", "Limousine"];
  const filteredVehicles = selectedCategory === "All"
    ? vehicles
    : vehicles.filter(v => v.category === selectedCategory);

  return (
    <div>
      <PageHero
        eyebrow="The Everest Collection"
        title="Our Curated Executive Luxury Fleet"
        subtitle="Meticulously maintained, certified, and appointed with premium amenities to ensure absolute serenity on every journey."
        breadcrumb={[{ name: "Our Fleet" }]}
        backgroundImage="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Fleet Filter Bar */}
      <section className="py-12 bg-luxury-surface border-b border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs uppercase tracking-widest text-luxury-gold font-semibold">
              Filter by Vehicle Category:
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all min-h-[44px] ${
                    selectedCategory === cat
                      ? 'bg-luxury-gold text-luxury-bg shadow-luxury-gold font-bold'
                      : 'bg-luxury-card border border-luxury-border text-luxury-textSecondary hover:text-luxury-textPrimary hover:border-luxury-gold/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Editorial Presentations */}
      <section className="py-20 md:py-28 bg-luxury-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
          {filteredVehicles.map((vehicle, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={vehicle.id || idx}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Vehicle Photography */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative rounded-2xl overflow-hidden border border-luxury-border shadow-2xl group bg-luxury-surface">
                    <img
                      src={vehicle.image_url}
                      alt={vehicle.name}
                      className="w-full h-80 sm:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg/80 via-transparent to-transparent" />
                    
                    <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-luxury-bg/85 backdrop-blur-md border border-luxury-border text-xs font-semibold tracking-wider uppercase text-luxury-gold">
                      {vehicle.category} Class
                    </span>
                  </div>
                </div>

                {/* Vehicle Specifications */}
                <div className={`lg:col-span-5 space-y-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-luxury-gold font-semibold block mb-1">
                      {vehicle.subtitle}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-luxury-textPrimary">
                      {vehicle.name}
                    </h2>
                  </div>

                  <p className="text-sm text-luxury-textSecondary leading-relaxed">
                    {vehicle.description}
                  </p>

                  {/* Capacities Pill Bar */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-luxury-surface border border-luxury-border text-xs">
                    <div className="flex items-center gap-2 text-luxury-textPrimary">
                      <Users className="w-4 h-4 text-luxury-gold" />
                      <span><strong>{vehicle.passenger_capacity}</strong> Passengers</span>
                    </div>
                    <div className="flex items-center gap-2 text-luxury-textPrimary">
                      <Briefcase className="w-4 h-4 text-luxury-gold" />
                      <span><strong>{vehicle.luggage_capacity}</strong> Luggage Capacity</span>
                    </div>
                  </div>

                  {/* Amenities List */}
                  {vehicle.features && vehicle.features.length > 0 && (
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-luxury-textPrimary mb-3">
                        Onboard Luxury Amenities:
                      </h4>
                      <div className="space-y-2">
                        {vehicle.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-luxury-textSecondary">
                            <Check className="w-3.5 h-3.5 text-luxury-gold shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Link to="/quote">
                      <Button size="md" variant="primary" className="text-xs uppercase tracking-wider font-bold">
                        Request Quote for This Vehicle <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
};

export default FleetPage;
