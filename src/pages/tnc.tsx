// components/TermsAndConditions.tsx

import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 text-gray-800 p-6 md:p-12 max-w-4xl mx-auto" >
      <h1 className="text-3xl font-bold text-orange-600 border-b-2 border-lime-400 pb-2 mb-6">
        Terms and Conditions
      </h1>
      <p className="mb-4 font-medium">Effective Date: July 2025</p>

      <Section title="1. Overview">
        <p>
          These Terms and Conditions ("Terms") govern your use of furniturebypanchal.com (the “Website”),
          operated by Furniture By Panchal. By accessing this site and/or purchasing a product, you agree
          to be bound by these Terms. If you do not agree, please do not continue using the Website.
        </p>
      </Section>

      <Section title="2. Products and Orders">
        <ul className="list-disc pl-6">
          <li>All products are subject to availability and may be withdrawn at any time.</li>
          <li>We reserve the right to refuse or cancel any order for any reason, including pricing errors or unavailability.</li>
          <li>Product dimensions, colors, and finishes may vary slightly due to natural materials or screen settings.</li>
        </ul>
      </Section>

      <Section title="3. Pricing and Payment">
        <ul className="list-disc pl-6">
          <li>All prices listed are in Indian Rupees (INR) and inclusive of applicable taxes unless stated otherwise.</li>
          <li>Payment must be completed in full before products are shipped or delivered.</li>
          <li>We use secure third-party payment gateways. We are not responsible for payment failures or delays caused by them.</li>
        </ul>
      </Section>

      <Section title="4. Shipping and Delivery">
        <p>
          Estimated delivery timelines are provided at checkout. However, actual delivery may vary based on location,
          logistics delays, or other unforeseen circumstances. We will not be liable for any indirect or consequential losses due to delayed delivery.
        </p>
      </Section>

      <Section title="5. Returns and Cancellations">
        <ul className="list-disc pl-6">
          <li>Returns are accepted only for damaged or defective items, subject to our return policy.</li>
          <li>You must report any damage within 48 hours of receiving the product.</li>
          <li>Customized or made-to-order products are not eligible for return or cancellation.</li>
        </ul>
      </Section>

      <Section title="6. Warranty and Repairs">
        <p>
          Furniture may carry a limited warranty against manufacturing defects, as mentioned in the product description.
          Warranty does not cover normal wear and tear, misuse, or modifications made by the customer.
        </p>
      </Section>

      <Section title="7. Intellectual Property">
        <p>
          All content, images, logos, and designs on the Website are the intellectual property of Furniture By Panchal.
          Reproduction or misuse of any content without written permission is strictly prohibited.
        </p>
      </Section>

      <Section title="8. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential damages,
          including loss of profit or data, arising out of your use of our website or products.
        </p>
      </Section>

      <Section title="9. User Conduct">
        <ul className="list-disc pl-6">
          <li>You agree not to upload any false, misleading, abusive, or illegal content.</li>
          <li>You agree not to interfere with the operation or security of this website.</li>
        </ul>
      </Section>

      <Section title="10. Dispute Resolution">
        <p>
          Any disputes will be first attempted to be resolved through mutual communication. Failing which,
          they will be subject to the exclusive jurisdiction of courts in Gujarat, India.
        </p>
      </Section>

      <Section title="11. Modifications">
        <p>
          We reserve the right to update or modify these Terms at any time. The most recent version will be
          posted on this page. Continued use of the website constitutes acceptance of those changes.
        </p>
      </Section>

      <Section title="12. Contact Us">
        <p>
          For any questions regarding these Terms and Conditions, please email us at:
          <strong> panchalabhinay@gmail.com</strong>
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

export default TermsAndConditions;
