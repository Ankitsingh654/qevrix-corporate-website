import React from 'react';
import { motion } from 'framer-motion';
import { Quote, User } from 'lucide-react';

export default function EngineeringTestimonials() {
  const testimonials = [
    {
      name: 'Alex R.',
      role: 'Software Engineer II',
      feedback: 'The engineering workflow feels exactly like a real software company. The sprint structure and PR reviews prepared me for my current role.',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100'
    },
    {
      name: 'Samantha P.',
      role: 'Backend Developer',
      feedback: 'I learned production architecture instead of basic CRUD. Building actual microservices that communicate via message brokers was a game changer.',
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-100'
    },
    {
      name: 'Rahul V.',
      role: 'Full Stack Engineer',
      feedback: 'My confidence for product interviews improved significantly. Having real enterprise products on my resume made all the difference.',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100'
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
          <h2 className="text-sm font-bold text-[#2563EB] tracking-widest uppercase mb-4">Success Stories</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-6">Built for Engineers, by Engineers</h3>
          <p className="text-lg text-[#475569] leading-relaxed">
            See how our virtual software company experience has transformed careers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] relative shadow-sm hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] hover:border-[#2563EB]/30 hover:-translate-y-1 transition-all duration-300 group"
            >
              <Quote size={40} className="absolute top-6 right-6 text-[#E2E8F0] group-hover:text-[#2563EB]/20 transition-colors duration-300" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${test.iconBg} ${test.iconColor}`}>
                  <User size={20} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#0F172A]">{test.name}</h4>
                  <p className="text-sm font-semibold text-[#2563EB]">{test.role}</p>
                </div>
              </div>
              
              <p className="text-[#475569] leading-relaxed relative z-10 italic">
                "{test.feedback}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
