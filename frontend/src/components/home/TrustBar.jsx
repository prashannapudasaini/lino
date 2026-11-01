import React from 'react';
import { Shield, Plane, Briefcase, Clock } from 'lucide-react';

const trustItems = [
  {
    icon: Shield,
    title: "Professional Chauffeurs",
    desc: "Strictly vetted, discreet, and certified drivers"
  },
  {
    icon: Plane,
    title: "Airport Transfers",
    desc: "Curbside & terminal meet-and-greet at MDT, PHL, EWR, JFK, LGA"
  },
  {
    icon: Briefcase,
    title: "Corporate Mobility",
    desc: "Confidential executive transport and roadshow travel"
  },
  {
    icon: Clock,
    title: "Punctual & Dependable",
    desc: "Proactive dispatch tracking and itinerary coordination"
  }
];

const TrustBar = () => {
  return (
    <div className="bg-luxury-surface border-y border-luxury-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center text-luxury-gold shrink-0 group-hover:border-luxury-gold/50 transition-colors">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-luxury-textPrimary mb-0.5 tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-xs text-luxury-textSecondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
