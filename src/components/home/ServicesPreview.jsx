import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Airport Transportation',
    subtitle: 'Reliable and comfortable airport transfers.',
    image: '/images/custom/service-airport.jpg',
    path: '/airport-transportation'
  },
  {
    title: 'Corporate Transportation',
    subtitle: 'Professional travel for your business needs.',
    image: '/images/custom/service-corporate.jpg',
    path: '/services'
  },
  {
    title: 'Special Events',
    subtitle: 'Arrive in style for your important moments.',
    image: '/images/custom/service-events.jpg',
    path: '/services'
  },
  {
    title: 'Private Chauffeur Service',
    subtitle: 'Personalized travel, your way.',
    image: '/images/custom/service-chauffeur.jpg',
    path: '/services'
  }
];

const ServicesPreview = () => {
  return (
    <section id="services-section" className="py-20 md:py-28 bg-[#F7F5F0] text-[#141416]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#9E7D47] block mb-3">
              OUR SERVICES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#141416] leading-[1.12]">
              Exceptional Transportation<br />
              for Every Occasion
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between gap-5">
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal lg:text-right max-w-md">
              From airport transfers to corporate travel and special events, we provide seamless, luxurious transportation tailored to your needs.
            </p>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-zinc-100 border border-black/15 text-[#141416] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <Link
              key={idx}
              to={service.path}
              className="group bg-[#151517] text-white rounded-2xl overflow-hidden border border-[#242428] hover:border-[#C5A46D]/60 transition-all duration-300 flex flex-col justify-between shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Card Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-black/50">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151517] via-transparent to-transparent opacity-80" />
                </div>

                {/* Card Text & Circular Arrow */}
                <div className="p-5 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#C5A46D] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {service.subtitle}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:border-[#C5A46D] group-hover:bg-[#C5A46D] group-hover:text-[#0B0B0C] transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
