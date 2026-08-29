import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Lightbulb, 
  Users, 
  Cpu, 
  CheckCircle,
  Building,
  Wrench,
  Search,
  FileText,
  UserCheck,
  MessageSquare,
  Award,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';

export default function CareersPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Careers at QEVRIX | Join Our Team";
    window.scrollTo(0, 0);

    const updateMetaTag = (name, property, content) => {
      let element = document.querySelector(`meta[${name ? `name="${name}"` : `property="${property}"`}]`);
      if (!element) {
        element = document.createElement('meta');
        if (name) element.setAttribute('name', name);
        if (property) element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateCanonical = (url) => {
      let element = document.querySelector('link[rel="canonical"]');
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute('href', url);
    };

    const desc = "Explore career opportunities at QEVRIX across technology, AI, workforce solutions, infrastructure, and business operations.";
    const url = "https://qevrix.in/careers";
    const title = "Careers at QEVRIX | Join Our Team";

    updateMetaTag('description', '', desc);
    updateMetaTag('', 'og:title', title);
    updateMetaTag('', 'og:description', desc);
    updateMetaTag('', 'og:url', url);
    updateMetaTag('', 'og:type', 'website');
    updateMetaTag('twitter:card', '', 'summary_large_image');
    updateMetaTag('twitter:title', '', title);
    updateMetaTag('twitter:description', '', desc);
    updateCanonical(url);
  }, []);

  const whyWorkWithUs = [
    {
      title: "Meaningful Projects",
      description: "Work on initiatives that deliver real-world impact across technology, infrastructure, and workforce development.",
      icon: Briefcase
    },
    {
      title: "Learning & Growth",
      description: "Continuous opportunities to expand your skill set and advance your professional capabilities.",
      icon: Lightbulb
    },
    {
      title: "Collaborative Environment",
      description: "Join a culture that values teamwork, open communication, and diverse perspectives.",
      icon: Users
    },
    {
      title: "Technology & Innovation",
      description: "Engage with modern tools and methodologies to solve complex industry challenges.",
      icon: Cpu
    },
    {
      title: "Ownership & Responsibility",
      description: "Take charge of your work with the autonomy to drive initiatives from concept to completion.",
      icon: CheckCircle
    }
  ];

  const careerAreas = [
    {
      title: "Software & Technology",
      description: "Engineering, architecture, and development of digital platforms.",
      icon: Cpu
    },
    {
      title: "AI & Automation",
      description: "Developing intelligent systems to streamline enterprise operations.",
      icon: Lightbulb
    },
    {
      title: "Workforce Solutions",
      description: "Managing and optimizing skilled manpower resources.",
      icon: Users
    },
    {
      title: "Civil & Infrastructure",
      description: "Planning, execution, and oversight of civil construction projects.",
      icon: Building
    },
    {
      title: "Business Operations",
      description: "Strategy, management, and administrative functions.",
      icon: Wrench
    }
  ];

  const applicationSteps = [
    { title: "Explore Opportunity", icon: Search },
    { title: "Submit Profile", icon: FileText },
    { title: "Review", icon: UserCheck },
    { title: "Interview / Discussion", icon: MessageSquare },
    { title: "Selection", icon: Award }
  ];

  const handleApplyClick = () => {
    navigate('/careers/apply');
  };

  return (
    <div className="min-h-screen bg-[#060A14] font-sans text-qx-text selection:bg-qx-primary selection:text-white relative">
      <QevrixNavbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A101D] to-[#060A14] z-0" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-qx-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto px-6 relative z-10 text-center mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Careers at <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-blue-400">QEVRIX</span>
            </h1>
            <p className="text-lg md:text-xl text-qx-textSecondary max-w-3xl mx-auto leading-relaxed">
              QEVRIX is building dedicated teams across technology, workforce, and infrastructure-related business areas. Join us in delivering practical solutions designed around real-world business requirements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-20 relative border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Why Work With Us</h2>
            <div className="w-20 h-1 bg-qx-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyWorkWithUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-14 h-14 bg-qx-primary/10 rounded-xl flex items-center justify-center mb-6 text-qx-primary">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-qx-textSecondary leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teams / Career Areas Section */}
      <section className="py-20 relative bg-[#0A101D] border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Career Areas</h2>
            <div className="w-20 h-1 bg-qx-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 bg-[#060A14] border border-white/5 hover:border-qx-primary/30 rounded-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/5 rounded-lg group-hover:bg-qx-primary/10 text-white group-hover:text-qx-primary transition-colors">
                    <area.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{area.title}</h3>
                </div>
                <p className="text-qx-textSecondary text-sm leading-relaxed">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Opportunities & Internships */}
      <section className="py-20 relative border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Current Opportunities */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-qx-primary/5 rounded-full blur-[40px]" />
              <h3 className="text-2xl font-bold text-white mb-6">Current Opportunities</h3>
              <div className="py-8 px-12 bg-white/5 border border-white/10 rounded-xl mb-8 w-full">
                <p className="text-white/60 font-medium text-lg">No current openings</p>
              </div>
              <p className="text-qx-textSecondary mb-8">
                We are always looking for talented individuals. Submit your profile for future consideration.
              </p>
              <button 
                onClick={handleApplyClick}
                className="flex items-center gap-2 bg-qx-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors z-10"
              >
                Submit Profile <ArrowRight size={18} />
              </button>
            </motion.div>

            {/* Internships & Early Careers */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-10 flex flex-col justify-center relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px]" />
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white mb-6 border border-white/10">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Early Careers & Internships</h3>
              <p className="text-qx-textSecondary leading-relaxed text-lg">
                Future internship and early-career opportunities will be announced through QEVRIX.
              </p>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="py-20 relative bg-[#0A101D] border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">How to Apply</h2>
            <div className="w-20 h-1 bg-qx-primary mx-auto rounded-full mb-8"></div>
            <p className="text-qx-textSecondary max-w-2xl mx-auto">
              Our application process is straightforward and designed to help us understand your capabilities and potential fit within our teams.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-qx-primary/10 via-qx-primary/30 to-qx-primary/10 -translate-y-1/2 z-0" />
            
            {applicationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center z-10 w-full md:w-auto"
              >
                <div className="w-16 h-16 bg-[#060A14] border-2 border-qx-primary/30 rounded-full flex items-center justify-center text-qx-primary shadow-[0_0_15px_rgba(59,130,246,0.15)] mb-4 bg-[#060A14]">
                  <step.icon size={24} />
                </div>
                <h4 className="text-white font-semibold text-center text-sm md:text-base max-w-[120px]">{step.title}</h4>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button 
              onClick={handleApplyClick}
              className="inline-flex items-center gap-2 bg-qx-primary hover:bg-blue-600 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              Submit Your Profile <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <QevrixFooter />
    </div>
  );
}
