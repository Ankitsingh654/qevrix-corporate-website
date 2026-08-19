import React from 'react';

export function Button({ children, className = '', onClick, variant = 'primary', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-qx-primary/50 relative overflow-hidden';
  const variants = {
    primary: 'bg-qx-primary text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-0.5',
    secondary: 'bg-white/5 backdrop-blur-md text-white border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5',
    ghost: 'bg-transparent text-white/80 hover:text-white hover:bg-white/5'
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} px-6 py-2.5 text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
