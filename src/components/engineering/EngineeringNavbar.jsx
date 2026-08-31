import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Rocket, Code2, Users, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import logo from '../../assets/qevrix-logo.png';
import { motion, AnimatePresence } from 'framer-motion';

export default function EngineeringNavbar() {
  const [isOpen, setIsOpen] = useState(false);
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

  const products = [
    {
      name: 'PrepIQ',
      description: 'AI Learning Platform',
      icon: Rocket,
      path: '/products/prepiq',
      comingSoon: false,
    },
    {
      name: 'WorkforceOS',
      description: 'Enterprise Workforce Platform',
      icon: Users,
      path: '/products/workforce',
      comingSoon: true,
    },
    {
      name: 'Freelanz',
      description: 'Talent Marketplace',
      icon: Briefcase,
      path: '/products/freelanz',
      comingSoon: true,
    },
    {
      name: 'Engineering Program',
      description: 'Software Engineering Accelerator',
      icon: Code2,
      path: '/engineering',
      comingSoon: false,
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-[#E2E8F0] shadow-sm' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex items-center group">
              {/* Note: if the logo-icon is white/light, we might need a dark version. For now, assuming logo is blue/identifiable on light bg */}
              <img src={logo} alt="QEVRIX" className="h-[44px] w-auto group-hover:scale-105 transition-all duration-300" />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="relative text-sm font-semibold text-[#475569] hover:text-[#0F172A] transition-colors py-8 group">
                Home
                {isActive('/') && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-6 left-0 w-full h-[2px] bg-[#2563EB] rounded-full" />
                )}
                {!isActive('/') && <div className="absolute bottom-6 left-0 w-0 h-[2px] bg-[#E2E8F0] rounded-full group-hover:w-full transition-all duration-300" />}
              </Link>
              
              {/* Mega Menu Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setShowProducts(true)}
                onMouseLeave={() => setShowProducts(false)}
              >
                <button className="flex items-center gap-1 text-sm font-semibold text-[#475569] hover:text-[#0F172A] transition-colors py-8 relative">
                  Products <ChevronDown size={14} className={`transition-transform duration-300 ${showProducts ? 'rotate-180 text-[#2563EB]' : ''}`} />
                  {location.pathname.startsWith('/engineering') && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-6 left-0 w-full h-[2px] bg-[#2563EB] rounded-full" />
                  )}
                  {!location.pathname.startsWith('/engineering') && <div className="absolute bottom-6 left-0 w-0 h-[2px] bg-[#E2E8F0] rounded-full group-hover:w-full transition-all duration-300" />}
                </button>

                <AnimatePresence>
                  {showProducts && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 w-[440px] bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-3 flex flex-col gap-1 overflow-hidden"
                    >
                      {products.map((p, i) => (
                        <div key={i} className="group/item relative z-10">
                          <div 
                            className="p-4 rounded-xl hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] transition-all duration-300 cursor-pointer flex items-center justify-between"
                            onClick={() => !p.comingSoon && navigate(p.path)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] group-hover/item:text-[#2563EB] group-hover/item:border-[#2563EB]/30 group-hover/item:bg-[#2563EB]/5 transition-all duration-300">
                                <p.icon size={20} />
                              </div>
                              <div>
                                <h4 className="text-[15px] font-bold text-[#0F172A] group-hover/item:text-[#2563EB] transition-colors">{p.name}</h4>
                                <p className="text-[13px] text-[#475569] font-medium">{p.description}</p>
                              </div>
                            </div>
                            
                            <div className="text-[13px] font-medium text-[#2563EB] opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300 flex items-center">
                              {p.comingSoon ? (
                                <span className="text-[#94A3B8] px-2 py-1 bg-[#F8FAFC] rounded-md border border-[#E2E8F0] text-[11px]">In Development</span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  Explore <ArrowRight size={14} />
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="h-px w-full bg-[#E2E8F0] my-2" />
                      
                      <Link to="/products" className="p-3 text-center text-[14px] font-semibold text-[#475569] hover:text-[#0F172A] transition-colors flex items-center justify-center gap-2 group/all relative z-10">
                        Explore Full Ecosystem <ArrowRight size={14} className="group-hover/all:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/#solutions" className="relative text-sm font-semibold text-[#475569] hover:text-[#0F172A] transition-colors py-8 group">
                Solutions
                <div className="absolute bottom-6 left-0 w-0 h-[2px] bg-[#E2E8F0] rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
              <Link to="/#about" className="relative text-sm font-semibold text-[#475569] hover:text-[#0F172A] transition-colors py-8 group">
                Company
                <div className="absolute bottom-6 left-0 w-0 h-[2px] bg-[#E2E8F0] rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button onClick={() => navigate('/products')} className="h-10 px-6 text-sm bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <span className="relative z-10 font-semibold">Explore Products</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#0F172A] hover:text-[#2563EB] transition-colors">
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
            className="md:hidden bg-white border-b border-[#E2E8F0] absolute w-full left-0 overflow-hidden shadow-lg"
          >
            <div className="px-6 py-6 space-y-6 flex flex-col">
              <Link to="/" className="text-base font-semibold text-[#0F172A]" onClick={() => setIsOpen(false)}>Home</Link>
              <div className="text-base font-semibold text-[#0F172A]">
                Products
                <div className="mt-4 pl-4 flex flex-col gap-4 border-l border-[#E2E8F0]">
                  {products.map(p => (
                    <Link key={p.name} to={p.path} className="flex items-center gap-3 text-[#475569] hover:text-[#0F172A]" onClick={() => setIsOpen(false)}>
                      <p.icon size={18} className={p.comingSoon ? "text-[#94A3B8]" : "text-[#2563EB]"} />
                      <span className="text-sm font-medium">{p.name}</span>
                      {p.comingSoon && <span className="ml-auto text-[10px] uppercase tracking-wider text-[#94A3B8] border border-[#E2E8F0] px-2 py-0.5 rounded bg-[#F8FAFC]">Soon</span>}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/#solutions" className="text-base font-semibold text-[#0F172A]" onClick={() => setIsOpen(false)}>Solutions</Link>
              <Link to="/#about" className="text-base font-semibold text-[#0F172A]" onClick={() => setIsOpen(false)}>Company</Link>
              <div className="pt-6 border-t border-[#E2E8F0] flex flex-col gap-3">
                <Button onClick={() => { navigate('/products'); setIsOpen(false); }} className="w-full h-12 font-semibold bg-[#0F172A] text-white">
                  Explore Products
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
