import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Video, Network, TrendingUp } from 'lucide-react';

export default function EngineeringMentorship() {
  const mentorship = [
    {
      title: 'Weekly Review',
      desc: 'One-on-one code reviews and sprint planning sessions to keep you on track.',
      icon: Calendar,
    },
    {
      title: 'Live Sessions',
      desc: 'Interactive system design and live coding sessions with senior engineers.',
      icon: Video,
    },
    {
      title: 'Architecture Guidance',
      desc: 'Learn how to make the right architectural decisions for scalable platforms.',
      icon: Network,
    },
    {
      title: 'Career Mentorship',
      desc: 'Resume reviews, mock interviews, and direct referrals to hiring partners.',
      icon: TrendingUp,
    }
  ];

  return (
    <section className="py-24 bg-[#F5F9FF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-[#2563EB] tracking-widest uppercase mb-4">Engineering Leadership</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-6">Guided by Tech Leads</h3>
            <p className="text-lg text-[#475569] leading-relaxed mb-8">
              Work under the guidance of experienced Engineering Managers and Senior Engineers. They will review your pull requests, critique your architecture, and run your sprints just like in a top-tier tech company.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {mentorship.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 bg-white border border-[#E2E8F0] shadow-sm rounded-xl hover:shadow-md hover:border-[#2563EB]/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#475569] group-hover:text-[#2563EB] group-hover:bg-[#2563EB]/5 group-hover:scale-110 transition-all duration-300 mb-4">
                  <item.icon size={20} />
                </div>
                <h4 className="text-lg font-bold text-[#0F172A] mb-2">{item.title}</h4>
                <p className="text-sm text-[#475569] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
