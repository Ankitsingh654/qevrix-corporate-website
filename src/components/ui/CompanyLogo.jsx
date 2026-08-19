import React from 'react';
import { motion } from 'framer-motion';

const CompanyLogo = ({ 
  className = "", 
  withText = true, 
  size = "md",
  theme = "dark" // "dark" for white bg, "light" for dark bg
}) => {
  const sizes = {
    sm: { icon: "w-6 h-6 text-sm", text: "text-lg" },
    md: { icon: "w-8 h-8 text-sm", text: "text-xl" },
    lg: { icon: "w-10 h-10 text-base", text: "text-2xl" },
    xl: { icon: "w-12 h-12 text-lg", text: "text-3xl" }
  };

  const currentSize = sizes[size] || sizes.md;
  const textColor = theme === 'dark' ? 'text-slate-900' : 'text-white';

  return (
    <div className={`flex items-center gap-2.5 cursor-pointer group ${className}`}>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${currentSize.icon} bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:shadow-blue-600/40 transition-shadow`}
      >
        <span className="text-white font-black tracking-tighter">Q</span>
      </motion.div>
      {withText && (
        <span className={`${currentSize.text} font-black ${textColor} tracking-tight`}>
          QEVRIX
        </span>
      )}
    </div>
  );
};

export default CompanyLogo;
