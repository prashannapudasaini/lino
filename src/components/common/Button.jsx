import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variants = {
    primary: "bg-luxury-gold text-luxury-bg hover:bg-luxury-goldHover font-semibold shadow-luxury-gold hover:shadow-luxury-glow border border-luxury-gold/80",
    secondary: "bg-luxury-card text-luxury-textPrimary hover:bg-luxury-elevated border border-luxury-border hover:border-luxury-gold/40 text-luxury-textPrimary",
    outline: "bg-transparent text-luxury-gold border border-luxury-gold/50 hover:bg-luxury-gold/10 hover:border-luxury-gold",
    ghost: "bg-transparent text-luxury-textSecondary hover:text-luxury-textPrimary hover:bg-white/5",
    danger: "bg-red-950/40 text-red-400 border border-red-800/50 hover:bg-red-900/40"
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 rounded-md min-h-[36px]",
    md: "text-sm px-5 py-2.5 rounded-lg min-h-[44px]",
    lg: "text-base px-7 py-3.5 rounded-lg min-h-[50px] tracking-wide",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin text-current" />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

