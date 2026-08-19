import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Laptop, MobileFriendly, Check, ArrowRight, Shield, Cpu, RefreshCw, Layers } from 'lucide-react';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';
import Contact from '../components/Contact';
import { Button } from '../components/ui/Button';

export default function ITSoftwareService() {
  useEffect(() => {
    document.title = "IT & Software Solutions | QEVRIX";
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const offers = [
    {
      title: "Custom Software",
      desc: "Build software designed around your business workflow and operational requirements."
    },
    {
      title: "Web Applications",
      desc: "Modern, scalable web platforms and tailored business applications."
    },
    {
      title: "Mobile Applications",
      desc: "Practical mobile solutions for customers, internal teams, and field operations."
    },
    {
      title: "AI Solutions",
      desc: "AI-powered features, integrations, and intelligent assistants designed for real business use."
    },
    {
      title: "Business Automation",
      desc: "Reduce repetitive operational overhead and improve team productivity."
    },
    {
      title: "CRM & Admin Systems",
      desc: "Centralized panels for managing customer relations, task assignments, and business intelligence."
    },
    {
      title: "Support & Maintenance",
      desc: "Ongoing stability improvements, technical maintenance, and service level agreements."
    }
  ];

  const pricing = [
    { name: "Starter Website", price: "₹15,000", desc: "For professional landing pages and basic business websites." },
    { name: "Business Website", price: "₹25,000", desc: "For larger business websites with advanced pages and functionality." },
    { name: "Admin Panel / CRM", price: "₹40,000", desc: "For internal business management systems and operational dashboards." },
    { name: "Custom Web Application", price: "₹50,000", desc: "For custom platforms with business-specific workflows." },
    { name: "Custom Software / MVP", price: "₹1,00,000", desc: "For larger custom software products and startup MVP development." },
    { name: "AI & Automation", price: "₹25,000", desc: "For AI-powered workflows, automated pipelines, and practical integrations." }
  ];

  const supportPlans = [
    { name: "Basic", price: "₹3,000/month", features: ["Core Security Updates", "Basic Server Monitoring", "Standard SLA Support"] },
    { name: "Business", price: "₹5,000/month", features: ["Priority Support SLA", "Minor Code Updates", "Server Optimization"] },
    { name: "Application", price: "₹10,000/month", features: ["24-Hour Severity Cover", "Database Management", "Feature Additions"] },
    { name: "Dedicated", price: "₹15,000 – ₹25,000/month", features: ["Dedicated Developer Hours", "Custom DevOps Pipelines", "Ongoing Enterprise SLA"] }
  ];

  return (
    <div className="min-h-screen bg-[#060A14] font-sans text-qx-text relative">
      <QevrixNavbar />

      {/* Breadcrumb */}
      <div className="pt-28 pb-4 bg-qx-background/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-xs font-semibold tracking-wider text-qx-textSecondary uppercase flex items-center gap-2">
          <Link to="/" className="hover:text-qx-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="hover:text-qx-primary transition-colors">Services</span>
          <span>/</span>
          <span className="text-white">IT & Software</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-qx-background/60 overflow-hidden border-b border-white/5">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-qx-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-qx-primary"></span>
              IT & SOFTWARE SOLUTIONS
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Technology Built <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400">
                Around Your Business.
              </span>
            </h1>
            <p className="text-qx-textSecondary text-lg leading-relaxed mb-8 max-w-xl">
              QEVRIX builds practical software, digital platforms, AI solutions and business automation designed around real business requirements.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => handleScroll('contact')} className="h-12 px-6">
                Discuss Your Project
              </Button>
              <Button variant="secondary" onClick={() => handleScroll('pricing')} className="h-12 px-6">
                View Pricing &rarr;
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="p-8 bg-qx-surface/60 border border-white/5 rounded-3xl backdrop-blur-xl shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-qx-primary/10 to-transparent pointer-events-none rounded-3xl" />
              <Code2 size={120} className="text-qx-primary animate-pulse-slow" />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4">WHAT WE OFFER</h3>
          <h4 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Our Core Offerings</h4>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, idx) => (
            <div key={idx} className="bg-qx-surface/40 border border-white/5 p-6 rounded-2xl hover:border-qx-primary/30 transition-all duration-300">
              <div className="h-10 w-10 rounded-lg bg-qx-primary/10 border border-qx-primary/20 flex items-center justify-center text-qx-primary mb-4 font-bold text-sm">
                0{idx + 1}
              </div>
              <h5 className="text-lg font-bold text-white mb-2">{offer.title}</h5>
              <p className="text-sm text-qx-textSecondary leading-relaxed">{offer.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[#080C19] border-t border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-xs font-bold text-qx-primary tracking-widest uppercase mb-4">TRANSPARENT STARTING PRICES</h3>
            <h4 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Flexible Pricing for Your Requirements</h4>
            <p className="text-qx-textSecondary text-sm max-w-2xl mx-auto leading-relaxed">
              Every project is different. These prices represent starting estimates and the final proposal depends on scope, complexity, integrations and delivery requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricing.map((p, idx) => (
              <div key={idx} className="bg-qx-surface/50 border border-white/5 hover:border-qx-primary/30 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300">
                <div>
                  <h5 className="text-lg font-bold text-white mb-2">{p.name}</h5>
                  <div className="text-3xl font-black text-qx-primary mb-4">{p.price}<span className="text-xs text-qx-textSecondary font-semibold"> starting</span></div>
                  <p className="text-sm text-qx-textSecondary leading-relaxed mb-6">{p.desc}</p>
                </div>
                <Button onClick={() => handleScroll('contact')} variant="secondary" className="w-full text-xs font-bold py-2">
                  Discuss Requirements
                </Button>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-qx-textMuted mt-8 max-w-2xl mx-auto leading-relaxed">
            * Final pricing is determined after understanding the project scope, complexity, integrations, timeline and any applicable third-party costs.
          </p>
        </div>
      </section>

      {/* Ongoing Support Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-xs font-bold text-qx-primary tracking-widest uppercase mb-4">ONGOING SUPPORT</h3>
          <h4 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Support That Grows With Your Business</h4>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {supportPlans.map((plan, idx) => (
            <div key={idx} className="bg-qx-surface/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-qx-primary/30 transition-all duration-300">
              <div>
                <h5 className="text-base font-bold text-white mb-2">{plan.name}</h5>
                <div className="text-2xl font-black text-qx-primary mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs text-qx-textSecondary">
                      <Check size={14} className="text-qx-primary flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button onClick={() => handleScroll('contact')} variant="secondary" className="w-full text-xs font-semibold py-2">
                Talk About Support
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-qx-textMuted mt-8">
          Note: Support scope and response requirements are finalized in the service agreement.
        </p>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-[#080C19] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-xs font-bold text-qx-primary tracking-widest uppercase mb-4">OUR PROCESS</h3>
            <h4 className="text-3xl md:text-4xl font-bold text-white tracking-tight">How We Work</h4>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Understand Needs", desc: "We review your operational workflows and project goals." },
              { num: "02", title: "Define Scope", desc: "We outline pages, complexity, timeline, and starting estimates." },
              { num: "03", title: "Develop & Test", desc: "Our team implements features using clean practices." },
              { num: "04", title: "Deliver & Maintain", desc: "We launch your project and provide regular SLA support." }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-4xl font-black text-qx-primary/30 mb-2">{step.num}</div>
                <h5 className="text-base font-bold text-white mb-2">{step.title}</h5>
                <p className="text-sm text-qx-textSecondary leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact initialService="IT & Software" />

      <QevrixFooter />
    </div>
  );
}
