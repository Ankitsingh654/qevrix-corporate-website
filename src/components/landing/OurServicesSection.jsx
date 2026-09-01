import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OurServicesSection() {
  const services = [
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-qx-primary drop-shadow-[0_0_8px_rgba(255,90,0,0.8)]">
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
          <path d="M9 4v-2" /><path d="M12 4v-2" /><path d="M15 4v-2" />
          <path d="M9 20v2" /><path d="M12 20v2" /><path d="M15 20v2" />
          <path d="M4 9h-2" /><path d="M4 12h-2" /><path d="M4 15h-2" />
          <path d="M20 9h2" /><path d="M20 12h2" /><path d="M20 15h2" />
          <path d="M8 10l-2 2 2 2" />
          <path d="M16 10l2 2-2 2" />
          <path d="M13 9l-2 6" />
        </svg>
      ),
      title: "IT & Software Solutions",
      description: "Custom software, cloud, AI/ML, and enterprise solutions designed to accelerate your business.",
      path: "/services/it-software"
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-qx-primary drop-shadow-[0_0_8px_rgba(255,90,0,0.8)]">
          <path d="M12 12.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          <path d="M19 21v-1.5a4.5 4.5 0 0 0-4.5-4.5h-5A4.5 4.5 0 0 0 5 19.5V21" />
          <path d="M4.5 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M1 21v-1.5a4.5 4.5 0 0 1 2.5-4" />
          <path d="M19.5 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M23 21v-1.5a4.5 4.5 0 0 0-2.5-4" />
        </svg>
      ),
      title: "Workforce Support",
      description: "Skilled resource deployment, team augmentation and managed workforce services for every industry.",
      path: "/services/workforce"
    },
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-qx-primary drop-shadow-[0_0_8px_rgba(255,90,0,0.8)]">
          <path d="M18 2H6c-1.1 0-2 .9-2 2v18h16V4c0-1.1-.9-2-2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V8h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2z" />
          <path d="M22 22H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      title: "Civil Project Services",
      description: "End-to-end civil engineering and construction solutions built on quality, safety and precision.",
      path: "/services/civil-construction"
    },
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-qx-primary drop-shadow-[0_0_8px_rgba(255,90,0,0.8)]">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      ),
      title: "Branding & Design",
      description: "Creative design solutions including logos, brand kits, print production, and social media graphics.",
      path: "/services/branding-design"
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-[1536px] mx-auto px-6">
        <div className="mb-12">
          <div className="text-xs font-bold text-qx-primary tracking-widest uppercase flex items-center gap-2 mb-2">
            // OUR SERVICES
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 group relative overflow-hidden flex flex-col h-full border border-gray-100"
            >
              {/* Solid Orange Icon Container */}
              <div className="relative w-[88px] h-[88px] rounded-3xl bg-qx-primary shadow-[0_15px_30px_rgba(255,90,0,0.3)] flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-500 z-10">
                <div className="relative z-10 text-white">
                  {React.cloneElement(service.icon, { className: 'text-white w-10 h-10' })}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors relative z-10">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed font-medium relative z-10 flex-grow">
                {service.description}
              </p>
              
              <Link to={service.path} className="flex items-center gap-2 text-qx-primary font-bold hover:gap-3 transition-all duration-300 relative z-10 w-fit text-lg">
                Learn more
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
