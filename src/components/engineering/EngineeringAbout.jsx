import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Code2, Rocket, Briefcase, ChevronRight } from 'lucide-react';

export default function EngineeringAbout() {
  const cards = [
    {
      title: 'Mission',
      desc: 'Bridge the gap between academic theory and enterprise production realities.',
      icon: Target,
      color: 'text-[#2563EB]',
      bg: 'bg-blue-50 border-blue-100'
    },
    {
      title: 'Vision',
      desc: 'Create a global ecosystem where engineers build the future while shipping code.',
      icon: Lightbulb,
      color: 'text-purple-600',
      bg: 'bg-purple-50 border-purple-100'
    },
    {
      title: 'Engineering Excellence',
      desc: 'Rigorous code reviews, system design, and production-first mindset.',
      icon: Code2,
      color: 'text-green-600',
      bg: 'bg-green-50 border-green-100'
    },
    {
      title: 'Real Software Company',
      desc: 'Operate like a true engineer with sprints, standups, and deployments.',
      icon: Briefcase,
      color: 'text-[#0F172A]',
      bg: 'bg-slate-100 border-slate-200'
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#F8FAFC] border-y border-[#E2E8F0] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5F9FF] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-[#2563EB] tracking-widest uppercase mb-4">The Industry Gap</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-6">Stop Writing Scripts.<br />Start Shipping Production.</h3>
            <p className="text-lg text-[#475569] leading-relaxed mb-6">
              Most engineering graduates struggle to clear technical rounds at product companies because they have only built basic CRUD applications.
            </p>
            <p className="text-lg text-[#475569] leading-relaxed">
              QEVRIX bridges this gap. You won't just write basic code; you will design architectures that can handle millions of users and deploy them to the cloud.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-md hover:border-[#2563EB]/30 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${card.bg} border border-[#E2E8F0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon size={24} className={card.color} />
                </div>
                <h4 className="text-lg font-bold text-[#0F172A] mb-3">{card.title}</h4>
                <p className="text-sm text-[#475569] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
