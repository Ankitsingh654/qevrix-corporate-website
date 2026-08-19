import React from 'react';

const reviews = [
  { text: "QEVRIX completely transformed how we ship code. The enterprise workspace is unmatched in speed.", author: "Sarah Chen", role: "Sr. Engineer, Vercel" },
  { text: "The definitive platform for any engineering team. It seamlessly integrated with our existing CI/CD pipelines.", author: "James Wilson", role: "CTO, Stripe" },
  { text: "As a student, having access to enterprise-grade tools gave me a massive advantage in my career.", author: "Elena Rostova", role: "Intern, Microsoft" }
];

export default function QevrixTestimonials() {
  return (
    <section className="py-24 bg-qx-background border-t border-qx-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-qx-text mb-16">Trusted by the best.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {reviews.map((r, i) => (
            <div key={i} className="glass-card p-8 hover:border-qx-primary/30 transition-colors">
              <p className="text-qx-textSecondary mb-8 text-lg leading-relaxed">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-qx-surface border border-qx-border flex items-center justify-center text-qx-primary font-bold">
                  {r.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-qx-text">{r.author}</h4>
                  <p className="text-xs text-qx-textMuted">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
