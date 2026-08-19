import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  variant = "primary",
  className = "",
  icon: Icon,
  ...props
}) => {
  const baseClasses = "relative w-full font-bold h-[56px] rounded-xl text-[15px] flex items-center justify-center gap-3 transition-all duration-300 focus:outline-none focus-visible:ring-4 overflow-hidden";
  
  const variants = {
    primary: `bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white shadow-[0_10px_20px_-10px_rgba(15,23,42,0.5)] focus-visible:ring-[#0F172A]/20`,
    secondary: `bg-white border-2 border-[#E2E8F0] text-[#0F172A] shadow-sm hover:border-[#CBD5E1] focus-visible:ring-[#E2E8F0]`,
    disabled: `bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border border-transparent`
  };

  const currentVariant = disabled || loading ? variants.disabled : variants[variant];
  
  // Animation for primary hover
  const hoverProps = (disabled || loading) ? {} : {
    whileHover: { y: -2, scale: 1.01 },
    whileTap: { y: 0, scale: 0.98 }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${currentVariant} ${className}`}
      {...hoverProps}
      {...props}
    >
      {/* Shine effect for primary button on hover */}
      {variant === 'primary' && !disabled && !loading && (
        <div className="absolute inset-0 -translate-x-full hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      )}

      {loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <Loader2 size={20} className="animate-spin" />
        </motion.div>
      )}
      
      {!loading && Icon && (
        <Icon size={20} className={variant === 'primary' ? 'text-white/80' : 'text-gray-500'} />
      )}
      
      <span>{loading ? "Please wait..." : children}</span>
    </motion.button>
  );
};

export default AuthButton;
