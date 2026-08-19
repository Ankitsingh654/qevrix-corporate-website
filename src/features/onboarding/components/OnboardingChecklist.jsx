import React from 'react';
import { Check, Lock, ChevronRight, Clock, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { OnboardingStatusEnum } from '../models/onboarding.model';

const OnboardingChecklist = ({ checklist }) => {
  if (!checklist || checklist.length === 0) return null;

  return (
    <div className="bg-white rounded-[24px] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Engineering Checklist</h2>
          <p className="text-sm text-slate-500 mt-1">Complete these steps to unlock your engineering workspace.</p>
        </div>
      </div>

      <div className="p-4 space-y-3 bg-slate-50/50">
        {checklist.map((step, index) => {
          const isCompleted = step.status === OnboardingStatusEnum.COMPLETED;
          const isLocked = step.status === OnboardingStatusEnum.LOCKED;
          const isActive = step.status === OnboardingStatusEnum.IN_PROGRESS || step.status === OnboardingStatusEnum.PENDING;

          return (
            <motion.div 
              key={step.id} 
              whileHover={!isLocked ? { y: -2 } : {}}
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                isActive 
                  ? 'bg-white border-blue-200 shadow-[0_8px_30px_rgb(37,99,235,0.06)] relative' 
                  : isCompleted 
                    ? 'bg-white border-slate-100 shadow-sm'
                    : 'bg-slate-50 border-slate-100 opacity-70 grayscale'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 rounded-l-2xl"></div>
              )}

              <div className="flex gap-5">
                {/* Status Icon */}
                <div className="shrink-0">
                  {isCompleted ? (
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Check size={20} strokeWidth={3} />
                    </div>
                  ) : isLocked ? (
                    <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center">
                      <Lock size={18} />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg border-2 border-blue-200 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                      {index + 1}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                    <h3 className={`text-lg font-bold tracking-tight ${isLocked ? 'text-slate-500' : 'text-slate-900'}`}>
                      {step.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                          Completed
                        </span>
                      )}
                      {isActive && (
                        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span> Active Step
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{step.why}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 mb-4">
                    {!isCompleted && !isLocked && (
                      <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md text-slate-600">
                        <Clock size={14} className="text-slate-400" /> {step.estimatedMinutes} mins
                      </span>
                    )}
                    {step.reward && (
                      <span className="flex items-center gap-1.5 bg-blue-50/50 border border-blue-100 px-2.5 py-1 rounded-md text-blue-700">
                        <Gift size={14} className="text-blue-500" /> Unlock: {step.reward}
                      </span>
                    )}
                  </div>

                  {/* Call to action for active step */}
                  {isActive && (
                    <button className="flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-xl transition-all shadow-[0_4px_14px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)] active:scale-95">
                      {step.actionText}
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingChecklist;
