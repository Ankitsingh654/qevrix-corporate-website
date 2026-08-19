import React from 'react';

const stats = [
  { value: "50k+", label: "Active Engineers" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "12M+", label: "Lines of Code" },
  { value: "500+", label: "Enterprise Partners" }
];

export default function PlatformStats() {
  return (
    <section className="py-20 bg-qx-surface border-y border-qx-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-qx-border">
          {stats.map((s, i) => (
            <div key={i} className="text-center px-4">
              <div className="text-4xl md:text-5xl font-bold text-qx-text mb-2 tracking-tight">{s.value}</div>
              <div className="text-qx-textMuted font-medium uppercase tracking-wider text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
