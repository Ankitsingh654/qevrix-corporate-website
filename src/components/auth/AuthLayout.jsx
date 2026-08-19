import React from 'react';
import { ShieldCheck, BookOpen, Briefcase, Users, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import CompanyLogo from '../ui/CompanyLogo';

const AuthLayout = ({ children, title, subtitle }) => {

  const features = [
    { icon: <BookOpen size={18} strokeWidth={1.5} />, title: "Industry Ready", desc: "Learn industry best practices" },
    { icon: <Briefcase size={18} strokeWidth={1.5} />, title: "Real Projects", desc: "Work on real-world projects" },
    { icon: <Users size={18} strokeWidth={1.5} />, title: "Expert Mentors", desc: "Guidance from industry experts" },
    { icon: <GraduationCap size={18} strokeWidth={1.5} />, title: "Career Support", desc: "Get placement assistance" }
  ];

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#0F172A] relative flex flex-col items-center justify-between py-12 px-4 sm:px-6 overflow-hidden selection:bg-[#2563EB] selection:text-white">
      
      {/* Enterprise Background Layering */}
      {/* 1. Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F1F5F9] via-[#F8FAFC] to-[#E2EAF4] -z-20" />
      
      {/* 2. Grid Texture */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, #0F172A 1px, transparent 1px), linear-gradient(to bottom, #0F172A 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* 2.5 Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 3. Radial Glows & Blur Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-blue-300/20 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-300/20 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[1000px] h-[600px] bg-white/40 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Header Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center mb-10 z-10"
      >
        <CompanyLogo size="lg" />
      </motion.div>

      {/* Main Content Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="flex-grow flex items-center justify-center w-full max-w-[720px] z-10 my-4"
      >
        <div className="bg-white/90 backdrop-blur-2xl border border-white/60 shadow-[0_24px_80px_-12px_rgba(37,99,235,0.08),0_4px_16px_rgba(0,0,0,0.04)] rounded-[24px] p-8 sm:p-12 w-full relative overflow-hidden">
          
          {/* Glass Highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
          
          {/* Header Texts */}
          {(title || subtitle) && (
            <div className="mb-10 text-center">
              {title && <h2 className="text-[32px] leading-tight font-extrabold tracking-tight text-[#0F172A] mb-3">{title}</h2>}
              {subtitle && <p className="text-base text-[#475569]">{subtitle}</p>}
            </div>
          )}

          {children}
          
          {/* Card Footer */}
          <div className="mt-12 pt-6 border-t border-gray-100/80 flex items-center justify-center gap-2 text-[13px] text-gray-500 font-medium">
            <ShieldCheck size={16} className="text-gray-400" />
            <span>Your data is protected with enterprise-grade security.</span>
          </div>
        </div>
      </motion.div>

      {/* Page Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 w-full max-w-5xl z-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {features.map((feat, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -4 }}
              className="flex flex-col items-center sm:items-start sm:flex-row gap-4 p-4 rounded-2xl hover:bg-white/50 transition-colors border border-transparent hover:border-white/40 hover:shadow-sm cursor-default"
            >
              <div className="p-3 bg-blue-50 text-[#2563EB] rounded-xl shadow-sm border border-blue-100/50">
                {feat.icon}
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-[15px] font-bold text-[#0F172A]">{feat.title}</h4>
                <p className="text-[13px] text-[#475569] mt-1 leading-snug">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
