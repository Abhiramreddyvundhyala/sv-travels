import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from 'react-icons/fa';
import { settingsAPI } from '../../utils/api';

const Contact = () => {
  const [settings, setSettings] = useState({
    contactPhone: '+91-7780720178',
    whatsappNumber: '917780720178',
    contactEmail: 'info@svtravels.com',
    officeAddress: 'Bangalore, Karnataka, India'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.get();
      if (response.data.success) {
        setSettings(response.data.settings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-teal-50">We're Here to Help - Get in Touch Today</p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Phone */}
            <div className="card p-6 text-center hover:transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-teal-100 p-4 rounded-full">
                  <FaPhone className="text-3xl text-teal-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-neutral-800 mb-2">Call Us</h3>
              <a 
                href={`tel:${settings.contactPhone}`}
                className="text-teal-600 hover:text-teal-700 font-semibold"
              >
                {settings.contactPhone}
              </a>
            </div>

            {/* WhatsApp */}
            <div className="card p-6 text-center hover:transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <FaWhatsapp className="text-3xl text-green-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">WhatsApp</h3>
              <a 
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Chat with Us
              </a>
            </div>

            {/* Email */}
            <div className="card p-6 text-center hover:transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-100 p-4 rounded-full">
                  <FaEnvelope className="text-3xl text-amber-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-neutral-800 mb-2">Email</h3>
              <a 
                href={`mailto:${settings.contactEmail}`}
                className="text-amber-600 hover:text-amber-700 font-semibold break-all"
              >
                {settings.contactEmail}
              </a>
            </div>

            {/* Office Hours */}
            <div className="card p-6 text-center hover:transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <div className="bg-teal-100 p-4 rounded-full">
                  <FaClock className="text-3xl text-teal-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-neutral-800 mb-2">Office Hours</h3>
              <p className="text-neutral-600 text-sm">Mon - Sun</p>
              <p className="text-neutral-600 font-semibold">24/7 Available</p>
            </div>
          </div>

          {/* Address and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {/* Address */}
            <div className="card p-8">
              <div className="flex items-start mb-6">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-2xl text-amber-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-800 mb-2">Our Office</h3>
                  <p className="text-neutral-700 text-lg">
                    {settings.officeAddress}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <h4 className="font-bold text-neutral-800 mb-3">Quick Contact</h4>
                
                <a 
                  href={`tel:${settings.contactPhone}`}
                  className="flex items-center text-neutral-700 hover:text-teal-600 transition-colors"
                >
                  <FaPhone className="mr-3 text-teal-600" />
                  <span>{settings.contactPhone}</span>
                </a>

                <a 
                  href={`mailto:${settings.contactEmail}`}
                  className="flex items-center text-neutral-700 hover:text-teal-600 transition-colors"
                >
                  <FaEnvelope className="mr-3 text-teal-600" />
                  <span>{settings.contactEmail}</span>
                </a>

                <a 
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                >
                  <FaWhatsapp className="mr-3 text-green-600" />
                  <span>WhatsApp: {settings.whatsappNumber}</span>
                </a>
              </div>
            </div>

            {/* Google Maps */}
            <div className="card overflow-hidden">
              <iframe
                title="SV Travels Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d77.49085284989908!3d12.953945613457824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">
              We're always ready to assist you with your travel needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Reach Out</h3>
              <p className="text-neutral-600">
                Call, email, or WhatsApp us with your requirements
              </p>
            </div>

            <div className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Get a Quote</h3>
              <p className="text-neutral-600">
                Receive a competitive quote tailored to your needs
              </p>
            </div>

            <div className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Book & Travel</h3>
              <p className="text-neutral-600">
                Confirm your booking and enjoy a comfortable journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-xl mb-8 text-teal-50">
            Fill out our quick booking form and we'll get back to you shortly
          </p>
          <Link
            to="/booking"
            className="bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-neutral-100 transition-all duration-300 shadow-xl inline-block"
          >
            Make a Booking
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;
