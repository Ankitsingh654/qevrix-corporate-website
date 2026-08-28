import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, TrendingUp, Users } from 'lucide-react';

export default function FoundersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0a192f] to-gray-900 text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4"
          >
            Meet the Minds Behind Qevrix
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Driven by a relentless pursuit of excellence and a shared vision to redefine the future of technology and workforce solutions.
          </motion.p>
        </div>

        {/* Founders Image & Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Office/Company Image */}
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 aspect-[4/3] bg-gray-800">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                alt="Qevrix Workspace"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 pr-24">
                <h3 className="text-2xl font-bold text-white drop-shadow-md">The Visionaries</h3>
                <p className="text-blue-300 font-medium tracking-wide">Driving the future of tech</p>
              </div>
            </div>

            {/* Overlapping Founders Photo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border-4 border-[#0a192f] shadow-2xl z-10 bg-gray-800 group"
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
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-blue-400" />
                Our Core Philosophy
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                At Qevrix, we believe that the intersection of technology and human potential is where true magic happens. Our journey started with a simple yet profound realization: businesses need more than just software; they need scalable ecosystems that empower them to <span className="font-semibold text-emerald-400">Innovate, Build, and Grow</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <Target className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">The Mission</h3>
                <p className="text-gray-400 text-sm">
                  To deliver cutting-edge technology and unparalleled workforce solutions that act as catalysts for transformation.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <TrendingUp className="w-10 h-10 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">The Vision</h3>
                <p className="text-gray-400 text-sm">
                  To be the global cornerstone for innovation, enabling enterprises to scale seamlessly in a digital-first world.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800/40 rounded-3xl p-10 md:p-16 border border-gray-700/50 backdrop-blur-sm text-center"
        >
          <Users className="w-16 h-16 mx-auto text-indigo-400 mb-6" />
          <h2 className="text-3xl font-bold mb-6">Building the Future, Together</h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            The foundation of Qevrix isn't just code or capital—it's people. We've structured this company to be a powerhouse of talent and creativity. We're not just building products; we're cultivating a culture where the brightest minds come together to solve the most complex challenges of tomorrow.
          </p>
          <div className="mt-8">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full font-semibold shadow-lg shadow-blue-500/30">
              Innovate. Build. Grow.
            </span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
