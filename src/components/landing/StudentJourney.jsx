import React from 'react';
import { GitCommit, Terminal, Layers, Star } from 'lucide-react';

export default function StudentJourney() {
  const steps = [
    {
      title: "Onboarding & Architecture",
      desc: "Master system design, Git workflows, and CI/CD before writing a single line of production code.",
      icon: Layers
    },
    {
      title: "Core Engineering",
      desc: "Build scalable microservices and robust frontend architectures using the QEVRIX tech stack.",
      icon: Terminal
    },
    {
      title: "Open Source & Enterprise",
      desc: "Contribute to real production repositories. Your code will be reviewed by senior engineers.",
      icon: GitCommit
    },
    {
      title: "Graduation to Freelanz",
      desc: "Top performers are directly onboarded to our Freelanz platform to work with global clients.",
      icon: Star
    }
  ];

  return (
    <section className="py-24 bg-qx-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4">The Engineering Program</h2>
            <h3 className="text-4xl font-bold text-qx-text mb-6">From beginner to enterprise-ready.</h3>
            <p className="text-lg text-qx-textSecondary mb-8 leading-relaxed">
              We don't teach you how to code. We teach you how to engineer software. 
              The QEVRIX Engineering Program is an intensive simulation of a high-growth tech company environment. 
              You will push code, break things, fix them, and deploy to production.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-qx-surface border border-qx-border rounded-lg shadow-sm">
              <span className="text-qx-primary font-bold">12 Weeks</span>
              <span className="text-qx-textSecondary">|</span>
              <span className="text-qx-text font-medium">Real Products</span>
              <span className="text-qx-textSecondary">|</span>
              <span className="text-qx-text font-medium">Global Network</span>
            </div>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-xl hover:bg-qx-surface border border-transparent hover:border-qx-border transition-colors">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-qx-primary/10 flex items-center justify-center text-qx-primary font-bold border border-qx-primary/20">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-qx-text mb-1 flex items-center gap-2">
                    {step.title}
                    <step.icon size={16} className="text-qx-textSecondary" />
                  </h4>
                  <p className="text-sm text-qx-textSecondary leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
