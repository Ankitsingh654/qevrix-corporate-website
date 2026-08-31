import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContactModal } from '../../context/ContactModalContext';

export default function CallToAction() {
  const { openContactModal } = useContactModal();
  return (
    <section className="relative overflow-hidden w-full bg-gradient-to-r from-[#E04D00] via-[#FF5A00] to-[#FF7828]">
      
      {/* Decorative Particle Waves on Left & Right Edges */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
          backgroundSize: '20px 20px',
          maskImage: 'linear-gradient(to right, black 0%, transparent 25%, transparent 75%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 25%, transparent 75%, black 100%)'
        }}
      ></div>

      <div className="max-w-[1536px] mx-auto px-10 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* Left Side Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center md:text-left mb-8 md:mb-0"
        >
          <div className="text-sm font-bold text-white/70 tracking-[0.15em] uppercase font-mono mb-3 flex items-center justify-center md:justify-start gap-2">
            <span className="text-white/40">//</span> LET'S BUILD TOMORROW
          </div>
          <h2 className="text-4xl md:text-[44px] font-bold text-white mb-3 tracking-tight">
            Ready to build with QEVRIX?
          </h2>
          <p className="text-white/80 text-[16px] font-medium tracking-wide">
            Let's connect and create solutions that power progress.
          </p>
        </motion.div>
        
        {/* Right Side Button */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="flex-shrink-0"
        >
          <button 
            onClick={() => openContactModal()} 
            className="h-[54px] px-8 text-[16px] font-semibold flex items-center gap-3 group/btn transition-all duration-300 bg-white/10 text-white hover:bg-white hover:text-[#FF5A00] rounded-xl border border-white/30 hover:border-white shadow-[0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-sm"
          >
            <span>Get in Touch</span> 
            <ArrowRight size={20} className="group-hover/btn:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>
        
      </div>
    </section>
  );
}
