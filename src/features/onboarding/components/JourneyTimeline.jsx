import React from 'react';
import { Check, Circle, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const JourneyTimeline = ({ timeline }) => {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="bg-white rounded-[24px] border border-slate-200 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <h2 className="text-xl font-bold text-slate-900 mb-8 tracking-tight">Engineering Journey</h2>
      
      <div className="relative">
        <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-100 rounded-full"></div>
        
        <div className="space-y-7 relative">
          {timeline.map((step, index) => {
            const isCompleted = step.status === 'COMPLETED';
            const isActive = step.status === 'ACTIVE';
            const isUpcoming = step.status === 'UPCOMING';

            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-5 items-center group"
              >
                {/* Marker */}
                <div className="shrink-0 relative z-10 bg-white py-1">
                  {isCompleted ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center shadow-sm">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  ) : isActive ? (
                    <div className="w-8 h-8 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center group-hover:border-slate-300 transition-colors">
                      <Circle size={10} className="text-slate-300" fill="currentColor" />
                    </div>
                  )}
                </div>
                
                {/* Text */}
                <div className={`flex-1 ${isActive ? 'opacity-100' : isUpcoming ? 'opacity-50' : 'opacity-90'}`}>
                  <p className={`text-[15px] font-bold ${isActive ? 'text-blue-600' : isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>
                    {step.title}
                  </p>
                  {isActive && <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-500 mt-1 flex items-center gap-1"><Activity size={12} /> Current Stage</p>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-100">
        <button className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2 w-full bg-blue-50 hover:bg-blue-100 py-3 rounded-xl transition-colors">
          View Full Career Roadmap <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default JourneyTimeline;
