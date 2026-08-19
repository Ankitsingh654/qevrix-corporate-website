import React from 'react';
import { Link } from 'react-router-dom';
import CompanyLogo from '../ui/CompanyLogo';
import { companyConfig } from '../../config/companyConfig';

export default function QevrixFooter() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0B1020] border-t border-white/10 pt-[80px] pb-[40px] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-qx-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 text-center md:text-left">
          
          {/* Column 1 — QEVRIX (4 columns wide) */}
          <div className="flex flex-col items-center md:items-start col-span-1 md:col-span-2 lg:col-span-4">
            <Link to="/" className="inline-block mb-8 group">
              <CompanyLogo theme="light" />
            </Link>
            <div className="text-[15px] font-semibold text-white mb-2">Technology. Workforce. Infrastructure.</div>
            <p className="text-sm text-qx-textSecondary leading-relaxed max-w-[280px]">
              QEVRIX delivers practical technology, workforce and project solutions designed around business requirements.
            </p>
          </div>

          {/* Columns 2, 3, 4 (8 columns wide total) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 2 — SERVICES */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold text-white mb-6 tracking-wide">Services</h4>
              <ul className="space-y-4 text-[14px] text-qx-textSecondary">
                <li>
                  <button onClick={() => handleScroll('services')} className="hover:text-qx-primary transition-colors text-left">
                    IT & Software
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScroll('services')} className="hover:text-qx-primary transition-colors text-left">
                    Workforce Solutions
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScroll('services')} className="hover:text-qx-primary transition-colors text-left">
                    Civil & Construction
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScroll('solutions')} className="hover:text-qx-primary transition-colors text-left">
                    AI & Automation
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScroll('solutions')} className="hover:text-qx-primary transition-colors text-left">
                    Maintenance & Support
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3 — COMPANY */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold text-white mb-6 tracking-wide">Company</h4>
              <ul className="space-y-4 text-[14px] text-qx-textSecondary">
                <li>
                  <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-qx-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <button onClick={() => handleScroll('about')} className="hover:text-qx-primary transition-colors text-left">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScroll('why-qevrix')} className="hover:text-qx-primary transition-colors text-left">
                    Why QEVRIX
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScroll('contact')} className="hover:text-qx-primary transition-colors text-left">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4 — LEGAL */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold text-white mb-6 tracking-wide">Legal</h4>
              <ul className="space-y-4 text-[14px] text-qx-textSecondary">
                <li>
                  <Link to="/privacy" className="hover:text-qx-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-qx-primary transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="hover:text-qx-primary transition-colors">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-qx-textMuted font-medium">
          <div>
            &copy; 2026 {companyConfig.companyName} All Rights Reserved.
          </div>
          <div className="flex items-center gap-2">
            Made in India 🇮🇳
          </div>
        </div>
      </div>
    </footer>
  );
}
