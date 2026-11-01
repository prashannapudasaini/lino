import React from 'react';

const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const variants = {
    default: "bg-luxury-elevated text-luxury-textSecondary border-luxury-border",
    gold: "bg-luxury-gold/15 text-luxury-gold border-luxury-gold/30",
    new: "bg-blue-950/40 text-blue-300 border-blue-800/40",
    reviewing: "bg-amber-950/40 text-amber-300 border-amber-800/40",
    quote_sent: "bg-purple-950/40 text-purple-300 border-purple-800/40",
    confirmed: "bg-emerald-950/40 text-emerald-300 border-emerald-800/40",
    completed: "bg-teal-950/40 text-teal-300 border-teal-800/40",
    cancelled: "bg-zinc-800/50 text-zinc-400 border-zinc-700/50",
    rejected: "bg-red-950/40 text-red-300 border-red-800/40",
  };

  const sizes = {
    xs: "text-[10px] px-2 py-0.5 rounded",
    sm: "text-xs px-2.5 py-1 rounded-md",
    md: "text-sm px-3 py-1.5 rounded-md",
  };

  // Map backend status strings cleanly
  const normalizedKey = variant.toLowerCase().replace(/\s+/g, '_');
  const selectedVariant = variants[normalizedKey] || variants.default;

  return (
    <span className={`inline-flex items-center font-medium border ${selectedVariant} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
