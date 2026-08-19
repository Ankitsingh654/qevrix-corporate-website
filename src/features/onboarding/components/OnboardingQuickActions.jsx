import React from 'react';
import { User, LifeBuoy, HelpCircle, Code, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ICONS = {
  User: User,
  LifeBuoy: LifeBuoy,
  HelpCircle: HelpCircle,
  Code: Code,
  Users: Users,
};

const OnboardingQuickActions = ({ actions }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="bg-white rounded-[24px] border border-slate-200 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Engineering Tools</h2>
      
      <div className="space-y-3">
        {actions.map((action, index) => {
          const IconComponent = ICONS[action.iconName] || HelpCircle;
          
          return (
            <motion.button 
              key={index}
              whileHover={!action.comingSoon ? { x: 4 } : {}}
              disabled={action.comingSoon}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left group
                ${action.comingSoon 
                  ? 'opacity-60 cursor-not-allowed bg-slate-50 border-slate-100' 
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-[0_4px_12px_rgba(37,99,235,0.05)]'
                }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${action.comingSoon ? 'bg-slate-200 text-slate-400' : 'bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                  <IconComponent size={20} />
                </div>
                <div>
                  <div className={`text-[15px] font-bold ${action.comingSoon ? 'text-slate-500' : 'text-slate-800 group-hover:text-blue-700 transition-colors'}`}>
                    {action.title}
                  </div>
                  {action.description && (
                    <div className="text-xs text-slate-500 mt-0.5">{action.description}</div>
                  )}
                </div>
              </div>
              
              {action.comingSoon ? (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-500 px-2.5 py-1 rounded-md shrink-0">
                  Soon
                </span>
              ) : (
                <ArrowRight size={18} className="text-slate-300 group-hover:text-blue-600 transition-colors shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingQuickActions;
