import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Workflow, GraduationCap, Check, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export default function QevrixProductsSection() {
  const navigate = useNavigate();

  const handleCTA = (path) => {
    if (path.startsWith('#')) {
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-24 bg-[#080C19] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-qx-primary/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
            <span className="w-4 h-[2px] bg-qx-primary"></span>
            QEVRIX PRODUCTS
            <span className="w-4 h-[2px] bg-qx-primary"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Building Products for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary via-blue-400 to-qx-primaryHover drop-shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              Real-World Progress.
            </span>
          </h3>
          <p className="text-qx-textSecondary text-lg leading-relaxed max-w-2xl mx-auto">
            Alongside our business services, QEVRIX is building practical digital products and structured platforms for workforce operations, learning and real-world technology experience.
          </p>
        </div>

        {/* Premium Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1 — Featured: QEVRIX Virtual Software Company */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-qx-surface border border-qx-border hover:border-qx-borderHover rounded-[20px] p-8 lg:p-10 flex flex-col lg:flex-row justify-between gap-10 shadow-sm relative overflow-hidden lg:col-span-2 group"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-[11px] font-bold text-qx-primary uppercase tracking-widest">
                  TALENT EXPERIENCE PLATFORM
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-qx-primary/10 text-qx-primary border border-qx-primary/20">
                  Featured Program
                </span>
              </div>
              <h4 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Code2 className="text-qx-primary flex-shrink-0" size={28} />
                Virtual Software Company
              </h4>
              <p className="text-[15px] text-qx-textSecondary leading-relaxed mb-8 max-w-xl">
                A structured software work environment designed to help aspiring developers gain practical experience through project-based collaboration, real development workflows and professional engineering practices.
              </p>

              <Button 
                onClick={() => handleCTA('/engineering')} 
                className="h-12 px-8 flex items-center justify-center gap-2 font-bold text-[14px] bg-qx-primary hover:bg-qx-primaryHover text-white rounded-lg transition-all"
              >
                Explore the Program
                <ArrowRight size={16} />
              </Button>
            </div>
            
            <div className="flex-1 lg:border-l lg:border-qx-border lg:pl-10">
              <h5 className="text-[12px] font-bold text-white uppercase tracking-wider mb-6">Program Highlights</h5>
              <ul className="space-y-4">
                {[
                  "Project-Based Learning",
                  "Team Collaboration",
                  "Real Development Workflows",
                  "Git & Version Control",
                  "Code Review Practices",
                  "Agile-Style Project Execution"
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[14px] text-qx-textSecondary font-medium">
                    <Check className="text-qx-primary flex-shrink-0" size={18} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 2 — QEVRIX WorkforceOS */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-qx-surface border border-qx-border hover:border-qx-borderHover rounded-[20px] p-8 flex flex-col justify-between transition-all duration-300 group"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="text-[11px] font-bold text-qx-textSecondary uppercase tracking-widest">
                  WORKFORCE TECHNOLOGY
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-qx-background text-qx-textMuted border border-qx-border">
                  In Development
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Workflow className="text-qx-primary flex-shrink-0" size={24} />
                QEVRIX WorkforceOS
              </h4>
              <p className="text-[14px] text-qx-textSecondary leading-relaxed mb-8">
                A digital platform being developed to support workforce coordination, worker management and operational requirements.
              </p>

              <div className="border-t border-qx-border pt-6 mb-8">
                <ul className="space-y-3">
                  {[
                    "Worker Profiles",
                    "Workforce Coordination",
                    "Requirement Management",
                    "Operational Visibility"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-[14px] text-qx-textSecondary">
                      <Check className="text-qx-textMuted flex-shrink-0" size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button 
              variant="secondary"
              onClick={() => handleCTA('/products/workforce')} 
              className="w-full h-12 flex items-center justify-center gap-2 border border-qx-border hover:bg-qx-background bg-transparent text-[14px] font-semibold text-white rounded-lg transition-all"
            >
              Explore WorkforceOS
            </Button>
          </motion.div>

          {/* Card 3 — PrepIQ */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-qx-surface border border-qx-border hover:border-qx-borderHover rounded-[20px] p-8 flex flex-col justify-between transition-all duration-300 group"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="text-[11px] font-bold text-qx-textSecondary uppercase tracking-widest">
                  EDUCATION TECHNOLOGY
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-qx-success/10 text-qx-success border border-qx-success/20">
                  Live
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <GraduationCap className="text-qx-primary flex-shrink-0" size={24} />
                PrepIQ
              </h4>
              <p className="text-[14px] text-qx-textSecondary leading-relaxed mb-8">
                A digital learning platform focused on structured exam preparation, practice and student progress tracking.
              </p>

              <div className="border-t border-qx-border pt-6 mb-8">
                <ul className="space-y-3">
                  {[
                    "Mock Tests & Practice",
                    "Performance Tracking",
                    "Structured Learning Modules",
                    "Self-Paced Practice"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-[14px] text-qx-textSecondary">
                      <Check className="text-qx-textMuted flex-shrink-0" size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button 
              variant="secondary"
              onClick={() => handleCTA('/products/prepiq')} 
              className="w-full h-12 flex items-center justify-center gap-2 border border-qx-border hover:bg-qx-background bg-transparent text-[14px] font-semibold text-white rounded-lg transition-all"
            >
              Explore PrepIQ
              <ArrowRight size={16} />
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
