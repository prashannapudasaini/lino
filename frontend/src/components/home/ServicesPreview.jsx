import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Briefcase, Clock, Award, ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';

const services = [
  {
    title: "Airport Transportation",
    category: "Commercial & Private Aviation",
    desc: "Seamless, punctual airport transfers connecting Central Pennsylvania to MDT, PHL, Newark Liberty (EWR), JFK, and LaGuardia (LGA) with baggage assistance and flight monitoring.",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1000&q=80",
    href: "/airport-transportation"
  },
  {
    title: "Corporate & Executive Travel",
    category: "Business Mobility",
    desc: "Confidential, uninterrupted travel tailored for executives and corporate roadshows. Transform transit time into a tranquil mobile office.",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    href: "/services"
  },
  {
    title: "Private Hourly Chauffeur",
    category: "As-Directed Flexibility",
    desc: "A dedicated luxury vehicle and chauffeur on continuous standby for dining, executive meetings, or personalized multi-stop regional itineraries.",
    icon: Clock,
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80",
    href: "/services"
  },
  {
    title: "Special Events Transportation",
    category: "Weddings & Galas",
    desc: "Red-carpet elegance for milestone celebrations, galas, and VIP functions. Arrive in immaculate luxury with complete peace of mind.",
    icon: Award,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    href: "/services"
  }
];

const ServicesPreview = () => {
  return (
    <section className="py-20 md:py-28 bg-luxury-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Bespoke Chauffeur Services"
          title="Tailored for Discriminating Travelers"
          subtitle="From early morning airport transfers to confidential executive roadshows, each service is executed with meticulous care."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((svc, i) => {
            const IconComp = svc.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden bg-luxury-surface border border-luxury-border hover:border-luxury-gold/50 transition-all duration-300 flex flex-col justify-between shadow-luxury"
              >
                {/* Image Container with Luxury Overlay */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-surface via-luxury-surface/40 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-luxury-bg/80 backdrop-blur-md border border-luxury-border text-luxury-gold text-[11px] font-semibold tracking-wider uppercase">
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{svc.category}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-luxury-textPrimary mb-3 group-hover:text-luxury-gold transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-luxury-textSecondary leading-relaxed mb-6">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-luxury-border flex items-center justify-between">
                    <Link
                      to={svc.href}
                      className="text-xs uppercase tracking-wider font-semibold text-luxury-gold hover:text-luxury-goldHover flex items-center gap-1.5 transition-colors"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link to="/quote">
                      <Button size="sm" variant="secondary" className="text-xs">
                        Request Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link to="/services">
            <Button size="md" variant="outline" className="tracking-wider uppercase text-xs">
              View All Executive Services & Specifications
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
