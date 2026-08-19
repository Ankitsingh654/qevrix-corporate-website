import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Rocket, LayoutGrid, TestTube2, GitBranch, RefreshCcw } from 'lucide-react';

export default function EngineeringPhilosophy() {
  const philosophies = [
    {
      title: 'Microservices & APIs',
      desc: 'Build modular, decoupled architectures that can scale independently, just like Netflix and Uber.',
      icon: LayoutGrid,
    },
    {
      title: 'AI-Augmented Coding',
      desc: 'Collaborate with AI tools (Copilot, ChatGPT) to engineer better code faster, not to cheat.',
      icon: Cpu,
    },
    {
      title: 'Test-Driven Development',
      desc: 'If it does not have tests, it is not finished. Implement Jest, JUnit, and end-to-end testing.',
      icon: TestTube2,
    },
    {
      title: 'CI/CD Pipelines',
      desc: 'Automate deployments. Experience how code goes from a local machine to production servers.',
      icon: Rocket,
    },
    {
      title: 'Version Control Strategy',
      desc: 'Ship with Git workflows, branch protections, pull requests, and resolving merge conflicts.',
      icon: GitBranch,
    },
    {
      title: 'Agile & Sprints',
      desc: 'Operate in 2-week sprints with daily standups, backlog grooming, and retro sessions.',
      icon: RefreshCcw,
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm font-bold text-[#2563EB] tracking-widest uppercase mb-4">Engineering Philosophy</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-6">How We Build</h3>
          <p className="text-lg text-[#475569] leading-relaxed">
            We don't build scripts. We engineer enterprise systems. Our workflow is rooted in modern industry standards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {philosophies.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#475569] group-hover:text-[#2563EB] group-hover:bg-[#2563EB]/5 group-hover:scale-110 transition-all duration-300 mb-6 shadow-sm">
                <item.icon size={24} />
              </div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-3">{item.title}</h4>
              <p className="text-[#475569] leading-relaxed text-[15px]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
