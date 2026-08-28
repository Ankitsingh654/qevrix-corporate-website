import React from 'react';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import HeroSection from '../components/landing/HeroSection';
import AboutQevrix from '../components/landing/AboutQevrix';
import QevrixProducts from '../components/landing/QevrixProducts';
import QevrixProductsSection from '../components/landing/QevrixProductsSection';
import EnterpriseSolutions from '../components/landing/EnterpriseSolutions';
import WhyQevrix from '../components/landing/WhyQevrix';
import QevrixTrust from '../components/landing/QevrixTrust';
import HowWeWork from '../components/landing/HowWeWork';
import LeadershipSnippet from '../components/landing/LeadershipSnippet';
import Contact from '../components/Contact';
import CallToAction from '../components/landing/CallToAction';
import QevrixFooter from '../components/landing/QevrixFooter';

export default function LandingPage() {
  React.useEffect(() => {
    document.title = "QEVRIX | IT, Workforce & Civil Solutions";
  }, []);

  return (
    <div className="min-h-screen bg-[#060A14] font-sans text-qx-text selection:bg-qx-primary selection:text-white relative">
      <QevrixNavbar />
      <HeroSection />
      <AboutQevrix />
      <QevrixProducts />
      <QevrixProductsSection />
      <EnterpriseSolutions />
      <HowWeWork />
      <WhyQevrix />
      <QevrixTrust />
      <LeadershipSnippet />
      <Contact />
      <CallToAction />
      <QevrixFooter />
    </div>
  );
}
