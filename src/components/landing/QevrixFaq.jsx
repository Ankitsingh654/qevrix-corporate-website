import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function QevrixFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Is QEVRIX a training institute?",
      a: "No. QEVRIX is an enterprise software company. The QEVRIX Engineering Program is our internal initiative to train and source elite talent for our own ecosystem and our enterprise partners."
    },
    {
      q: "Do I need prior coding experience?",
      a: "Yes. Our engineering program is an accelerator, not a bootcamp. You should have a foundational understanding of programming concepts, data structures, and basic web technologies."
    },
    {
      q: "What is WorkforceOS?",
      a: "WorkforceOS is our proprietary enterprise platform designed to manage engineering teams, track sprint velocity, and oversee organizational resource allocation."
    },
    {
      q: "Will I get a job after the program?",
      a: "Top performers in the Enterprise Architecture track are directly onboarded onto Freelanz, our global talent marketplace, where they are matched with enterprise client projects."
    }
  ];

  return (
    <section className="py-24 bg-qx-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4">FAQ</h2>
          <h3 className="text-3xl font-bold text-qx-text">Common Questions</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-qx-border rounded-xl bg-qx-surface overflow-hidden">
              <button 
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-semibold text-qx-text">{faq.q}</span>
                <ChevronDown 
                  size={20} 
                  className={`text-qx-textSecondary transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} 
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-4 text-qx-textSecondary text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
