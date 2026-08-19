import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Database, Layout, Server, Box, Cloud, GitBranch, Share2, Cpu, FileCode2 } from 'lucide-react';

export default function EngineeringCurriculum() {
  const modules = [
    { name: 'Java', desc: 'Core programming, OOD, and logic building.', icon: Coffee, color: 'text-orange-500' },
    { name: 'Spring Boot', desc: 'Enterprise backend development and REST APIs.', icon: FileCode2, color: 'text-green-600' },
    { name: 'SQL & Databases', desc: 'Relational database design, query optimization.', icon: Database, color: 'text-blue-500' },
    { name: 'React', desc: 'Modern frontend engineering and state management.', icon: Layout, color: 'text-cyan-600' },
    { name: 'Microservices', desc: 'Event-driven architecture and distributed systems.', icon: Server, color: 'text-purple-500' },
    { name: 'Docker', desc: 'Containerization and environment consistency.', icon: Box, color: 'text-blue-600' },
    { name: 'AWS', desc: 'Cloud deployments, S3, EC2, and managed services.', icon: Cloud, color: 'text-yellow-600' },
    { name: 'CI/CD', desc: 'Automated testing and deployment pipelines.', icon: GitBranch, color: 'text-red-500' },
    { name: 'System Design', desc: 'Designing scalable high-availability systems.', icon: Share2, color: 'text-indigo-500' },
    { name: 'AI Integration', desc: 'Building AI-powered features and integrations.', icon: Cpu, color: 'text-[#2563EB]' }
  ];

  return (
    <section id="curriculum" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm font-bold text-[#2563EB] tracking-widest uppercase mb-4">Technology Environment</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-6">Engineering Stack</h3>
          <p className="text-lg text-[#475569] leading-relaxed">
            These are the technologies you will work with inside the company to build globally scalable platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {modules.map((mod, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-5 bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-blue-200 rounded-xl transition-all duration-300 group cursor-default"
            >
              <div className="mb-4">
                <mod.icon size={28} className={`${mod.color} group-hover:scale-110 transition-all duration-300`} />
              </div>
              <h4 className="text-[15px] font-bold text-[#0F172A] mb-2">{mod.name}</h4>
              <p className="text-xs text-[#475569] leading-relaxed">{mod.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
