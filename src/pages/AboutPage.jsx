import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, Armchair, HeartHandshake, ArrowRight, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/common/PageHero';

const values = [
  {
    title: "Excellence",
    icon: ShieldCheck,
    description: "An unwavering dedication to immaculate vehicle presentation, flawless conduct, and exceeding the highest expectations of executive ground travel."
  },
  {
    title: "Reliability",
    icon: Clock,
    description: "Dependable punctuality backed by proactive route reconnaissance, airport flight monitoring, and 24/7 dedicated dispatch coordination."
  },
  {
    title: "Comfort",
    icon: Armchair,
    description: "Quiet acoustic cabins, climate pre-conditioning, fine leather seating, and a serene atmosphere designed for productivity or restful repose."
  },
  {
    title: "Personal Attention",
    icon: HeartHandshake,
    description: "Tailored travel arrangements that accommodate your exact schedule, luggage needs, route preferences, and confidentiality requirements."
  }
];

const AboutPage = () => {
  return (
    <div className="bg-luxury-bg text-white">
      {/* Section 1: About Hero */}
      <PageHero
        eyebrow="ABOUT EVEREST"
        title="Driven by Excellence. Defined by Comfort."
        subtitle="Discover a more refined approach to executive transportation."
        breadcrumb={[{ name: "About Us" }]}
        backgroundImage="/images/custom/hero-jet-limo.jpg"
      />

      {/* Section 2: Our Story (Split Editorial Layout) */}
      <section className="py-20 md:py-28 bg-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Professional Chauffeur / Executive Transportation Photograph */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-luxury-border group">
                <img
                  src="/images/custom/service-corporate.jpg"
                  alt="Professional executive chauffeur opening luxury sedan door"
                  className="w-full h-[480px] sm:h-[560px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold font-bold block mb-1">
                    WHITE-GLOVE DISCRETION
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    Formally vetted chauffeurs bound by non-disclosure ethics, ensuring complete privacy for corporate leadership.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Editorial Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-[1px] bg-luxury-gold inline-block"></span>
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
                  OUR STORY
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.15]">
                More Than Transportation.<br />
                <span className="italic text-luxury-gold font-serif">An Experience.</span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                Everest Executive Limo LLC was created to bring calm, precision, and sophistication to executive ground travel. We believe ground transportation should never feel transactional; it should be a seamless continuation of your professional standards and personal comfort.
              </p>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                Based in Pennsylvania and serving the entire Mid-Atlantic corridor — including New York, New Jersey, and Washington D.C. — we specialize in high-touch airport transfers, corporate roadshows, and private charters where punctuality, discretion, and vehicle cleanliness are paramount.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-luxury-surface border border-luxury-border flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                      Obsessive Punctuality
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Chauffeurs staged 15 minutes before scheduled pickup times.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-luxury-surface border border-luxury-border flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                      Immaculate Vehicles
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Deep sanitization, bottled spring water, and in-cabin charging.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Mission (Full-width Dark Section with Background Image) */}
      <section className="relative py-24 md:py-32 bg-[#151517] overflow-hidden border-y border-luxury-border">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2200&q=85"
            alt="Everest Himalayan Mountain Vista"
            className="w-full h-full object-cover object-center filter brightness-[0.22] contrast-[1.2]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/90 to-[#0B0B0C]/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-luxury-gold inline-block"></span>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
              OUR COMMITMENT
            </span>
            <span className="w-6 h-[1px] bg-luxury-gold inline-block"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-6 tracking-tight">
            Our Mission
          </h2>

          <p className="font-serif text-lg sm:text-2xl text-zinc-200 leading-relaxed italic max-w-3xl mx-auto font-normal">
            "To deliver comfortable, dependable, and meticulously planned executive transportation that honors our clients' time, safeguards their peace of mind, and sets an uncompromised benchmark for luxury chauffeur service."
          </p>
        </div>
      </section>

      {/* Section 4: Our Values (Four Elegant Value Blocks) */}
      <section className="py-20 md:py-28 bg-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-luxury-gold inline-block"></span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
                FOUNDATIONAL PILLARS
              </span>
              <span className="w-6 h-[1px] bg-luxury-gold inline-block"></span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.15] mb-4">
              Our Core Values
            </h2>

            <p className="text-sm text-zinc-400 font-normal">
              Four enduring principles that guide every dispatch, every client interaction, and every journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <div
                  key={i}
                  className="bg-luxury-card border border-luxury-border rounded-2xl p-7 flex flex-col justify-between hover:border-luxury-gold/50 transition-all duration-300 shadow-luxury group hover:-translate-y-1"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-luxury-surface border border-luxury-gold/30 flex items-center justify-center text-luxury-gold mb-6 group-hover:border-luxury-gold group-hover:bg-luxury-gold/10 transition-colors shadow-sm">
                      <IconComp className="w-5 h-5" />
                    </div>

                    <h3 className="font-serif text-xl font-normal text-white mb-2 group-hover:text-luxury-gold transition-colors">
                      {v.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                      {v.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5: The Experience (Large Image-Led Composition) */}
      <section className="py-20 md:py-28 bg-[#151517] border-t border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-[1px] bg-luxury-gold inline-block"></span>
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
                  THE EXPERIENCE
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.15]">
                Every Detail Matters.
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                True executive luxury is revealed in the unspoken details: the gentle door closure, the perfectly pre-chilled bottled spring water, the quiet acceleration that allows you to prepare for a major presentation without distraction.
              </p>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                We continuously inspect our fleet mechanically and cosmetically, train our team in defensive driving and discreet protocol, and ensure every passenger arrives refreshed and poised.
              </p>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-luxury-border group">
                <img
                  src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85"
                  alt="Luxury vehicle rear executive seating craftsmanship"
                  className="w-full h-[400px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="py-20 md:py-24 bg-[#0B0B0C] border-t border-luxury-border text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4 tracking-tight">
            Experience the Everest Difference.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-8 font-normal">
            Allow us to elevate your next journey with dependable, refined executive ground transportation.
          </p>
          <Link
            to="/book-now"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-luxury-gold text-luxury-bg font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-luxury-goldHover transition-all shadow-luxury-gold hover:shadow-luxury-glow"
          >
            <span>Book Your Ride</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
