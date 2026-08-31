import React from 'react';
import { CheckCircle2, Activity, Users, Layers, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import qevrixLogo from '../../assets/qevrix-logo.png';

export default function WhyQevrix() {
  const points = [
    "Multi-domain expertise under one roof",
    "Reliable, agile and future-ready solutions",
    "Scalable workforce with right skillsets",
    "End-to-end project lifecycle delivery",
    "Quality, safety and compliance assured",
    "Customer-centric approach always"
  ];

  return (
    <section id="why-qevrix" className="py-24 bg-qx-background relative overflow-hidden">
      <div className="max-w-[1536px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Checkmarks */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs font-bold text-qx-textMuted tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-qx-primary"></span>
              WHY QEVRIX
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-qx-text mb-8 tracking-tight leading-tight">
              Built on <span className="text-qx-primary">Expertise.</span> <br />
              Driven by <span className="text-qx-primary">Results.</span>
            </h2>
            
            <div className="space-y-4">
              {points.map((point, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-center gap-4 group"
                >
                  <CheckCircle2 className="text-qx-primary flex-shrink-0" size={24} />
                  <span className="text-qx-textSecondary font-medium text-lg">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Dashboard Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[480px] w-full rounded-2xl bg-[#060A14] border border-[#1A2235] shadow-2xl p-5 overflow-hidden flex flex-col text-white"
          >
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1A2235]">
              <div className="flex items-center gap-3">
                <img src={qevrixLogo} alt="Qevrix Logo" className="h-6 object-contain" />
                <span className="text-[10px] font-medium text-[#64748B] ml-2 tracking-widest">DASHBOARD</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1A2235]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#1A2235]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#1A2235]"></div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="flex gap-5 h-full">
              {/* Sidebar Mock */}
              <div className="w-32 hidden sm:flex flex-col gap-2">
                {[
                  { name: "Overview", active: true },
                  { name: "Projects", active: false },
                  { name: "Workforce", active: false },
                  { name: "Tasks", active: false },
                  { name: "Reports", active: false },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${item.active ? 'bg-qx-primary/10 text-qx-primary border border-qx-primary/20' : 'text-[#64748B] hover:text-white'}`}>
                    <div className={`w-3 h-3 rounded-sm ${item.active ? 'bg-qx-primary' : 'bg-[#1A2235]'}`}></div>
                    {item.name}
                  </div>
                ))}
              </div>

              {/* Main Area */}
              <div className="flex-1 flex flex-col gap-4">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Projects", val: "250+", up: "+15%" },
                    { label: "Clients", val: "120+", up: "+18%" },
                    { label: "Completion", val: "98%", up: "+1.2%" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#0B1120] p-3 rounded-xl border border-[#1A2235]">
                      <div className="text-[10px] text-[#64748B] mb-1">{stat.label}</div>
                      <div className="flex items-end justify-between">
                        <div className="text-xl font-bold text-white">{stat.val}</div>
                        <div className="text-[9px] text-green-400 font-medium mb-1">{stat.up}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart Mock & Allocation */}
                <div className="flex-1 grid grid-cols-3 gap-3 min-h-[140px]">
                  <div className="col-span-2 bg-[#0B1120] rounded-xl border border-[#1A2235] p-3 relative overflow-hidden flex flex-col">
                    <div className="text-[10px] text-[#64748B] mb-2">Project Progress</div>
                    {/* Fake Chart Lines */}
                    <div className="flex-1 relative mt-2">
                      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {/* Grid lines */}
                        <line x1="0" y1="25" x2="100" y2="25" stroke="#1A2235" strokeWidth="0.5" />
                        <line x1="0" y1="50" x2="100" y2="50" stroke="#1A2235" strokeWidth="0.5" />
                        <line x1="0" y1="75" x2="100" y2="75" stroke="#1A2235" strokeWidth="0.5" />
                        
                        <path d="M0,70 Q10,60 20,65 T40,40 T60,50 T80,20 T100,10" fill="none" stroke="var(--qx-primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        <path d="M0,70 Q10,60 20,65 T40,40 T60,50 T80,20 T100,10 L100,100 L0,100 Z" fill="url(#gradient-chart)" stroke="none" />
                        <defs>
                          <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--qx-primary)" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="var(--qx-primary)" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Data points */}
                        <circle cx="20" cy="65" r="2" fill="var(--qx-primary)" />
                        <circle cx="40" cy="40" r="2" fill="var(--qx-primary)" />
                        <circle cx="60" cy="50" r="2" fill="var(--qx-primary)" />
                        <circle cx="80" cy="20" r="2" fill="var(--qx-primary)" />
                      </svg>
                      {/* X-axis labels */}
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] text-[#64748B] px-1 translate-y-3">
                        <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 bg-[#0B1120] rounded-xl border border-[#1A2235] p-3 flex flex-col items-center justify-center">
                    <div className="text-[10px] text-[#64748B] mb-2 w-full text-left">Resource Allocation</div>
                    <div className="flex-1 flex items-center justify-center relative w-full">
                      {/* Donut chart mock */}
                      <svg viewBox="0 0 36 36" className="w-20 h-20 drop-shadow-[0_0_10px_rgba(255,90,0,0.3)]">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#1A2235"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="var(--qx-primary)"
                          strokeWidth="3"
                          strokeDasharray="72, 100"
                          className="animate-[spin_2s_ease-out_forwards]"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="font-bold text-sm text-white">72%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Projects List */}
                <div className="bg-[#0B1120] rounded-xl border border-[#1A2235] p-3 flex-1 flex flex-col">
                  <div className="text-[10px] text-[#64748B] mb-2">Active Projects</div>
                  <div className="space-y-2 flex-1">
                    {[
                      { name: "Enterprise Platform", status: "In Progress", color: "bg-blue-400" },
                      { name: "Workforce Deployment", status: "In Progress", color: "bg-qx-primary" },
                      { name: "Highway Construction", status: "Civil Region", color: "bg-purple-400" },
                    ].map((proj, i) => (
                      <div key={i} className="flex justify-between items-center text-[11px] p-1.5 rounded hover:bg-[#1A2235] transition-colors">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${proj.color} shadow-[0_0_5px_currentColor]`}></div>
                          <span className="text-white font-medium">{proj.name}</span>
                        </div>
                        <span className="text-[#64748B]">{proj.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ambient shadow */}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/50 rounded-2xl pointer-events-none"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
