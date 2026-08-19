import React from 'react';
import { Target, Lightbulb, Gift, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const TodayGoalCard = ({ goal }) => {
  if (!goal) return null;

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-50/30 rounded-[24px] border border-blue-100/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full relative overflow-hidden transition-shadow hover:shadow-[0_8px_30px_rgb(37,99,235,0.05)]"
    >
      {/* Decorative bg element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3"></div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
          <Target size={20} />
        </div>
        <div>
          <h3 className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">Today's Engineering Mission</h3>
          <p className="text-xl font-bold text-slate-900 tracking-tight">{goal.title}</p>
        </div>
      </div>
      
      <div className="space-y-3 relative z-10">
        <div className="flex items-start gap-3 bg-white/60 p-3.5 rounded-xl border border-blue-100/50">
          <Lightbulb size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Why this matters</div>
            <p className="text-sm font-medium text-slate-800">{goal.why}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start gap-3 bg-white/60 p-3.5 rounded-xl border border-blue-100/50">
            <Gift size={18} className="text-blue-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Expected Reward</div>
              <p className="text-sm font-medium text-slate-800">{goal.reward}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 bg-white/60 p-3.5 rounded-xl border border-blue-100/50">
            <Clock size={18} className="text-slate-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Time Required</div>
              <p className="text-sm font-medium text-slate-800">{goal.estimatedMinutes} Minutes</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TodayGoalCard;
