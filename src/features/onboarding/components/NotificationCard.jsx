import React from 'react';
import { Bell, Inbox } from 'lucide-react';

const NotificationCard = () => {
  return (
    <div className="bg-white rounded-[24px] border border-slate-200 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Engineering Inbox</h2>
        <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
          <Bell size={16} className="text-slate-400" />
        </div>
      </div>
      
      <div className="text-center py-8 px-6 bg-slate-50 rounded-[20px] border border-dashed border-slate-300 relative overflow-hidden">
        {/* Soft background circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-slate-200/50 rounded-full blur-3xl"></div>
        
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-500 mx-auto mb-4 relative z-10 transform -rotate-6">
          <Inbox size={28} />
        </div>
        
        <h3 className="text-base font-bold text-slate-800 mb-2 relative z-10">No notifications yet</h3>
        <p className="text-sm text-slate-500 leading-relaxed max-w-[250px] mx-auto relative z-10">
          We'll notify you about profile reviews, program updates, payments, engineering activities, and mentor announcements.
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
