import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function ClientsSpeak() {
  const testimonials = [
    {
      quote: "QEVRIX delivered our enterprise platform on time with outstanding quality. Their IT expertise is top-notch.",
      name: "Arun Mehta",
      title: "CTO, Reserve Pvt. Ltd.",
      image: "https://i.pravatar.cc/150?u=arun"
    },
    {
      quote: "The workforce support from QEVRIX helped us scale rapidly with the right talent. Highly professional and reliable team.",
      name: "Priya Nair",
      title: "HR Director, TechNova",
      image: "https://i.pravatar.cc/150?u=priya"
    },
    {
      quote: "Their civil project execution is impeccable. Safety, quality and timely delivery - exactly what we expect.",
      name: "Rohit Sharma",
      title: "Project Head, BuildCon",
      image: "https://i.pravatar.cc/150?u=rohit"
    }
  ];

  return (
    <section className="py-24 bg-qx-backgroundAlt border-t border-qx-border">
      <div className="max-w-[1536px] mx-auto px-6">
        <div className="mb-12">
          <div className="text-xs font-bold text-qx-textMuted tracking-widest uppercase flex items-center gap-2 mb-2">
            <span className="w-8 h-px bg-qx-primary"></span>
            CLIENTS SPEAK
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-qx-surface border border-qx-border rounded-2xl p-8 hover:border-qx-primary/30 transition-all duration-300 relative group"
            >
              <Quote size={40} className="text-qx-primary/20 absolute top-6 right-6 group-hover:scale-110 transition-transform" />
              
              <p className="text-qx-textSecondary leading-relaxed mb-8 relative z-10 italic">
                "{test.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <img src={test.image} alt={test.name} className="w-12 h-12 rounded-full border border-qx-border" />
                <div>
                  <h4 className="font-bold text-qx-text text-sm">{test.name}</h4>
                  <p className="text-xs text-qx-textMuted mb-1">{test.title}</p>
                  <div className="flex gap-1 text-qx-primary">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
