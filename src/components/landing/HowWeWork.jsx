import React from 'react';
import { MessagesSquare, FileSearch, Rocket, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowWeWork() {
  const steps = [
    {
      title: "Consult",
      desc: "We discuss your requirements, understand your business challenges, and define clear objectives.",
      icon: MessagesSquare
    },
    {
      title: "Plan",
      desc: "We map out the strategy, resource allocation, timelines, and technical architecture tailored to your needs.",
      icon: FileSearch
    },
    {
      title: "Execute",
      desc: "Our teams deploy the necessary technology, workforce, or civil solutions with structured coordination.",
      icon: Rocket
    },
    {
      title: "Deliver",
      desc: "We ensure quality handover, ongoing support, and reliable project completion on time.",
      icon: CheckCircle2
    }
  ];

  return (
    <section id="how-we-work" className="py-24 bg-qx-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-qx-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
            <span className="w-4 h-[2px] bg-qx-primary"></span>
            HOW WE WORK
            <span className="w-4 h-[2px] bg-qx-primary"></span>
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            A Structured Process for <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400">Reliable Delivery.</span>
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative group p-6 md:p-8 rounded-[20px] bg-qx-surface/80 border border-qx-border hover:border-qx-primary/30 transition-all duration-300 shadow-sm"
              >
                {/* Step Number Indicator */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-qx-background border border-qx-border rounded-full flex items-center justify-center text-qx-primary font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
                
                <div className="h-14 w-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:text-qx-primary group-hover:bg-qx-primary/10 transition-colors duration-300">
                  <Icon size={28} />
                </div>
                
                <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                <p className="text-sm text-qx-textSecondary leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
