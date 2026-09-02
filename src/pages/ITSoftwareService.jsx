import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';
import Contact from '../components/Contact';
import { Button } from '../components/ui/Button';

export default function ITSoftwareService() {
  const navigate = useNavigate();
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
      title: "API Design & Development",
      desc: "Secure, scalable REST and GraphQL APIs to seamlessly connect your digital ecosystem."
    },
    {
      title: "Salesforce & ERP Integration",
      desc: "Customizing and integrating Salesforce and enterprise resource planning systems."
    },
    {
      title: "Cloud & DevOps",
      desc: "Scalable cloud architecture, CI/CD pipelines, and secure server management."
    },
    {
      title: "UI/UX & Product Design",
      desc: "User-centric interface design and experience mapping for intuitive applications."
    },
    {
      title: "Data Analytics & BI",
      desc: "Transforming raw data into actionable business intelligence and interactive dashboards."
    },
    {
      title: "Business Automation",
      desc: "Reduce repetitive operational overhead and improve team productivity."
    },
    {
      title: "CRM & Admin Systems",
      desc: "Centralized panels for managing customer relations, task assignments, and data."
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
    <div className="min-h-screen bg-qx-background font-sans text-qx-text relative">
      <QevrixNavbar />

      {/* Breadcrumb */}
      <div className="pt-28 pb-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-xs font-semibold tracking-wider text-gray-600 uppercase flex items-center gap-2">
          <Link to="/" className="hover:text-qx-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="hover:text-qx-primary transition-colors">Services</span>
          <span>/</span>
          <span className="text-gray-900">IT & Software</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-white overflow-hidden border-b border-gray-200">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-qx-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-qx-primary"></span>
              IT & SOFTWARE SOLUTIONS
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              Technology Built <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400">
                Around Your Business.
              </span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl pr-4">
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
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center mt-8 lg:mt-0"
          >
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl shadow-qx-primary/20 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-qx-primary/10 to-transparent pointer-events-none z-10" />
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="IT and Software Development Team" className="w-full h-auto object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 md:py-24 max-w-7xl mx-auto px-6">
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

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-24 bg-[#080C19] border-t border-b border-gray-800 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-xs font-bold text-qx-primary tracking-widest uppercase mb-4">TRANSPARENT STARTING PRICES</h3>
            <h4 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Flexible Pricing for Your Requirements</h4>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
              Every project is different. These prices represent starting estimates and the final proposal depends on scope, complexity, integrations and delivery requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricing.map((p, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 hover:border-qx-primary/30 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300">
                <div>
                  <h5 className="text-lg font-bold text-white mb-2">{p.name}</h5>
                  <div className="text-3xl font-black text-qx-primary mb-4">{p.price}<span className="text-xs text-gray-500 font-semibold"> starting</span></div>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">{p.desc}</p>
                </div>
                <Button onClick={() => handleScroll('contact')} variant="secondary" className="w-full text-xs font-bold py-2 bg-white/10 text-white hover:bg-white/20 border-0">
                  Discuss Requirements
                </Button>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-500 mt-8 max-w-2xl mx-auto leading-relaxed">
            * Final pricing is determined after understanding the project scope, complexity, integrations, timeline and any applicable third-party costs.
          </p>
        </div>
      </section>

      {/* Ongoing Support Section */}
      <section className="py-12 md:py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-xs font-bold text-qx-primary tracking-widest uppercase mb-4">ONGOING SUPPORT</h3>
          <h4 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">Support That Grows With Your Business</h4>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {supportPlans.map((plan, idx) => (
            <div key={idx} className="bg-qx-surface/40 border border-gray-200 p-6 rounded-2xl flex flex-col justify-between hover:border-qx-primary/30 transition-all duration-300">
              <div>
                <h5 className="text-base font-bold text-gray-900 mb-2">{plan.name}</h5>
                <div className="text-2xl font-black text-qx-primary mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs text-gray-600">
                      <Check size={14} className="text-qx-primary flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                onClick={() => handleScroll('contact')} 
                className="w-full text-xs font-bold py-2 border border-gray-200 bg-white text-gray-700 hover:border-qx-primary hover:text-qx-primary transition-colors"
              >
                Talk About Support
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          Note: Support scope and response requirements are finalized in the service agreement.
        </p>
      </section>

      {/* How We Work */}
      <section className="py-12 md:py-24 bg-[#080C19] border-t border-b border-gray-800">
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
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
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
