import React, { useEffect, useState } from 'react';
import { onboardingService } from '../services/onboarding.service';
import { motion } from 'framer-motion';

import OnboardingHeader from '../components/OnboardingHeader';
import WelcomeBanner from '../components/WelcomeBanner';
import ResumeJourneyCard from '../components/ResumeJourneyCard';
import OnboardingProgress from '../components/OnboardingProgress';
import TodayGoalCard from '../components/TodayGoalCard';
import OnboardingChecklist from '../components/OnboardingChecklist';
import JourneyTimeline from '../components/JourneyTimeline';
import OnboardingQuickActions from '../components/OnboardingQuickActions';
import NotificationCard from '../components/NotificationCard';
import HelpSupportCard from '../components/HelpSupportCard';
import DashboardFooter from '../components/DashboardFooter';

const DashboardShell = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50/50 font-sans selection:bg-blue-200 selection:text-blue-900">
      {children}
    </div>
  );
};

const StudentOnboardingPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await onboardingService.getDashboardData();
        setData(result);
      } catch (error) {
        console.error("Failed to load onboarding data", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-screen bg-slate-50/50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest animate-pulse">Loading Workspace</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <OnboardingHeader user={data.user} />
      
      <main className="max-w-[1400px] mx-auto px-6 py-10 min-h-screen">
        
        {/* Top Priority Resume Card */}
        {data.resume && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <ResumeJourneyCard resumeData={data.resume} />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content Area (Left/Center) */}
          <div className="lg:col-span-8 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <WelcomeBanner 
                user={data.user} 
                estimatedMinutesLeft={data.progress?.estimatedMinutesLeft} 
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <OnboardingProgress progress={data.progress} />
              <TodayGoalCard goal={data.todayGoal} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <OnboardingChecklist checklist={data.checklist} />
            </motion.div>
          </div>
          
          {/* Sidebar Area (Right) */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <JourneyTimeline timeline={data.timeline} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <OnboardingQuickActions actions={data.quickActions} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <NotificationCard />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <HelpSupportCard />
            </motion.div>
          </div>

        </div>
      </main>
      
      <DashboardFooter />
    </DashboardShell>
  );
};

export default StudentOnboardingPage;
