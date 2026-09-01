import React from 'react';
import { Link } from 'react-router-dom';
import CompanyLogo from '../ui/CompanyLogo';
import { Linkedin, Twitter, Youtube, Instagram, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function QevrixFooter() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#FFF8F3] border-t border-orange-100 pt-12 pb-6 relative overflow-hidden font-sans">
      <div className="max-w-[1536px] mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-center md:text-left">

          {/* Column 1: Logo, Text, Socials */}
          <div className="flex flex-col items-center md:items-start lg:pr-8">
            <Link to="/" className="inline-block mb-6 bg-[#0B1120] p-2 rounded-lg shadow-sm">
              <CompanyLogo theme="dark" size="sm" />
            </Link>
            <p className="text-[13px] text-gray-600 font-medium leading-[1.6] mb-6 max-w-[280px]">
              Engineering IT, Workforce & Civil Solutions for a smarter, stronger and sustainable future.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-[#FFE8D6] flex items-center justify-center text-gray-700 hover:bg-qx-primary hover:text-white transition-colors">
                <Linkedin size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#FFE8D6] flex items-center justify-center text-gray-700 hover:bg-qx-primary hover:text-white transition-colors">
                <Twitter size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#FFE8D6] flex items-center justify-center text-gray-700 hover:bg-qx-primary hover:text-white transition-colors">
                <Youtube size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#FFE8D6] flex items-center justify-center text-gray-700 hover:bg-qx-primary hover:text-white transition-colors">
                <Instagram size={15} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-qx-primary mb-5 text-[15px]">Quick Links</h4>
            <ul className="space-y-3 text-[14px] font-medium text-gray-600">
              <li>
                <button onClick={() => handleScroll('services')} className="hover:text-qx-primary transition-colors">Services</button>
              </li>
              <li>
                <button onClick={() => handleScroll('about')} className="hover:text-qx-primary transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => handleScroll('projects')} className="hover:text-qx-primary transition-colors">Projects</button>
              </li>
              <li>
                <Link to="/careers" className="hover:text-qx-primary transition-colors">Careers</Link>
              </li>
              <li>
                <button onClick={() => handleScroll('contact')} className="hover:text-qx-primary transition-colors">Contact Us</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-qx-primary mb-5 text-[15px]">Services</h4>
            <ul className="space-y-3 text-[14px] font-medium text-gray-600">
              <li>
                <button onClick={() => handleScroll('services')} className="hover:text-qx-primary transition-colors text-left">
                  IT & Software Solutions
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll('services')} className="hover:text-qx-primary transition-colors text-left">
                  Workforce Support
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll('services')} className="hover:text-qx-primary transition-colors text-left">
                  Civil Project Services
                </button>
              </li>
              <li>
                <Link to="/services/branding-design" className="hover:text-qx-primary transition-colors text-left">
                  Branding & Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-qx-primary mb-5 text-[15px]">Contact Info</h4>
            <ul className="space-y-3 text-[14px] font-medium text-gray-600">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-qx-primary flex-shrink-0" />
                <a href="mailto:contact@qevrix.in" className="hover:text-qx-primary transition-colors">contact@qevrix.in</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-qx-primary flex-shrink-0" />
                <a href="tel:+917903682921" className="hover:text-qx-primary transition-colors">+91 7903682921</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-qx-primary flex-shrink-0" />
                <span>Noida</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe size={16} className="text-qx-primary flex-shrink-0" />
                <a href="https://www.qevrix.in" target="_blank" rel="noreferrer" className="hover:text-qx-primary transition-colors">www.qevrix.in</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-orange-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] font-medium text-gray-500">
          <div className="flex items-center">
            &copy; 2026 QEVRIX. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-qx-primary transition-colors">Privacy Policy</Link>
            <span className="text-gray-300">|</span>
            <Link to="/terms-and-conditions" className="hover:text-qx-primary transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
