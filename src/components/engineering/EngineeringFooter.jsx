import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Youtube, ArrowRight, Mail } from 'lucide-react';
import logo from '../../assets/logo-icon.svg';

export default function EngineeringFooter() {
  return (
    <footer className="bg-[#F8FAFC] border-t border-[#E2E8F0] pt-[80px] pb-[40px] relative overflow-hidden">
      {/* Light subtle glow instead of dark primary blur */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[#F5F9FF] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 text-center md:text-left">
          
          {/* Left Section (4 columns wide) */}
          <div className="flex flex-col items-center md:items-start col-span-1 md:col-span-2 lg:col-span-4">
            <Link to="/" className="inline-block mb-8 group">
              {/* Note: if the logo-icon is white/light, we might need a dark version. For now, assuming logo is blue/identifiable on light bg */}
              <img src={logo} alt="QEVRIX" className="h-[60px] w-auto opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
            </Link>
            <div className="text-[15px] font-bold text-[#0F172A] mb-2">Engineering Program</div>
            <p className="text-sm text-[#475569] leading-relaxed max-w-[280px]">
              Building AI-powered products,<br/>
              enterprise platforms,<br/>
              and world-class engineering solutions.
            </p>
          </div>

          {/* Products & Company & Legal (5 columns wide) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold text-[#0F172A] mb-6 tracking-wide">Products</h4>
              <ul className="space-y-4 text-[14px] text-[#475569]">
                <li>
                  <Link to="/products/prepiq" className="group flex items-center gap-1 hover:text-[#2563EB] transition-all duration-200 hover:translate-x-1">
                    PrepIQ <ArrowRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-1 transition-all duration-300" />
                  </Link>
                </li>
                <li>
                  <Link to="/products/workforce" className="group flex items-center gap-1 hover:text-[#2563EB] transition-all duration-200 hover:translate-x-1">
                    WorkforceOS <ArrowRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-1 transition-all duration-300" />
                  </Link>
                </li>
                <li>
                  <Link to="/products/freelanz" className="group flex items-center gap-1 hover:text-[#2563EB] transition-all duration-200 hover:translate-x-1">
                    Freelanz <ArrowRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-1 transition-all duration-300" />
                  </Link>
                </li>
                <li>
                  <Link to="/engineering" className="group flex items-center gap-1 hover:text-[#2563EB] transition-all duration-200 hover:translate-x-1">
                    Engineering Program <ArrowRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-1 transition-all duration-300" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold text-[#0F172A] mb-6 tracking-wide">Company</h4>
              <ul className="space-y-4 text-[14px] text-[#475569]">
                <li><Link to="/#about" className="inline-block hover:text-[#2563EB] transition-all duration-200 hover:translate-x-1">About</Link></li>
                <li><Link to="/#solutions" className="inline-block hover:text-[#2563EB] transition-all duration-200 hover:translate-x-1">Solutions</Link></li>
                <li><Link to="#" className="inline-block hover:text-[#2563EB] transition-all duration-200 hover:translate-x-1">Careers</Link></li>
                <li><Link to="#" className="inline-block hover:text-[#2563EB] transition-all duration-200 hover:translate-x-1">Blog</Link></li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold text-[#0F172A] mb-6 tracking-wide">Legal</h4>
              <ul className="space-y-4 text-[14px] text-[#475569]">
                <li><Link to="#" className="inline-block hover:text-[#2563EB] transition-all duration-200 hover:translate-x-1">Privacy</Link></li>
                <li><Link to="#" className="inline-block hover:text-[#2563EB] transition-all duration-200 hover:translate-x-1">Terms</Link></li>
                <li><Link to="#" className="inline-block hover:text-[#2563EB] transition-all duration-200 hover:translate-x-1">Security</Link></li>
                <li><Link to="#" className="inline-block hover:text-[#2563EB] transition-all duration-200 hover:translate-x-1">Status</Link></li>
              </ul>
            </div>
          </div>

          {/* Right Section - Newsletter (3 columns wide) */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start">
            <h4 className="font-bold text-[#0F172A] mb-6 tracking-wide">Stay Updated</h4>
            <p className="text-[13px] text-[#475569] mb-4">Get the latest news on product updates and engineering programs.</p>
            
            <div className="w-full relative flex items-center mb-8 shadow-sm">
              <Mail size={16} className="absolute left-3 text-[#94A3B8]" />
              <input 
                type="email" 
                placeholder="Enterprise Email" 
                className="w-full h-10 bg-white border border-[#E2E8F0] rounded-lg pl-10 pr-24 text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] transition-all placeholder:text-[#94A3B8]"
              />
              <button className="absolute right-1 top-1 bottom-1 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-md transition-colors">
                Subscribe
              </button>
            </div>

            <div className="flex items-center gap-3">
              <a href="#" className="p-2 text-[#475569] hover:text-[#2563EB] border border-[#E2E8F0] bg-white hover:border-[#2563EB]/50 hover:bg-[#F5F9FF] rounded-lg transition-all duration-300 hover:scale-105 shadow-sm">
                <Github size={16} />
              </a>
              <a href="#" className="p-2 text-[#475569] hover:text-[#2563EB] border border-[#E2E8F0] bg-white hover:border-[#2563EB]/50 hover:bg-[#F5F9FF] rounded-lg transition-all duration-300 hover:scale-105 shadow-sm">
                <Linkedin size={16} />
              </a>
              <a href="#" className="p-2 text-[#475569] hover:text-[#2563EB] border border-[#E2E8F0] bg-white hover:border-[#2563EB]/50 hover:bg-[#F5F9FF] rounded-lg transition-all duration-300 hover:scale-105 shadow-sm">
                <Twitter size={16} />
              </a>
              <a href="#" className="p-2 text-[#475569] hover:text-[#2563EB] border border-[#E2E8F0] bg-white hover:border-[#2563EB]/50 hover:bg-[#F5F9FF] rounded-lg transition-all duration-300 hover:scale-105 shadow-sm">
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E2E8F0] flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-[#94A3B8] font-medium">
          <div>
            &copy; 2026 QEVRIX Technologies Pvt Ltd.
          </div>
          <div className="flex items-center gap-2">
            Made in India 🇮🇳
          </div>
          <div>
            Version 1.0.0
          </div>
        </div>
      </div>
    </footer>
  );
}
