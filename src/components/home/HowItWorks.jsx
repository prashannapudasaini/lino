import React from 'react';
import { FileText, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const steps = [
  {
    step: "01",
    title: "Request Your Ride",
    desc: "Select your preferred service type and initial travel timeframe through our seamless booking interface.",
    icon: FileText
  },
  {
    step: "02",
    title: "Share Your Journey Details",
    desc: "Provide your pickup location, destination, passenger count, luggage needs, and optional airport flight details.",
    icon: MapPin
  },
  {
    step: "03",
    title: "Receive Your Personalized Quote",
    desc: "Our dispatch team calculates routing, confirms vehicle suitability, and delivers a transparent all-inclusive quote.",
    icon: Send
  },
  {
    step: "04",
    title: "Confirm Your Transportation",
    desc: "Review and accept your quotation. Your chauffeur and luxury vehicle are officially reserved for your journey.",
    icon: CheckCircle2
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28 bg-[#151517] border-y border-luxury-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-luxury-gold inline-block"></span>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold">
              EFFORTLESS PROCESS
            </span>
            <span className="w-6 h-[1px] bg-luxury-gold inline-block"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.15] mb-4">
            How Your Journey is Arranged
          </h2>

          <p className="text-sm text-zinc-400 leading-relaxed font-normal">
            A clear, four-step executive procedure ensuring every travel detail is verified, coordinated, and tailored around your personal schedule.
          </p>
        </div>

        {/* 4-Step Horizontal Process with Connecting Line */}
        <div className="relative">
          {/* Subtle Horizontal Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent -translate-y-8 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((st, idx) => {
              const IconComp = st.icon;
              return (
                <div
                  key={idx}
                  className="bg-luxury-card border border-luxury-border rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-luxury-gold/50 transition-all duration-300 shadow-luxury group hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-3xl font-bold text-luxury-gold/40 group-hover:text-luxury-gold transition-colors">
                        {st.step}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-luxury-surface border border-luxury-border flex items-center justify-center text-luxury-gold group-hover:border-luxury-gold/40 group-hover:bg-luxury-gold/10 transition-all shadow-sm">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-serif text-xl font-normal text-white mb-2.5 group-hover:text-luxury-gold transition-colors">
                      {st.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reassurance Disclaimer Box */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-luxury-bg/80 border border-luxury-border max-w-3xl mx-auto flex items-center gap-3 text-xs text-zinc-400 shadow-md">
          <AlertCircle className="w-5 h-5 text-luxury-gold shrink-0" />
          <p>
            <strong className="text-white">Quotation Policy:</strong> Submitting a ride request initiates a personalized quotation review. Transportation is officially confirmed upon mutual agreement with our dispatch team.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
