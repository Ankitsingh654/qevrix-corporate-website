import React from 'react';
import { motion } from 'framer-motion';
import logoNew from '../../assets/qevrix-logo.png';

const CompanyLogo = ({ 
  className = "", 
  withText = true, 
  size = "md",
  theme = "dark"
}) => {
  const sizes = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
    xl: "h-20"
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center cursor-pointer group ${className}`}>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center justify-center overflow-hidden rounded-lg`}
      >
        <img src={logoNew} alt="Qevrix Logo" className={`${currentSize} w-auto object-contain`} />
      </motion.div>
    </div>
  );
};

export default CompanyLogo;
