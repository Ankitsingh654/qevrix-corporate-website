import React from 'react';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';
import { companyConfig } from '../config/companyConfig';

export default function Disclaimer() {
  React.useEffect(() => {
    document.title = "Disclaimer | QEVRIX";
  }, []);

  return (
    <div className="min-h-screen bg-[#060A14] font-sans text-qx-text relative">
      <QevrixNavbar />
      
      <div className="max-w-4xl mx-auto px-6 py-32 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Disclaimer</h1>
        <p className="text-qx-textSecondary mb-8 text-sm">Last Updated: August 18, 2026</p>
        
        <div className="space-y-8 text-qx-textSecondary leading-relaxed text-[15px]">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. General Information Only</h2>
            <p>
              The information contained on this website is for general informational and educational purposes only. It is not intended as formal legal compliance consulting, statutory safety certification, licensed safety consulting, or financial advice. Service scopes and compliance matters must be reviewed and finalized under written contract agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Service Availability and Capacity</h2>
            <p>
              The availability of our IT & Software solutions, Workforce deployment, and Civil & Construction services is subject to project location, local regulations, resource capacity, and scheduling availability. QEVRIX reserves the right to decline any service enquiry or project proposal at our discretion. Submitting an enquiry does not guarantee service acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. No Guaranteed Results or Employment</h2>
            <p>
              We make no guarantees, warranties, or representations regarding specific project outcomes, financial metrics, cost savings, or employment pipelines. Any case study references, capability highlights, or starting pricing indicators on this website do not constitute a promise or guarantee of similar results for future engagements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Limitation of Liability</h2>
            <p>
              In no event shall {companyConfig.companyName}, its directors, employees, or partners, be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use of this website, its information, or reliance on any material published herein.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Accuracy and Updates</h2>
            <p>
              While we make reasonable efforts to verify the information on this website, {companyConfig.brandName} makes no representations or warranties as to the accuracy, completeness, reliability, or timeliness of the content. Website content is subject to change at any time without notice.
            </p>
          </section>
        </div>
      </div>

      <QevrixFooter />
    </div>
  );
}
