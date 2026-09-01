import React from 'react';
import { CheckCircle2, Activity, Users, Layers, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import qevrixLogo from '../../assets/qevrix-logo.png';
import dashboardLight from '../../assets/dashboard-light.png';

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

          {/* Right Side: Light Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[520px] w-full rounded-2xl bg-[#F8F9FA] border border-gray-200 shadow-xl overflow-hidden flex font-sans"
          >
            {/* Sidebar */}
            <div className="w-[180px] bg-white border-r border-gray-100 flex flex-col py-6 px-4">
              <div className="bg-[#0B1120] p-2 rounded-lg mb-8 max-w-fit shadow-inner">
                <img src={qevrixLogo} alt="Qevrix Logo" className="h-5 object-contain" />
              </div>
              
              <div className="flex-1 flex flex-col gap-2">
                {[
                  { name: "Overview", active: true },
                  { name: "Projects", active: false },
                  { name: "Workforce", active: false },
                  { name: "Tasks", active: false },
                  { name: "Reports", active: false },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${item.active ? 'bg-[#FFF3EC] text-[#FF5A00]' : 'text-gray-500 hover:text-gray-900'}`}>
                    <div className={`w-3.5 h-3.5 rounded-[3px] border-[1.5px] ${item.active ? 'border-[#FF5A00] bg-[#FFF3EC]' : 'border-gray-400'}`}></div>
                    {item.name}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 mt-auto">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-gray-500 hover:text-gray-900">
                  <div className="w-4 h-4 rounded-full border-[1.5px] border-gray-400 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  </div>
                  Settings
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-gray-500 hover:text-gray-900">
                  <div className="w-4 h-4 rounded-full border-[1.5px] border-gray-400"></div>
                  Logout
                </div>
              </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 flex flex-col p-6 gap-5 overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-800 tracking-wide text-sm">DASHBOARD</h3>
                <div className="flex gap-4 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Projects", val: "250+", up: "↑ 16%" },
                  { label: "Clients", val: "120+", up: "↑ 16%" },
                  { label: "Completion", val: "98%", up: "↑ 12%" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-20">
                    <div className="text-xs font-semibold text-gray-500">{stat.label}</div>
                    <div className="flex items-end justify-between">
                      <div className="text-2xl font-black text-gray-900">{stat.val}</div>
                      <div className="text-[10px] text-green-500 font-bold mb-1">{stat.up}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart & Donut */}
              <div className="flex-1 grid grid-cols-3 gap-4 min-h-[160px]">
                {/* Line Chart */}
                <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative flex flex-col">
                  <div className="text-xs font-bold text-gray-800 mb-4">Project Progress</div>
                  <div className="flex-1 relative w-full h-full">
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <line x1="0" y1="25" x2="100" y2="25" stroke="#F3F4F6" strokeWidth="0.5" />
                      <line x1="0" y1="50" x2="100" y2="50" stroke="#F3F4F6" strokeWidth="0.5" />
                      <line x1="0" y1="75" x2="100" y2="75" stroke="#F3F4F6" strokeWidth="0.5" />
                      <path d="M0,70 Q10,50 20,60 T40,40 T60,50 T80,20 T100,10" fill="none" stroke="#FF5A00" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                      <path d="M0,70 Q10,50 20,60 T40,40 T60,50 T80,20 T100,10 L100,100 L0,100 Z" fill="url(#gradient-light-chart)" stroke="none" />
                      <defs>
                        <linearGradient id="gradient-light-chart" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FF5A00" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#FF5A00" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute bottom-[-5px] left-0 right-0 flex justify-between text-[9px] font-medium text-gray-400">
                      <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
                    </div>
                  </div>
                </div>
                
                {/* Donut Chart */}
                <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center">
                  <div className="text-xs font-bold text-gray-800 mb-2 w-full text-left">Resource Allocation</div>
                  <div className="flex-1 flex items-center justify-center relative w-full max-w-[120px] max-h-[120px] m-auto">
                    <svg viewBox="0 0 36 36" className="w-full h-full drop-shadow-sm">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F97316" strokeWidth="4" strokeDasharray="72, 100" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#FDBA74" strokeWidth="4" strokeDasharray="20, 100" strokeDashoffset="-72" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#FFEDD5" strokeWidth="4" strokeDasharray="8, 100" strokeDashoffset="-92" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-extrabold text-xl text-gray-900">72%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-3 gap-4 flex-1">
                {/* Active Projects */}
                <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col">
                  <div className="text-xs font-bold text-gray-800 mb-3">Active Projects</div>
                  <div className="flex-1 flex flex-col justify-around">
                    {[
                      { name: "Enterprise Platform", status: "In Progress", icon: "💻" },
                      { name: "Workforce Deployment", status: "In Progress", icon: "👥" },
                      { name: "Highway Construction", status: "On Progress", icon: "🏗️" },
                    ].map((proj, i) => (
                      <div key={i} className="flex justify-between items-center text-xs pb-2 border-b border-gray-50 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-md bg-[#FFF3EC] text-[#FF5A00] flex items-center justify-center text-[10px]">{proj.icon}</div>
                          <span className="text-gray-700 font-medium">{proj.name}</span>
                        </div>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{proj.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col justify-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#F97316]"></div>
                    <span className="text-xs font-semibold text-gray-700">IT Solutions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#FDBA74]"></div>
                    <span className="text-xs font-semibold text-gray-700">Workforce</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#FFEDD5]"></div>
                    <span className="text-xs font-semibold text-gray-700">Civil Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
