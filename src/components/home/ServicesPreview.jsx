import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Airport Transfers',
    subtitle: 'Punctual, stress-free terminal & FBO connections.',
    image: '/images/custom/service-airport.jpg',
    path: '/airport-transportation'
  },
  {
    title: 'Corporate Transportation',
    subtitle: 'Executive roadshows, board meetings & road travel.',
    image: '/images/custom/service-corporate.jpg',
    path: '/services'
  },
  {
    title: 'Special Events & Galas',
    subtitle: 'Arrive in red-carpet style for milestone evenings.',
    image: '/images/custom/service-events.jpg',
    path: '/services'
  },
  {
    title: 'Private Chauffeur Service',
    subtitle: 'Dedicated as-directed hourly luxury transportation.',
    image: '/images/custom/service-chauffeur.jpg',
    path: '/services'
  }
];

const ServicesPreview = () => {
  return (
    <section id="services-section" className="py-20 md:py-28 bg-[#0B0B0C] text-white border-t border-[#1F1F24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A46D] block mb-3">
              OUR SERVICES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.12]">
              Exceptional Transportation<br />
              <span className="italic font-serif text-[#C5A46D]">for Every Occasion</span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between gap-5">
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal lg:text-right max-w-md">
              From commercial and private airport transfers to corporate leadership travel and gala celebrations, we deliver an uncompromised standard of punctuality, privacy, and luxury.
            </p>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1D1D20] hover:bg-[#252528] border border-[#C5A46D]/40 text-[#C5A46D] hover:text-[#D5B982] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-luxury active:scale-95"
            >
              <span>View All 7 Services</span>
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
              className="group bg-[#151517] text-white rounded-2xl overflow-hidden border border-[#242428] hover:border-[#C5A46D]/60 transition-all duration-300 flex flex-col justify-between shadow-2xl hover:-translate-y-1.5"
            >
              <div>
                {/* Card Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-black/50">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151517] via-transparent to-transparent opacity-90" />
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
