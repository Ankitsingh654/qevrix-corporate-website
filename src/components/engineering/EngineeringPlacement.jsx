import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Briefcase, Users, Share2 } from 'lucide-react';

export default function EngineeringPlacement() {
  const support = [
    {
      title: 'Resume Review',
      desc: 'Craft an ATS-friendly engineering resume highlighting your production experience.',
      icon: FileText,
    },
    {
      title: 'Portfolio Building',
      desc: 'Showcase your enterprise projects on GitHub with professional documentation.',
      icon: Briefcase,
    },
    {
      title: 'Mock Interviews',
      desc: 'Practice technical and behavioral interviews with engineers from top companies.',
      icon: Users,
    },
    {
      title: 'Job Referrals',
      desc: 'Get direct referrals to our network of hiring partners and enterprise tech companies.',
      icon: Share2,
    }
  ];

  return (
    <section className="py-24 bg-white border-y border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm font-bold text-[#2563EB] tracking-widest uppercase mb-4">Career Acceleration</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-6">Career Growth</h3>
          <p className="text-lg text-[#475569] leading-relaxed">
            We ensure your engineering portfolio, system design knowledge, and practical experience position you perfectly for enterprise engineering roles.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {support.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm rounded-2xl hover:shadow-md hover:border-[#2563EB]/30 transition-all duration-300 group text-center hover:-translate-y-1"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#475569] group-hover:bg-[#2563EB] group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-6 shadow-sm">
                <item.icon size={24} />
              </div>
              <h4 className="text-lg font-bold text-[#0F172A] mb-3">{item.title}</h4>
              <p className="text-sm text-[#475569] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
