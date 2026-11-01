import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Briefcase, Award, Clock, Compass, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import PageHero from '../components/common/PageHero';

const services = [
  {
    id: "airport",
    num: "01",
    title: "Airport Transfers",
    layout: "image-left",
    icon: Plane,
    image: "/images/custom/service-airport.jpg",
    description: "Flawless arrivals and timely departures for all major regional commercial hubs including MDT, PHL, JFK, LGA, and EWR, as well as private aviation FBOs. Your chauffeur coordinates flight status, provides terminal meet-and-greet, and handles all luggage.",
    benefits: [
      "Curbside or inside baggage-claim meet and greet",
      "Complimentary 45-minute waiting period for commercial flights",
      "Flight arrival monitoring for early touchdowns or delays",
      "Assistance with all luggage items directly to your vehicle"
    ]
  },
  {
    id: "corporate",
    num: "02",
    title: "Corporate Transportation",
    layout: "image-right",
    icon: Briefcase,
    image: "/images/custom/service-corporate.jpg",
    description: "Engineered for executives, board members, and business delegations requiring seamless punctuality, mobile office productivity, and absolute discretion between meetings and financial centers.",
    benefits: [
      "Strict non-disclosure standards for total meeting confidentiality",
      "Quiet acoustic cabins equipped with high-speed charging",
      "Multi-city roadshow coordination and timetable management",
      "Direct corporate billing and itemized travel invoicing"
    ]
  },
  {
    id: "executive",
    num: "03",
    title: "Executive Travel",
    layout: "full-width-overlay",
    icon: ShieldCheck,
    image: "/images/custom/why-passenger.jpg",
    description: "Premier intercity travel connecting Central Pennsylvania, New York City, Philadelphia, New Jersey, and Washington D.C. Avoid the hassles of regional flight delays and crowded train stations with private door-to-door luxury.",
    benefits: [
      "Direct point-to-point transit with zero layovers or security queues",
      "Ergonomic Nappa leather seating for restful long-distance journeys",
      "Personalized climate control and chilled refreshments",
      "Custom itineraries and preferred route selection"
    ]
  },
  {
    id: "chauffeur",
    num: "04",
    title: "Private Chauffeur Service",
    layout: "image-left",
    icon: Clock,
    image: "/images/custom/service-chauffeur.jpg",
    description: "Dedicated as-directed hourly service with a luxury vehicle and driver on continuous standby. Depart at your leisure, alter stops dynamically, and enjoy total flexibility without parking concerns.",
    benefits: [
      "Chauffeur remains on-site throughout your schedule",
      "Unlimited spontaneous stops within your reserved charter window",
      "Zero parking headaches or rideshare wait times",
      "Ideal for multi-meeting days, shopping itineraries, and dining"
    ]
  },
  {
    id: "events",
    num: "05",
    title: "Special Events",
    layout: "image-right",
    icon: Award,
    image: "/images/custom/service-events.jpg",
    description: "Red-carpet transportation for milestone galas, black-tie celebrations, weddings, and high-profile private occasions. We coordinate with event planners to ensure every arrival is memorable and polished.",
    benefits: [
      "Flawlessly detailed luxury sedans, SUVs, and Sprinters",
      "Attentive chauffeurs in formal executive attire",
      "Staged VIP arrivals and synchronized group departures",
      "Coordination with venue concierges and wedding planners"
    ]
  },
  {
    id: "tours",
    num: "06",
    title: "City Tours",
    layout: "asymmetric-card",
    icon: Compass,
    image: "/images/custom/fleet-suv.jpg",
    description: "Curated regional private tours exploring the landmarks of Pennsylvania, historic Philadelphia, Manhattan sights, or the scenic rolling hills of Lancaster and Hershey in uncompromising luxury.",
    benefits: [
      "Customized private tour pacing without rigid group timetables",
      "Knowledgeable, courteous chauffeurs familiar with local landmarks",
      "Comfortable panoramic views with privacy tinting",
      "Flexible stop durations for photography, dining, and sightseeing"
    ]
  }
];

const ServicesPage = () => {
  return (
    <div className="bg-luxury-bg text-white">
      {/* Hero */}
      <PageHero
        eyebrow="OUR SERVICES"
        title="Exceptional Transportation for Every Occasion."
        subtitle="Professional chauffeur services designed around your journey."
        breadcrumb={[{ name: "Our Services" }]}
        backgroundImage="/images/custom/hero-jet-limo.jpg"
      />

      {/* Services List with Distinct Alternating Layouts */}
      <div className="py-20 md:py-28 space-y-24 md:space-y-32">
        {services.map((svc) => {
          const IconComp = svc.icon;

          if (svc.layout === "image-left") {
            return (
              <section key={svc.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  <div className="lg:col-span-6 relative">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-luxury-border group">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="w-full h-[400px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute top-6 left-6 w-10 h-10 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-luxury-gold">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-6">
                    <span className="font-mono text-sm font-bold text-luxury-gold/50">
                      {svc.num} &mdash; SERVICE
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.15]">
                      {svc.title}
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                      {svc.description}
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <h4 className="text-xs uppercase tracking-wider text-luxury-gold font-semibold">
                        Client Privileges:
                      </h4>
                      {svc.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                          <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Link
                        to="/book-now"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs uppercase tracking-wider hover:bg-luxury-goldHover transition-all shadow-luxury-gold"
                      >
                        <span>Request a Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          if (svc.layout === "image-right") {
            return (
              <section key={svc.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
                    <span className="font-mono text-sm font-bold text-luxury-gold/50">
                      {svc.num} &mdash; SERVICE
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.15]">
                      {svc.title}
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                      {svc.description}
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <h4 className="text-xs uppercase tracking-wider text-luxury-gold font-semibold">
                        Client Privileges:
                      </h4>
                      {svc.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                          <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Link
                        to="/book-now"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs uppercase tracking-wider hover:bg-luxury-goldHover transition-all shadow-luxury-gold"
                      >
                        <span>Request a Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-6 relative order-1 lg:order-2">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-luxury-border group">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="w-full h-[400px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-luxury-gold">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          if (svc.layout === "full-width-overlay") {
            return (
              <section key={svc.id} className="relative py-24 md:py-32 overflow-hidden border-y border-luxury-border">
                <div className="absolute inset-0 z-0">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-[1.2]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-luxury-bg via-luxury-bg/85 to-transparent w-full lg:w-[65%]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-2xl space-y-6">
                    <span className="font-mono text-sm font-bold text-luxury-gold">
                      {svc.num} &mdash; FEATURED SERVICE
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.12]">
                      {svc.title}
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                      {svc.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {svc.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Link
                        to="/book-now"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs uppercase tracking-wider hover:bg-luxury-goldHover transition-all shadow-luxury-gold"
                      >
                        <span>Request a Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          // asymmetric card layout for tours
          return (
            <section key={svc.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-luxury-card border border-luxury-border rounded-3xl p-8 sm:p-12 md:p-14 shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <span className="font-mono text-sm font-bold text-luxury-gold/50">
                      {svc.num} &mdash; SERVICE
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.15]">
                      {svc.title}
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                      {svc.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {svc.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <Check className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Link
                        to="/book-now"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs uppercase tracking-wider hover:bg-luxury-goldHover transition-all shadow-luxury-gold"
                      >
                        <span>Request a Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 h-72 sm:h-80">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="w-full h-full object-cover object-center filter brightness-95"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-[#0B0B0C] border-t border-luxury-border text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4 tracking-tight">
            Whatever the Occasion, Travel in Excellence.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-8 font-normal">
            Our dispatch specialists are ready to tailor an all-inclusive quotation for your exact itinerary.
          </p>
          <Link
            to="/book-now"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-luxury-goldHover transition-all shadow-luxury-gold hover:shadow-luxury-glow"
          >
            <span>Request a Ride</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
