import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

const OnboardingProgress = ({ progress }) => {
  if (!progress) return null;

  const { currentStepIndex, totalSteps, percentage, estimatedMinutesLeft } = progress;

  return (
    <div className="bg-white rounded-[24px] border border-slate-200 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Completion Status
            </h3>
            <p className="text-2xl font-bold text-slate-900 tracking-tight">
              {currentStepIndex} of {totalSteps} Completed
            </p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-black text-blue-600 tracking-tighter">{percentage}%</span>
          </div>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-4 mb-6 overflow-hidden border border-slate-200/50">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="bg-blue-600 h-full rounded-full relative overflow-hidden"
          >
            {/* Animated shimmer effect over the progress bar */}
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            ></motion.div>
          </motion.div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <Target size={16} />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Next Unlock</div>
            <div className="text-sm font-semibold text-slate-900">Engineering Workspace</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Time Left</div>
          <div className="text-sm font-semibold text-slate-900">{estimatedMinutesLeft} Minutes</div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingProgress;
