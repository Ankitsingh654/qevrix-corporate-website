import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PenTool, Image as ImageIcon, BookOpen, 
  Package, Printer, Palette,
  Search, Target, PenLine, Sliders, Send,
  CheckCircle2, Sparkles, MonitorSmartphone, LayoutGrid, Rocket,
  ArrowRight, MessageSquare, X, Loader2, Phone
} from 'lucide-react';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';
import CompanyLogo from '../components/ui/CompanyLogo';
import brandingMockup from '../assets/branding-mockup.jpg';
import { useContactModal } from '../context/ContactModalContext';

export default function BrandingDesignService() {
  const navigate = useNavigate();
  const { openContactModal } = useContactModal();
  useEffect(() => {
    document.title = "Branding & Design | QEVRIX";
    window.scrollTo(0, 0);
  }, []);


  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: <PenTool className="text-qx-primary w-6 h-6" />,
      title: "Logo Design",
      desc: "Unique, memorable and versatile logos that represent your brand identity.",
      points: ["Custom Logo Design", "Logo Variations", "Icon & Symbol Design", "Print & Digital Ready Files"]
    },
    {
      icon: <ImageIcon className="text-qx-primary w-6 h-6" />,
      title: "Social Media Graphics",
      desc: "Engaging graphics that make your brand stand out across every platform.",
      points: ["Social Media Posts", "Stories & Reels", "Promotional Graphics", "Campaign Creatives"]
    },
    {
      icon: <BookOpen className="text-qx-primary w-6 h-6" />,
      title: "Brand Guidelines",
      desc: "Detailed guidelines to ensure your brand stays consistent everywhere.",
      points: ["Logo Usage", "Color Palette", "Typography", "Do's & Don'ts"]
    },
    {
      icon: <Package className="text-qx-primary w-6 h-6" />,
      title: "Complete Brand Kit",
      desc: "All essential brand assets in one complete kit for your business.",
      points: ["Logo Suite", "Brand Guidelines", "Social Media Templates", "Business Stationery"]
    },
    {
      icon: <Package className="text-qx-primary w-6 h-6" />,
      title: "Marketing Materials",
      desc: "Professional marketing assets that leave a lasting impression.",
      points: ["Digital Business Cards", "Digital Brochures", "Social Media Banners", "Email Templates"]
    },
    {
      icon: <Palette className="text-qx-primary w-6 h-6" />,
      title: "Custom Design Services",
      desc: "Tailored design solutions for all your branding and marketing needs.",
      points: ["Presentation Design", "Infographics", "Marketing Collateral", "And Much More"]
    }
  ];

  const processSteps = [
    { num: "01", icon: <Search className="w-6 h-6" />, title: "Discover", desc: "We understand your business, goals, audience and competitors." },
    { num: "02", icon: <Target className="w-6 h-6" />, title: "Define", desc: "We define the visual direction, tone, colors and typography." },
    { num: "03", icon: <PenLine className="w-6 h-6" />, title: "Design", desc: "Our creatives bring your brand to life with stunning designs." },
    { num: "04", icon: <Sliders className="w-6 h-6" />, title: "Refine", desc: "We review, refine and perfect the designs with your feedback." },
    { num: "05", icon: <Send className="w-6 h-6" />, title: "Deliver", desc: "You receive all final files in high-quality digital formats." }
  ];

  const features = [
    { icon: <CheckCircle2 className="w-8 h-8 text-qx-primary mx-auto mb-4" />, title: "All-in-One Solution", desc: "Design and branding — all under one roof." },
    { icon: <Sparkles className="w-8 h-8 text-qx-primary mx-auto mb-4" />, title: "Custom & Unique", desc: "Every brand is unique. We create designs that represent you." },
    { icon: <MonitorSmartphone className="w-8 h-8 text-qx-primary mx-auto mb-4" />, title: "Digital Presence", desc: "Your brand will look professional on every platform." },
    { icon: <LayoutGrid className="w-8 h-8 text-qx-primary mx-auto mb-4" />, title: "Consistent Branding", desc: "We ensure consistency across all your brand touchpoints." },
    { icon: <Rocket className="w-8 h-8 text-qx-primary mx-auto mb-4" />, title: "End-to-End Support", desc: "From concept to final delivery, we're with you every step." }
  ];

  return (
    <div className="min-h-screen bg-[#080D1C] font-sans text-white relative">
      <QevrixNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-qx-primary/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center justify-center lg:justify-start gap-2">
              BRANDING & CREATIVE DESIGN
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              We Design.<br />
              <span className="text-qx-primary">We Brand.</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              From eye-catching social media graphics to complete brand identities — we bring your brand to life with creativity, consistency, and precision.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
              <button onClick={() => openContactModal("BRANDING & DESIGN")} className="w-full sm:w-auto bg-qx-primary text-white font-bold py-4 px-8 rounded-lg hover:bg-qx-primaryHover transition-colors flex items-center justify-center gap-2">
                Start Your Project <ArrowRight size={18} />
              </button>
              <button onClick={() => handleScroll('services')} className="w-full sm:w-auto bg-transparent border border-white/20 text-white font-bold py-4 px-8 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                <LayoutGrid size={18} className="text-qx-primary" /> View Our Work
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mt-12 lg:mt-0"
          >
            {/* Real Branding Mockup Image */}
            <div className="relative w-full flex items-center justify-center">
              <img 
                src={brandingMockup} 
                alt="QEVRIX Branding Materials" 
                className="w-full max-w-md lg:max-w-full h-auto object-contain mix-blend-screen drop-shadow-2xl" 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 md:py-24 bg-[#0A101D] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-qx-primary tracking-widest uppercase mb-4">
              OUR CREATIVE SERVICES
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything Your Brand Needs.<br />
              <span className="text-qx-primary">Under One Roof.</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const portfolioUrl = `/portfolio/${service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
              return (
              <motion.div
                key={idx}
                onClick={() => navigate(portfolioUrl)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(255, 90, 0, 0.25)", borderColor: "rgba(255, 90, 0, 0.5)" }}
                className="bg-[#111827] border border-white/5 rounded-2xl p-8 transition-all duration-300 relative group flex flex-col cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-qx-primary/10 rounded-lg flex items-center justify-center shrink-0 border border-qx-primary/20">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{service.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
                
                <div className="mt-auto pt-6 border-t border-white/5">
                  <ul className="space-y-3">
                    {service.points.map((point, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <span className="w-1 h-1 bg-qx-primary rounded-full"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-qx-primary opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 border border-white/10 group-hover:border-qx-primary">
                  <ArrowRight size={14} />
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-[#080D1C] border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <h2 className="text-xs font-bold text-qx-primary tracking-widest uppercase mb-4">
              OUR PROCESS
            </h2>
            <h3 className="text-4xl font-bold text-white">
              From <span className="text-qx-primary">Idea</span> to <span className="text-qx-primary">Impact.</span>
            </h3>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-12 left-[8%] right-[8%] border-t-2 border-dashed border-qx-primary/30 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
              {processSteps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-[#111827] border-2 border-qx-primary rounded-full flex items-center justify-center text-white mb-6 relative z-10 shadow-[0_0_20px_rgba(255,90,0,0.2)]">
                    {step.icon}
                    <div className="absolute -bottom-4 bg-qx-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      {step.num}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed px-2">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-[#0A101D] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-qx-primary tracking-widest uppercase mb-12">
              WHY CHOOSE QEVRIX?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 border-y border-white/10 py-12">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center px-4 relative">
                {idx !== features.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-px bg-white/10"></div>
                )}
                {feature.icon}
                <h4 className="text-white font-bold mb-3 text-sm">{feature.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 md:py-24 bg-[#080D1C]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-[#111827] to-[#1A0B05] rounded-3xl p-8 md:p-12 border border-qx-primary/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
            <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
              <div className="bg-white/5 rounded-xl p-4 flex items-center justify-center shrink-0 border border-white/10 shadow-lg">
                <CompanyLogo theme="dark" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                  READY TO BUILD A <br className="hidden md:block" />
                  <span className="text-qx-primary">STRONGER BRAND?</span>
                </h2>
                <p className="text-gray-400 text-sm max-w-md mx-auto md:mx-0">
                  Tell us what you need. Share your requirement with QEVRIX and our team will review it and get back to you with the next steps.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 w-full md:w-auto shrink-0 mt-4 md:mt-0">
              <button onClick={() => openContactModal("BRANDING & DESIGN")} className="bg-qx-primary text-white font-bold py-4 px-8 rounded-lg hover:bg-qx-primaryHover transition-colors text-center flex items-center justify-center gap-2">
                REQUEST A QUOTE <ArrowRight size={18} />
              </button>
              <a href="tel:+917903682921" className="bg-transparent border border-white/20 text-white font-bold py-4 px-8 rounded-lg hover:bg-white/5 transition-colors text-center flex items-center justify-center gap-2">
                <Phone size={18} className="text-gray-400" /> LET'S TALK
              </a>
            </div>
          </div>
        </div>
      </section>

      <QevrixFooter />
    </div>
  );
}
