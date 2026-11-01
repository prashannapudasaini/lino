import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Briefcase, Clock, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import CtaBanner from '../components/home/CtaBanner';
import { getServices } from '../services/api';

const defaultServices = [
  {
    title: "Airport Transportation",
    slug: "airport-transportation",
    short_description: "Seamless airport arrivals and executive departures with curbside coordination, flight schedule tracking, and terminal meet-and-greet.",
    full_description: "Everest Executive Limo eliminates the stress of airport transit across MDT, PHL, JFK, LGA, and EWR. Your chauffeur monitors your flight status, welcomes you at baggage claim or curbside, assists with all luggage, and escorts you smoothly to your private vehicle.",
    icon: Plane,
    image_url: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Inbound Flight Schedule Monitoring & Delay Accommodation",
      "Terminal Baggage Claim Meet & Greet with Personalized Tablet Name Sign",
      "Complimentary 45-Minute Waiting Period for Commercial Flights",
      "Full Baggage Handling from Terminal to Vehicle",
      "Direct Regional Intercity Connections to Pennsylvania & Tri-State"
    ]
  },
  {
    title: "Corporate & Executive Travel",
    slug: "corporate-travel",
    short_description: "Tailored executive mobility for corporate meetings, multi-stop roadshows, and discerning executives who value privacy and punctuality.",
    full_description: "Designed specifically for corporate executives, visiting board members, and business leaders who demand an uninterrupted mobile workspace. Travel between meetings in complete confidentiality and comfort.",
    icon: Briefcase,
    image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Direct Corporate Account Billing & Detailed Travel Invoicing",
      "Confidential Cabin Environment with Strict Non-Disclosure Standards",
      "High-Speed Mobile Connectivity & In-Cabin Laptop Power",
      "Multi-City Roadshow Itinerary Management",
      "Seamless Transportation for Visiting VIP Guests & Clients"
    ]
  },
  {
    title: "Private Hourly Chauffeur",
    slug: "hourly-chauffeur",
    short_description: "Dedicated chauffeur and premium luxury vehicle at your continuous disposal for meetings, dinners, or bespoke regional itineraries.",
    full_description: "Experience total schedule freedom with our as-directed hourly service. Your chauffeur remains on standby wherever your day or evening takes you, ready to depart at your command without parking or transit delays.",
    icon: Clock,
    image_url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Total Schedule Freedom — Change Itinerary Stops As Directed",
      "Chauffeur Remains Stationed On-Site Throughout All Stops",
      "Zero Parking Hassles, City Congestion, or Rideshare Waits",
      "Ideal for Dinners, Shopping, Medical Appointments & Regional Tours",
      "Convenient Extension of Hours Upon Dispatch Request"
    ]
  },
  {
    title: "Special Events Transportation",
    slug: "special-events",
    short_description: "Sophisticated transportation for galas, milestone celebrations, weddings, and high-profile private occasions.",
    full_description: "Elevate your most cherished milestones. From weddings and anniversary celebrations to black-tie charity galas, our pristine fleet and immaculately attired chauffeurs provide red-carpet elegance from departure to arrival.",
    icon: Award,
    image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Red-Carpet Chauffeur Service & Immaculate Professional Presentation",
      "Bridal Party, VIP Family, and Executive Delegation Logistics",
      "Vehicle Detailing & Flawless Cleanliness Prior to Every Event",
      "Coordinated Timelines Working Directly with Event Coordinators",
      "VIP Arrival Staging & Coordinated Curbside Pickups"
    ]
  }
];

const ServicesPage = () => {
  const [servicesList, setServicesList] = useState(defaultServices);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        if (data && data.length > 0) {
          // Merge features
          const formatted = data.map(item => ({
            ...item,
            features: typeof item.features_json === 'string' ? JSON.parse(item.features_json || '[]') : []
          }));
          setServicesList(formatted);
        }
      } catch (err) {
        // Keeps defaults
      }
    };
    fetchServices();
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Executive Services"
        title="Bespoke Luxury Chauffeur & Executive Mobility"
        subtitle="Meticulously coordinated ground transportation tailored for executive business itineraries, airport arrivals, and private milestones."
        breadcrumb={[{ name: "Services" }]}
        backgroundImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Services List Deep-Dives */}
      <section className="py-20 md:py-28 bg-luxury-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
          {servicesList.map((svc, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image Composition */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative rounded-2xl overflow-hidden border border-luxury-border shadow-2xl group">
                    <img
                      src={svc.image_url}
                      alt={svc.title}
                      className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg/80 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-6 space-y-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="inline-flex items-center gap-2">
                    <span className="w-6 h-[1px] bg-luxury-gold/60 inline-block"></span>
                    <span className="text-xs uppercase tracking-[0.25em] font-semibold text-luxury-gold">
                      Service Class 0{index + 1}
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-normal text-luxury-textPrimary">
                    {svc.title}
                  </h2>

                  <p className="text-sm sm:text-base text-luxury-textSecondary leading-relaxed">
                    {svc.full_description || svc.short_description}
                  </p>

                  {/* Feature Highlights */}
                  {svc.features && svc.features.length > 0 && (
                    <div className="space-y-2.5 pt-2">
                      {svc.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-luxury-textPrimary">
                          <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <Link to="/quote">
                      <Button size="md" variant="primary" className="text-xs uppercase tracking-wider font-bold">
                        Request Quote for {svc.title} <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </Button>
                    </Link>

                    {svc.slug === "airport-transportation" && (
                      <Link to="/airport-transportation">
                        <Button size="md" variant="secondary" className="text-xs uppercase tracking-wider">
                          View Airport Details
                        </Button>
                      </Link>
                    )}
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

export default ServicesPage;
