import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    client: "Global Tech Solutions",
    role: "CTO",
    content: "QEVRIX transformed our outdated legacy systems into a modern, scalable architecture. Their IT expertise is unmatched.",
    rating: 5
  },
  {
    id: 2,
    client: "Nexus Infra",
    role: "Project Director",
    content: "The workforce provided by QEVRIX was highly skilled and professional. They helped us deliver our mega-project ahead of schedule.",
    rating: 5
  },
  {
    id: 3,
    client: "Aura Brands",
    role: "Marketing Head",
    content: "Our rebranding campaign was a massive success thanks to the creative genius at QEVRIX. Highly recommended!",
    rating: 5
  },
  {
    id: 4,
    client: "Apex Civil Constructions",
    role: "Managing Director",
    content: "From structural engineering to site management, QEVRIX's civil team delivered exceptional quality and safety standards.",
    rating: 5
  }
];

export default function TestimonialSlider() {
  // Duplicate array for infinite scroll effect
  const scrollingTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-12 md:py-24 bg-[#FFFDF9] overflow-hidden border-b border-[#FFF7ED] relative">
      <div className="absolute top-1/2 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-[#FFFDF9] to-transparent z-10 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-[#FFFDF9] to-transparent z-10 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-20">
        <h2 className="text-sm font-bold text-[#FF5A00] tracking-[0.15em] uppercase font-mono mb-4">
          CLIENT SUCCESS STORIES
        </h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B0B0B]">
          Trusted by <span className="text-[#FF5A00]">Industry Leaders.</span>
        </h3>
      </div>

      <div className="flex w-fit">
        <motion.div 
          className="flex gap-6 px-6"
          animate={{ x: [0, -1032 * testimonials.length / 2] }} // Approximate width of cards to scroll
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {scrollingTestimonials.map((testimonial, idx) => (
            <div 
              key={idx} 
              className="w-[85vw] max-w-[450px] shrink-0 bg-white shadow-[0_8px_30px_rgba(255,90,0,0.06)] border border-[#FFF7ED] rounded-[20px] p-6 md:p-8 relative group hover:border-[#FF5A00]/30 transition-colors duration-300"
            >
              <Quote className="absolute top-6 right-6 text-[#FF5A00] opacity-10 w-16 h-16 transform group-hover:scale-110 transition-transform duration-500" />
              
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FF5A00] text-[#FF5A00]" stroke="none" />
                ))}
              </div>
              
              <p className="text-[#1E293B] text-lg leading-relaxed mb-8 relative z-10 font-medium">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-[#FFF7ED] pt-6 mt-auto relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#FF5A00] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  {testimonial.client.charAt(0)}
                </div>
                <div>
                  <h4 className="text-[#FF5A00] font-bold text-sm">{testimonial.client}</h4>
                  <p className="text-xs text-[#475569] uppercase tracking-wider mt-1">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
