import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Code2, Users, ArrowRight, Building, Workflow, PenTool, Info, Users2, UserSquare2, BriefcaseIcon, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import CompanyLogo from '../ui/CompanyLogo';
import { useContactModal } from '../../context/ContactModalContext';

export default function QevrixNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { openContactModal } = useContactModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'IT & Software', description: 'Software, digital platforms and automation.', icon: Code2, path: '/services/it-software' },
    { name: 'Workforce Solutions', description: 'Skilled manpower and workforce support.', icon: Users, path: '/services/workforce' },
    { name: 'Civil & Construction', description: 'Civil works and project execution.', icon: Building, path: '/services/civil-construction' },
    { name: 'Branding & Design', description: 'Logos, branding, and print production.', icon: PenTool, path: '/services/branding-design' }
  ];

  const products = [
    { name: 'QEVRIX Virtual Software Company', description: 'Structured real-world software project experience for aspiring developers.', icon: Code2, path: '/engineering' },
    { name: 'QEVRIX WorkforceOS', description: 'A digital platform for workforce operations and coordination.', icon: Workflow, path: '/products/workforce' },
  ];

  const companyLinks = [
    { name: 'About Us', description: 'Our vision, mission, and story.', icon: Info, path: '#about' },
    { name: 'Founders', description: 'The leadership behind QEVRIX.', icon: UserSquare2, path: '/founders' },
    { name: 'Our Team', description: 'Meet the people building the future.', icon: Users2, path: '/our-team' },
    { name: 'Careers', description: 'Join our growing organization.', icon: BriefcaseIcon, path: '/careers' },
    { name: 'Contact Us', description: 'Get in touch with our team.', icon: Phone, path: '#contact' }
  ];

  const handleNavClick = (path) => {
    setIsOpen(false);
    if (path === '#contact') {
      openContactModal();
      return;
    }
    if (path.startsWith('#')) {
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(path.substring(1));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isActive = (path) => location.pathname === path;

  // Reusable dropdown menu component for cleaner code
  const DropdownMenu = ({ items, isVisible }) => (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[460px] bg-[#0A101D]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] p-4 flex flex-col gap-2 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-qx-primary/5 via-transparent to-transparent pointer-events-none" />
          {items.map((item, i) => (
            <div key={i} className="group/item relative z-10" onClick={() => handleNavClick(item.path)}>
              <div className="p-4 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/10 transition-all duration-300 cursor-pointer flex items-center justify-between overflow-hidden relative">
                
                {/* Subtle hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-qx-primary/0 via-qx-primary/5 to-qx-primary/0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-center gap-5 relative z-10">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-white/80 group-hover/item:text-qx-primary group-hover/item:border-qx-primary/30 group-hover/item:bg-qx-primary/10 group-hover/item:scale-105 transition-all duration-300 shadow-sm">
                    <item.icon size={22} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white/95 group-hover/item:text-qx-primary transition-colors tracking-wide mb-0.5">{item.name}</h4>
                    <p className="text-[14px] text-qx-textSecondary font-medium leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="text-[13px] font-bold text-white/30 group-hover/item:text-qx-primary transition-all duration-300 flex items-center flex-shrink-0 relative z-10">
                  <span className="flex items-center gap-1">
                    <span className="hidden sm:inline-block opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300">View</span> 
                    <ArrowRight size={16} className="group-hover/item:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="fixed w-full z-50 top-0 pt-4 px-4 pointer-events-none">
      <nav className={`pointer-events-auto max-w-[1200px] mx-auto transition-all duration-500 rounded-2xl border border-white/10 ${scrolled ? 'bg-[#080D1C]/85 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]' : 'bg-[#080D1C]/95 shadow-xl'}`}>
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/" onClick={(e) => { e.preventDefault(); handleNavClick('/'); }} className="flex items-center group">
              <CompanyLogo theme="light" />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              
              <Link to="/" onClick={(e) => { e.preventDefault(); handleNavClick('/'); }} className="relative text-sm font-semibold text-white/80 hover:text-white transition-colors py-5 group">
                Home
                {isActive('/') && <motion.div layoutId="nav-underline" className="absolute bottom-3 left-0 w-full h-[2px] bg-qx-primary rounded-full shadow-[0_0_10px_rgba(255,90,0,0.8)]" />}
                {!isActive('/') && <div className="absolute bottom-3 left-0 w-0 h-[2px] bg-white/30 rounded-full group-hover:w-full transition-all duration-300" />}
              </Link>

              {/* Services Dropdown */}
              <div className="relative group" onMouseEnter={() => setShowServices(true)} onMouseLeave={() => setShowServices(false)}>
                <button className="flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white transition-colors py-5 relative">
                  Services <ChevronDown size={14} className={`transition-transform duration-300 ${showServices ? 'rotate-180 text-qx-primary' : ''}`} />
                  {!location.pathname.startsWith('/products') && location.pathname.startsWith('/services') && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-3 left-0 w-full h-[2px] bg-qx-primary rounded-full shadow-[0_0_10px_rgba(255,90,0,0.8)]" />
                  )}
                </button>
                <DropdownMenu items={services} isVisible={showServices} />
              </div>

              {/* Products Dropdown */}
              <div className="relative group" onMouseEnter={() => setShowProducts(true)} onMouseLeave={() => setShowProducts(false)}>
                <button className="flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white transition-colors py-5 relative">
                  Products <ChevronDown size={14} className={`transition-transform duration-300 ${showProducts ? 'rotate-180 text-qx-primary' : ''}`} />
                  {location.pathname.startsWith('/products') && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-3 left-0 w-full h-[2px] bg-qx-primary rounded-full shadow-[0_0_10px_rgba(255,90,0,0.8)]" />
                  )}
                </button>
                <DropdownMenu items={products} isVisible={showProducts} />
              </div>

              {/* Company Dropdown */}
              <div className="relative group" onMouseEnter={() => setShowCompany(true)} onMouseLeave={() => setShowCompany(false)}>
                <button className="flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white transition-colors py-5 relative">
                  Company <ChevronDown size={14} className={`transition-transform duration-300 ${showCompany ? 'rotate-180 text-qx-primary' : ''}`} />
                  {(isActive('/founders') || isActive('/our-team') || isActive('/careers')) && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-3 left-0 w-full h-[2px] bg-qx-primary rounded-full shadow-[0_0_10px_rgba(255,90,0,0.8)]" />
                  )}
                </button>
                <DropdownMenu items={companyLinks} isVisible={showCompany} />
              </div>

              <Link to="/pricing" onClick={(e) => { e.preventDefault(); handleNavClick('/pricing'); }} className="relative text-sm font-semibold text-white/80 hover:text-white transition-colors py-5 group">
                Pricing
                {isActive('/pricing') && <motion.div layoutId="nav-underline" className="absolute bottom-3 left-0 w-full h-[2px] bg-qx-primary rounded-full shadow-[0_0_10px_rgba(255,90,0,0.8)]" />}
                {!isActive('/pricing') && <div className="absolute bottom-3 left-0 w-0 h-[2px] bg-white/30 rounded-full group-hover:w-full transition-all duration-300" />}
              </Link>

            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Button onClick={() => openContactModal()} className="h-10 px-6 text-sm rounded-xl shadow-[0_0_15px_rgba(255,90,0,0.2)] hover:shadow-[0_0_25px_rgba(255,90,0,0.4)] transition-all duration-300 relative overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></span>
                <span className="relative z-10 font-bold tracking-wide">Get in Touch</span>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center py-4">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-qx-primary transition-colors focus:outline-none">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#060A14]/95 backdrop-blur-2xl border-t border-white/10 w-full overflow-hidden rounded-b-2xl"
            >
              <div className="px-6 py-6 space-y-6 flex flex-col max-h-[calc(100vh-80px)] overflow-y-auto">
                <Link to="/" onClick={(e) => { e.preventDefault(); handleNavClick('/'); }} className="text-base font-semibold text-white">Home</Link>

                {/* Mobile Services */}
                <div className="text-base font-semibold text-white">
                  Services
                  <div className="mt-4 pl-4 flex flex-col gap-4 border-l border-white/10">
                    {services.map(s => (
                      <div key={s.name} className="flex items-center gap-3 text-white/70 hover:text-white cursor-pointer" onClick={() => handleNavClick(s.path)}>
                        <s.icon size={18} className="text-qx-primary" />
                        <span className="text-sm font-medium">{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Products */}
                <div className="text-base font-semibold text-white">
                  Products
                  <div className="mt-4 pl-4 flex flex-col gap-4 border-l border-white/10">
                    {products.map(p => (
                      <div key={p.name} className="flex items-center gap-3 text-white/70 hover:text-white cursor-pointer" onClick={() => handleNavClick(p.path)}>
                        <p.icon size={18} className="text-qx-primary" />
                        <span className="text-sm font-medium">{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Company */}
                <div className="text-base font-semibold text-white">
                  Company
                  <div className="mt-4 pl-4 flex flex-col gap-4 border-l border-white/10">
                    {companyLinks.map(c => (
                      <div key={c.name} className="flex items-center gap-3 text-white/70 hover:text-white cursor-pointer" onClick={() => handleNavClick(c.path)}>
                        <c.icon size={18} className="text-qx-primary" />
                        <span className="text-sm font-medium">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a href="#solutions" className="text-base font-semibold text-white" onClick={(e) => { e.preventDefault(); handleNavClick('#solutions'); }}>Solutions</a>
                
                <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                  <Button onClick={() => openContactModal()} className="w-full justify-center h-12 text-base font-bold shadow-[0_0_20px_rgba(255,90,0,0.3)]">
                    Get in Touch
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
