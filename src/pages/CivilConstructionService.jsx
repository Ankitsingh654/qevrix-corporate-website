import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building, Layout, Hammer, Milestone, ArrowRight } from 'lucide-react';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';
import Contact from '../components/Contact';
import { Button } from '../components/ui/Button';

export default function CivilConstructionService() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Civil & Construction Services | QEVRIX";
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const offers = [
    { title: "Civil Works", desc: "Basic concrete structures, brickwork, floorings, and layout preparations for commercial properties." },
    { title: "Site Execution Support", desc: "Coordinating on-site materials, supervising safety, and ensuring strict adherence to blueprints." },
    { title: "Skilled & Unskilled Workforce", desc: "Supplying vetted stonemasons, carpenters, steel fixers, helpers, and general crews." },
    { title: "Renovation & Structural Updates", desc: "Slab repairs, plumbing fixes, structural enhancements, and commercial utility updates." },
    { title: "Infrastructure Support", desc: "Assisting road layouts, pathways, boundary wall fabrications, and external site support." },
    { title: "Facility Maintenance", desc: "Scheduled facility upkeep, structural health logs, and emergency site fixes." }
  ];

  return (
    <div className="min-h-screen bg-qx-background font-sans text-qx-text relative">
      <QevrixNavbar />

      {/* Breadcrumb */}
      <div className="pt-28 pb-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-xs font-semibold tracking-wider text-gray-600 uppercase flex items-center gap-2">
          <Link to="/" className="hover:text-qx-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="hover:text-qx-primary transition-colors">Services</span>
          <span>/</span>
          <span className="text-gray-900">Civil & Construction</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-white overflow-hidden border-b border-gray-200">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-qx-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-qx-primary"></span>
              CIVIL & CONSTRUCTION
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              Practical Support <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400">
                for Every Project Stage.
              </span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
              QEVRIX provides civil works, project execution, maintenance and workforce support for practical infrastructure and construction requirements.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => handleScroll('contact')} className="h-12 px-6">
                Discuss Your Project
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="p-8 bg-qx-surface/60 border border-gray-200 rounded-3xl backdrop-blur-xl shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-qx-primary/10 to-transparent pointer-events-none rounded-3xl" />
              <Building size={120} className="text-qx-primary animate-pulse-slow" />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4">WHAT WE OFFER</h3>
          <h4 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Our Core Offerings</h4>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, idx) => {
            const portfolioUrl = `/portfolio/${offer.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
            return (
            <div 
              key={idx} 
              onClick={() => navigate(portfolioUrl)}
              className="bg-qx-surface/40 border border-gray-200 p-6 rounded-2xl hover:border-qx-primary/30 transition-all duration-300 group cursor-pointer relative"
            >
              <div className="h-10 w-10 rounded-lg bg-qx-primary/10 border border-qx-primary/20 flex items-center justify-center text-qx-primary mb-4 font-bold text-sm">
                0{idx + 1}
              </div>
              <h5 className="text-lg font-bold text-gray-900 mb-2">{offer.title}</h5>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{offer.desc}</p>
              
              {/* Arrow */}
              <div className="absolute bottom-6 right-6 text-qx-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                <ArrowRight size={18} />
              </div>
            </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose QEVRIX */}
      <section className="py-24 bg-[#080C19] border-t border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-xs font-bold text-qx-primary tracking-widest uppercase mb-4">WHY QEVRIX</h3>
            <h4 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">Infrastructure Execution Strengths</h4>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Hammer, title: "Execution Focus", desc: "We focus on real practical parameters, ensuring specifications are met exactly to drawings." },
              { icon: Milestone, title: "Milestone Compliance", desc: "Vigilant tracking of project timelines to help maintain scheduling workflows on-site." },
              { icon: Layout, title: "Safety Auditing", desc: "Rigorous enforcement of protective gear and clean operations to mitigate risk vectors." }
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="bg-qx-surface/50 border border-gray-200 p-6 rounded-2xl">
                  <div className="h-10 w-10 rounded-lg bg-qx-primary/10 border border-qx-primary/20 flex items-center justify-center text-qx-primary mb-4">
                    <Icon size={20} />
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-xs font-bold text-qx-primary tracking-widest uppercase mb-4">EXECUTION PROCESS</h3>
            <h4 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Our Process</h4>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Understand Project", desc: "We review structural requirements, blueprints, and location coordinates." },
              { num: "02", title: "Review Requirements", desc: "We analyze material staging logistics, workforce requirements, and machinery needed." },
              { num: "03", title: "Plan Execution", desc: "We map timelines, safety plans, subcontractor targets, and resources." },
              { num: "04", title: "Deliver & Coordinate", desc: "We maintain on-site supervision and log milestone completions." }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-4xl font-black text-qx-primary/30 mb-2">{step.num}</div>
                <h5 className="text-base font-bold text-gray-900 mb-2">{step.title}</h5>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact initialService="Civil & Construction" />

      <QevrixFooter />
    </div>
  );
}
