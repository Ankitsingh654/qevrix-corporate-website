import React from 'react';
import { Target, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutQevrix() {
  return (
    <section id="about" className="py-24 bg-qx-surface border-y border-qx-border relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-qx-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Storytelling & Capabilities */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-qx-primary"></span>
              ABOUT QEVRIX
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              One Company. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400">
                Multiple Capabilities.
              </span>
            </h3>
            <p className="text-[16px] text-qx-textSecondary mb-10 leading-relaxed font-medium">
              QEVRIX is a multi-service company operating across technology, workforce, and civil solutions. We combine skilled execution, practical technology, and reliable service delivery to help clients move projects forward.
            </p>

            <div className="space-y-6">
              <div className="flex flex-col border-l-2 border-qx-border pl-5">
                <span className="text-[12px] font-bold text-qx-primary tracking-widest uppercase mb-1">Founded</span>
                <span className="text-[16px] font-bold text-white">2026</span>
              </div>
              <div className="flex flex-col border-l-2 border-qx-border pl-5">
                <span className="text-[12px] font-bold text-qx-primary tracking-widest uppercase mb-1">Technology</span>
                <span className="text-[16px] font-bold text-white">Software & Digital Platforms</span>
              </div>
              <div className="flex flex-col border-l-2 border-qx-border pl-5">
                <span className="text-[12px] font-bold text-qx-primary tracking-widest uppercase mb-1">Workforce</span>
                <span className="text-[16px] font-bold text-white">Operations & Staffing</span>
              </div>
              <div className="flex flex-col border-l-2 border-qx-border pl-5">
                <span className="text-[12px] font-bold text-qx-primary tracking-widest uppercase mb-1">Infrastructure</span>
                <span className="text-[16px] font-bold text-white">Civil & Project Support</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Mission & Vision */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="p-8 lg:p-10 bg-qx-background rounded-[20px] border border-qx-border hover:border-qx-borderHover transition-all shadow-sm">
              <div className="h-12 w-12 rounded-[14px] bg-qx-surface border border-qx-border flex items-center justify-center text-qx-primary mb-6">
                <Target size={24} />
              </div>
              <h4 className="text-[20px] font-bold text-white mb-3 tracking-wide">Our Mission</h4>
              <p className="text-[15px] text-qx-textSecondary leading-relaxed">
                Deliver reliable solutions with accountability across technology development, workforce deployment, and project execution.
              </p>
            </div>

            <div className="p-8 lg:p-10 bg-qx-background rounded-[20px] border border-qx-border hover:border-qx-borderHover transition-all shadow-sm">
              <div className="h-12 w-12 rounded-[14px] bg-qx-surface border border-qx-border flex items-center justify-center text-qx-primary mb-6">
                <Globe size={24} />
              </div>
              <h4 className="text-[20px] font-bold text-white mb-3 tracking-wide">Our Vision</h4>
              <p className="text-[15px] text-qx-textSecondary leading-relaxed">
                Build a trusted and scalable Indian enterprise that brings practical value and sustainable progress to our partners.
              </p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
