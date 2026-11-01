import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield, ArrowRight, Lock } from 'lucide-react';
import Button from './Button';

const Footer = () => {
  return (
    <footer className="bg-luxury-bg border-t border-luxury-border text-luxury-textSecondary pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Luxury CTA Strip */}
        <div className="bg-gradient-to-r from-luxury-surface via-luxury-card to-luxury-surface border border-luxury-border rounded-2xl p-6 sm:p-10 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-luxury">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-luxury-textPrimary mb-2">
              Ready for First-Class Ground Transportation?
            </h3>
            <p className="text-sm text-luxury-textSecondary">
              Receive a bespoke, all-inclusive quotation for your executive travel or airport arrival.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link to="/book-now">
              <Button size="md" variant="primary" className="w-full sm:w-auto tracking-wide">
                Request Your Ride <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="tel:+17175550199">
              <Button size="md" variant="secondary" className="w-full sm:w-auto">
                <Phone className="w-4 h-4 mr-2 text-luxury-gold" /> (717) 555-0199
              </Button>
            </a>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-luxury-card border border-luxury-gold/50 flex items-center justify-center">
                <svg className="w-5 h-5 text-luxury-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 20L12 4l9 16H3z" />
                  <path d="M8 20l4-7 4 7H8z" fill="currentColor" fillOpacity="0.2" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-wider text-luxury-textPrimary block leading-none">
                  EVEREST EXECUTIVE
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold font-medium">
                  Limousine LLC
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-luxury-textSecondary pr-4">
              A premier executive transportation and private chauffeur service based in Pennsylvania, delivering discretion, comfort, and punctuality across the Mid-Atlantic and Tri-State corridors.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-luxury-textPrimary">
                <Phone className="w-3.5 h-3.5 text-luxury-gold" />
                <a href="tel:+17175550199" className="hover:text-luxury-gold transition-colors font-medium">
                  +1 (717) 555-0199
                </a>
              </div>
              <div className="flex items-center gap-2 text-luxury-textPrimary">
                <Mail className="w-3.5 h-3.5 text-luxury-gold" />
                <a href="mailto:reservations@everestlimo.com" className="hover:text-luxury-gold transition-colors">
                  reservations@everestlimo.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-luxury-textSecondary">
                <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
                <span>Harrisburg, PA — Serving PA, NY, NJ & DC</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-luxury-textPrimary mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-luxury-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-luxury-gold transition-colors">About Our Company</Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-luxury-gold transition-colors">Our Luxury Fleet</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-luxury-gold transition-colors">Executive Services</Link>
              </li>
              <li>
                <Link to="/service-areas" className="hover:text-luxury-gold transition-colors">Regional Service Areas</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-luxury-gold transition-colors">Contact & Dispatch</Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-luxury-textPrimary mb-4">
              Chauffeur Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/services" className="hover:text-luxury-gold transition-colors">Airport Transfers</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-luxury-gold transition-colors">Corporate Travel</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-luxury-gold transition-colors">Private Hourly Chauffeur</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-luxury-gold transition-colors">Special Events Transportation</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-luxury-gold transition-colors">Roadshows & VIP Itineraries</Link>
              </li>
            </ul>
          </div>

          {/* Airport Transportation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-luxury-textPrimary mb-4">
              Major Airports
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/airport-transportation" className="hover:text-luxury-gold transition-colors">
                  <span className="text-luxury-gold font-semibold">MDT</span> — Harrisburg Int'l
                </Link>
              </li>
              <li>
                <Link to="/airport-transportation" className="hover:text-luxury-gold transition-colors">
                  <span className="text-luxury-gold font-semibold">PHL</span> — Philadelphia Int'l
                </Link>
              </li>
              <li>
                <Link to="/airport-transportation" className="hover:text-luxury-gold transition-colors">
                  <span className="text-luxury-gold font-semibold">EWR</span> — Newark Liberty Int'l
                </Link>
              </li>
              <li>
                <Link to="/airport-transportation" className="hover:text-luxury-gold transition-colors">
                  <span className="text-luxury-gold font-semibold">JFK</span> — John F. Kennedy
                </Link>
              </li>
              <li>
                <Link to="/airport-transportation" className="hover:text-luxury-gold transition-colors">
                  <span className="text-luxury-gold font-semibold">LGA</span> — LaGuardia Airport
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Industry Accreditation & Trust Strip */}
        <div className="py-6 border-t border-luxury-border/60 my-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="font-serif text-sm font-semibold text-white tracking-wide">NLA Member</span>
              <span className="text-[10px] text-zinc-400 mt-0.5">National Limousine Association</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="font-serif text-sm font-semibold text-white tracking-wide">USDOT & PA PUC</span>
              <span className="text-[10px] text-zinc-400 mt-0.5">Licensed & Insured Passenger Carrier</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="font-serif text-sm font-semibold text-[#C5A46D] tracking-wide">FlightAware®</span>
              <span className="text-[10px] text-zinc-400 mt-0.5">Integrated Live Radar Dispatch</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="font-serif text-sm font-semibold text-white tracking-wide">5.0 ★ Rating</span>
              <span className="text-[10px] text-zinc-400 mt-0.5">Verified Executive Client Reviews</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Disclaimer */}
        <div className="pt-8 border-t border-luxury-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-luxury-textMuted">
          <div>
            &copy; {new Date().getFullYear()} Everest Executive Limo LLC. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-luxury-textPrimary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-luxury-textPrimary transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/admin/login" className="flex items-center gap-1 text-luxury-textMuted hover:text-luxury-gold transition-colors">
              <Lock className="w-3 h-3" /> Admin Portal
            </Link>
          </div>
        </div>

        {/* Transparency note */}
        <div className="mt-4 text-[11px] text-center text-luxury-textMuted leading-normal">
          Submitting a request through this website constitutes a quotation inquiry and is subject to review and confirmation by dispatch. Rides are officially scheduled upon final team confirmation.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
