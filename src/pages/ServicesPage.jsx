import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, Briefcase, Clock, Building2, Heart, Award, 
  Compass, ArrowRight, Check, ShieldCheck 
} from 'lucide-react';
import PageHero from '../components/common/PageHero';

const services = [
  {
    id: "airport",
    num: "01",
    serviceParam: "Airport Transportation",
    title: "Airport Transfers",
    icon: Plane,
    image: "/images/custom/service-airport.jpg",
    description: "Flawless arrivals and timely departures for all major regional commercial hubs including MDT, PHL, JFK, LGA, and EWR, as well as private aviation FBOs. Your chauffeur monitors flight radar, provides inside baggage-claim meet and greet, and handles all luggage with white-glove care.",
    benefits: [
      "Curbside or inside baggage-claim meet and greet with executive placard",
      "Complimentary 45-minute flight delay grace period for commercial flights",
      "Live FlightAware radar flight monitoring for automatic schedule adjustments",
      "Full assistance with luggage directly to your vehicle's cargo hold"
    ]
  },
  {
    id: "corporate",
    num: "02",
    serviceParam: "Corporate & Executive Travel",
    title: "Corporate Transportation",
    icon: Briefcase,
    image: "/images/custom/service-corporate.jpg",
    description: "Engineered specifically for C-suite executives, board members, and visiting corporate delegations requiring seamless punctuality, mobile office productivity, and absolute discretion between meetings, headquarters, and financial districts.",
    benefits: [
      "Strict non-disclosure standards for confidential business conversations",
      "Quiet acoustic cabins equipped with high-speed charging and in-cabin Wi-Fi",
      "Multi-stop corporate roadshow coordination and itinerary management",
      "Direct corporate billing accounts with consolidated travel reporting"
    ]
  },
  {
    id: "chauffeur",
    num: "03",
    serviceParam: "Private Hourly Chauffeur",
    title: "Private Chauffeur Service",
    icon: Clock,
    image: "/images/custom/service-chauffeur.jpg",
    description: "Dedicated as-directed hourly service with an immaculate luxury vehicle and professional chauffeur on continuous standby. Depart at your leisure, alter stops dynamically, and experience complete flexibility without parking concerns or rideshare delays.",
    benefits: [
      "Chauffeur and vehicle remain exclusively dedicated on-site throughout your booking",
      "Unlimited spontaneous stops within your reserved hourly charter window",
      "Eliminates parking headaches, garage walks, and rideshare surge pricing",
      "Ideal for multi-meeting business schedules, high-end shopping, and evening dining"
    ]
  },
  {
    id: "hotel",
    num: "04",
    serviceParam: "Corporate & Executive Travel",
    title: "Hotel Transfers",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
    description: "Seamless door-to-door transportation connecting five-star resorts, premier hotels, and executive corporate residences. From The Hotel Hershey and Center City Philadelphia luxury properties to Manhattan landmark hotels, we ensure arrivals of distinction.",
    benefits: [
      "Direct coordinated curbside pickup with hotel front desk and bell concierges",
      "Executive luggage handling from lobby to vehicle trunk",
      "Smooth intercity hotel-to-headquarters and hotel-to-airport transfers",
      "Pre-conditioned climate controls tailored to your preference"
    ]
  },
  {
    id: "weddings",
    num: "05",
    serviceParam: "Special Events Transportation",
    title: "Weddings",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    description: "Graceful elegance and impeccable presentation for your most cherished celebration. From the bridal party and groomsmen to VIP family members and couple send-offs, our pristine fleet provides timeless photography and peaceful journeys on your special day.",
    benefits: [
      "Flawlessly detailed luxury sedans, SUVs, and Executive Jet Sprinters",
      "Courteous chauffeurs in formal executive black attire",
      "Synchronized schedule coordination with wedding planners and photographers",
      "Red-carpet staging, chilled sparkling water, and bridal dress assistance"
    ]
  },
  {
    id: "events",
    num: "06",
    serviceParam: "Special Events Transportation",
    title: "Special Events & Galas",
    icon: Award,
    image: "/images/custom/service-events.jpg",
    description: "Red-carpet arrivals for milestone galas, charity balls, theatrical openings, sporting championships, and high-profile private celebrations. Arrive refreshed and make an unforgettable statement without traffic or parking stress.",
    benefits: [
      "Guaranteed priority venue drop-off and staged curbside departures",
      "Spacious group transportation for up to 14 guests in Executive Jet Sprinters",
      "In-cabin media, Bluetooth surround audio, and ambient lighting",
      "Round-trip standby service ensuring immediate departure when you're ready"
    ]
  },
  {
    id: "long-distance",
    num: "07",
    serviceParam: "Corporate & Executive Travel",
    title: "Long-Distance Travel",
    icon: Compass,
    image: "/images/custom/fleet-escalade-front.jpg",
    description: "Private, comfortable intercity ground travel connecting Pennsylvania directly with New York City, New Jersey, Washington D.C., and Maryland. Skip crowded Amtrak trains, airport security queues, and regional flight cancellations in total private comfort.",
    benefits: [
      "Non-stop point-to-point transit on your exact schedule with zero layovers",
      "Ergonomic Nappa leather seating designed for fatigue-free extended road travel",
      "Full productivity cabin with Wi-Fi, 110V power, and acoustic noise insulation",
      "Custom rest-stop and dining preferences coordinated with your chauffeur"
    ]
  }
];

const ServicesPage = () => {
  return (
    <div className="bg-[#0B0B0C] text-white">
      {/* 1. Hero */}
      <PageHero
        eyebrow="OUR SERVICES"
        title="Exceptional Transportation for Every Occasion."
        subtitle="Explore our comprehensive range of private chauffeur and executive ground transportation services across the Mid-Atlantic."
        breadcrumb={[{ name: "Services" }]}
        backgroundImage="/images/custom/hero-jet-limo.jpg"
      />

      {/* 2. Introduction */}
      <section className="py-16 md:py-24 bg-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#C5A46D]">
              UNCOMPROMISED GROUND TRAVEL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
              Crafted Around Your Schedule and Standards
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              Whether you require early-morning airport transfers, full-day corporate roadshow mobility, or dignified wedding arrivals, Everest Executive Limo LLC delivers consistent reliability and elevated comfort across every mile.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The 7 Alternating Service Sections */}
      <div className="space-y-16 md:space-y-28 pb-24 md:pb-32">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          const IconComp = service.icon;

          return (
            <section
              key={service.id}
              id={service.id}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28"
            >
              <div className="bg-[#151517] border border-[#242428] rounded-3xl overflow-hidden shadow-2xl hover:border-[#C5A46D]/40 transition-colors">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  {/* Service Photography */}
                  <div className={`lg:col-span-6 relative min-h-[360px] sm:min-h-[460px] ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center filter brightness-95"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
                    
                    {/* Number & Category Pill */}
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A46D]/40 text-[#C5A46D]">
                        {service.num}
                      </span>
                    </div>
                  </div>

                  {/* Content & Benefits */}
                  <div className={`lg:col-span-6 p-8 sm:p-10 md:p-12 flex flex-col justify-between ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1D1D20] border border-[#C5A46D]/30 flex items-center justify-center text-[#C5A46D]">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                          Executive Transportation
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-white">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mt-3">
                          {service.description}
                        </p>
                      </div>

                      {/* Key Benefits List */}
                      <div className="space-y-2.5 pt-2 border-t border-white/10">
                        <h4 className="text-[11px] uppercase tracking-wider font-semibold text-[#C5A46D]">
                          Key Service Benefits:
                        </h4>
                        <div className="space-y-2">
                          {service.benefits.map((benefit, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                              <Check className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                              <span className="leading-snug">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Request a Quote CTA */}
                    <div className="pt-8">
                      <Link
                        to={`/book-now?service=${encodeURIComponent(service.serviceParam)}`}
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C5A46D] text-[#0B0B0C] font-semibold text-xs uppercase tracking-wider hover:bg-[#D5B982] transition-all shadow-luxury-gold hover:shadow-luxury-glow"
                      >
                        <span>Request a Quote for {service.title}</span>
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

      {/* 4. Bottom Global CTA */}
      <section className="py-20 md:py-28 bg-[#151517] border-t border-[#242428] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4 tracking-tight">
            Need a Bespoke or Multi-City Itinerary?
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-8 font-normal">
            Our executive operations team coordinates custom charters, airport round-trips, and continuous standby services.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book-now"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C5A46D] text-[#0B0B0C] font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#D5B982] transition-all shadow-luxury-gold hover:shadow-luxury-glow w-full sm:w-auto"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+17175550199"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs sm:text-sm tracking-wider transition-all w-full sm:w-auto"
            >
              <span>Call Dispatch: (717) 555-0199</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
