import React from 'react';
import QevrixNavbar from '../components/landing/QevrixNavbar';
import QevrixFooter from '../components/landing/QevrixFooter';
import { companyConfig } from '../config/companyConfig';

export default function PrivacyPolicy() {
  React.useEffect(() => {
    document.title = "Privacy Policy | QEVRIX";
  }, []);

  return (
    <div className="min-h-screen bg-[#060A14] font-sans text-qx-text relative">
      <QevrixNavbar />
      
      <div className="max-w-4xl mx-auto px-6 py-32 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Privacy Policy</h1>
        <p className="text-qx-textSecondary mb-8 text-sm">Last Updated: August 18, 2026</p>
        
        <div className="space-y-8 text-qx-textSecondary leading-relaxed text-[15px]">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
            <p>
              Welcome to the privacy policy of {companyConfig.companyName} ("{companyConfig.brandName}"). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safe-keep your personal information when you visit our website and fill out our enquiry forms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
            <p>
              When you submit an enquiry through our contact forms, we collect the following personal information:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Company / Organisation Name</li>
              <li>Specific service interest (e.g. IT & Software, Workforce Solutions, Civil & Construction)</li>
              <li>Requirement details and message description</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Purpose of Collection</h2>
            <p>
              We collect this information solely for the following purposes:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>To evaluate and respond to your B2B business enquiries or service requests.</li>
              <li>To contact you to discuss your project requirements or provide quotes.</li>
              <li>To improve our website services, operational capability, and user experiences.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Information Security Practices</h2>
            <p>
              We implement appropriate technical and organizational security measures to prevent your personal data from being accidentally lost, altered, disclosed, or accessed without authorization. Access to your personal data is restricted to authorized personnel who have a business need to know.
            </p>
            <p className="mt-2 text-xs italic text-qx-textMuted">
              Note: While we strive to protect your personal data, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Data Sharing and Transfer</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties as part of our normal business operations. We only share information with third parties when necessary to fulfill your requested project scope or as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Contact Information</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or your data, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5 inline-block">
              <p className="font-semibold text-white">{companyConfig.companyName}</p>
              <p>Email: {companyConfig.companyEmail}</p>
              <p>Location: {companyConfig.companyLocation}</p>
            </div>
          </section>
        </div>
      </div>

      <QevrixFooter />
    </div>
  );
}
