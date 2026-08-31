import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Medal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';

export default function OurTeamPage() {
  React.useEffect(() => {
    document.title = "Our Team | QEVRIX";
    window.scrollTo(0, 0);
  }, []);

  const team = [
    {
      name: "Team Lead 1",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Leading Qevrix's strategic vision and operations."
    },
    {
      name: "Team Lead 2",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Driving technological innovation and engineering excellence."
    },
    {
      name: "Team Lead 3",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Ensuring seamless delivery across all business verticals."
    },
    {
      name: "Team Lead 4",
      role: "Lead Architect",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Architecting robust and scalable cloud solutions."
    },
    {
      name: "Team Lead 5",
      role: "Workforce Director",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Managing workforce deployment and talent acquisition."
    },
    {
      name: "Team Lead 6",
      role: "Civil Engineering Head",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Overseeing all civil and construction projects."
    }
  ];

  return (
    <div className="min-h-screen bg-qx-background font-sans text-qx-text relative">
      <QevrixNavbar />
      
      <div className="bg-white text-gray-900 pt-32 pb-16 relative z-10 border-b border-gray-200">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-qx-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4 flex items-center justify-center gap-2"
            >
              <span className="w-6 h-[2px] bg-qx-primary"></span>
              THE PEOPLE BEHIND QEVRIX
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight"
            >
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-qx-primary to-orange-400">Team</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Our team consists of industry veterans, technical experts, and visionary leaders dedicated to delivering exceptional results for our clients across all sectors.
            </motion.p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-qx-primary/40 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>
                <div className="p-8 relative">
                  {/* Floating Action Button purely for aesthetics */}
                  <div className="absolute -top-6 right-8 w-12 h-12 bg-qx-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-qx-primary/40 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight size={20} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-qx-primary transition-colors">{member.name}</h3>
                  <p className="text-qx-primary font-semibold text-sm mb-4 uppercase tracking-wider">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Us Section */}
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
              <Briefcase className="w-10 h-10 text-qx-primary" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">Want to join the team?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed font-medium mb-10">
              We are constantly looking for bright minds to join our mission of transforming industries through technology and strategic workforce support.
            </p>
            <div>
              <Link to="/careers" className="inline-block px-8 py-4 bg-qx-primary text-white rounded-xl font-bold tracking-wide shadow-lg shadow-qx-primary/30 hover:bg-qx-primaryHover transition-colors">
                View Open Positions
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      <QevrixFooter />
    </div>
  );
}
