import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, Building2, Users, Briefcase, CreditCard } from 'lucide-react';

export default function EngineeringProjects() {
  const projects = [
    {
      name: 'PrepIQ',
      category: 'AI Learning Platform',
      tech: ['React', 'Spring Boot', 'PostgreSQL', 'OpenAI'],
      status: 'LIVE PRODUCTION',
      icon: Layers,
      description: 'An AI-powered interview preparation platform used globally.'
    },
    {
      name: 'WorkforceOS',
      category: 'Enterprise Workforce',
      tech: ['React', 'Microservices', 'Kafka', 'Redis'],
      status: 'ACTIVE DEVELOPMENT',
      icon: Building2,
      description: 'Internal platform managing sprints, performance, and engineering teams.'
    },
    {
      name: 'Freelanz',
      category: 'Talent Marketplace',
      tech: ['Next.js', 'Spring Boot', 'MongoDB'],
      status: 'IN ARCHITECTURE',
      icon: Users,
      description: 'A global marketplace connecting elite engineers with enterprise clients.'
    },
    {
      name: 'Enterprise CRM',
      category: 'Customer Management',
      tech: ['Java', 'Spring Cloud', 'PostgreSQL'],
      status: 'COMPLETED',
      icon: Briefcase,
      description: 'Scalable CRM handling millions of customer interactions.'
    },
    {
      name: 'HRMS',
      category: 'Human Resources',
      tech: ['React', 'Node.js', 'AWS'],
      status: 'COMPLETED',
      icon: Users,
      description: 'Comprehensive HR management system for tracking employee lifecycles.'
    },
    {
      name: 'Payment Gateway',
      category: 'FinTech Integration',
      tech: ['Java', 'Stripe API', 'RabbitMQ'],
      status: 'COMPLETED',
      icon: CreditCard,
      description: 'Secure, high-throughput microservice for processing enterprise transactions.'
    }
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] border-y border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm font-bold text-[#2563EB] tracking-widest uppercase mb-4">Enterprise Projects</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-6">Contribute to Live Products</h3>
          <p className="text-lg text-[#475569] leading-relaxed">
            Stop building to-do lists. You will work inside production teams and contribute to actual SaaS platforms that operate under the QEVRIX brand.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] hover:border-[#2563EB]/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
            >
              {/* Product Screenshot Placeholder */}
              <div className="w-full h-48 bg-[#F1F5F9] border-b border-[#E2E8F0] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#F1F5F9] to-[#E2E8F0] opacity-50" />
                <proj.icon size={48} className="text-[#94A3B8] group-hover:scale-110 group-hover:text-[#2563EB] transition-all duration-500 relative z-10" />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <h4 className="text-xl font-bold text-[#0F172A] mb-1 group-hover:text-[#2563EB] transition-colors">
                      {proj.name}
                    </h4>
                    <p className="text-sm font-medium text-[#2563EB]">{proj.category}</p>
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${proj.status === 'LIVE PRODUCTION' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-[#F1F5F9] border-[#E2E8F0] text-[#64748B]'}`}>
                    {proj.status}
                  </div>
                </div>
                
                <p className="text-sm text-[#475569] leading-relaxed mb-6 flex-1">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.tech.map((t, index) => (
                    <span key={index} className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]">
                      {t}
                    </span>
                  ))}
                </div>

                <button className="w-full py-2.5 bg-white border border-[#E2E8F0] text-[#0F172A] text-sm font-bold rounded-lg group-hover:bg-[#0F172A] group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
                  View Product <ExternalLink size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
