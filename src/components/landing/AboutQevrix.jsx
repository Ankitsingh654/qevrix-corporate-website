import React from 'react';
import { Target, Globe, Cpu, Users, Building, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutQevrix() {
  const cards = [
    { title: 'Our Mission', icon: Target, desc: 'Deliver reliable solutions with accountability.' },
    { title: 'Our Vision', icon: Globe, desc: 'Build a trusted and scalable Indian enterprise.' },
    { title: 'Technology', icon: Cpu, desc: 'Software, digital platforms and automation.' },
    { title: 'Workforce', icon: Users, desc: 'Skilled manpower and workforce support.' },
    { title: 'Infrastructure', icon: Building, desc: 'Civil works and project execution.' },
    { title: 'Customer Focus', icon: CheckCircle, desc: 'Clear communication, quality and timely delivery.' },
  ];

  const timeline = [
    { year: '2026', title: 'Founded' },
    { title: 'Technology Solutions' },
    { title: 'Workforce Solutions' },
    { title: 'Civil & Construction' },
  ];

  return (
    <section id="about" className="py-24 bg-qx-surface border-y border-qx-border relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-qx-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Storytelling & Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-qx-primary"></span>
              ABOUT QEVRIX
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-qx-text mb-6 leading-tight tracking-tight">
              One Company. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400">
                Multiple Capabilities.
              </span>
            </h3>
            <p className="text-lg text-qx-textSecondary mb-12 leading-relaxed font-medium">
              QEVRIX is a multi-service company operating across technology, workforce, and civil solutions. We combine skilled execution, practical technology, and reliable service delivery to help clients move projects forward.
            </p>

            {/* Premium Enterprise Timeline */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-qx-primary/50 before:via-qx-primary/20 before:to-transparent">
              {timeline.map((item, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: i * 0.1 }}
                   className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-qx-surface bg-qx-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300"></div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md shadow-sm group-hover:border-qx-primary/30 group-hover:bg-qx-primary/5 transition-all duration-300">
                    <div className="flex items-center justify-between mb-1">
                      {item.year && <time className="font-mono text-xs font-medium text-qx-primary">{item.year}</time>}
                    </div>
                    <div className="text-sm font-bold text-white">{item.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Feature Glass Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {cards.map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-5 bg-qx-background/80 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-qx-primary/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:bg-qx-primary/5 transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-default"
              >
                <div className="h-10 w-10 rounded-full bg-qx-surface flex items-center justify-center text-qx-primary mb-3 group-hover:bg-qx-primary/20 group-hover:scale-110 transition-all duration-300">
                  <card.icon size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                </div>
                <h4 className="text-[14px] font-bold text-white tracking-wide">{card.title}</h4>
                {card.desc && (
                  <p className="text-[12px] text-qx-textSecondary mt-2 leading-relaxed font-medium">
                    {card.desc}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
