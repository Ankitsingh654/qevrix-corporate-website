import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LeadershipSnippet() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-qx-surface border-y border-qx-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-qx-background rounded-3xl border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-xl">
          {/* Left Content */}
          <div className="p-10 md:p-14 lg:w-3/5 flex flex-col justify-center">
            <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-qx-primary"></span>
              LEADERSHIP
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Driven by a vision to build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400">stronger future.</span>
            </h3>
            <p className="text-qx-textSecondary text-[16px] leading-relaxed mb-8 max-w-lg">
              At QEVRIX, our leadership is committed to transparency, structured execution, and delivering practical value. We focus on building a robust ecosystem where technology and workforce converge.
            </p>
            <div>
              <button 
                onClick={() => {
                  navigate('/founders');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-qx-primary/10 hover:border-qx-primary/30 hover:text-qx-primary transition-all duration-300 group"
              >
                Meet the Founders
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          {/* Right Image/Graphic area */}
          <div className="lg:w-2/5 bg-gray-900 relative min-h-[300px]">
            <img 
              src="/assets/founders.jpg" 
              alt="Qevrix Leadership" 
              className="object-cover w-full h-full opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-qx-background to-transparent md:w-32"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
