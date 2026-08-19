import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Cpu, PlayCircle } from 'lucide-react';

const WelcomeBanner = ({ user, estimatedMinutesLeft }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-slate-900 border border-slate-800 shadow-2xl p-10">
      {/* Multi-layer gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-900 to-indigo-900/40"></div>
      
      {/* Soft Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')] opacity-30"></div>
      
      {/* Radial Lighting / Soft Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[80px] transform -translate-x-1/2 translate-y-1/2"></div>

      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[15%]"
        >
          <Code2 size={48} className="text-blue-400" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[5%]"
        >
          <Terminal size={40} className="text-indigo-400" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -15, 0], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] right-[30%]"
        >
          <Cpu size={64} className="text-slate-400" />
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center justify-between">
        <div className="max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-500/30 px-3 py-1.5 rounded-full mb-6 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Estimated Setup Time: {estimatedMinutesLeft} Minutes</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            {getGreeting()}, {user?.name} <span className="inline-block origin-bottom-right animate-wave">👋</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 font-medium mb-2"
          >
            Welcome to QEVRIX Engineering.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg mb-8 leading-relaxed"
          >
            You're now part of a Virtual Software Engineering Company. Complete your engineering setup to unlock your Engineering Workspace.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-semibold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95">
              <PlayCircle size={20} />
              Resume Engineering Journey
            </button>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white px-6 py-3.5 rounded-xl font-semibold backdrop-blur-md transition-all active:scale-95">
              Explore Engineering Program
            </button>
          </motion.div>
        </div>

        {/* Mission Status Card (Glass Overlay) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="w-full lg:w-auto min-w-[280px] bg-white/5 border border-white/10 backdrop-blur-xl rounded-[20px] p-6 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
          
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Engineering Mission</div>
          <div className="text-xl font-bold text-white mb-6">Complete Engineering Profile</div>
          
          <div className="space-y-4">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mission Reward</div>
              <div className="text-sm font-medium text-blue-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Unlock Experience Selection
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
