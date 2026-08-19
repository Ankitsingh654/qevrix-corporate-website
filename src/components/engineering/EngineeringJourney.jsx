import React from 'react';
import { motion } from 'framer-motion';
import { FileEdit, ClipboardList, Mic, Users, Calendar, Code2, Rocket, LineChart, GraduationCap } from 'lucide-react';

export default function EngineeringJourney() {
  const steps = [
    {
      id: 1,
      title: 'Application',
      desc: 'Submit your engineering profile and tell us why you want to join our virtual company.',
      icon: FileEdit
    },
    {
      id: 2,
      title: 'Assessment',
      desc: 'Clear a fundamental aptitude and basic programming evaluation.',
      icon: ClipboardList
    },
    {
      id: 3,
      title: 'Interview',
      desc: 'Discuss your technical background and career goals with our engineering managers.',
      icon: Mic
    },
    {
      id: 4,
      title: 'Engineering Team',
      desc: 'Get onboarded to your team, enterprise tools, repositories, and communication channels.',
      icon: Users
    },
    {
      id: 5,
      title: 'Sprint Planning',
      desc: 'Participate in backlog grooming, estimate story points, and assign Jira tickets.',
      icon: Calendar
    },
    {
      id: 6,
      title: 'Development',
      desc: 'Write production-ready code, implement features, and submit pull requests.',
      icon: Code2
    },
    {
      id: 7,
      title: 'Deployment',
      desc: 'Run CI/CD pipelines and push your microservices to cloud environments.',
      icon: Rocket
    },
    {
      id: 8,
      title: 'Performance Review',
      desc: 'Get continuous feedback on your code quality, architecture decisions, and sprint velocity.',
      icon: LineChart
    },
    {
      id: 9,
      title: 'Completion Certificate',
      desc: 'Graduate as an enterprise-ready software engineer with a verifiable credential.',
      icon: GraduationCap
    }
  ];

  return (
    <section className="py-24 bg-[#F5F9FF] border-y border-[#E2E8F0] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-bold text-[#2563EB] tracking-widest uppercase mb-4">Experience Roadmap</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-6">Your Journey Inside QEVRIX</h3>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#E2E8F0] md:-translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#2563EB] to-indigo-500"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className={`md:w-1/2 pl-24 md:pl-0 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}>
                  <div className="p-6 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] hover:border-[#2563EB]/40 hover:-translate-y-1 transition-all duration-300 group">
                    <h4 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-colors">{step.title}</h4>
                    <p className="text-sm text-[#475569] leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-[#2563EB] z-10 shadow-[0_4px_10px_rgba(37,99,235,0.2)]">
                  <step.icon size={20} className="text-[#2563EB]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
