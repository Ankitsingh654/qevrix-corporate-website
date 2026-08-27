import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layout, Server, Briefcase, Database } from 'lucide-react';

export default function EngineeringMentors() {
  const mentors = [
    {
      name: 'Sarah J.',
      role: 'Engineering Manager',
      experience: '12+ Years',
      specialization: 'Agile Workflows, Team Leadership',
      icon: Briefcase,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      name: 'Michael T.',
      role: 'Senior Backend Engineer',
      experience: '8+ Years',
      specialization: 'Spring Boot, Microservices',
      icon: Server,
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Elena R.',
      role: 'Frontend Architect',
      experience: '10+ Years',
      specialization: 'React, Performance, Design Systems',
      icon: Layout,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'David K.',
      role: 'DevOps Engineer',
      experience: '7+ Years',
      specialization: 'AWS, CI/CD, Docker',
      icon: Code2,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      name: 'Priya M.',
      role: 'Product Architect',
      experience: '14+ Years',
      specialization: 'System Design, Cloud Native',
      icon: Database,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm font-bold text-[#2563EB] tracking-widest uppercase mb-4">Engineering Leadership</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-6">Learn from Experienced Engineers</h3>
          <p className="text-lg text-[#475569] leading-relaxed">
            Get mentored by senior professionals who have built systems at top-tier product companies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mentors.map((mentor, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center shadow-sm hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] hover:border-[#2563EB]/30 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 mx-auto rounded-full mb-4 flex items-center justify-center ${mentor.color} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                <mentor.icon size={28} />
              </div>
              <h4 className="text-lg font-bold text-[#0F172A] mb-1">{mentor.name}</h4>
              <p className="text-sm font-semibold text-[#2563EB] mb-3">{mentor.role}</p>
              <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-2">
                {mentor.experience}
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                {mentor.specialization}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
