import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function EngineeringFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Who can apply?',
      a: 'The program is designed for final-year students, recent graduates, and early-career developers looking to transition into enterprise software engineering.'
    },
    {
      q: 'Do I need experience?',
      a: 'You should have a basic understanding of programming fundamentals and object-oriented concepts. We will teach you how to apply these in a production environment.'
    },
    {
      q: 'How long is the program?',
      a: 'The core engineering experience runs for 16 weeks, structured into 2-week agile sprints, followed by a portfolio presentation phase.'
    },
    {
      q: 'Is it remote?',
      a: 'Yes, our virtual software company operates 100% remotely. You will collaborate with your team via Slack, Jira, and GitHub, just like distributed tech companies.'
    },
    {
      q: 'What technologies will I use?',
      a: 'You will work with a modern enterprise stack including React, Java, Spring Boot, PostgreSQL, Docker, and various Cloud services (AWS/Azure).'
    },
    {
      q: 'Will I work on real products?',
      a: 'Yes. Instead of building toy projects, you will contribute to actual SaaS platforms operating under the QEVRIX brand.'
    },
    {
      q: 'Do I receive a certificate?',
      a: 'Upon successful completion of your performance reviews and deployments, you will receive a verifiable Enterprise Engineering Certificate.'
    },
    {
      q: 'Do you provide interview guidance?',
      a: 'Yes. Our career acceleration phase includes resume reviews, mock technical interviews, and system design preparation to help you secure a top-tier role.'
    }
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-[#2563EB] tracking-widest uppercase mb-4">Got Questions?</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-6">Frequently Asked Questions</h3>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'bg-white shadow-[0_8px_30px_rgba(37,99,235,0.08)] border-[#2563EB]/30' : 'bg-white hover:bg-[#F1F5F9]'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
                aria-expanded={openIndex === i}
                aria-controls={`faq-content-${i}`}
                id={`faq-header-${i}`}
              >
                <span className={`text-base font-bold transition-colors ${openIndex === i ? 'text-[#2563EB]' : 'text-[#0F172A]'}`}>
                  {faq.q}
                </span>
                <ChevronDown 
                  size={20} 
                  className={`text-[#94A3B8] transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-[#2563EB]' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    id={`faq-content-${i}`}
                    aria-labelledby={`faq-header-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-2 text-[#475569] leading-relaxed border-t border-[#E2E8F0]/50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
