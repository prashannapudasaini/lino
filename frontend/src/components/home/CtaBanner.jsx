import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import Button from '../common/Button';

const CtaBanner = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-luxury-surface via-luxury-card to-luxury-bg border-t border-luxury-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(197,164,109,0.08)_0%,transparent_60%)]" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-6 h-[1px] bg-luxury-gold/60 inline-block"></span>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-luxury-gold">
            Everest Executive Limo LLC
          </span>
          <span className="w-6 h-[1px] bg-luxury-gold/60 inline-block"></span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-luxury-textPrimary mb-6 tracking-tight leading-tight">
          Your Journey Deserves Exceptional Service.
        </h2>

        <p className="text-sm sm:text-base text-luxury-textSecondary max-w-2xl mx-auto mb-8 leading-relaxed">
          Experience executive ground travel orchestrated with precision, comfort, and uncompromising attention to detail.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/quote">
            <Button size="lg" variant="primary" className="tracking-wider uppercase text-xs font-bold w-full sm:w-auto shadow-luxury-gold">
              Request Your Ride <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <a href="tel:+17175550199">
            <Button size="lg" variant="secondary" className="tracking-wider uppercase text-xs w-full sm:w-auto">
              <Phone className="w-3.5 h-3.5 mr-2 text-luxury-gold" /> Speak with Dispatch
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;

