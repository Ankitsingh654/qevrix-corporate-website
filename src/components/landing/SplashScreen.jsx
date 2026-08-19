import React, { useEffect, useState } from 'react';
import logoIcon from '../../assets/logo-icon.svg';

export default function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in
    setTimeout(() => setOpacity(100), 100);

    // Fade out and unmount
    setTimeout(() => {
      setOpacity(0);
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 500); // Wait for fade out
    }, 1500); // Display for 1.5s
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#020617] flex items-center justify-center transition-opacity duration-500`}
      style={{ opacity: opacity / 100 }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full scale-150 animate-pulse" />
        <img src={logoIcon} alt="QEVRIX" className="h-32 w-32 relative z-10" />
      </div>
    </div>
  );
}
