import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'gold' }) => {
  const colorMap = {
    gold: "text-luxury-gold bg-luxury-gold/10 border-luxury-gold/30",
    blue: "text-blue-400 bg-blue-950/40 border-blue-800/40",
    amber: "text-amber-400 bg-amber-950/40 border-amber-800/40",
    purple: "text-purple-400 bg-purple-950/40 border-purple-800/40",
    emerald: "text-emerald-400 bg-emerald-950/40 border-emerald-800/40",
    teal: "text-teal-400 bg-teal-950/40 border-teal-800/40",
  };

  return (
    <div className="bg-luxury-surface border border-luxury-border rounded-xl p-5 shadow-luxury flex items-start justify-between">
      <div>
        <span className="text-xs uppercase tracking-wider text-luxury-textMuted font-medium block mb-1">
          {title}
        </span>
        <div className="text-2xl sm:text-3xl font-bold text-luxury-textPrimary tracking-tight">
          {value}
        </div>
        {subtitle && (
          <p className="text-[11px] text-luxury-textSecondary mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {Icon && (
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${colorMap[color] || colorMap.gold}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};

export default StatCard;

