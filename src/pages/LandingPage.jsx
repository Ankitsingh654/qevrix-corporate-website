import React from 'react';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import HeroSection from '../components/landing/HeroSection';
import AboutQevrix from '../components/landing/AboutQevrix';
import OurServicesSection from '../components/landing/OurServicesSection';
import EnterpriseSolutions from '../components/landing/EnterpriseSolutions';
import WhyQevrix from '../components/landing/WhyQevrix';
import OurProcessSection from '../components/landing/OurProcessSection';
import TestimonialSlider from '../components/landing/TestimonialSlider';
import CallToAction from '../components/landing/CallToAction';
import QevrixFooter from '../components/landing/QevrixFooter';

export default function LandingPage() {
  React.useEffect(() => {
    document.title = "QEVRIX | IT, Workforce & Civil Solutions";
    window.scrollTo(0, 0);

    const setCanonicalAndOg = () => {
      // Canonical
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = 'https://qevrix.in/';

      // og:url
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', 'https://qevrix.in/');
    };

    setCanonicalAndOg();

    const schemaId = 'qevrix-organization-schema';
    let script = document.getElementById(schemaId);
    
    if (!script) {
      script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "name": "QEVRIX",
            "url": "https://qevrix.in/",
            "description": "QEVRIX provides IT and software solutions, workforce support, and civil project services to help businesses build, operate and grow."
          },
          {
            "@type": "WebSite",
            "name": "QEVRIX",
            "url": "https://qevrix.in/"
          }
        ]
      });
      document.head.appendChild(script);
    }

    return () => {
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-qx-background font-sans text-qx-text selection:bg-qx-primary selection:text-white relative">
      <QevrixNavbar />
      <HeroSection />
      <AboutQevrix />
      <OurServicesSection />
      <EnterpriseSolutions />
      <WhyQevrix />
      <OurProcessSection />
      <TestimonialSlider />
      <CallToAction />
      <QevrixFooter />
    </div>
  );
}
