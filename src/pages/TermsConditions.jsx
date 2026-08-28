import React from 'react';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';
import { companyConfig } from '../config/companyConfig';

export default function TermsConditions() {
  React.useEffect(() => {
    document.title = "Terms & Conditions | QEVRIX";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#060A14] font-sans text-qx-text relative">
      <QevrixNavbar />
      
      <div className="max-w-4xl mx-auto px-6 py-32 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Terms & Conditions</h1>
        <p className="text-qx-textSecondary mb-12 text-sm border-b border-white/10 pb-6">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div className="space-y-10 text-qx-textSecondary leading-relaxed text-[15px]">
          
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Introduction and Acceptance of Terms</h2>
            <p>
              Welcome to the corporate website of QEVRIX. These Terms & Conditions ("Terms") govern your access to and use of this website, its content, and any associated corporate information provided by us. By accessing, browsing, or utilizing this website, you acknowledge that you have read, understood, and agree to be legally bound by these Terms. If you do not agree with any part of these Terms, you must immediately discontinue your use of the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Company Information</h2>
            <p>
              This website is operated and maintained by <strong className="text-white">QEVRIX PRIVATE LIMITED</strong> ("QEVRIX", "we", "our", or "us"). 
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-white">Corporate Identity Number (CIN):</strong> {companyConfig.cin}</li>
              <li><strong className="text-white">Registered Office:</strong> {companyConfig.companyLocation}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Use of the Website</h2>
            <p>
              The information and materials provided on this website are for general corporate and marketing purposes only. You agree to use the website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit the use and enjoyment of the website by any third party. The content is subject to change without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Services</h2>
            <p>
              QEVRIX provides enterprise-grade solutions across various domains, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>IT & Software</li>
              <li>Workforce Solutions</li>
              <li>Civil & Construction</li>
              <li>AI & Automation</li>
              <li>Maintenance & Support</li>
            </ul>
            <p className="mt-3">
              The presentation of these services on our website does not constitute a binding offer. Not all services may be available in all geographic locations, and the provision of any service is strictly subject to the execution of a definitive agreement between the client and QEVRIX.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Quotations, Proposals and Commercial Terms</h2>
            <p>
              Any pricing, capability highlights, or case studies displayed on the website are indicative and provided for informational purposes only. Specific project scope, deliverables, timelines, pricing, and payment terms will exclusively be governed by separate, mutually agreed, and written quotations, proposals, work orders, contracts, or service agreements executed by authorized representatives of QEVRIX PRIVATE LIMITED.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Client Responsibilities</h2>
            <p>
              When utilizing our contact forms or engaging with our business teams, you agree to provide accurate, current, and complete information regarding your business identity and requirements. You are solely responsible for ensuring that you have the authority to represent your organization in soliciting services or quotes from QEVRIX.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">7. Intellectual Property Rights</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software (collectively, "Intellectual Property"), is the exclusive property of QEVRIX PRIVATE LIMITED or its content suppliers and is protected by applicable Indian and international copyright and trademark laws. Unauthorized reproduction, modification, distribution, transmission, or display of the content is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">8. User Content and Submissions</h2>
            <p>
              Any feedback, suggestions, ideas, or other information (excluding personal data covered by our Privacy Policy) that you submit to QEVRIX through the website shall become the property of QEVRIX. We shall be entitled to use such submissions for any commercial or non-commercial purpose without restriction or compensation to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">9. Prohibited Use</h2>
            <p>
              You are expressly prohibited from:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Using the website to transmit any malicious code, viruses, or harmful components.</li>
              <li>Attempting to gain unauthorized access to our servers, databases, or restricted areas of the website.</li>
              <li>Using the website for any fraudulent, unlawful, or unauthorized business purpose.</li>
              <li>Scraping, data mining, or utilizing automated systems to extract data from the website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">10. Third-Party Services and Links</h2>
            <p>
              Our website may contain links to external third-party websites or services. These links are provided solely for your convenience. QEVRIX does not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party websites. Accessing these links is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">11. Payments and Commercial Agreements</h2>
            <p>
              No direct payments for corporate services are processed through this informational website. All financial transactions, invoicing, and payment milestones will be conducted strictly in accordance with the terms outlined in the finalized, written commercial agreement between the client and QEVRIX.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">12. Confidentiality</h2>
            <p>
              Information shared through the website's contact mechanisms is treated with standard business confidentiality. However, formal Non-Disclosure Agreements (NDAs) must be executed prior to the exchange of highly sensitive proprietary information or intellectual property regarding specific projects.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">13. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, in no event shall QEVRIX PRIVATE LIMITED, its directors, employees, or partners be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your access to, use of, or inability to use this website, or reliance on any information provided herein.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">14. Disclaimer of Warranties</h2>
            <p>
              This website and all its contents are provided on an "as is" and "as available" basis. QEVRIX makes no representations or warranties of any kind, express or implied, regarding the operation of the website, the accuracy of its information, or its fitness for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">15. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless QEVRIX PRIVATE LIMITED, its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, or expenses (including reasonable legal fees) arising out of your violation of these Terms or your misuse of the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">16. Suspension or Termination</h2>
            <p>
              We reserve the right, in our sole discretion, to suspend or terminate your access to the website at any time, without notice, for conduct that we believe violates these Terms or is harmful to our business interests or other users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">17. Changes to Services and Terms</h2>
            <p>
              QEVRIX reserves the right to modify, suspend, or discontinue any aspect of the website or its services at any time. We may also revise these Terms periodically. Continued use of the website following the posting of any changes constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">18. Governing Law and Jurisdiction</h2>
            <p>
              These Terms & Conditions, and any disputes arising out of or related to the use of this website, shall be governed by and construed in accordance with the laws of India. You agree to submit to the exclusive jurisdiction of the competent courts located in Noida, Uttar Pradesh, India, for the resolution of any legal matters.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">19. Contact Information</h2>
            <p>
              If you have any questions or require further clarification regarding these Terms & Conditions, please contact us at:
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
