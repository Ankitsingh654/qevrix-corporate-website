import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CompanySolutions() {
  return (
    <section className="py-24 bg-qx-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-qx-text mb-6">Built for scaling teams.</h2>
            <p className="text-qx-textSecondary text-lg mb-8 leading-relaxed">
              QEVRIX isn't just for students. Our enterprise solutions provide engineering teams with the infrastructure needed to deploy rapidly, manage workflows, and review code collaboratively.
            </p>
            <ul className="space-y-4 mb-8">
              {["Advanced Role-Based Access Control", "SSO & SAML Integration", "Dedicated Support Channels", "Custom CI/CD Pipelines"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-qx-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-qx-primary"></span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="flex items-center gap-2 text-qx-primary font-medium hover:text-qx-primaryHover transition-colors">
              Explore Enterprise Solutions <ArrowUpRight size={18} />
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-qx-primary/10 blur-[100px] rounded-full"></div>
            <div className="relative glass-card p-2 rounded-2xl border border-qx-border bg-qx-surface/80">
              <div className="bg-qx-background rounded-xl border border-qx-border/50 h-[300px] p-6 flex flex-col justify-center gap-4">
                 <div className="h-4 w-32 bg-qx-surface rounded animate-pulse"></div>
                 <div className="h-4 w-full bg-qx-surface rounded animate-pulse"></div>
                 <div className="h-4 w-3/4 bg-qx-surface rounded animate-pulse"></div>
                 <div className="mt-8 flex gap-4">
                    <div className="h-10 w-24 bg-qx-primary/20 rounded border border-qx-primary/30"></div>
                    <div className="h-10 w-24 bg-qx-surface rounded"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
