import React, { useEffect } from 'react';
import EngineeringNavbar from '../components/engineering/EngineeringNavbar';
import EngineeringFooter from '../components/engineering/EngineeringFooter';

import EngineeringHero from '../components/engineering/EngineeringHero';
import EngineeringTrust from '../components/engineering/EngineeringTrust';
import EngineeringAbout from '../components/engineering/EngineeringAbout';
import EngineeringPhilosophy from '../components/engineering/EngineeringPhilosophy';
import EngineeringJourney from '../components/engineering/EngineeringJourney';
import EngineeringCurriculum from '../components/engineering/EngineeringCurriculum';
import EngineeringProjects from '../components/engineering/EngineeringProjects';
import EngineeringMentorship from '../components/engineering/EngineeringMentorship';
import EngineeringMentors from '../components/engineering/EngineeringMentors';
import EngineeringPlacement from '../components/engineering/EngineeringPlacement';
import EngineeringOutcomes from '../components/engineering/EngineeringOutcomes';
import EngineeringTestimonials from '../components/engineering/EngineeringTestimonials';
import EngineeringFaq from '../components/engineering/EngineeringFaq';
import EngineeringCTA from '../components/engineering/EngineeringCTA';

export default function EngineeringProgramPage() {
  // Ensure page loads at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#0F172A] selection:bg-[#2563EB]/30 selection:text-[#0F172A]">
      <EngineeringNavbar />
      
      <main>
        <EngineeringHero />
        <EngineeringTrust />
        <EngineeringAbout />
        <EngineeringPhilosophy />
        <EngineeringJourney />
        <EngineeringCurriculum />
        <EngineeringProjects />
        <EngineeringMentorship />
        <EngineeringMentors />
        <EngineeringPlacement />
        <EngineeringOutcomes />
        <EngineeringTestimonials />
        <EngineeringFaq />
        <EngineeringCTA />
      </main>
      
      <EngineeringFooter />
    </div>
  );
}
