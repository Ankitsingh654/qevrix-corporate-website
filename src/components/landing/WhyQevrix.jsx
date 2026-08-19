import React from 'react';
import { CheckCircle2, Target, MessageSquare, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyQevrix() {
  const points = [
    "Technology, workforce and infrastructure support",
    "Flexible engagement based on project requirements",
    "Single-point coordination across multiple services",
    "Practical solutions for growing businesses and projects",
    "Clear scope, communication and delivery process",
    "Built to grow with changing business requirements"
  ];

  const valueCards = [
    { 
      title: "Multi-Service Capability", 
      desc: "Technology, workforce and civil solutions from one trusted business partner.", 
      icon: Layers 
    },
    { 
      title: "Practical Approach", 
      desc: "Solutions designed around real project requirements and business needs.", 
      icon: Target 
    },
    { 
      title: "Clear Communication", 
      desc: "Transparent coordination and straightforward communication throughout the engagement.", 
      icon: MessageSquare 
    },
    { 
      title: "Reliable Execution", 
      desc: "A focused approach to quality, accountability and timely project delivery.", 
      icon: CheckCircle2 
    }
  ];

  return (
    <section id="why-qevrix" className="py-24 bg-qx-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-qx-surface/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Decorative blur */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-qx-primary/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side: Story & Trust Metrics */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-4 h-[2px] bg-qx-primary"></span>
                WHY QEVRIX
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                One Partner. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400">
                  Multiple Capabilities.
                </span>
              </h3>
              <p className="text-lg text-qx-textSecondary leading-relaxed mb-10">
                QEVRIX brings technology, workforce and project execution capabilities together under one company. We focus on practical solutions, clear communication and reliable delivery for every engagement.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {valueCards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -2 }}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-qx-primary/40 hover:bg-qx-primary/5 transition-all duration-300 flex flex-col justify-between cursor-default group"
                    >
                      <div>
                        <div className="text-qx-primary mb-2 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                          <Icon size={20} />
                        </div>
                        <div className="text-lg font-bold text-white mb-1 tracking-tight">{card.title}</div>
                        <div className="text-xs text-qx-textSecondary leading-relaxed">{card.desc}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Side: Checklist */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="text-xs font-bold text-qx-primary tracking-widest uppercase mb-4">OUR COMMITMENT</div>
              {points.map((point, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                  className="flex items-center gap-4 p-5 bg-qx-background/80 backdrop-blur-md rounded-xl border border-white/5 hover:border-qx-primary/40 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:bg-qx-primary/5 transition-all group duration-300"
                >
                  <CheckCircle2 className="text-qx-primary flex-shrink-0 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all duration-300" size={22} />
                  <span className="text-white font-medium text-[15px]">{point}</span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
