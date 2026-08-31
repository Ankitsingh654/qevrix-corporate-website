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
    <section className="py-24 bg-[#060A14] overflow-hidden border-b border-white/5 relative">
      <div className="absolute top-1/2 left-0 w-64 h-full bg-gradient-to-r from-[#060A14] to-transparent z-10 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-full bg-gradient-to-l from-[#060A14] to-transparent z-10 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-20">
        <h2 className="text-xs font-bold text-qx-primary tracking-widest uppercase mb-4">
          CLIENT SUCCESS STORIES
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white">
          Trusted by <span className="text-qx-primary">Industry Leaders.</span>
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
              className="w-[350px] md:w-[450px] shrink-0 bg-[#0A101D] border border-white/5 rounded-2xl p-8 relative group hover:border-qx-primary/30 transition-colors duration-300"
            >
              <Quote className="absolute top-6 right-6 text-qx-primary/10 w-16 h-16 transform group-hover:scale-110 transition-transform duration-500" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-qx-primary text-qx-primary" />
                ))}
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8 relative z-10 font-light">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-qx-primary to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.client.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.client}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
