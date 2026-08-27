import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Code2, Users, ArrowRight, Building, Workflow } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import CompanyLogo from '../ui/CompanyLogo';

export default function QevrixNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      name: 'IT & Software',
      description: 'Software, digital platforms and automation.',
      icon: Code2,
      path: '/services/it-software',
    },
    {
      name: 'Workforce Solutions',
      description: 'Skilled manpower and workforce support.',
      icon: Users,
      path: '/services/workforce',
    },
    {
      name: 'Civil & Construction',
      description: 'Civil works and project execution.',
      icon: Building,
      path: '/services/civil-construction',
    }
  ];

  const products = [
    {
      name: 'QEVRIX Virtual Software Company',
      description: 'Structured real-world software project experience for aspiring developers.',
      icon: Code2,
      path: '/engineering',
    },
    {
      name: 'QEVRIX WorkforceOS',
      description: 'A digital platform for workforce operations and coordination.',
      icon: Workflow,
      path: '/products/workforce',
    },

  ];

  const handleNavClick = (path) => {
    setIsOpen(false);
    if (path.startsWith('#')) {
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        // Wait briefly for route change before scrolling
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

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${scrolled ? 'bg-[#080D1C]/85 backdrop-blur-[14px] border-b border-qx-border shadow-sm' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-16' : 'h-24'}`}>
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex items-center group">
              <CompanyLogo theme="light" />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="relative text-sm font-semibold text-white/80 hover:text-white transition-colors py-8 group">
                Home
                {isActive('/') && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-6 left-0 w-full h-[2px] bg-qx-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                )}
                {!isActive('/') && <div className="absolute bottom-6 left-0 w-0 h-[2px] bg-white/30 rounded-full group-hover:w-full transition-all duration-300" />}
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
              >
                <button className="flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white transition-colors py-8 relative">
                  Services <ChevronDown size={14} className={`transition-transform duration-300 ${showServices ? 'rotate-180 text-qx-primary' : ''}`} />
                  {!location.pathname.startsWith('/products') && location.pathname.startsWith('/services') && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-6 left-0 w-full h-[2px] bg-qx-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  )}
                </button>

                <AnimatePresence>
                  {showServices && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 w-[440px] bg-[#0A101D]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-3 flex flex-col gap-1 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-qx-primary/5 to-transparent pointer-events-none" />

                      {services.map((s, i) => (
                        <div key={i} className="group/item relative z-10" onClick={() => handleNavClick(s.path)}>
                          <div className="p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 cursor-pointer flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white group-hover/item:text-qx-primary group-hover/item:border-qx-primary/30 group-hover/item:bg-qx-primary/10 transition-all duration-300">
                                <s.icon size={20} />
                              </div>
                              <div>
                                <h4 className="text-[15px] font-bold text-white group-hover/item:text-qx-primary transition-colors">{s.name}</h4>
                                <p className="text-[13px] text-qx-textSecondary font-medium">{s.description}</p>
                              </div>
                            </div>
                            <div className="text-[13px] font-medium text-qx-primary opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300 flex items-center">
                              <span className="flex items-center gap-1">
                                View <ArrowRight size={14} />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Products Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setShowProducts(true)}
                onMouseLeave={() => setShowProducts(false)}
              >
                <button className="flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white transition-colors py-8 relative">
                  Products <ChevronDown size={14} className={`transition-transform duration-300 ${showProducts ? 'rotate-180 text-qx-primary' : ''}`} />
                  {location.pathname.startsWith('/products') && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-6 left-0 w-full h-[2px] bg-qx-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  )}
                </button>

                <AnimatePresence>
                  {showProducts && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 w-[460px] bg-[#0A101D]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-3 flex flex-col gap-1 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-qx-primary/5 to-transparent pointer-events-none" />

                      {products.map((p, i) => (
                        <div key={i} className="group/item relative z-10" onClick={() => handleNavClick(p.path)}>
                          <div className="p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 cursor-pointer flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white group-hover/item:text-qx-primary group-hover/item:border-qx-primary/30 group-hover/item:bg-qx-primary/10 transition-all duration-300">
                                <p.icon size={20} />
                              </div>
                              <div>
                                <h4 className="text-[15px] font-bold text-white group-hover/item:text-qx-primary transition-colors">{p.name}</h4>
                                <p className="text-[13px] text-qx-textSecondary font-medium line-clamp-1">{p.description}</p>
                              </div>
                            </div>
                            <div className="text-[13px] font-medium text-qx-primary opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300 flex items-center flex-shrink-0">
                              <span className="flex items-center gap-1">
                                View <ArrowRight size={14} />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#solutions" onClick={(e) => { e.preventDefault(); handleNavClick('#solutions'); }} className="relative text-sm font-semibold text-white/80 hover:text-white transition-colors py-8 group">
                Solutions
                <div className="absolute bottom-6 left-0 w-0 h-[2px] bg-white/30 rounded-full group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }} className="relative text-sm font-semibold text-white/80 hover:text-white transition-colors py-8 group">
                About Us
                <div className="absolute bottom-6 left-0 w-0 h-[2px] bg-white/30 rounded-full group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }} className="relative text-sm font-semibold text-white/80 hover:text-white transition-colors py-8 group">
                Contact
                <div className="absolute bottom-6 left-0 w-0 h-[2px] bg-white/30 rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button onClick={() => handleNavClick('#contact')} className="h-10 px-6 text-sm shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300 relative overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></span>
              <span className="relative z-10 font-semibold">Get a Quote</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-qx-primary transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#060A14]/95 backdrop-blur-xl border-b border-white/10 absolute w-full left-0 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-6 flex flex-col max-h-[85vh] overflow-y-auto">
              <Link to="/" className="text-base font-semibold text-white" onClick={() => setIsOpen(false)}>Home</Link>

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

              <a href="#solutions" className="text-base font-semibold text-white" onClick={(e) => { e.preventDefault(); handleNavClick('#solutions'); }}>Solutions</a>
              <a href="#about" className="text-base font-semibold text-white" onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }}>About Us</a>
              <a href="#contact" className="text-base font-semibold text-white" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}>Contact</a>
              <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                <Button onClick={() => handleNavClick('#contact')} className="w-full h-12 font-semibold">
                  Get a Quote
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
