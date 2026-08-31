import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, ChevronDown, Rocket, Building, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-lg font-semibold text-white/90 group-hover:text-qx-primary transition-colors pr-8">
          {question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-qx-primary' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed text-sm">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function PricingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Pricing & Plans | QEVRIX";
    window.scrollTo(0, 0);
  }, []);

  const pricingTiers = [
    {
      name: "Starter",
      badge: "For Small Businesses",
      price: "Custom",
      description: "Essential digital solutions to get your business online and operational.",
      icon: <Rocket className="w-6 h-6 text-gray-400 mb-6" />,
      features: [
        "Basic Web Development",
        "Essential Branding Kit",
        "Standard Maintenance Support",
        "Basic IT Infrastructure Setup",
        "1 Round of Revisions"
      ],
      notIncluded: [
        "Custom Software Development",
        "Priority 24/7 Support",
        "Advanced SEO Optimization"
      ],
      buttonText: "Request Quote",
      buttonVariant: "outline",
      popular: false
    },
    {
      name: "Professional",
      badge: "Most Popular",
      price: "Custom",
      description: "Comprehensive end-to-end solutions for growing businesses and startups.",
      icon: <ShieldCheck className="w-6 h-6 text-qx-primary mb-6" />,
      features: [
        "Full-Stack Web Development",
        "Advanced Branding & UI/UX",
        "Priority Support & Maintenance",
        "Complete IT Infrastructure",
        "SEO Optimization & Analytics",
        "Workforce Management Tools",
        "3 Rounds of Revisions"
      ],
      notIncluded: [],
      buttonText: "Get Started Now",
      buttonVariant: "solid",
      popular: true
    },
    {
      name: "Enterprise",
      badge: "For Large Organizations",
      price: "Let's Talk",
      description: "Custom-architected solutions tailored for complex enterprise requirements.",
      icon: <Building className="w-6 h-6 text-gray-400 mb-6" />,
      features: [
        "Custom Software Engineering",
        "Dedicated Development Team",
        "Enterprise Architecture & Security",
        "24/7 SLA Priority Support",
        "On-site IT & Civil Integration",
        "Custom Workforce Solutions",
        "Unlimited Revisions"
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Why do you use 'Custom Pricing' instead of fixed rates?",
      answer: "Every business has unique requirements. A simple landing page costs significantly less than a full enterprise workforce portal. We evaluate your specific needs and provide a highly optimized, fair, and transparent custom quote without hidden charges."
    },
    {
      question: "Do you offer maintenance and support after delivery?",
      answer: "Absolutely. Our Professional and Enterprise tiers include priority support and maintenance. For Starter packages, we offer standard support with options to upgrade to a dedicated maintenance contract."
    },
    {
      question: "How do I get a quote for my project?",
      answer: "Simply click on any 'Request Quote' or 'Get Started' button, fill out our short requirement form, and our technical team will review your needs and schedule a consultation call within 24 hours."
    },
    {
      question: "Can I combine IT, Workforce, and Branding services?",
      answer: "Yes! That is QEVRIX's core strength. We are a unified solutions provider. You can request a comprehensive package that includes software development, branding design, and workforce deployment under one roof."
    }
  ];

  return (
    <div className="min-h-screen bg-[#080D1C] font-sans text-white selection:bg-qx-primary/30">
      <QevrixNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-qx-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4">
              Simple, Transparent Pricing
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              Invest in solutions that <br className="hidden md:block" />
              <span className="text-qx-primary">scale with you.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Whether you are a startup needing essential digital presence or an enterprise requiring custom software architecture, we have a plan designed for your success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-3xl p-8 lg:p-10 transition-transform duration-300 hover:-translate-y-2 ${
                  tier.popular 
                    ? 'bg-gradient-to-b from-[#151C2C] to-[#0A101D] border-2 border-qx-primary shadow-[0_0_40px_rgba(255,90,0,0.15)]' 
                    : 'bg-[#0A101D] border border-white/10 hover:border-white/20'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-qx-primary text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full">
                    {tier.badge}
                  </div>
                )}
                
                {!tier.popular && (
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {tier.badge}
                  </div>
                )}

                {tier.icon}

                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm h-12 mb-6">{tier.description}</p>
                
                <div className="mb-8">
                  <div className="text-4xl font-black text-white">{tier.price}</div>
                  <div className="text-sm text-gray-500 mt-1">Based on project scope</div>
                </div>

                <button 
                  onClick={() => {
                    navigate('/#contact');
                    setTimeout(() => {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 mb-8 ${
                    tier.buttonVariant === 'solid'
                      ? 'bg-qx-primary text-white hover:bg-qx-primaryHover shadow-[0_0_20px_rgba(255,90,0,0.3)] hover:shadow-[0_0_30px_rgba(255,90,0,0.5)]'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {tier.buttonText} <ArrowRight size={18} />
                </button>

                <div className="space-y-4">
                  <p className="text-sm font-semibold text-white/90">What's included:</p>
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.popular ? 'text-qx-primary' : 'text-green-500'}`} />
                        <span className="text-gray-300 text-sm leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.notIncluded.length > 0 && (
                    <>
                      <div className="h-px w-full bg-white/10 my-4" />
                      <ul className="space-y-3">
                        {tier.notIncluded.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 opacity-50">
                            <X className="w-5 h-5 flex-shrink-0 text-gray-500 mt-0.5" />
                            <span className="text-gray-500 text-sm leading-tight line-through">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#060A14] border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about our pricing and engagement model.</p>
          </div>
          
          <div className="bg-[#0A101D] rounded-2xl p-6 md:p-10 border border-white/10 shadow-xl">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqIndex === index}
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm">
              Still have questions? <Link to="/#contact" className="text-qx-primary hover:underline">Contact our support team</Link>.
            </p>
          </div>
        </div>
      </section>

      <QevrixFooter />
    </div>
  );
}
