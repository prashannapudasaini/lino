import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Airport Transportation', path: '/airport-transportation' },
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
            ? 'bg-[#0B0B0C]/95 backdrop-blur-md border-b border-[#242428] py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Everest Mountain Geometric Crest & Brand */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-8 h-8 flex items-center justify-center text-[#C5A46D] shrink-0">
                <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" stroke="currentColor">
                  {/* Three Mountain Peaks Icon */}
                  <path d="M4 24L16 6l12 18H4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 24l6-9 6 9H10z" fill="#C5A46D" fillOpacity="0.25" strokeWidth="1.5" />
                  <path d="M16 15l-3 4.5h6L16 15z" fill="#C5A46D" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg font-bold tracking-[0.2em] text-white uppercase leading-tight group-hover:text-[#C5A46D] transition-colors">
                  EVEREST
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#C5A46D] font-medium leading-none mt-0.5">
                  EXECUTIVE LIMO
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative text-xs tracking-wider font-medium transition-colors py-1.5 ${
                      active
                        ? 'text-white font-semibold'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A46D] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Action: Pill Button */}
            <div className="hidden sm:flex items-center">
              <Link
                to="/book-now"
                className="relative overflow-hidden group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#C5A46D] hover:bg-[#D5B982] text-[#0B0B0C] font-semibold text-xs tracking-wider transition-all duration-300 shadow-luxury-gold active:scale-95"
              >
                <span className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-shimmer pointer-events-none" />
                <span className="relative z-10">Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                className="p-2 text-zinc-300 hover:text-[#C5A46D] focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#C5A46D]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#0B0B0C] border-l border-[#242428] p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#242428] mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 text-[#C5A46D]">
                  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" stroke="currentColor">
                    <path d="M4 24L16 6l12 18H4z" strokeWidth="2" />
                    <path d="M10 24l6-9 6 9H10z" fill="#C5A46D" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-sm font-bold text-white tracking-wider">
                    EVEREST
                  </span>
                  <span className="text-[9px] text-[#C5A46D] tracking-widest uppercase">
                    EXECUTIVE LIMO
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-zinc-400 hover:text-[#C5A46D] min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-colors ${
                    isActive(link.path)
                      ? 'text-[#C5A46D] bg-[#C5A46D]/10 font-semibold border-l-2 border-[#C5A46D]'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#242428] space-y-4">
            <Link
              to="/book-now"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#C5A46D] text-[#0B0B0C] font-semibold text-xs uppercase tracking-wider shadow-luxury-gold"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href="tel:+17175550199"
              className="block text-center text-xs text-zinc-400 hover:text-[#C5A46D] transition-colors"
            >
              24/7 Dispatch: +1 (717) 555-0199
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
