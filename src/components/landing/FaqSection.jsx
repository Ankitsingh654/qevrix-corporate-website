import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: "What makes QEVRIX different from other platforms?", a: "QEVRIX is the only platform that provides a complete ecosystem spanning learning, execution, version control, and direct corporate internship placements." },
  { q: "Can I use QEVRIX for my university projects?", a: "Absolutely. Our student tier is perfect for academic projects and provides you with the same enterprise tools used by top tech companies." },
  { q: "How do I upgrade to the Enterprise plan?", a: "You can contact our sales team directly from the pricing page to set up a custom SLA and deployment plan for your organization." },
  { q: "Is my code secure?", a: "Yes. QEVRIX employs bank-grade security, end-to-end encryption, and is fully SOC2 compliant to ensure your IP is protected." }
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 bg-qx-background border-t border-qx-border/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-qx-text mb-12 text-center">Frequently asked questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card border border-qx-border overflow-hidden">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
              >
                <span className="font-semibold text-qx-text">{faq.q}</span>
                <ChevronDown className={`text-qx-textMuted transition-transform ${open === i ? 'rotate-180' : ''}`} size={20} />
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-qx-textSecondary leading-relaxed">
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
