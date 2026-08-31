import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import QevrixFooter from '../components/landing/QevrixFooter';
import { useContactModal } from '../context/ContactModalContext';

const ProjectCard = ({ project, idx }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className="group cursor-pointer block"
    >
      {/* Image Container */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-6 bg-[#111827] border border-white/5 group-hover:border-qx-primary/30 transition-colors duration-500">
        
        {/* Skeleton Loader */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-[#1A2235] animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-t-2 border-qx-primary animate-spin"></div>
          </div>
        )}

        <img 
          src={project.imageUrl} 
          alt={project.title} 
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
          <div className="w-12 h-12 rounded-full bg-qx-primary flex items-center justify-center text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ml-auto shadow-[0_0_20px_rgba(255,107,0,0.4)]">
            <ExternalLink size={20} />
          </div>
        </div>
      </div>
      
      {/* Project Info */}
      <div>
        <span className="text-xs font-bold text-qx-primary uppercase tracking-widest mb-2 block">{project.category}</span>
        <h3 className="text-2xl font-bold text-white group-hover:text-qx-primary transition-colors">{project.title}</h3>
      </div>
    </motion.div>
  );
};

export default function ServicePortfolioPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { openContactModal } = useContactModal();
  
  // Find the specific portfolio data based on the serviceId from URL, or fallback to default
  const data = portfolioData[serviceId] || portfolioData['default'];

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  return (
    <div className="min-h-screen bg-[#060A14] text-white selection:bg-qx-primary selection:text-white flex flex-col font-sans relative">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-qx-primary/20 rounded-full blur-[150px] opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-10 border-b border-white/5 bg-[#080D1C]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 text-sm font-semibold tracking-wider uppercase"
          >
            <ArrowLeft size={16} /> Back to Services
          </button>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              {data.title} <span className="text-qx-primary">Work.</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl">
              {data.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {data.projects && data.projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
              {data.projects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} idx={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#111827] rounded-3xl border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-4">More Projects Coming Soon</h3>
              <p className="text-gray-400">We are currently curating our best work for this category.</p>
            </div>
          )}

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10 border-t border-white/5 bg-[#080D1C] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#FF6B00 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Ready to create something <span className="text-qx-primary">amazing?</span></h2>
          <p className="text-xl text-gray-400 mb-12">Let's discuss how our {data.title.toLowerCase()} services can help achieve your goals.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => openContactModal(data.category || 'General Requirement')}
              className="bg-qx-primary text-white font-bold py-4 px-10 rounded-lg hover:bg-qx-primaryHover hover:-translate-y-1 transition-all shadow-[0_0_30px_rgba(255,107,0,0.3)]"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </section>

      <QevrixFooter />
    </div>
  );
}
