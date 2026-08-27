import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Github, Server, Cpu, Rocket, ChevronRight, Cloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EngineeringHero() {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate('/login');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#F5F9FF]">
      {/* Dynamic Backgrounds (Light mode friendly) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/50 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Subtle grid instead of noise for cleaner enterprise look */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTIwIDBoLTIwdjIwaDIwVjB6bS0xIDE5SDFWMWgxOHYxOHoiIGZpbGw9IiNFMkU4RjAiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-sm text-[#2563EB] text-xs font-bold tracking-widest uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
              Cohort Admissions Open
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1] mb-6">
              Become an <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-indigo-600">Enterprise</span> <br />
              Software Engineer
            </h1>

            <h2 className="text-xl md:text-2xl font-semibold text-[#0F172A] mb-6 flex flex-wrap items-center gap-3">
              <span>Collaborate.</span>
              <span className="text-[#94A3B8]">•</span>
              <span>Build.</span>
              <span className="text-[#94A3B8]">•</span>
              <span>Deploy.</span>
              <span className="text-[#94A3B8]">•</span>
              <span className="text-[#2563EB]">Ship.</span>
            </h2>

            <p className="text-lg md:text-xl text-[#475569] leading-relaxed mb-10 max-w-xl">
              Join a Virtual Software Company. Work on Real Products. Collaborate in Engineering Teams. Ship Production Features. Experience Real Software Development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleApplyNow} className="h-14 px-8 text-base bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Apply Now
              </Button>
              <Button variant="secondary" onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })} className="h-14 px-8 text-base bg-white border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] shadow-sm hover:shadow group">
                Explore Engineering Workflow <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform text-[#94A3B8] group-hover:text-[#2563EB]" />
              </Button>
            </div>
          </motion.div>

          {/* Right Visual Composition (Light Theme) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] hidden lg:block"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              
              {/* IDE Window (Light Theme) */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] left-[10%] w-[400px] bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] z-20"
              >
                <div className="h-8 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-[10px] text-[#64748B] font-mono font-medium">AuthService.java</span>
                </div>
                <div className="p-4 font-mono text-xs leading-loose text-[#334155] bg-white">
                  <span className="text-[#9333EA]">@RestController</span><br/>
                  <span className="text-[#9333EA]">@RequestMapping</span>(<span className="text-[#16A34A]">"/api/v1/auth"</span>)<br/>
                  <span className="text-[#2563EB]">public class</span> <span className="text-[#B45309]">AuthService</span> {'{'}<br/>
                  &nbsp;&nbsp;<span className="text-[#9333EA]">@PostMapping</span>(<span className="text-[#16A34A]">"/login"</span>)<br/>
                  &nbsp;&nbsp;<span className="text-[#2563EB]">public</span> <span className="text-[#B45309]">ResponseEntity</span> {'<'}<span className="text-[#2563EB]">?</span>{'>'} login() {'{'}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#94A3B8]">{"// Enterprise authentication logic..."}</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#2563EB]">return</span> ResponseEntity.ok(token);<br/>
                  &nbsp;&nbsp;{'}'}<br/>
                  {'}'}
                </div>
              </motion.div>

              {/* Deployment Status */}
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[5%] right-[5%] w-[220px] bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.06)] z-30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-green-50 text-green-600">
                    <Rocket size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">Production Deploy</div>
                    <div className="text-[10px] text-[#64748B]">v2.4.1 • 2 mins ago</div>
                  </div>
                </div>
                <div className="w-full bg-[#F1F5F9] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-green-500 w-full h-full" />
                </div>
              </motion.div>

              {/* GitHub Activity */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-[35%] right-[0%] w-[240px] bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.06)] z-20"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Github size={16} className="text-[#475569]" />
                    <span className="text-xs font-bold text-[#0F172A]">Recent Commits</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#F0F9FF] flex items-center justify-center text-[10px] text-[#2563EB] font-bold border border-[#BAE6FD]">JS</div>
                      <div>
                        <div className="text-[11px] text-[#0F172A] font-semibold">fix: microservice auth...</div>
                        <div className="text-[9px] text-[#64748B]">just now</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Architecture Diagram Card */}
              <motion.div 
                animate={{ y: [15, -15, 15] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[5%] left-[5%] w-[320px] bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_15px_30px_rgba(0,0,0,0.06)] z-30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">System Architecture</div>
                  <Cloud size={16} className="text-[#2563EB]" />
                </div>
                <div className="flex items-center justify-between gap-2 text-[#475569]">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center"><Server size={14} className="text-[#2563EB]" /></div>
                    <span className="text-[9px] font-semibold">API Gateway</span>
                  </div>
                  <div className="flex-1 h-px bg-[#E2E8F0] relative"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#2563EB]" /></div>
                  <div className="flex flex-col gap-2">
                    <div className="w-10 h-6 rounded bg-purple-50 border border-purple-100 flex items-center justify-center"><span className="text-[8px] text-purple-600 font-bold">Auth</span></div>
                    <div className="w-10 h-6 rounded bg-green-50 border border-green-100 flex items-center justify-center"><span className="text-[8px] text-green-600 font-bold">Users</span></div>
                  </div>
                </div>
              </motion.div>

              {/* AI Mentor Widget */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[40%] left-0 w-[180px] bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-[0_20px_40px_rgba(37,99,235,0.1)] z-40 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center shadow-md">
                  <Cpu size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#0F172A]">AI Mentor</div>
                  <div className="text-[9px] text-[#16A34A] font-semibold">Code Review Passed</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
