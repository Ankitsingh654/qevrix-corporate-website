import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, AlertTriangle } from 'lucide-react';
import AuthInput from './AuthInput';

const AuthPasswordInput = ({
  id,
  label = "Password",
  placeholder = "Enter your password",
  value,
  onChange,
  onBlur,
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);

  // Detect Caps Lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.getModifierState) {
        setCapsLockActive(e.getModifierState('CapsLock'));
      }
    };
    
    // Listen on the window level for better UX
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative">
      <AuthInput
        id={id}
        label={label}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        leftIcon={Lock}
        rightIcon={showPassword ? EyeOff : Eye}
        onRightIconClick={() => setShowPassword(!showPassword)}
        rightIconAriaLabel={showPassword ? "Hide password" : "Show password"}
        {...props}
      />
      
      {/* Caps Lock Warning */}
      <AnimatePresence>
        {capsLockActive && !error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-0 right-0 mt-1 flex items-center gap-1.5 text-orange-500 text-[11px] font-bold tracking-wide"
          >
            <AlertTriangle size={12} strokeWidth={3} />
            CAPS LOCK IS ON
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPasswordInput;
