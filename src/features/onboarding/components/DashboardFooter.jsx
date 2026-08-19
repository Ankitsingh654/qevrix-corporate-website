import React from 'react';
import { Shield, Lock, Linkedin, Github, Youtube } from 'lucide-react';
import CompanyLogo from '../../../components/ui/CompanyLogo';

const DashboardFooter = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-5">
            <div className="mb-6">
              <CompanyLogo />
            </div>
            <p className="text-slate-500 text-sm font-medium mb-8 max-w-xs leading-relaxed">
              Building India's Next Generation Software Engineers.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-600 hover:border-red-200 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-6">Platform</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Engineering Program</a></li>
                <li><a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Roadmap</a></li>
                <li><a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Community</a></li>
                <li><a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-6">Resources</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Support</a></li>
                <li><a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 justify-center lg:justify-start">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-emerald-500" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Enterprise Grade Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-blue-500" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Data Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              <span className="text-xs font-bold text-slate-500">Platform Version V1.0 (Production Preview)</span>
            </div>
          </div>
          
          <div className="text-center lg:text-right">
            <p className="text-sm font-medium text-slate-500 mb-1">
              Made with <span className="text-red-500">❤️</span> in India
            </p>
            <p className="text-xs text-slate-400">
              © 2026 QEVRIX Technologies Pvt. Ltd. All Rights Reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
            Learning. Building. Shipping. Growing.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
