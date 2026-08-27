import React from 'react';
import { ArrowRight, Activity, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-qx-background pt-24 pb-16">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-qx-primary/20 blur-[150px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content (Preserved Typography & Buttons) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-qx-text tracking-tight mb-6 leading-[1.15]"
            >
              Building Solutions.<br />
              <span className="text-qx-primary">
                Powering Progress.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-[500px] text-[18px] md:text-[20px] text-qx-textSecondary mb-8 leading-relaxed font-medium"
            >
              QEVRIX delivers technology, workforce, and civil solutions to help businesses build, operate, and grow with confidence.
            </motion.p>

            {/* Premium product announcement */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mb-8 max-w-[540px] text-left"
            >
              <div className="bg-qx-surface/80 border border-qx-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md transition-colors hover:border-qx-primary/30">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-qx-primary animate-pulse flex-shrink-0" />
                  <span className="text-[13px] text-qx-textSecondary font-medium leading-relaxed">
                    <strong className="text-white font-bold block mb-0.5">Virtual Software Company</strong> 
                    Gain practical experience in a structured software environment.
                  </span>
                </div>
                <button 
                  onClick={() => {
                    navigate('/engineering');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[13px] font-semibold text-qx-primary hover:text-qx-primaryHover transition-colors whitespace-nowrap flex-shrink-0"
                >
                  Explore Program &rarr;
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4"
            >
              <Button onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }} className="h-12 px-8 text-[15px] font-semibold shadow-sm flex items-center gap-2 group transition-transform bg-qx-primary hover:bg-qx-primaryHover text-white rounded-lg">
                <span className="relative z-10 flex items-center gap-2">
                  Discuss Your Project
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button variant="secondary" onClick={() => {
                const element = document.getElementById('services');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }} className="h-12 px-8 text-[15px] font-semibold flex items-center gap-2 transition-all duration-300 border border-qx-border bg-transparent hover:bg-qx-surface rounded-lg text-white">
                Explore Services
              </Button>
            </motion.div>
          </motion.div>

          {/* Premium Right-Side Visual Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block h-[600px] w-full perspective-1000"
          >
            {/* Center Glowing Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-qx-primary/20 blur-[80px] rounded-full animate-pulse-slow"></div>

            {/* Main Glass Panel */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] bg-qx-surface/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
            >
              <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-4 text-xs font-medium text-qx-textMuted tracking-wider">qevrix-enterprise-os</div>
              </div>
              <div className="p-6 h-full relative">
                {/* Abstract Data Visual */}
                <div className="flex items-end gap-3 h-32 mb-6">
                  {[40, 70, 45, 90, 65, 80, 55, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                      className="flex-1 bg-gradient-to-t from-qx-primary to-blue-400 rounded-t-sm opacity-80"
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs font-mono text-qx-primary/70">
                  <span>SYS_ONLINE</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> 99.99% Uptime</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 1 */}
            <motion.div 
              animate={{ y: [0, 15, 0], rotate: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute top-12 right-0 w-[220px] bg-qx-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-xl flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-qx-primary/20 flex items-center justify-center text-qx-primary">
                <Shield size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Enterprise Security</div>
                <div className="text-xs text-qx-textSecondary">Zero-trust architecture</div>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-20 -left-10 w-[240px] bg-qx-surface/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-xl flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Activity size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-white">AI Telemetry</div>
                <div className="text-xs text-qx-textSecondary">Real-time processing</div>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Premium Trust/Value Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-qx-border flex flex-wrap justify-between items-center gap-6"
        >
          <div className="text-[14px] font-semibold text-qx-textMuted tracking-wide">
            Technology Solutions
          </div>
          <div className="text-[14px] font-semibold text-qx-textMuted tracking-wide">
            Workforce Solutions
          </div>
          <div className="text-[14px] font-semibold text-qx-textMuted tracking-wide">
            Infrastructure Support
          </div>
          <div className="text-[14px] font-semibold text-qx-textMuted tracking-wide">
            Secure by Design
          </div>
        </motion.div>
      </div>
    </section>
  );
}
