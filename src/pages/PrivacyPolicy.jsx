import React from 'react';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';
import { companyConfig } from '../config/companyConfig';

export default function PrivacyPolicy() {
  React.useEffect(() => {
    document.title = "Privacy Policy | QEVRIX";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#060A14] font-sans text-qx-text relative">
      <QevrixNavbar />
      
      <div className="max-w-4xl mx-auto px-6 py-32 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Privacy Policy</h1>
        <p className="text-qx-textSecondary mb-12 text-sm border-b border-white/10 pb-6">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div className="space-y-10 text-qx-textSecondary leading-relaxed text-[15px]">
          
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to the privacy policy of QEVRIX PRIVATE LIMITED ("QEVRIX", "we", "our", or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, process, and safeguard your personal information when you interact with our website or engage with our corporate services. 
            </p>
            <p className="mt-2">
              Our core services include IT & Software development, Workforce Solutions, Civil & Construction, AI & Automation, and Maintenance & Support. This policy governs data collection across all these service portfolios via our digital presence.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Information We Collect</h2>
            <p>
              We may collect, use, store, and transfer different kinds of personal data about you. The data we collect depends on the context of your interactions with us and the choices you make. This may include:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-white">Identity Data:</strong> First name, last name, title, and company/organization name.</li>
              <li><strong className="text-white">Contact Data:</strong> Email address, telephone numbers, and business location.</li>
              <li><strong className="text-white">Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types, operating system, and platform.</li>
              <li><strong className="text-white">Usage Data:</strong> Information about how you use our website and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>To provide, operate, and maintain our website and business services.</li>
              <li>To manage our relationship with you and fulfill corporate contracts.</li>
              <li>To improve, personalize, and expand our website and service offerings.</li>
              <li>To understand and analyze how you use our website.</li>
              <li>To develop new products, services, features, and functionality.</li>
              <li>To comply with legal and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Information From Contact Forms and Get a Quote Requests</h2>
            <p>
              When you submit a request through our "Contact Us" or "Get a Quote" forms, we specifically collect information relevant to your requirement (such as project scope, estimated budget, and service category). We use this specialized data exclusively to evaluate your business requirements, prepare commercial proposals, and facilitate initial project consultations. This information is securely routed to the appropriate internal department (e.g., IT, Civil, or Workforce) for professional review.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Email Communications</h2>
            <p>
              By providing your email address, you consent to receive business communications from us regarding your enquiry. We may also use your email address to send administrative information, changes to our terms, conditions, and policies, or relevant service updates. You may opt out of marketing communications at any time; however, we may still send you essential service-related emails necessary for active business engagements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Cookies and Website Technologies</h2>
            <p>
              Our website may use "cookies" and similar tracking technologies to enhance user experience, analyze website traffic, and understand user behavior. Cookies are small data files stored on your device. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">7. Sharing of Information</h2>
            <p>
              We do not sell, trade, or rent your personal identification information to third parties. We may share your information in the following limited circumstances:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-white">Service Providers:</strong> We may share data with trusted third-party vendors and service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</li>
              <li><strong className="text-white">Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
              <li><strong className="text-white">Business Transfers:</strong> In the event of a merger, acquisition, or asset sale, your personal data may be transferred as part of the business assets.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">8. Data Security</h2>
            <p>
              We have implemented appropriate organizational and technical security measures designed to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. While we strive to use commercially acceptable means to protect your personal information, please acknowledge that no method of transmission over the Internet, or method of electronic storage, is completely secure, and we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">9. Data Retention</h2>
            <p>
              We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">10. Your Rights and Choices</h2>
            <p>
              Depending on your jurisdiction, you may have rights under data protection laws in relation to your personal data. These may include the right to:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Request access to your personal data.</li>
              <li>Request correction of the personal data that we hold about you.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
            </ul>
            <p className="mt-3">
              If you wish to exercise any of the rights set out above, please contact us using the details provided below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">11. Third-Party Links and Services</h2>
            <p>
              Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. We encourage you to read the privacy policy of every website you visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">12. Children's Privacy</h2>
            <p>
              Our website and corporate services are not intended for children under 18 years of age. We do not knowingly collect data relating to children. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us so that we can take necessary actions to remove that information from our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">13. Changes to This Privacy Policy</h2>
            <p>
              We reserve the right to update or change our Privacy Policy at any time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">14. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact our administrative team:
            </p>
            <div className="mt-6 p-6 bg-white/5 rounded-xl border border-white/10 inline-block w-full sm:w-auto">
              <p className="font-bold text-white mb-2">QEVRIX PRIVATE LIMITED</p>
              <ul className="space-y-2">
                {companyConfig.companyEmail && (
                  <li><span className="text-qx-textMuted">Email:</span> <a href={`mailto:${companyConfig.companyEmail}`} className="text-qx-primary hover:underline">{companyConfig.companyEmail}</a></li>
                )}
                {companyConfig.companyPhone && (
                  <li><span className="text-qx-textMuted">Phone:</span> <span className="text-white">{companyConfig.companyPhone}</span></li>
                )}
                <li><span className="text-qx-textMuted">Address:</span> <span className="text-white">{companyConfig.companyLocation || "Corporate Office, India"}</span></li>
              </ul>
            </div>
          </section>

        </div>
      </div>

      <QevrixFooter />
    </div>
  );
}
