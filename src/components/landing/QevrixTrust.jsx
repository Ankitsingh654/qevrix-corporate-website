import React from 'react';
import { Server, ShieldCheck, Cpu, Cloud, Maximize, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QevrixTrust() {
  const features = [
    {
      title: 'Enterprise Architecture',
      desc: 'Built on scalable, event-driven microservices designed to handle millions of operations.',
      icon: Server,
    },
    {
      title: 'Secure by Design',
      desc: 'Zero-trust network architecture with end-to-end encryption and compliance-first data handling.',
      icon: ShieldCheck,
    },
    {
      title: 'AI Native',
      desc: 'Intelligence embedded at the core layer, offering predictive analytics and smart automation.',
      icon: Cpu,
    },
    {
      title: 'Cloud Ready',
      desc: 'Multi-cloud agnostic deployments supporting AWS, Azure, and Google Cloud seamlessly.',
      icon: Cloud,
    },
    {
      title: 'Built for Scale',
      desc: 'Auto-scaling infrastructure that grows organically with your organizational demands.',
      icon: Maximize,
    },
    {
      title: 'Engineering Excellence',
      desc: 'Crafted by elite engineers utilizing modern tech stacks and rigorous testing methodologies.',
      icon: Code2,
    },
  ];

  return (
    <section className="py-24 bg-qx-surface border-y border-qx-border relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-qx-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Why Enterprises Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400">QEVRIX</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-qx-background/50 border border-white/5 hover:border-qx-primary/40 hover:bg-qx-primary/5 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-300 group cursor-default backdrop-blur-sm relative overflow-hidden"
            >
              {/* Subtle Glow on Hover */}
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-qx-primary/10 to-transparent group-hover:inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-xl"></div>
              
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-qx-primary group-hover:scale-110 group-hover:border-qx-primary/30 group-hover:bg-qx-primary/10 transition-all duration-300 mb-6">
                  <feature.icon size={24} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3 tracking-wide">{feature.title}</h4>
                <p className="text-[15px] text-qx-textSecondary leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
