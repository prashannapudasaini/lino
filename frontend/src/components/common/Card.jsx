import React from 'react';

const Card = ({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-luxury-surface/90 border border-luxury-border/80 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 ${
        hoverEffect ? 'hover:border-luxury-gold/40 hover:-translate-y-1 hover:shadow-luxury' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

