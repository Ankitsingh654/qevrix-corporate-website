import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function EngineeringOutcomes() {
  const skills = [
    'Build Microservices',
    'Design REST APIs',
    'Dockerize Applications',
    'Deploy on Cloud',
    'Participate in Code Reviews',
    'Build Enterprise UI',
    'Work in Agile Teams',
    'Solve System Design Problems',
    'Ship Production Features'
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/50 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm font-bold text-[#2563EB] tracking-widest uppercase mb-4">Career Outcomes</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-6">What You'll Become</h3>
          <p className="text-lg text-[#475569] leading-relaxed">
            Skills you will gain after completing the engineering program.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-3 px-6 py-4 bg-white border border-[#E2E8F0] shadow-sm rounded-full hover:border-[#2563EB]/40 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] hover:-translate-y-1 transition-all duration-300 group cursor-default"
            >
              <CheckCircle2 size={20} className="text-[#2563EB] group-hover:scale-110 transition-transform duration-300" />
              <span className="text-[15px] font-bold text-[#0F172A] tracking-wide group-hover:text-[#2563EB] transition-colors">{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
