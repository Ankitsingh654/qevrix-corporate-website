import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ClipboardList, Rocket, CheckCircle2 } from 'lucide-react';

export default function OurProcessSection() {
  const processSteps = [
    {
      num: "01",
      icon: <MessageCircle size={22} />,
      title: "Consult",
      desc: "Understanding your goals and challenges."
    },
    {
      num: "02",
      icon: <ClipboardList size={22} />,
      title: "Plan",
      desc: "Strategizing the right solution and roadmap."
    },
    {
      num: "03",
      icon: <Rocket size={22} />,
      title: "Execute",
      desc: "Deploying resources and executing with precision."
    },
    {
      num: "04",
      icon: <CheckCircle2 size={22} />,
      title: "Deliver",
      desc: "Delivering quality results that create lasting impact."
    }
  ];

  return (
    <section className="py-4 bg-[#080D1C] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header matching the screenshot */}
        <div className="mb-4">
          <div className="text-sm font-bold text-qx-primary tracking-[0.15em] uppercase font-mono">
            // OUR PROCESS
          </div>
        </div>

        {/* Timeline container */}
        <div className="relative mt-8">
          {/* The Connecting Line (Solid bright orange, perfectly centered between the circles) */}
          <div className="hidden md:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px] bg-qx-primary z-0 shadow-[0_0_10px_rgba(255,90,0,0.8)]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative z-10 flex flex-col items-center group"
              >
                
                {/* The Glowing Circle */}
                <div className="relative mb-10">
                  {/* Ambient Glow behind the circle */}
                  <div className="absolute inset-0 bg-qx-primary/30 blur-xl rounded-full scale-150 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  {/* Circle body */}
                  <div className="relative w-[72px] h-[72px] rounded-full bg-[#080D1C] border-2 border-qx-primary flex items-center justify-center text-white text-[22px] font-bold shadow-[0_0_25px_rgba(255,90,0,0.5)] z-10 group-hover:scale-105 transition-transform duration-300">
                    {step.num}

                    {/* Left Anchor Dot */}
                    {idx !== 0 && (
                      <div className="hidden md:block absolute top-1/2 -left-[5px] w-[8px] h-[8px] rounded-full bg-qx-primary -translate-y-1/2 shadow-[0_0_8px_rgba(255,90,0,0.8)] z-20"></div>
                    )}
                    
                    {/* Right Anchor Dot */}
                    {idx !== processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-[5px] w-[8px] h-[8px] rounded-full bg-qx-primary -translate-y-1/2 shadow-[0_0_8px_rgba(255,90,0,0.8)] z-20"></div>
                    )}
                  </div>
                </div>

                {/* Icon + Title */}
                <div className="flex items-center justify-center gap-3 mb-4 w-full">
                   <div className="text-qx-primary drop-shadow-[0_0_8px_rgba(255,90,0,0.6)] group-hover:scale-110 transition-transform duration-300">
                     {step.icon}
                   </div>
                   <h3 className="text-[20px] font-bold text-white tracking-wide">
                     {step.title}
                   </h3>
                </div>

                {/* Description */}
                <p className="text-[#8F9BB3] text-[14px] text-center max-w-[220px] leading-[1.6] font-medium">
                  {step.desc}
                </p>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
