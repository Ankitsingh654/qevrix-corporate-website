import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Users, Briefcase, ArrowRight, Code2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';

export default function ProductsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      name: 'PrepIQ',
      tagline: 'AI Learning Platform',
      desc: 'Personalized AI learning platform for students preparing for technical interviews and competitive exams.',
      icon: Rocket,
      path: '/products/prepiq',
      comingSoon: false,
    },
    {
      name: 'WorkforceOS',
      tagline: 'Enterprise Workforce Management Platform',
      desc: 'Manage engineering teams, track metrics, and optimize developer productivity across your enterprise.',
      icon: Users,
      path: '/products/workforce',
      comingSoon: true,
    },
    {
      name: 'Freelanz',
      tagline: 'Talent Marketplace',
      desc: 'Connect with elite software engineers and hire verified talent for your enterprise projects.',
      icon: Briefcase,
      path: '/products/freelanz',
      comingSoon: true,
    }
  ];

  return (
    <div className="min-h-screen bg-qx-background selection:bg-qx-primary/30 selection:text-white">
      <QevrixNavbar />
      
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-3xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl font-bold text-qx-text mb-6">Our Products</h1>
          <p className="text-xl text-qx-textSecondary">
            Enterprise software platforms built for scale. From AI-driven learning to global workforce management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.name} 
                className={`p-8 rounded-2xl border border-qx-border bg-qx-surface flex flex-col group ${!p.comingSoon ? 'hover:border-qx-primary/50 hover:shadow-[0_0_30px_rgba(var(--qx-primary-rgb),0.1)] cursor-pointer' : 'opacity-80'} transition-all duration-300`}
                onClick={() => !p.comingSoon && navigate(p.path)}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-xl ${!p.comingSoon ? 'bg-qx-background text-qx-primary group-hover:bg-qx-primary/10 group-hover:scale-110' : 'bg-qx-background text-qx-textSecondary'} transition-all duration-300`}>
                     <Icon size={32} />
                  </div>
                  {p.comingSoon && (
                    <span className="px-3 py-1 bg-qx-background rounded-full text-xs font-semibold text-qx-textSecondary border border-qx-border">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-qx-text mb-2">{p.name}</h3>
                <h4 className="text-sm font-semibold text-qx-primary mb-4">{p.tagline}</h4>
                <p className="text-qx-textSecondary leading-relaxed flex-1 mb-8">{p.desc}</p>
                
                <div className="mt-auto">
                  {!p.comingSoon ? (
                    <Button variant="secondary" className="w-full justify-center group-hover:bg-qx-background">
                      Explore {p.name} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button variant="secondary" className="w-full justify-center opacity-50 cursor-not-allowed">
                      In Development
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Engineering Program Separation */}
        <div className="pt-24 border-t border-qx-border">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-qx-text mb-6">Engineering Ecosystem</h2>
            <p className="text-xl text-qx-textSecondary">
              Our flagship training initiative to build the next generation of elite software engineers.
            </p>
          </div>
          <div 
            className="max-w-4xl mx-auto p-10 rounded-2xl border border-qx-border bg-gradient-to-br from-qx-surface to-qx-background flex flex-col md:flex-row items-center gap-10 hover:border-qx-primary/50 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/engineering')}
          >
            <div className="p-6 rounded-2xl bg-qx-background text-qx-primary">
              <Code2 size={48} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold text-qx-text mb-2">QEVRIX Engineering Program</h3>
              <h4 className="text-base font-semibold text-qx-primary mb-4">Enterprise Software Accelerator</h4>
              <p className="text-qx-textSecondary leading-relaxed">
                Learn enterprise development from industry-grade architecture. Master system design, modern stacks, and production-first engineering.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Button className="h-14 px-8 text-base">
                Explore Program <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <QevrixFooter />
    </div>
  );
}
