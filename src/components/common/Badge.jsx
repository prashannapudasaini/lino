import React from 'react';

const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const variants = {
    default: "bg-luxury-elevated text-luxury-textSecondary border-luxury-border",
    gold: "bg-luxury-gold/15 text-luxury-gold border-luxury-gold/30",
    
    // 7 Standard Booking & Quote Request Statuses
    new_request: "bg-blue-950/50 text-blue-300 border-blue-700/50",
    under_review: "bg-amber-950/50 text-amber-300 border-amber-700/50",
    quote_sent: "bg-purple-950/50 text-purple-300 border-purple-700/50",
    awaiting_customer_response: "bg-sky-950/50 text-sky-300 border-sky-700/50",
    confirmed: "bg-emerald-950/50 text-emerald-300 border-emerald-700/50",
    completed: "bg-teal-950/50 text-teal-300 border-teal-700/50",
    cancelled: "bg-zinc-800/60 text-zinc-400 border-zinc-700/50",

    // Aliases & fallback matches
    new: "bg-blue-950/50 text-blue-300 border-blue-700/50",
    reviewing: "bg-amber-950/50 text-amber-300 border-amber-700/50",
    pending: "bg-amber-950/50 text-amber-300 border-amber-700/50",
    rejected: "bg-red-950/50 text-red-300 border-red-800/50",
  };

  const sizes = {
    xs: "text-[10px] px-2 py-0.5 rounded",
    sm: "text-xs px-2.5 py-1 rounded-md",
    md: "text-sm px-3 py-1.5 rounded-md",
  };

  // Map backend status strings cleanly
  const rawKey = String(variant || children || '').toLowerCase().trim();
  const normalizedKey = rawKey.replace(/[^a-z0-9]/g, '_');
  const selectedVariant = variants[normalizedKey] || variants.default;

  return (
    <span className={`inline-flex items-center font-medium border ${selectedVariant} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
