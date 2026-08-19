import React from 'react';
import { Network, Database, Cloud, Lock } from 'lucide-react';

export default function EngineeringEcosystem() {
  return (
    <section id="ecosystem" className="py-24 bg-qx-surface border-y border-qx-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-qx-primary tracking-widest uppercase mb-4">Engineering Architecture</h2>
          <h3 className="text-4xl font-bold text-qx-text mb-6">The QEVRIX Ecosystem</h3>
          <p className="text-lg text-qx-textSecondary">
            Our products share a unified, highly scalable infrastructure. Whether you are managing a global workforce or learning to code at an elite level, you are powered by the same enterprise-grade core.
          </p>
        </div>

        <div className="relative">
          {/* Abstract connecting lines */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-qx-border hidden lg:block -z-10"></div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="bg-qx-background p-6 rounded-2xl border border-qx-border relative group">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-qx-surface border border-qx-border p-3 rounded-full group-hover:-translate-y-2 transition-transform">
                <Cloud className="text-qx-primary" size={24} />
              </div>
              <div className="pt-8 text-center">
                <h4 className="text-lg font-bold text-qx-text mb-2">Cloud Native</h4>
                <p className="text-sm text-qx-textSecondary">Distributed microservices architecture deployed globally for zero-latency access.</p>
              </div>
            </div>

            <div className="bg-qx-background p-6 rounded-2xl border border-qx-border relative group">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-qx-surface border border-qx-border p-3 rounded-full group-hover:-translate-y-2 transition-transform">
                <Database className="text-qx-primary" size={24} />
              </div>
              <div className="pt-8 text-center">
                <h4 className="text-lg font-bold text-qx-text mb-2">Data Fabric</h4>
                <p className="text-sm text-qx-textSecondary">Real-time data synchronization across all QEVRIX platforms using event streaming.</p>
              </div>
            </div>

            <div className="bg-qx-background p-6 rounded-2xl border border-qx-border relative group">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-qx-surface border border-qx-border p-3 rounded-full group-hover:-translate-y-2 transition-transform">
                <Network className="text-qx-primary" size={24} />
              </div>
              <div className="pt-8 text-center">
                <h4 className="text-lg font-bold text-qx-text mb-2">Unified APIs</h4>
                <p className="text-sm text-qx-textSecondary">Seamless integration between PrepIQ, WorkforceOS, and the Engineering Program.</p>
              </div>
            </div>

            <div className="bg-qx-background p-6 rounded-2xl border border-qx-border relative group">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-qx-surface border border-qx-border p-3 rounded-full group-hover:-translate-y-2 transition-transform">
                <Lock className="text-qx-primary" size={24} />
              </div>
              <div className="pt-8 text-center">
                <h4 className="text-lg font-bold text-qx-text mb-2">Zero Trust</h4>
                <p className="text-sm text-qx-textSecondary">Bank-grade security protocols protecting intellectual property and user data.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
