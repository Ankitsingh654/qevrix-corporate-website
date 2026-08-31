import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, TrendingUp, Users } from 'lucide-react';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';

export default function FoundersPage() {
  React.useEffect(() => {
    document.title = "Founders | QEVRIX";
    window.scrollTo(0, 0);

    const setCanonicalAndOg = () => {
      // Canonical
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = 'https://qevrix.in/founders';

      // og:url
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', 'https://qevrix.in/founders');
    };

    setCanonicalAndOg();
  }, []);

  return (
    <div className="min-h-screen bg-qx-background font-sans text-qx-text relative">
      <QevrixNavbar />
      
      <div className="bg-white text-gray-900 pt-32 pb-16 relative z-10 border-b border-gray-200">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-qx-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center justify-center gap-2"
            >
              <span className="w-6 h-[2px] bg-qx-primary"></span>
              LEADERSHIP
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
            >
              Meet the Minds <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-orange-400">
                Behind Qevrix
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Driven by a relentless pursuit of excellence and a shared vision to redefine the future of technology and workforce solutions.
            </motion.p>
          </div>

          {/* Founders Image & Vision Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main Office/Company Image */}
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-gray-200 aspect-[4/3] bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                  alt="Qevrix Workspace"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/10 to-transparent"></div>
                <div className="absolute bottom-6 left-6 pr-24">
                  <h3 className="text-2xl font-bold text-white drop-shadow-md">The Visionaries</h3>
                  <p className="text-qx-primary font-medium tracking-wide drop-shadow-sm">Driving the future of tech</p>
                </div>
              </div>

              {/* Overlapping Founders Photo */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border-[6px] border-white shadow-2xl z-10 bg-gray-100 group"
              >
                <img
                  src="/assets/founders.jpg"
                  alt="Qevrix Founders"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10 lg:pl-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900 tracking-tight">
                  <div className="w-12 h-12 rounded-xl bg-qx-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-qx-primary" />
                  </div>
                  Our Core Philosophy
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  At Qevrix, we believe that the intersection of technology and human potential is where true magic happens. Our journey started with a simple yet profound realization: businesses need more than just software; they need scalable ecosystems that empower them to <span className="font-semibold text-qx-primary">Innovate, Build, and Grow</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-qx-primary/40 hover:shadow-xl transition-all duration-300 group">
                  <Target className="w-10 h-10 text-qx-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">The Mission</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To deliver cutting-edge technology and unparalleled workforce solutions that act as catalysts for transformation.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-qx-primary/40 hover:shadow-xl transition-all duration-300 group">
                  <TrendingUp className="w-10 h-10 text-qx-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">The Vision</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To be the global cornerstone for innovation, enabling enterprises to scale seamlessly in a digital-first world.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-24 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[32px] p-10 md:p-16 border border-gray-200 shadow-xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-qx-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-qx-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            
            <div className="w-20 h-20 bg-qx-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-qx-primary/20">
              <Users className="w-10 h-10 text-qx-primary" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">Building the Future, Together</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
              The foundation of Qevrix isn't just code or capital—it's people. We've structured this company to be a powerhouse of talent and creativity. We're not just building products; we're cultivating a culture where the brightest minds come together to solve the most complex challenges of tomorrow.
            </p>
            <div className="mt-10">
              <span className="inline-block px-8 py-4 bg-qx-primary text-white rounded-xl font-bold tracking-wide shadow-lg shadow-qx-primary/30 hover:bg-qx-primaryHover transition-colors cursor-default">
                Innovate. Build. Grow.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
      
      <QevrixFooter />
    </div>
  );
}
