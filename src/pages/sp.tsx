// components/ShippingPolicy.tsx

import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="bg-gray-50 text-gray-800 p-6 md:p-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-orange-600 border-b-2 border-lime-400 pb-2 mb-6">
        Shipping Policy
      </h1>
      <p className="mb-4 font-medium">Effective Date: July 2025</p>

      <Section title="1. Delivery Locations">
        <p>
          We currently ship across India. Delivery to remote or restricted zones may take additional time
          or incur extra charges. If your location is not serviceable, we will notify you after order placement.
        </p>
      </Section>

      <Section title="2. Delivery Timelines">
        <p>
          Estimated delivery times are shown during checkout. Delivery typically takes:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Metro cities: 5–7 business days</li>
          <li>Tier 2 & 3 cities: 7–10 business days</li>
          <li>Custom-made furniture: 14–21 business days</li>
        </ul>
        <p className="mt-2">
          Delays may occur due to weather, carrier issues, or high order volumes during festivals.
        </p>
      </Section>

      <Section title="3. Shipping Charges">
        <ul className="list-disc pl-6">
          <li>We offer free shipping on most orders above ₹5,000.</li>
          <li>For orders below ₹5,000, a flat shipping fee may apply based on location and weight.</li>
        </ul>
      </Section>

      <Section title="4. Order Tracking">
        <p>
          Once your order is shipped, you will receive a tracking link via SMS and email.
          You can also track your order through the "My Account" section on our website.
        </p>
      </Section>

      <Section title="5. Delivery Process">
        <ul className="list-disc pl-6">
          <li>Our delivery team will contact you before dispatch.</li>
          <li>Ensure someone is available to receive the order at the delivery address.</li>
          <li>For bulky or large items, please make arrangements for easy access (e.g., elevators).</li>
        </ul>
      </Section>

      <Section title="6. Damaged or Incorrect Deliveries">
        <p>
          If you receive a damaged, defective, or incorrect item, notify us within <strong>48 hours</strong> of delivery
          with photos and a description at <strong>panchalabhinay@gmail.com</strong>. We’ll arrange
          for repair, replacement, or return as per our return policy.
        </p>
      </Section>

      <Section title="7. Delivery Rescheduling & Missed Delivery">
        <p>
          If you miss a scheduled delivery, our team will attempt to contact you and reschedule. Re-delivery may
          incur an additional fee. Please inform us in advance if you are unavailable to receive the product.
        </p>
      </Section>

      <Section title="8. International Shipping">
        <p>
          We currently do not offer international shipping. For bulk or export inquiries, please contact us directly.
        </p>
      </Section>

      <Section title="9. Contact Us">
        <p>
          For shipping-related questions, reach out to us at:
          <br />
          📧 <strong>panchalabhinay@gmail.com</strong><br />
          📞 <strong>+91-8358985420</strong>
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

export default ShippingPolicy;
