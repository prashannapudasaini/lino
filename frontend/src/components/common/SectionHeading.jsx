import React from 'react';

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  light = false
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl mb-12 md:mb-16 ${alignClass} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-6 h-[1px] bg-luxury-gold/60 inline-block"></span>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-luxury-gold">
            {eyebrow}
          </span>
          <span className="w-6 h-[1px] bg-luxury-gold/60 inline-block"></span>
        </div>
      )}
      
      {title && (
        <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight mb-4 ${
          light ? 'text-zinc-900' : 'text-luxury-textPrimary'
        }`}>
          {title}
        </h2>
      )}

      {subtitle && (
        <p className={`text-base md:text-lg leading-relaxed ${
          light ? 'text-zinc-600' : 'text-luxury-textSecondary'
        } max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
