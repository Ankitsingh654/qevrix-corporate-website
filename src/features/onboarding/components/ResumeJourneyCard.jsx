import React from 'react';
import { PlayCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const ResumeJourneyCard = ({ resumeData }) => {
  if (!resumeData) return null;

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white rounded-[24px] border border-blue-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group transition-shadow hover:shadow-[0_8px_30px_rgb(37,99,235,0.08)]"
    >
      <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
              Highest Priority
            </span>
            <span className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
              <Clock size={14} className="text-slate-400" /> Last Active: {resumeData.lastActive}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Resume Engineering Journey</h2>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-0.5">Current Step</span>
              <strong className="text-slate-800 text-base">{resumeData.currentStepName}</strong>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-0.5">Estimated Time</span>
              <strong className="text-slate-800 text-base">{resumeData.estimatedMinutes} Minutes</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Circular Progress for Priority Card */}
          <div className="hidden md:flex items-center gap-4 pr-6 border-r border-slate-100">
            <div className="relative w-14 h-14">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-600 drop-shadow-[0_0_2px_rgba(37,99,235,0.4)]"
                  strokeDasharray="20, 100"
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-slate-800">
                20%
              </div>
            </div>
            <div className="text-left">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Overall</div>
              <div className="text-sm font-bold text-slate-900">Progress</div>
            </div>
          </div>
          
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95 text-lg">
            <PlayCircle size={22} />
            {resumeData.actionText || 'Resume Journey'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeJourneyCard;
