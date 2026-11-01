import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, Check, ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import { getFleet } from '../../services/api';

const defaultFleet = [
  {
    name: "Executive Luxury Sedan",
    category: "Sedan",
    subtitle: "Mercedes-Benz S-Class / Cadillac CT6",
    passenger_capacity: 3,
    luggage_capacity: 3,
    image_url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80",
    description: "The pinnacle of executive comfort. Engineered for business leaders seeking whisper-quiet performance and handcrafted leather seating.",
    hourly_rate_estimate: "Starting from $95/hr"
  },
  {
    name: "Executive Luxury SUV",
    category: "SUV",
    subtitle: "Cadillac Escalade ESV / Lincoln Navigator L",
    passenger_capacity: 6,
    luggage_capacity: 6,
    image_url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80",
    description: "Commanding road presence paired with expansive first-class space. Ideal for executive delegations and airport transfers with luggage.",
    hourly_rate_estimate: "Starting from $120/hr"
  },
  {
    name: "Mercedes-Benz Executive Sprinter",
    category: "Van",
    subtitle: "Executive Jet Class Custom Sprinter",
    passenger_capacity: 14,
    luggage_capacity: 12,
    image_url: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80",
    description: "A private jet cabin on wheels. Standing height, custom conference tables, and plush captain recliners for group mobility.",
    hourly_rate_estimate: "Starting from $165/hr"
  },
  {
    name: "Executive Stretch Limousine",
    category: "Limousine",
    subtitle: "Lincoln MKT Presidential Stretch",
    passenger_capacity: 8,
    luggage_capacity: 6,
    image_url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80",
    description: "Timeless elegance and celebratory refinement. Tailored for special galas, weddings, and prestigious evenings.",
    hourly_rate_estimate: "Starting from $145/hr"
  }
];

const FleetShowcase = () => {
  const [vehicles, setVehicles] = useState(defaultFleet);

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const data = await getFleet();
        if (data && data.length > 0) {
          setVehicles(data);
        }
      } catch (err) {
        // Keeps defaultFleet
      }
    };
    fetchFleet();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-luxury-surface border-y border-luxury-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-luxury-gold/60 inline-block"></span>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-luxury-gold">
                Curated Luxury Fleet
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-luxury-textPrimary tracking-tight">
              Maintained to Concierge Standards
            </h2>
            <p className="text-sm md:text-base text-luxury-textSecondary mt-3">
              Every vehicle undergoes rigorous multi-point mechanical inspections and thorough detailing prior to departure.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link to="/fleet">
              <Button variant="outline" size="sm" className="text-xs tracking-wider uppercase">
                Explore Full Fleet <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((v, idx) => (
            <div
              key={idx}
              className="group bg-luxury-bg border border-luxury-border rounded-xl overflow-hidden flex flex-col justify-between hover:border-luxury-gold/50 transition-all duration-300 shadow-luxury"
            >
              <div>
                {/* Vehicle Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-luxury-card">
                  <img
                    src={v.image_url}
                    alt={v.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-luxury-bg/85 backdrop-blur-md text-[10px] font-semibold tracking-wider uppercase text-luxury-gold border border-luxury-border">
                    {v.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-luxury-textPrimary mb-1 group-hover:text-luxury-gold transition-colors">
                    {v.name}
                  </h3>
                  <p className="text-xs text-luxury-gold/80 mb-3 font-medium">
                    {v.subtitle}
                  </p>
                  <p className="text-xs text-luxury-textSecondary line-clamp-2 leading-relaxed mb-4">
                    {v.description}
                  </p>

                  {/* Capacities */}
                  <div className="flex items-center gap-4 py-3 border-y border-luxury-border/60 text-xs text-luxury-textSecondary">
                    <div className="flex items-center gap-1.5" title="Passenger Capacity">
                      <Users className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>Up to {v.passenger_capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Luggage Capacity">
                      <Briefcase className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>{v.luggage_capacity} Luggage</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <Link to="/quote" className="block w-full">
                  <Button size="sm" variant="secondary" className="w-full justify-center text-xs tracking-wider uppercase">
                    Select & Request Quote
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetShowcase;
