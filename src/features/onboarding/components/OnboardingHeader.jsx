import React, { useState } from 'react';
import { Bell, CloudOff, Cloud, Settings, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CompanyLogo from '../../../components/ui/CompanyLogo';

const OnboardingHeader = ({ user }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_4px_30px_rgb(0,0,0,0.03)] transition-all">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <CompanyLogo />
          
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-200">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-slate-600">Workspace: {user?.workspaceStatus || 'Provisioning'}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 text-slate-400">
            <Cloud size={18} />
            <span className="text-xs font-semibold uppercase tracking-wider">Auto Saved</span>
          </div>

          <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>

          <button className="relative p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors">
            <Bell size={22} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 pl-2 pr-1 py-1 bg-white hover:bg-slate-50 border border-transparent hover:border-slate-200 rounded-full transition-all group"
            >
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-slate-900">{user?.name}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user?.studentId}</span>
              </div>
              <img 
                src={user?.avatar} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-slate-200 object-cover shadow-sm group-hover:border-blue-200 transition-colors"
              />
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform origin-top-right z-50"
                >
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                    <div className="mt-2 inline-block px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-md">
                      Engineering Candidate
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                      <Settings size={16} className="text-slate-400" /> Account Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                      <LogOut size={16} className="text-red-400" /> Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OnboardingHeader;
