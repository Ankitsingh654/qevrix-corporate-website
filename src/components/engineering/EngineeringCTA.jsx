import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TerminalSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EngineeringCTA() {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate('/login');
  };

  return (
    <section className="py-24 bg-[#F5F9FF] border-y border-[#E2E8F0] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/50 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 mx-auto bg-white border border-[#E2E8F0] shadow-sm rounded-2xl flex items-center justify-center mb-8">
            <TerminalSquare size={32} className="text-[#2563EB]" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-[#0F172A] tracking-tight mb-6">
            Ready to Join the <br className="hidden md:block" /> Engineering Team?
          </h2>
          
          <p className="text-lg md:text-xl text-[#475569] leading-relaxed mb-10 max-w-2xl mx-auto">
            Join an engineering environment where you build production software, collaborate with experienced developers, and gain real product engineering experience.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleApplyNow} className="w-full sm:w-auto px-8 py-4 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F172A] group">
              Apply Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white border border-[#E2E8F0] text-[#0F172A] hover:border-[#2563EB]/40 hover:bg-[#F8FAFC] rounded-xl font-bold text-lg transition-all duration-300 shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB]">
              View Engineering Process
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
