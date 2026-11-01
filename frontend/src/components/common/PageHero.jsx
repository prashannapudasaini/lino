import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const PageHero = ({
  eyebrow,
  title,
  subtitle,
  breadcrumb = [],
  backgroundImage = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=80",
  className = ""
}) => {
  return (
    <div className={`relative pt-32 pb-16 sm:pb-20 overflow-hidden bg-luxury-bg border-b border-luxury-border ${className}`}>
      {/* Background Image with Dark Gradient Wash */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-[1.05]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-luxury-bg/75 to-black/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumb.length > 0 && (
          <nav className="flex items-center gap-2 text-xs text-luxury-textMuted mb-6 font-medium tracking-wide">
            <Link to="/" className="hover:text-luxury-gold transition-colors">
              Home
            </Link>
            {breadcrumb.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3 h-3 text-luxury-border" />
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-luxury-gold transition-colors">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-luxury-gold">{crumb.name}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="max-w-3xl">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-luxury-gold/60 inline-block"></span>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-luxury-gold">
                {eyebrow}
              </span>
            </div>
          )}

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-luxury-textPrimary tracking-tight mb-4 leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg text-luxury-textSecondary leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
