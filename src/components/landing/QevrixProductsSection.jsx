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

        {/* 3-Column Premium Product Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1 — Featured: QEVRIX Virtual Software Company */}
          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-b from-[#11182D] to-[#0A0E1A] border-2 border-qx-primary/40 rounded-3xl p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(59,130,246,0.1)] relative overflow-hidden lg:col-span-1"
          >
            {/* Ambient visual badge indicator */}
            <div className="absolute top-0 right-0 bg-qx-primary/20 text-qx-primary text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl border-l border-b border-qx-primary/30">
              Featured Program
            </div>

            <div>
              <div className="text-xs font-bold text-qx-primary uppercase tracking-wider mb-3">
                TALENT EXPERIENCE PLATFORM
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Code2 className="text-qx-primary flex-shrink-0" size={24} />
                Virtual Software Company
              </h4>
              <p className="text-sm text-qx-textSecondary leading-relaxed mb-6 font-medium">
                A structured software work environment designed to help aspiring developers gain practical experience through project-based collaboration, real development workflows and professional engineering practices.
              </p>

              <div className="border-t border-white/5 pt-6 mb-8">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Program Highlights</h5>
                <ul className="space-y-3">
                  {[
                    "Project-Based Learning",
                    "Team Collaboration",
                    "Real Development Workflows",
                    "Git & Version Control",
                    "Code Review Practices",
                    "Agile-Style Project Execution"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-sm text-qx-textSecondary font-medium">
                      <Check className="text-qx-primary flex-shrink-0" size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button 
              onClick={() => handleCTA('/engineering')} 
              className="w-full h-12 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] font-bold text-sm"
            >
              Explore the Program
              <ArrowRight size={16} />
            </Button>
          </motion.div>

          {/* Card 2 — QEVRIX WorkforceOS */}
          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0D1324] border border-white/5 hover:border-qx-primary/30 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="text-xs font-bold text-qx-textSecondary uppercase tracking-wider">
                  WORKFORCE TECHNOLOGY
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-qx-textSecondary border border-white/10">
                  In Development
                </span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Workflow className="text-qx-primary flex-shrink-0" size={24} />
                QEVRIX WorkforceOS
              </h4>
              <p className="text-sm text-qx-textSecondary leading-relaxed mb-6">
                A digital platform being developed to support workforce coordination, worker management and operational requirements.
              </p>

              <div className="border-t border-white/5 pt-6 mb-8">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Core Capacities</h5>
                <ul className="space-y-3">
                  {[
                    "Worker Profiles",
                    "Workforce Coordination",
                    "Requirement Management",
                    "Operational Visibility"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-sm text-qx-textSecondary">
                      <Check className="text-qx-primary flex-shrink-0" size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button 
              variant="secondary"
              onClick={() => handleCTA('/products/workforce')} 
              className="w-full h-12 flex items-center justify-center gap-2 border-white/10 hover:border-qx-primary/30 text-sm font-semibold"
            >
              Explore WorkforceOS
              <span className="text-xs opacity-75 font-normal">(Coming Soon)</span>
            </Button>
          </motion.div>

          {/* Card 3 — PrepIQ */}
          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0D1324] border border-white/5 hover:border-qx-primary/30 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="text-xs font-bold text-qx-textSecondary uppercase tracking-wider">
                  EDUCATION TECHNOLOGY
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/25">
                  Live
                </span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <GraduationCap className="text-qx-primary flex-shrink-0" size={24} />
                PrepIQ
              </h4>
              <p className="text-sm text-qx-textSecondary leading-relaxed mb-6">
                A digital learning platform focused on structured exam preparation, practice and student progress tracking.
              </p>

              <div className="border-t border-white/5 pt-6 mb-8">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Core Highlights</h5>
                <ul className="space-y-3">
                  {[
                    "Mock Tests & Practice",
                    "Performance Tracking",
                    "Structured Learning Modules",
                    "Self-Paced Practice"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-sm text-qx-textSecondary">
                      <Check className="text-qx-primary flex-shrink-0" size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button 
              variant="secondary"
              onClick={() => handleCTA('/products/prepiq')} 
              className="w-full h-12 flex items-center justify-center gap-2 border-white/10 hover:border-qx-primary/30 text-sm font-semibold"
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
