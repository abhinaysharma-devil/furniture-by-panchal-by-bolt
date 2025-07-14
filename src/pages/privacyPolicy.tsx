import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 text-gray-800 p-6 md:p-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-orange-600 border-b-2 border-lime-400 pb-2 mb-6">
        Privacy Policy
      </h1>
      <p className="mb-4 font-medium">Effective Date: July 2025</p>

      <Section title="1. Introduction">
        <p>
          Furniture By Panchal (“we”, “us”, “our”) is committed to protecting your privacy.
          This policy outlines how we collect, use, disclose, and safeguard personal information
          collected through our website.
        </p>
      </Section>

      <Section title="2. What Information We Collect">
        <ul className="list-disc pl-6">
          <li>
            <strong>Information you provide:</strong> name, contact details (email, phone), address,
            transaction and payment data, and messages via contact forms.
          </li>
          <li>
            <strong>Automatically collected data:</strong> IP address, browser type, device details,
            site usage patterns, referrer URL, cookies and similar tracking technologies.
          </li>
        </ul>
      </Section>

      <Section title="3. Use of Collected Information">
        <p>We use your data to:</p>
        <ul className="list-disc pl-6">
          <li>Process transactions and provide customer support</li>
          <li>Personalize and improve our website/services</li>
          <li>Send updates, offers, and marketing (where consented)</li>
          <li>Prevent fraud and ensure legal compliance</li>
        </ul>
      </Section>

      <Section title="4. Sharing of Your Information">
        <p>
          We <strong>do not sell</strong> your personal information. We may share it when:
        </p>
        <ul className="list-disc pl-6">
          <li>Required by law or legal requests</li>
          <li>With trusted service providers under strict confidentiality</li>
          <li>Protecting our rights, users, or property</li>
        </ul>
      </Section>

      <Section title="5. Cookies & Tracking">
        <p>
          We use cookies, log files, and web beacons to track usage and improve your experience.
          You may disable cookies in your browser, but some features may not function properly.
        </p>
      </Section>

      <Section title="6. Data Security">
        <p>
          We implement physical, electronic, and procedural safeguards to protect your information.
          However, no online transmission is 100% secure.
        </p>
      </Section>

      <Section title="7. Data Retention">
        <p>
          We retain personal data only as long as necessary for legitimate business or legal purposes,
          or as required by law.
        </p>
      </Section>

      <Section title="8. Your Rights">
        <p>You have the right to:</p>
        <ul className="list-disc pl-6">
          <li>Access your personal data</li>
          <li>Correct or update inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent for marketing communications</li>
        </ul>
        <p className="mt-2">
          Contact us at <strong>panchalabhinay@gmail.com</strong> to exercise your rights.
        </p>
      </Section>

      <Section title="9. Children’s Privacy">
        <p>
          Our services are not directed at children under 18. We do not knowingly collect their information.
        </p>
      </Section>

      <Section title="10. International Data Transfers">
        <p>
          Your data may be processed outside India. We ensure appropriate safeguards for international transfers.
        </p>
      </Section>

      <Section title="11. Changes to This Policy">
        <p>
          We may update this policy periodically. Updates will be posted with a revised “Effective Date”.
          Continued use of our site implies acceptance.
        </p>
      </Section>

      <Section title="12. Contact Us">
        <p>
          For any questions, email us at: <strong>panchalabhinay@gmail.com</strong>
        </p>
      </Section>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-orange-500 mb-2">{title}</h2>
    {children}
  </div>
);

export default PrivacyPolicy;
