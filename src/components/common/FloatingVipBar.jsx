import React, { useState, useEffect } from 'react';
import { Phone, Check, Shield } from 'lucide-react';

const FloatingVipBar = () => {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('+17175550199');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside
      aria-label="24/7 VIP Dispatch Contact Bar"
      className={`fixed bottom-6 left-4 sm:left-6 z-40 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-2 bg-[#0B0B0C]/90 backdrop-blur-md border border-[#C5A46D]/40 text-white pl-3.5 pr-4 py-2 rounded-full shadow-2xl shadow-black/80 hover:border-[#C5A46D] transition-all group">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>

        <a
          href="tel:+17175550199"
          className="flex items-center gap-2 text-xs font-medium tracking-wide hover:text-[#C5A46D] transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[#C5A46D] group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-zinc-300 text-[11px] uppercase tracking-wider">24/7 Dispatch:</span>
          <span className="font-semibold text-white tracking-wider">(717) 555-0199</span>
        </a>

        <button
          onClick={handleCopy}
          className="ml-1 text-[10px] text-zinc-400 hover:text-white px-2 py-0.5 rounded bg-white/5 border border-white/10 transition-colors"
          title="Copy Phone Number"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : 'Copy'}
        </button>
      </div>
    </aside>
  );
};

export default FloatingVipBar;
