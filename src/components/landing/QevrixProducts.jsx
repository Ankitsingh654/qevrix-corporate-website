import React from 'react';
import { Code2, Users, Building, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function QevrixProducts() {
  const navigate = useNavigate();
  
  const services = [
    {
      id: 'it-software',
      name: 'IT & Software',
      subtitle: 'Technology Solutions',
      desc: 'Custom digital solutions designed to help businesses operate smarter, automate processes, and grow with confidence.',
      icon: Code2,
      highlights: [
        'Custom Software',
        'Web Applications',
        'Business Automation',
        'AI Solutions',
        'CRM & Admin Systems',
        'Support & Maintenance'
      ],
      path: '/services/it-software',
      ctaText: 'Explore IT Solutions →',
      color: 'from-blue-500/20 to-qx-primary/5',
      accent: 'text-blue-400'
    },
    {
      id: 'workforce',
      name: 'Workforce Solutions',
      subtitle: 'Manpower & Staffing',
      desc: 'Reliable workforce support for businesses that need skilled, semi-skilled, and operational manpower.',
      icon: Users,
      highlights: [
        'Skilled & General Manpower',
        'Construction Workforce',
        'Warehouse & Logistics Staff',
        'Safety / EHS Support',
        'Staffing Solutions'
      ],
      path: '/services/workforce',
      ctaText: 'Explore Workforce Solutions →',
      color: 'from-emerald-500/20 to-qx-primary/5',
      accent: 'text-emerald-400'
    },
    {
      id: 'civil-construction',
      name: 'Civil & Construction',
      subtitle: 'Project & Site Services',
      desc: 'Practical civil, construction, maintenance, and project execution support tailored to your requirements.',
      icon: Building,
      highlights: [
        'Civil Works',
        'Renovation & Maintenance',
        'Construction Support',
        'Site Workforce',
        'Project Execution'
      ],
      path: '/services/civil-construction',
      ctaText: 'Explore Civil Services →',
      color: 'from-purple-500/20 to-qx-primary/5',
      accent: 'text-purple-400'
    }
  ];

  const handleCtaClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 bg-qx-background relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
            <span className="w-4 h-[2px] bg-qx-primary"></span>
            OUR SERVICES
            <span className="w-4 h-[2px] bg-qx-primary"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-qx-text mb-6 tracking-tight">
            Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400">Every Stage of Growth.</span>
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group rounded-3xl border border-white/5 bg-qx-surface/50 backdrop-blur-md hover:border-qx-primary/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col h-full relative overflow-hidden"
                onClick={() => handleCtaClick(s.path)}
              >
                {/* Top Gradient Glow */}
                <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${s.color} opacity-20 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="p-8 flex-1 relative z-10 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-qx-primary/20 group-hover:border-qx-primary/30 group-hover:text-qx-primary transition-all duration-300">
                      <Icon size={24} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-1 tracking-tight group-hover:text-qx-primary transition-colors">{s.name}</h3>
                  <p className={`text-sm font-semibold mb-4 ${s.accent}`}>{s.subtitle}</p>
                  <p className="text-sm text-qx-textSecondary leading-relaxed mb-6">{s.desc}</p>
                  
                  {/* Service Highlights Chips */}
                  <div className="flex flex-wrap gap-2 mt-auto mb-6">
                    {s.highlights.map((h, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-qx-textSecondary group-hover:border-qx-primary/20 group-hover:text-white transition-colors duration-300"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-[15px] font-semibold text-qx-textSecondary group-hover:text-qx-primary transition-colors mt-auto">
                    <span className="flex items-center gap-2">
                      {s.ctaText}
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
