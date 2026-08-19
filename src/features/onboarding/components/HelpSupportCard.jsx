import React from 'react';
import { Book, MessageSquare, Headphones, UserPlus, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const HelpSupportCard = () => {
  return (
    <div className="bg-white rounded-[24px] border border-slate-200 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-28">
      <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Engineering Support</h2>
      
      <div className="space-y-2 mb-8">
        <a href="#" className="flex items-center gap-4 text-slate-600 hover:text-blue-700 transition-colors group p-2 -mx-2 rounded-xl hover:bg-blue-50">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors text-slate-500 group-hover:text-blue-600 border border-slate-100 group-hover:border-blue-200">
            <Book size={18} />
          </div>
          <span className="text-[15px] font-bold">Documentation</span>
        </a>
        
        <a href="#" className="flex items-center gap-4 text-slate-600 hover:text-blue-700 transition-colors group p-2 -mx-2 rounded-xl hover:bg-blue-50">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors text-slate-500 group-hover:text-blue-600 border border-slate-100 group-hover:border-blue-200">
            <BookOpen size={18} />
          </div>
          <span className="text-[15px] font-bold">Engineering Guide</span>
        </a>

        <a href="#" className="flex items-center gap-4 text-slate-600 hover:text-blue-700 transition-colors group p-2 -mx-2 rounded-xl hover:bg-blue-50">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors text-slate-500 group-hover:text-blue-600 border border-slate-100 group-hover:border-blue-200">
            <MessageSquare size={18} />
          </div>
          <span className="text-[15px] font-bold">FAQs</span>
        </a>
        
        <a href="#" className="flex items-center gap-4 text-slate-600 hover:text-blue-700 transition-colors group p-2 -mx-2 rounded-xl hover:bg-blue-50">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors text-slate-500 group-hover:text-blue-600 border border-slate-100 group-hover:border-blue-200">
            <Headphones size={18} />
          </div>
          <span className="text-[15px] font-bold">Talk to Support</span>
        </a>
        
        <div className="flex items-center justify-between p-2 -mx-2 rounded-xl opacity-60 cursor-not-allowed">
          <div className="flex items-center gap-4 text-slate-500">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
              <UserPlus size={18} />
            </div>
            <span className="text-[15px] font-bold">Contact Mentor</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-500 px-2.5 py-1 rounded-md">
            Soon
          </span>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
        <div className="flex items-center gap-2 mb-1">
          <Clock size={16} className="text-blue-600" />
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Average Support Response</span>
        </div>
        <div className="text-lg font-black text-blue-900">Under 24 Hours</div>
      </div>
    </div>
  );
};

export default HelpSupportCard;
