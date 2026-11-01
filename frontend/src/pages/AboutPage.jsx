import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Users, Compass, ArrowRight, Clock, Star } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import CtaBanner from '../components/home/CtaBanner';

const AboutPage = () => {
  return (
    <div>
      <PageHero
        eyebrow="Company Overview"
        title="Distinguished Ground Travel Designed for Discerning Clients"
        subtitle="Everest Executive Limo LLC delivers refined executive chauffeur services, airport transfers, and private corporate mobility across the Mid-Atlantic and Tri-State corridors."
        breadcrumb={[{ name: "About Us" }]}
        backgroundImage="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Brand Story Section */}
      <section className="py-20 md:py-28 bg-luxury-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-[1px] bg-luxury-gold/60 inline-block"></span>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-luxury-gold">
                  Our Heritage & Foundation
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-luxury-textPrimary leading-tight">
                Born From a Dedication to Discretion, Punctuality & Comfort.
              </h2>

              <p className="text-sm sm:text-base text-luxury-textSecondary leading-relaxed">
                Headquartered in Pennsylvania, <strong>Everest Executive Limo LLC</strong> was established to provide an executive alternative to unreliable rideshares and impersonal transport services.
              </p>

              <p className="text-sm sm:text-base text-luxury-textSecondary leading-relaxed">
                Whether transporting corporate leadership to high-stakes board meetings in Manhattan, escorting international travelers to MDT, PHL, or JFK, or orchestrating seamless logistics for milestone celebrations, we approach every mile with obsessive preparation.
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-luxury-surface border border-luxury-border p-4 rounded-xl">
                  <h4 className="text-sm font-semibold text-luxury-textPrimary mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                    Strict Chauffeur Standards
                  </h4>
                  <p className="text-xs text-luxury-textSecondary">
                    Discreet, professionally vetted chauffeurs trained in non-disclosure and hospitality.
                  </p>
                </div>

                <div className="bg-luxury-surface border border-luxury-border p-4 rounded-xl">
                  <h4 className="text-sm font-semibold text-luxury-textPrimary mb-1 flex items-center gap-2">
                    <Award className="w-4 h-4 text-luxury-gold" />
                    Concierge Maintained Fleet
                  </h4>
                  <p className="text-xs text-luxury-textSecondary">
                    Immaculately detailed, mechanically certified luxury sedans, SUVs, and Sprinters.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Photography Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-luxury-border shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80"
                  alt="Everest Executive Sedan Interior Craftsmanship"
                  className="w-full h-[450px] object-cover object-center filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg/90 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-luxury-bg/85 backdrop-blur-md border border-luxury-border">
                  <span className="text-[10px] uppercase tracking-wider text-luxury-gold font-bold block mb-1">
                    Executive Promise
                  </span>
                  <p className="text-xs text-luxury-textPrimary font-serif italic">
                    "Every journey is personalized to your schedule, comfort, and peace of mind."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Philosophy */}
      <section className="py-20 md:py-28 bg-luxury-surface border-y border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Commitments"
            title="The Principles That Guide Every Mile"
            subtitle="We hold ourselves to standards that exceed routine passenger transportation."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-luxury-bg border border-luxury-border rounded-xl p-8 hover:border-luxury-gold/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center text-luxury-gold mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-luxury-textPrimary mb-3">
                Precision & Punctuality
              </h3>
              <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
                Timing is paramount for executive travel. Our dispatch team pre-monitors traffic flows, highway construction, and inbound flight schedules to arrive 15 minutes ahead of scheduled pickup.
              </p>
            </div>

            <div className="bg-luxury-bg border border-luxury-border rounded-xl p-8 hover:border-luxury-gold/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center text-luxury-gold mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-luxury-textPrimary mb-3">
                Privacy & Confidentiality
              </h3>
              <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
                Whether you are conducting sensitive corporate phone calls or resting between meetings, our chauffeurs uphold strict discretion and non-disclosure standards at all times.
              </p>
            </div>

            <div className="bg-luxury-bg border border-luxury-border rounded-xl p-8 hover:border-luxury-gold/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center text-luxury-gold mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-luxury-textPrimary mb-3">
                Seamless Communication
              </h3>
              <p className="text-xs sm:text-sm text-luxury-textSecondary leading-relaxed">
                From your initial quote inquiry to arrival at your destination, you receive clear confirmations, chauffeur contact information, and rapid dispatch support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Standards Strip */}
      <section className="py-20 bg-luxury-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-luxury-gold">
            Fleet Safety & Cleanliness
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-luxury-textPrimary">
            Zero Compromise on Fleet Integrity
          </h2>
          <p className="text-sm sm:text-base text-luxury-textSecondary leading-relaxed max-w-3xl mx-auto">
            Our luxury sedans, premium SUVs, Mercedes-Benz Sprinters, and stretch limousines undergo regular scheduled maintenance, interior antibacterial sanitization, and cosmetic detailing so your vehicle always reflects excellence.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/fleet">
              <Button size="md" variant="primary">
                Explore The Fleet <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="md" variant="secondary">
                Contact Management
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
};

export default AboutPage;
