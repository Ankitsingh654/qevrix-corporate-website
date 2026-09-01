import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in
    setTimeout(() => setOpacity(100), 100);

    // Fade out and unmount (increased duration for video to play)
    setTimeout(() => {
      setOpacity(0);
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 500); // Wait for fade out
    }, 3500); // Display for 3.5s
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500`}
      style={{ opacity: opacity / 100 }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-contain p-4 md:p-12"
      >
        <source src="/assets/splash-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
