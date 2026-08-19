import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Network, Users, Code, Rocket, LayoutGrid, Cloud, Cpu } from 'lucide-react';

export default function EngineeringTrust() {
  const trustMetrics = [
    { name: 'Production Ready Engineering', icon: ShieldCheck },
    { name: 'Enterprise Architecture', icon: Network },
    { name: 'Agile Teams', icon: Users },
    { name: 'Code Reviews', icon: Code },
    { name: 'CI/CD', icon: Rocket },
    { name: 'Microservices', icon: LayoutGrid },
    { name: 'Cloud Native', icon: Cloud },
    { name: 'AI Powered Development', icon: Cpu }
  ];

  return (
    <section className="py-16 bg-white border-b border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold text-[#2563EB] tracking-widest uppercase mb-3">Trusted Engineering Standards</h2>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto">
            Build software using the same engineering practices adopted by modern product companies.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {trustMetrics.map((metric, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm rounded-full text-[#475569] hover:text-[#0F172A] hover:border-[#2563EB]/40 hover:shadow-[0_4px_15px_rgba(37,99,235,0.08)] hover:-translate-y-0.5 transition-all duration-300 group cursor-default"
            >
              <metric.icon size={16} className="text-[#2563EB] group-hover:scale-110 transition-transform duration-300" />
              <span className="text-[13px] font-bold tracking-wide">{metric.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
