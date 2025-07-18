import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { contactUsContent } from '../data/mockData';
import { useSendMailToAdmin } from '../apis/apiHooks';
import { enqueueSnackbar } from 'notistack';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    mutateAsync: sendMailToAdmin,
    isSuccess: isSendMailToAdmin
  } = useSendMailToAdmin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    sendMailToAdmin({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    })

    if (isSendMailToAdmin) {
      enqueueSnackbar("We'll get back to you shortly", { variant: "success" });
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-80 bg-gray-900 flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
            alt="Furniture showroom"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{contactUsContent.heading}</h1>
          <p className="text-white text-lg max-w-2xl mx-auto">
            {contactUsContent.description}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">{contactUsContent.email}</p>
              <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">{contactUsContent.phone}</p>
              <p className="text-sm text-gray-500">{contactUsContent.hours}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <MapPin className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-2">{contactUsContent.address}</p>
              <p className="text-sm text-gray-500">Get directions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="input w-full"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="Product Inquiry">Product Inquiry</option>
                        <option value="Order Status">Order Status</option>
                        <option value="Return Request">Return Request</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="input w-full"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary py-3 px-6 flex items-center"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        <span>Send Message</span>
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Showroom Locations */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Showrooms</h2>

              <div className="space-y-6">
                {contactUsContent.showrooms.map((showroom, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-3">{showroom.city} Showroom</h3>
                    <div className="flex items-start mb-3">
                      <MapPin className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <p>{showroom.address}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-primary mr-3" />
                      <p>{showroom.phone}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
                <p className="text-gray-700 mb-6">{contactUsContent.hours}</p>

                <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a
                    href={contactUsContent.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full text-gray-700 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.14h-3v4h3v12h5v-12h3.85l.42-4z" />
                    </svg>
                  </a>
                  <a
                    href={contactUsContent.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full text-gray-700 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href={contactUsContent.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full text-gray-700 transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.11 1.184 4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96 bg-gray-200">
        <div className="w-full h-full">
          <div className="bg-card rounded-lg shadow-md overflow-hidden h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1!2d75.895720!3d22.751305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCustom%20Location!5e0!3m2!1sen!2sin!4v0000000000000
"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="FurnitureByPanchal Showroom Location"
              className="grayscale"
            ></iframe>
          </div>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Our showroom is open Monday through Saturday, 9AM to 8PM.
              <br />
              Schedule an appointment for a personalized shopping experience.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;