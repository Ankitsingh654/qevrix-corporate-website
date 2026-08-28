import React from 'react';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';
import { companyConfig } from '../config/companyConfig';

export default function Disclaimer() {
  React.useEffect(() => {
    document.title = "Disclaimer | QEVRIX";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#060A14] font-sans text-qx-text relative">
      <QevrixNavbar />
      
      <div className="max-w-4xl mx-auto px-6 py-32 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Disclaimer</h1>
        <p className="text-qx-textSecondary mb-12 text-sm border-b border-white/10 pb-6">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div className="space-y-10 text-qx-textSecondary leading-relaxed text-[15px]">
          
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. General Disclaimer</h2>
            <p>
              The information provided by <strong className="text-white">QEVRIX PRIVATE LIMITED</strong> ("QEVRIX", "we", "us", or "our") on this website is for general informational and marketing purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Website Information Disclaimer</h2>
            <p>
              The content on this website does not constitute a binding offer, guarantee of service, or contract. Information published may include inaccuracies or typographical errors. We do not warrant that the website or its content will meet your specific requirements or that it will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. No Professional Advice</h2>
            <p>
              The information contained on this website does not constitute professional, legal, financial, or technical advice. Before making any business decisions or undertaking any projects based on information found on this website, you should consult with appropriate professionals or contact our corporate team directly to verify details, specifications, and applicability to your specific circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Services Information</h2>
            <p>
              Information regarding our services, including IT & Software, Workforce Solutions, Civil & Construction, AI & Automation, and Maintenance & Support, is provided as a general overview of our capabilities. Service availability, project scope, pricing, deliverables, and timelines are entirely dependent on specific client requirements, resource availability, geographic location, and the execution of definitive, written commercial agreements or contracts between you and QEVRIX PRIVATE LIMITED. We reserve the right to modify or withdraw service offerings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Third-Party Links and Content</h2>
            <p>
              Through this website, you may be able to link to other websites or access content provided by third parties. These links are provided for your convenience. We have no control over the nature, content, security, and availability of those external sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them. QEVRIX PRIVATE LIMITED shall not be responsible or liable for any loss or damage caused by the use of or reliance on any third-party content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Accuracy and Completeness of Information</h2>
            <p>
              We do not warrant that the information on this website is fully complete, true, accurate, or non-misleading. Business environments and technologies evolve rapidly, and website content may become outdated. We strongly recommend that users verify critical information directly with our official representatives before relying upon it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">7. Limitation of Liability</h2>
            <p>
              In no event will QEVRIX PRIVATE LIMITED, its directors, employees, partners, or affiliates be liable for any loss or damage including, without limitation, indirect, incidental, special, consequential, or punitive loss or damage, or any loss of data, profits, revenue, or business opportunities arising out of, or in connection with, the use of or inability to use this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">8. Technology and Website Availability</h2>
            <p>
              Every effort is made to keep the website up and running smoothly. However, QEVRIX PRIVATE LIMITED takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control, routine maintenance, or necessary infrastructure upgrades.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">9. Intellectual Property</h2>
            <p>
              Unless otherwise noted, all materials on this website are the intellectual property of QEVRIX PRIVATE LIMITED. The reproduction, distribution, or unauthorized use of any content, branding, or proprietary information from this website without explicit written consent is strictly prohibited and may result in legal action.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">10. External Services and Platforms</h2>
            <p>
              Any mention of third-party platforms, tools, or external services on our website does not imply an official partnership, certification, or endorsement unless explicitly stated. Trademarks and brand names belonging to third parties remain the property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">11. Changes to Website and Disclaimer</h2>
            <p>
              We reserve the right to make changes, corrections, or updates to the website content and this Disclaimer at any time without prior notice. Your continued use of the website following the posting of changes will mean that you accept and agree to the changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">12. Governing Law and Jurisdiction</h2>
            <p>
              This Disclaimer and any disputes related to it or the use of this website shall be governed by and construed in accordance with the laws of India. Any legal actions or proceedings shall be brought exclusively in the competent courts located in Noida, Gautam Buddha Nagar, Uttar Pradesh, India, subject to applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">13. Contact Information</h2>
            <p>
              If you require any more information or have any questions about our site's disclaimer, please feel free to contact us:
            </p>
            <div className="mt-6 p-6 bg-white/5 rounded-xl border border-white/10 inline-block w-full sm:w-auto">
              <p className="font-bold text-white mb-2">QEVRIX PRIVATE LIMITED</p>
              <ul className="space-y-2">
                {companyConfig.cin && (
                  <li><span className="text-qx-textMuted">CIN:</span> <span className="text-white">{companyConfig.cin}</span></li>
                )}
                {companyConfig.companyEmail && (
                  <li><span className="text-qx-textMuted">Email:</span> <a href={`mailto:${companyConfig.companyEmail}`} className="text-qx-primary hover:underline">{companyConfig.companyEmail}</a></li>
                )}
                {companyConfig.companyPhone && (
                  <li><span className="text-qx-textMuted">Phone:</span> <span className="text-white">{companyConfig.companyPhone}</span></li>
                )}
                <li><span className="text-qx-textMuted">Registered Office:</span> <span className="text-white">{companyConfig.companyLocation}</span></li>
              </ul>
            </div>
          </section>

        </div>
      </div>

      <QevrixFooter />
    </div>
  );
}
