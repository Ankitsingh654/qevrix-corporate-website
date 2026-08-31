import React from 'react';
import { ArrowRight, Activity, Shield, Calendar, Rocket, Users, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContactModal } from '../../context/ContactModalContext';
import heroIllustration from '../../assets/hero-illustration.jpg';

export default function HeroSection() {
  const navigate = useNavigate();
  const { openContactModal } = useContactModal();

  const stats = [
    { icon: <Shield className="text-qx-primary" size={24} />, number: "Premium", label: "Quality Standards" },
    { icon: <Rocket className="text-qx-primary" size={24} />, number: "Rapid", label: "Project Execution" },
    { icon: <Activity className="text-qx-primary" size={24} />, number: "End-to-End", label: "Integrated Solutions" },
    { icon: <Users className="text-qx-primary" size={24} />, number: "Dedicated", label: "Expert Support" },
  ];

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-qx-background">
      
      {/* Background abstract gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-qx-primary/5 blur-[120px]"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-qx-primary/5 blur-[100px]"></div>
      </div>

      <div className="max-w-[1536px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-qx-surface border border-qx-border text-xs font-semibold text-qx-primary tracking-widest uppercase mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-qx-primary animate-pulse"></span>
              SYS.ONLINE
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-qx-text tracking-tight leading-[1.1] mb-6">
              Engineering <span className="text-qx-primary">IT, Workforce & Civil</span> Solutions for the Future
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 font-medium leading-relaxed mb-10 max-w-xl">
              QEVRIX is a multi-domain solutions company delivering innovative IT, skilled workforce and civil project services that power progress and build a better tomorrow.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button onClick={() => {
                const element = document.getElementById('services');
                if (element) {
                  const headerOffset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                  });
                }
              }} className="h-12 px-8 text-[15px] font-semibold flex items-center gap-2 group transition-all duration-300">
                Explore Services
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" onClick={() => openContactModal()} className="h-12 px-8 text-[15px] font-semibold flex items-center gap-2 transition-all duration-300 border-2 border-qx-border text-qx-text hover:bg-qx-border/50 hover:border-qx-primary rounded-lg group">
                Contact Us
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform opacity-50 text-qx-text" />
              </Button>
            </div>
          </motion.div>

          {/* Right-Side Visual Composition (Exact User Image with Hue-Rotate) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:flex h-[600px] w-full items-center justify-center"
          >
            {/* Ambient Background Glow behind the image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-qx-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

            {/* The Actual User Illustration Image */}
            <div className="relative w-[500px] h-auto rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(255,90,0,0.15)] ring-1 ring-white/10 group">
              <img 
                src={heroIllustration} 
                alt="Qevrix Isometric Illustration" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ 
                  // Hue-rotate to shift the original blue neon to Qevrix orange
                  // Blue is ~220deg, Orange is ~30deg. 30 - 220 = -190deg (or +170deg)
                  filter: 'hue-rotate(170deg) saturate(1.5) contrast(1.1)',
                  mixBlendMode: 'screen' 
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Premium Trust/Value Row (Stats) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 pt-8 flex flex-wrap justify-center lg:justify-between items-center gap-8 bg-qx-surface border border-qx-border rounded-2xl p-8 shadow-sm"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-qx-backgroundAlt border border-qx-border flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-qx-text">{stat.number}</div>
                <div className="text-sm text-qx-textSecondary font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

