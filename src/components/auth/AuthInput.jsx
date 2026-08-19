import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const AuthInput = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  success,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onRightIconClick,
  rightIconAriaLabel,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full relative">
      {label && (
        <label htmlFor={id} className="text-[13px] font-bold text-[#0F172A] tracking-wide">
          {label}
        </label>
      )}
      <div className="relative flex items-center group">
        {LeftIcon && (
          <div className={`absolute left-4 transition-colors duration-300 pointer-events-none ${error ? 'text-red-400' : success ? 'text-green-500' : 'text-gray-400 group-focus-within:text-[#2563EB]'}`}>
            <LeftIcon size={20} strokeWidth={2} />
          </div>
        )}
        
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`
            w-full h-[56px] bg-[#F8FAFC] border-2 rounded-xl text-[15px] outline-none transition-all duration-300 placeholder-gray-400 text-[#0F172A] font-medium shadow-sm
            ${error 
              ? 'border-red-200 bg-red-50/30 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10' 
              : success 
                ? 'border-green-200 bg-green-50/30 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10' 
                : 'border-transparent hover:border-gray-200 focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/10'
            }
            ${LeftIcon ? 'pl-11' : 'pl-4'} 
            ${(RightIcon || success || error) ? 'pr-12' : 'pr-4'}
          `}
          {...props}
        />

        <div className="absolute right-4 flex items-center gap-2">
          <AnimatePresence>
            {error && !RightIcon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <AlertCircle size={20} className="text-red-500" strokeWidth={2.5} />
              </motion.div>
            )}
            {success && !RightIcon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <CheckCircle2 size={20} className="text-green-500" strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>

          {RightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              aria-label={rightIconAriaLabel || "Action"}
              className="text-gray-400 hover:text-[#0F172A] transition-colors focus:outline-none p-1 rounded-md focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              <RightIcon size={20} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="text-[13px] text-red-500 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthInput;
