import React from 'react';
import { Code2, Users, Building, Workflow, ShieldCheck, Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EnterpriseSolutions() {
  const solutions = [
    {
      title: 'Digital Transformation',
      desc: 'Modernize business operations with custom software, web platforms, mobile applications, AI solutions and business automation.',
      icon: Code2,
      highlights: ['Custom Software', 'Web & Mobile Apps', 'AI Solutions', 'Automation'],
      cta: 'Discuss Your Project'
    },
    {
      title: 'Workforce Deployment',
      desc: 'Access skilled and general manpower support for business operations, projects, construction sites and growing workforce requirements.',
      icon: Users,
      highlights: ['Skilled Manpower', 'General Workforce', 'Technical Staff', 'Project Staffing'],
      cta: 'Request Workforce'
    },
    {
      title: 'Civil Project Support',
      desc: 'Reliable support for civil works, site execution, maintenance and infrastructure-related project requirements.',
      icon: Building,
      highlights: ['Civil Works', 'Site Execution', 'Maintenance', 'Infrastructure Support'],
      cta: 'Discuss Project'
    },
    {
      title: 'Business Operations Support',
      desc: 'Improve execution with practical technology, workforce coordination and operational support designed around real business needs.',
      icon: Workflow,
      highlights: ['Process Support', 'Digital Workflows', 'Operations', 'Project Coordination'],
      cta: 'Talk to Us'
    },
    {
      title: 'Safety & Compliance Support',
      desc: 'Support safer project environments through trained workforce coordination, safety-focused deployment and operational discipline.',
      icon: ShieldCheck,
      highlights: ['Safety Workforce', 'Site Support', 'Operational Discipline', 'Project Support'],
      cta: 'Get Details'
    },
    {
      title: 'Scalable Growth Support',
      desc: 'Flexible solutions that can scale with changing project requirements, workforce needs and business growth.',
      icon: Rocket,
      highlights: ['Flexible Engagement', 'Project-Based Support', 'Long-Term Support', 'Scalable Delivery'],
      cta: 'Let\'s Discuss'
    }
  ];

  const tags = ['Technology', 'Automation', 'Workforce', 'Staffing', 'Safety Support', 'Civil Works', 'Construction', 'Maintenance'];

  const handleCtaClick = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="solutions" className="py-24 bg-qx-surface border-y border-qx-border relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-qx-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-qx-primary"></span>
              TRUSTED BUSINESS SOLUTIONS
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              Solutions Built Around <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400">Your Business.</span>
            </h3>
            <p className="text-qx-textSecondary mb-8 leading-relaxed text-lg">
              From technology development and skilled workforce support to civil project execution, QEVRIX delivers practical solutions designed around your business requirements.
            </p>
            
            {/* Capability Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-semibold text-white/70 hover:text-white hover:bg-qx-primary/20 hover:border-qx-primary/50 transition-all cursor-default">
                  {tag}
                </span>
              ))}
            </div>

            <button 
              onClick={handleCtaClick}
              className="flex items-center gap-2 text-qx-primary font-bold hover:text-blue-400 transition-colors group"
            >
              Discuss Your Requirements <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
            {solutions.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group p-8 rounded-2xl border border-white/5 bg-qx-background/80 backdrop-blur-md hover:border-qx-primary/40 hover:bg-qx-primary/5 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-300 relative flex flex-col"
                  onClick={handleCtaClick}
                >
                  {/* Accent Border Line */}
                  <div className="absolute top-0 left-0 w-0 h-0.5 bg-qx-primary group-hover:w-full transition-all duration-500 rounded-t-2xl"></div>

                  <div className="h-14 w-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-qx-primary group-hover:scale-110 group-hover:bg-qx-primary/10 transition-all duration-300 mb-6 shadow-sm">
                    <Icon size={26} />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h4 className="text-xl font-bold text-white mb-3 tracking-wide">{s.title}</h4>
                    <p className="text-[15px] text-qx-textSecondary leading-relaxed mb-6">{s.desc}</p>
                    
                    {/* Compact Highlight Chips */}
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
                  </div>

                  <div className="mt-auto flex items-center text-sm font-semibold text-qx-textSecondary group-hover:text-qx-primary transition-colors">
                    <span className="flex items-center gap-2">
                      {s.cta}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
