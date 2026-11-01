import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Briefcase, Award, Compass, UserCheck, ArrowRight } from 'lucide-react';

const serviceList = [
  {
    icon: Plane,
    title: "Airport Transfers",
    desc: "Stress-free airport rides for MDT, PHL, JFK, LGA & EWR",
    path: "/airport-transportation"
  },
  {
    icon: Briefcase,
    title: "Corporate Travel",
    desc: "Professional, punctual, and discreet executive mobility",
    path: "/services"
  },
  {
    icon: Award,
    title: "Special Occasions",
    desc: "Arrive in red-carpet elegance for galas and celebrations",
    path: "/services"
  },
  {
    icon: Compass,
    title: "City Tours",
    desc: "Explore regional Pennsylvania and Tri-State in luxury",
    path: "/services"
  },
  {
    icon: UserCheck,
    title: "Private Chauffeur",
    desc: "Dedicated as-directed hourly service with executive standby",
    path: "/services"
  }
];

const ServicesPreview = () => {
  return (
    <section className="py-20 md:py-28 bg-[#0B0B0C] text-white relative overflow-hidden border-t border-[#1E1E22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Massive Luxury Vehicle Interior / Panoramic Cabin Photograph */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#28282D] group bg-[#151517]">
              <img
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=85"
                alt="Executive luxury vehicle interior cabin with panoramic view"
                className="w-full h-[480px] sm:h-[540px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/80 via-transparent to-transparent" />
            </div>
          </div>

          {/* Center Column: Eyebrow, Heading, Description, and Gold CTA Button */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A46D] block">
                OUR SERVICES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.12]">
                Exceptional Services<br />
                for Every Journey
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#A7A5A0] leading-relaxed font-normal">
              From airport transfers to corporate travel, we provide seamless, luxurious transportation tailored to your needs.
            </p>

            <div className="pt-2">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5A46D] hover:bg-[#D5B982] text-[#0B0B0C] text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-luxury-gold hover:shadow-luxury-glow active:scale-95"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Vertical List of Services with Gold Icons Matching Reference */}
          <div className="lg:col-span-3 space-y-5 lg:pl-4 border-t lg:border-t-0 lg:border-l border-[#1E1E22] pt-6 lg:pt-0">
            {serviceList.map((svc, idx) => {
              const IconComp = svc.icon;
              return (
                <Link
                  key={idx}
                  to={svc.path}
                  className="flex items-start gap-3.5 group p-2 rounded-xl hover:bg-white/[0.02] transition-colors"
                >
                  <div className="text-[#C5A46D] shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-base font-normal text-white group-hover:text-[#C5A46D] transition-colors leading-tight">
                      {svc.title}
                    </h3>
                    <p className="text-[11px] text-[#A7A5A0] line-clamp-1 mt-0.5 leading-snug">
                      {svc.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
