import React from 'react';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';
import { companyConfig } from '../config/companyConfig';

export default function TermsConditions() {
  React.useEffect(() => {
    document.title = "Terms & Conditions | QEVRIX";
  }, []);

  return (
    <div className="min-h-screen bg-[#060A14] font-sans text-qx-text relative">
      <QevrixNavbar />
      
      <div className="max-w-4xl mx-auto px-6 py-32 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Terms & Conditions</h1>
        <p className="text-qx-textSecondary mb-8 text-sm">Last Updated: August 18, 2026</p>
        
        <div className="space-y-8 text-qx-textSecondary leading-relaxed text-[15px]">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Website Use</h2>
            <p>
              The information provided on this website is for general business information and marketing purposes only. By accessing this website, you agree to comply with and be bound by these Terms & Conditions. If you disagree with any part of these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. No Client Relationship</h2>
            <p>
              Use of this website, including submitting enquiry forms or communicating with our team, does not automatically create a formal client, advisory, or business relationship. A formal client relationship is only established upon the execution of a written contract, service agreement, proposal, or work order signed by authorized representatives of both parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Service Scope and Deliverables</h2>
            <p>
              The scope, pricing, timelines, deliverables, and payment terms of any service offered by {companyConfig.brandName} (including IT & Software, Workforce Solutions, or Civil & Construction) are governed strictly by the written project-specific contract or agreement executed between {companyConfig.brandName} and the client. Information on the website is subject to change based on actual client needs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Intellectual Property</h2>
            <p>
              All materials, design layouts, graphics, text, brand marks, and code blocks displayed on this website are the intellectual property of {companyConfig.companyName} unless otherwise stated, and are protected by applicable copyright and trademark laws. Unauthorized reproduction or redistribution is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Disclaimer of Warranties</h2>
            <p>
              We try our best to keep all website content accurate and up to date. However, this website and its contents are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied, including but not limited to the implied warranties of merchantability or fitness for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Updates to Terms</h2>
            <p>
              {companyConfig.brandName} reserves the right to modify or replace these Terms & Conditions at any time without prior notice. It is your responsibility to review this page periodically for changes.
            </p>
          </section>
        </div>
      </div>

      <QevrixFooter />
    </div>
  );
}
