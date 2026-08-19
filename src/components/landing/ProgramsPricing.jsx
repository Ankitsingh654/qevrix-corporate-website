import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: "Student Starter",
    price: "Free",
    desc: "Perfect for students building their first engineering projects.",
    features: ["Personal Workspace", "Community Support", "1 Project", "Basic CI/CD"],
    btn: "Start Free",
    popular: false
  },
  {
    name: "Engineering Pro",
    price: "$19/mo",
    desc: "Advanced tools for serious engineering students and interns.",
    features: ["Unlimited Projects", "Premium Support", "Advanced Analytics", "Internship Access", "Priority Execution"],
    btn: "Upgrade to Pro",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Custom deployment and SLA for corporate environments.",
    features: ["Custom Integrations", "Dedicated Account Manager", "SSO & SAML", "On-Premise Deployment"],
    btn: "Contact Sales",
    popular: false
  }
];

export default function ProgramsPricing() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-24 bg-qx-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-qx-text mb-4">Simple, transparent pricing</h2>
          <p className="text-qx-textSecondary text-lg max-w-2xl mx-auto">Start building for free, then scale as you grow.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <div key={i} className={`glass-card p-8 relative flex flex-col ${p.popular ? 'border-qx-primary/50 shadow-qx-primary/10 shadow-xl scale-105' : ''}`}>
              {p.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-qx-primary text-qx-text text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-qx-text mb-2">{p.name}</h3>
              <p className="text-qx-textMuted text-sm mb-6">{p.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-qx-text">{p.price}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-qx-textSecondary text-sm">
                    <Check size={16} className="text-qx-primary shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => navigate('/signup')} 
                className={`w-full ${!p.popular ? 'bg-qx-surface hover:bg-qx-surfaceHover border border-qx-border text-qx-text' : ''}`}
              >
                {p.btn}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
