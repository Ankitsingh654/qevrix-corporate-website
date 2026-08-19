import React from 'react';
import { Check, Shield, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export default function QevrixPrograms() {
  const navigate = useNavigate();

  const programs = [
    {
      name: "Core Engineering",
      price: "15,000 INR",
      duration: "12 Weeks",
      features: [
        "Full-stack React & Node.js architecture",
        "Version control & Git workflows",
        "REST API design and integration",
        "Database modeling (SQL/NoSQL)",
        "Deployment to cloud platforms"
      ]
    },
    {
      name: "Enterprise Architecture",
      price: "25,000 INR",
      duration: "16 Weeks",
      highlight: true,
      features: [
        "Everything in Core Engineering",
        "Microservices & Docker containerization",
        "CI/CD pipeline automation",
        "System design & scalability",
        "Direct track to Freelanz onboarding"
      ]
    }
  ];

  return (
    <section id="programs" className="py-24 bg-qx-surface border-y border-qx-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4">Pricing & Programs</h2>
          <h3 className="text-4xl font-bold text-qx-text mb-6">Invest in your engineering future.</h3>
          <p className="text-lg text-qx-textSecondary">
            Transparent pricing for our elite engineering accelerators. No hidden fees. 
            Just rigorous, production-grade training.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {programs.map((program, idx) => (
            <div key={idx} className={`p-8 rounded-2xl border ${program.highlight ? 'border-qx-primary bg-qx-background relative' : 'border-qx-border bg-qx-background'}`}>
              {program.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-qx-primary text-white text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              
              <h4 className="text-2xl font-bold text-qx-text mb-2">{program.name}</h4>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-extrabold text-qx-text">{program.price}</span>
              </div>
              <p className="text-sm font-medium text-qx-primary mb-8">{program.duration} immersive track</p>
              
              <ul className="space-y-4 mb-8">
                {program.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={18} className="text-qx-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-qx-textSecondary">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={program.highlight ? 'primary' : 'secondary'} 
                className="w-full"
                onClick={() => navigate('/signup')}
              >
                Apply for {program.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
