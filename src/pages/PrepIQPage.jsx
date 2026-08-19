import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Brain, Code, Target, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';

export default function PrepIQPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    { title: 'AI Mock Interviews', desc: 'Simulate real-world technical interviews with our advanced AI.', icon: Brain },
    { title: 'Code Analysis', desc: 'Real-time feedback on your time and space complexity.', icon: Code },
    { title: 'Targeted Practice', desc: 'Focus on your weakest data structures and algorithms.', icon: Target },
  ];

  return (
    <div className="min-h-screen bg-qx-background selection:bg-qx-primary/30 selection:text-white">
      <QevrixNavbar />
      
      {/* Product Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-qx-primary/10 text-qx-primary font-medium text-sm mb-8 border border-qx-primary/20">
            <Rocket size={16} /> QEVRIX Products
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-qx-text tracking-tight mb-6">
            PrepIQ
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400 mb-8">
            AI Learning Platform
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-qx-textSecondary mb-12 leading-relaxed">
            Personalized AI learning platform for students preparing for technical interviews and competitive exams. Maximize your potential with data-driven insights.
          </p>
          
          {/* Authentication Resides Here */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => navigate('/signup')} className="h-14 px-8 text-base shadow-lg shadow-qx-primary/30">
              Start Learning Free <ArrowRight size={18} className="ml-2 inline" />
            </Button>
            <Button variant="secondary" onClick={() => navigate('/login')} className="h-14 px-8 text-base">
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-24 bg-qx-surface border-y border-qx-border px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="p-8 rounded-2xl bg-qx-background border border-qx-border hover:border-qx-primary/50 transition-colors">
                  <div className="h-12 w-12 rounded-xl bg-qx-primary/10 text-qx-primary flex items-center justify-center mb-6">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-qx-text mb-3">{f.title}</h3>
                  <p className="text-qx-textSecondary leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Architecture & Scalability preview */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-qx-text mb-6">Built on Enterprise Architecture</h2>
          <p className="text-lg text-qx-textSecondary mb-12">
            PrepIQ leverages the same scalable infrastructure that powers QEVRIX enterprise platforms, ensuring zero downtime and sub-millisecond AI response times.
          </p>
          <div className="aspect-video rounded-2xl border border-qx-border bg-qx-surface/50 flex items-center justify-center">
            <span className="text-qx-textSecondary font-medium text-lg">[Architecture Diagram Placeholder]</span>
          </div>
        </div>
      </section>

      <QevrixFooter />
    </div>
  );
}
