import React from 'react';
import { ShieldCheck, HeartHandshake, PhoneCall, Sparkles } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const commitments = [
  {
    icon: Sparkles,
    title: "Uncompromising Comfort",
    desc: "Quiet acoustic cabins, temperature pre-conditioning, plush upholstery, and ambient lighting create a restful sanctuary on wheels."
  },
  {
    icon: PhoneCall,
    title: "Responsive Communication",
    desc: "Direct access to our dispatch team means schedule updates, flight gate changes, and special requests are answered with urgency."
  },
  {
    icon: ShieldCheck,
    title: "Professionalism & Discretion",
    desc: "Polite, immaculately dressed chauffeurs who respect your privacy, maintaining confidentiality for all business affairs."
  },
  {
    icon: HeartHandshake,
    title: "Client-Centric Dedication",
    desc: "We build enduring relationships with frequent corporate travelers, event organizers, and families who rely on steady excellence."
  }
];

const ExperienceValues = () => {
  return (
    <section className="py-20 md:py-28 bg-luxury-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Service Philosophy"
          title="Designed for Your Peace of Mind"
          subtitle="True luxury is effortless. We attend to every operational nuance so you can concentrate on your destination."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((c, i) => {
            const IconComponent = c.icon;
            return (
              <div
                key={i}
                className="bg-luxury-surface border border-luxury-border rounded-xl p-6 hover:border-luxury-gold/40 transition-all duration-300 shadow-luxury"
              >
                <div className="w-10 h-10 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center text-luxury-gold mb-4">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-luxury-textPrimary mb-2">
                  {c.title}
                </h3>
                <p className="text-xs text-luxury-textSecondary leading-relaxed">
                  {c.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceValues;

