import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-qx-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] overflow-hidden p-[1px] group"
        >
          {/* Animated Gradient Border Layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-qx-primary via-blue-400 to-purple-500 opacity-30 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="absolute -inset-[200%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-0 group-hover:opacity-20"></div>

          {/* Inner Glass Panel */}
          <div className="relative bg-[#080d1a] rounded-[calc(2rem-1px)] p-12 md:p-20 text-center overflow-hidden">
            {/* Ambient Background Glows inside panel */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-qx-primary/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
                Ready to Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Future?</span>
              </h2>
              <p className="text-xl md:text-2xl text-qx-textSecondary mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
                Let's discuss your product, <br className="hidden sm:block" />
                engineering team, <br className="hidden sm:block" />
                or enterprise platform.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button onClick={() => {
                  navigate('/?service=Schedule+Meeting#contact');
                  setTimeout(() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} className="h-14 px-8 text-base shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center gap-2 group/btn hover:scale-[1.02] transition-transform border border-qx-primary/50 relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-in-out"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    <Calendar size={18} /> Schedule Meeting
                  </span>
                </Button>
                
                <Button variant="secondary" onClick={() => navigate('/products')} className="h-14 px-8 text-base flex items-center gap-2 group/btn2 hover:scale-[1.02] transition-all duration-300 border border-white/10 hover:border-qx-primary/30 hover:bg-white/5 bg-transparent">
                  Explore Products
                  <ArrowRight size={18} className="group-hover/btn2:translate-x-1 transition-transform text-qx-textSecondary group-hover/btn2:text-white" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
