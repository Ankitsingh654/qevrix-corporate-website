import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

export default function ClientsSpeak() {
  const testimonials = [
    {
      quote: "QEVRIX delivered our enterprise platform on time with outstanding quality. Their IT expertise is top-notch.",
      name: "Arun Mehta",
      title: "CTO, Finserve Pvt. Ltd.",
      image: "https://i.pravatar.cc/150?u=arun"
    },
    {
      quote: "The workforce support from QEVRIX helped us scale rapidly with the right talent. Highly professional and reliable team.",
      name: "Priya Nair",
      title: "HR Director, TechNova",
      image: "https://i.pravatar.cc/150?u=priya"
    },
    {
      quote: "Their civil project execution is impeccable. Safety, quality and timely delivery — exactly what we expect.",
      name: "Rohit Sharma",
      title: "Project Head, BuildCon",
      image: "https://i.pravatar.cc/150?u=rohit"
    }
  ];

  return (
    <section className="py-20 bg-[#FFFDF9] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="mb-8">
          <div className="text-sm font-bold text-[#FF5A00] tracking-[0.15em] uppercase font-mono">
            // CLIENTS SPEAK
          </div>
        </div>

        <div className="relative">
          {/* Fake Slider Arrows */}
          <button className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FFF7ED] items-center justify-center text-[#FF5A00] hover:bg-[#FFEDD5] transition-colors z-20 shadow-sm">
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>
          
          <button className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FFF7ED] items-center justify-center text-[#FF5A00] hover:bg-[#FFEDD5] transition-colors z-20 shadow-sm">
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgba(255,90,0,0.06)] border border-[#FFF7ED] flex flex-col h-full"
              >
                <div className="text-[#FF5A00] mb-4">
                  <svg width="28" height="24" viewBox="0 0 28 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.53333 13.3333C4.16667 13.3333 2.5 14.8333 2.5 17.5C2.5 20.3333 4.16667 22 6.66667 22C9.5 22 11.5 19.8333 11.5 16.3333C11.5 8.16667 5.66667 3.5 0 1.5L1.16667 0C7.33333 2.16667 13.6667 7 13.6667 16.1667V16.3333C13.6667 19.8333 11.6667 22 8.83333 22C6.33333 22 4.66667 20.3333 4.66667 17.5C4.66667 14.8333 6.33333 13.3333 8.66667 13.3333L6.53333 13.3333ZM20.8667 13.3333C18.5 13.3333 16.8333 14.8333 16.8333 17.5C16.8333 20.3333 18.5 22 21 22C23.8333 22 25.8333 19.8333 25.8333 16.3333C25.8333 8.16667 20 3.5 14.3333 1.5L15.5 0C21.6667 2.16667 28 7 28 16.1667V16.3333C28 19.8333 26 22 23.1667 22C20.6667 22 19 20.3333 19 17.5C19 14.8333 20.6667 13.3333 23 13.3333L20.8667 13.3333Z"/>
                  </svg>
                </div>
                
                <p className="text-[#1E293B] leading-relaxed mb-8 flex-grow font-medium">
                  {test.quote}
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <img src={test.image} alt={test.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-[#FF5A00] text-sm">{test.name}</h4>
                    <p className="text-[12px] text-[#475569] mb-1 font-medium">{test.title}</p>
                    <div className="flex gap-1 text-[#FF5A00]">
                      {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" stroke="none" />)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-10">
             <div className="w-2 h-2 rounded-full bg-[#FF5A00]"></div>
             <div className="w-2 h-2 rounded-full bg-[#FFEDD5]"></div>
             <div className="w-2 h-2 rounded-full bg-[#FFEDD5]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
