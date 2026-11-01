import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: "Airport Transportation",
    desc: "Reliable and comfortable airport transfers.",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=800&q=80",
    href: "/airport-transportation"
  },
  {
    title: "Corporate Transportation",
    desc: "Professional travel for your business needs.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    href: "/services"
  },
  {
    title: "Special Events",
    desc: "Arrive in style for your important moments.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    href: "/services"
  },
  {
    title: "Private Chauffeur Service",
    desc: "Personalized travel, your way.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    href: "/services"
  }
];

const ServicesPreview = () => {
  return (
    <section className="py-20 md:py-24 bg-[#F7F5F0] text-[#141416]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-xl">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#8C7449] block mb-2">
              OUR SERVICES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#141416] leading-[1.15]">
              Exceptional Transportation for Every Occasion
            </h2>
          </div>

          <div className="max-w-sm flex flex-col items-start md:items-end text-left md:text-right space-y-3">
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              From airport transfers to corporate travel and special events, we provide seamless, luxurious transportation tailored to your needs.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-300 text-xs font-semibold uppercase tracking-wider text-zinc-800 hover:border-black hover:text-black transition-colors"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Desktop: 4 Horizontal Dark Cards */}
        <div className="hidden lg:grid grid-cols-4 gap-5">
          {services.map((svc, i) => (
            <Link
              key={i}
              to={svc.href}
              className="group bg-[#151517] text-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  loading="lazy"
                />
              </div>

              <div className="p-5 flex items-end justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-normal text-white group-hover:text-luxury-gold transition-colors leading-tight">
                    {svc.title}
                  </h3>
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    {svc.desc}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-zinc-300 group-hover:bg-luxury-gold group-hover:text-luxury-bg group-hover:border-luxury-gold transition-all shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile & Tablet: Sleek Horizontal List View (Matching Right Mockup) */}
        <div className="lg:hidden space-y-3">
          {services.map((svc, i) => (
            <Link
              key={i}
              to={svc.href}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#151517] text-white shadow-lg active:scale-[0.99] transition-transform"
            >
              <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0">
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-sm font-medium text-white truncate">
                  {svc.title}
                </h3>
                <p className="text-[10px] text-zinc-400 line-clamp-1">
                  {svc.desc}
                </p>
              </div>

              <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-zinc-400 shrink-0">
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
