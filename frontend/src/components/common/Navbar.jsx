import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, Shield } from 'lucide-react';
import Button from './Button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Airports', path: '/airport-transportation' },
  { name: 'Service Areas', path: '/service-areas' },
  { name: 'Our Fleet', path: '/fleet' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-luxury-bg/95 backdrop-blur-md border-b border-luxury-border py-3 shadow-luxury'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-luxury-gold/50 rounded-lg p-1">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-luxury-card to-luxury-surface border border-luxury-gold/40 flex items-center justify-center shadow-luxury-glow group-hover:border-luxury-gold transition-colors">
                {/* Everest Mountain Geometric Crest */}
                <svg className="w-6 h-6 text-luxury-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M3 20L12 4l9 16H3z" />
                  <path d="M8 20l4-7 4 7H8z" fill="currentColor" fillOpacity="0.2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-luxury-textPrimary group-hover:text-luxury-gold transition-colors leading-tight">
                  EVEREST
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold font-medium">
                  Executive Limo
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-xs xl:text-sm tracking-wide rounded-md transition-all duration-200 font-medium ${
                    isActive(link.path)
                      ? 'text-luxury-gold bg-luxury-gold/10'
                      : 'text-luxury-textSecondary hover:text-luxury-textPrimary hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="tel:+17175550199"
                className="hidden xl:flex items-center gap-2 text-xs text-luxury-textSecondary hover:text-luxury-gold transition-colors font-medium tracking-wide"
                title="Call 24/7 Dispatch"
              >
                <div className="w-7 h-7 rounded-full bg-luxury-card border border-luxury-border flex items-center justify-center text-luxury-gold">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>(717) 555-0199</span>
              </a>

              <Link to="/quote">
                <Button size="sm" variant="primary" className="text-xs uppercase tracking-wider font-semibold">
                  Get a Quote
                </Button>
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
              <Link to="/quote" className="sm:hidden">
                <Button size="sm" variant="primary" className="text-xs px-3 min-h-[38px]">
                  Quote
                </Button>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                className="p-2.5 rounded-lg bg-luxury-card border border-luxury-border text-luxury-textPrimary hover:text-luxury-gold hover:border-luxury-gold/50 transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-luxury-gold" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Drawer */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-luxury-bg border-l border-luxury-border p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-luxury-border mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-luxury-card border border-luxury-gold/40 flex items-center justify-center">
                  <svg className="w-5 h-5 text-luxury-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 20L12 4l9 16H3z" />
                  </svg>
                </div>
                <span className="font-serif text-base font-bold text-luxury-textPrimary">
                  EVEREST EXECUTIVE
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-luxury-textSecondary hover:text-luxury-gold min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-colors ${
                    isActive(link.path)
                      ? 'text-luxury-gold bg-luxury-gold/10 font-semibold border-l-2 border-luxury-gold'
                      : 'text-luxury-textSecondary hover:text-luxury-textPrimary hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-luxury-border space-y-4">
            <Link to="/quote" className="block w-full">
              <Button size="md" variant="primary" className="w-full justify-center">
                Request a Ride
              </Button>
            </Link>

            <a
              href="tel:+17175550199"
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-luxury-card border border-luxury-border text-xs text-luxury-textSecondary hover:text-luxury-gold font-medium"
            >
              <Phone className="w-4 h-4 text-luxury-gold" />
              <span>Direct Line: +1 (717) 555-0199</span>
            </a>

            <div className="text-center text-[11px] text-luxury-textMuted tracking-wider">
              Serving PA, NY, NJ & Washington D.C.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
