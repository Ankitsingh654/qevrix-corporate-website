import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ClipboardList, Rocket, CheckCircle2 } from 'lucide-react';

export default function OurProcessSection() {
  const processSteps = [
    {
      num: "01",
      icon: <MessageCircle size={22} strokeWidth={2.5} />,
      title: "Consult",
      desc: "Understanding your goals and challenges."
    },
    {
      num: "02",
      icon: <ClipboardList size={22} strokeWidth={2.5} />,
      title: "Plan",
      desc: "Strategizing the right solution and roadmap."
    },
    {
      num: "03",
      icon: <Rocket size={22} strokeWidth={2.5} />,
      title: "Execute",
      desc: "Deploying resources and executing with precision."
    },
    {
      num: "04",
      icon: <CheckCircle2 size={22} strokeWidth={2.5} />,
      title: "Deliver",
      desc: "Delivering quality results that create lasting impact."
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-[#FFFDF9] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header matching the screenshot */}
        <div className="mb-8">
          <div className="text-sm font-bold text-[#FF5A00] tracking-[0.15em] uppercase font-mono">
            // OUR PROCESS
          </div>
        </div>

        {/* Timeline container */}
        <div className="relative mt-12">
          {/* The Connecting Line (Solid orange, perfectly centered between the circles) */}
          <div className="hidden md:block absolute top-[36px] left-[12.5%] right-[12.5%] h-[2px] bg-[#FF5A00] z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative z-10 flex flex-col items-center group"
              >
                
                {/* The Circle */}
                <div className="relative mb-8">
                  <div className="relative w-[72px] h-[72px] rounded-full bg-white border-[2px] border-[#FF5A00] flex items-center justify-center text-[#FF5A00] text-[22px] font-bold z-10 group-hover:scale-105 transition-transform duration-300">
                    {step.num}
                  </div>
                </div>

                {/* Icon + Title */}
                <div className="flex items-center justify-center gap-3 mb-3 w-full">
                   <div className="text-[#FF5A00]">
                     {step.icon}
                   </div>
                   <h3 className="text-[20px] font-bold text-[#0B0B0B] tracking-wide">
                     {step.title}
                   </h3>
                </div>

                {/* Description */}
                <p className="text-[#475569] text-[14px] text-center max-w-[220px] leading-[1.6] font-medium">
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

