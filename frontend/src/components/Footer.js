import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { settingsAPI } from '../utils/api';

const Footer = () => {
  const [settings, setSettings] = useState({
    contactPhone: '+91-99631 07531',
    whatsappNumber: '919963107531',
    contactEmail: 'svtravelsonline@gmail.com',
    officeAddress: 'Kothakotta Kurnool road vishweshwar petrol bunk beside 509381 pincode Wanaparthy district'
  });

  useEffect(() => {
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-xl shadow-lg">
                <FaBus className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold">SV Travels</h3>
                <p className="text-xs text-teal-200">Sri Venkateshwara Travels</p>
              </div>
            </div>
            <p className="text-teal-100 text-sm leading-relaxed">
              Spacious and comfortable bus & tempo traveller services for all your group travel needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-teal-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-teal-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-teal-200 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="text-teal-200 hover:text-white transition-colors">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-teal-200 hover:text-white transition-colors">
                  Booking
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-teal-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaPhone className="text-amber-400 mt-1 flex-shrink-0" />
                <a href={`tel:${settings.contactPhone}`} className="text-teal-100 hover:text-white transition-colors">
                  {settings.contactPhone}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <FaEnvelope className="text-amber-400 mt-1 flex-shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="text-teal-100 hover:text-white transition-colors">
                  {settings.contactEmail}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-amber-400 mt-1 flex-shrink-0" />
                <span className="text-teal-100">
                  {settings.officeAddress}
                </span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-teal-100 text-sm">
              <li className="flex items-center space-x-2"><span className="text-amber-400">•</span><span>Bus Rental Services</span></li>
              <li className="flex items-center space-x-2"><span className="text-amber-400">•</span><span>Tempo Traveller Hire</span></li>
              <li className="flex items-center space-x-2"><span className="text-amber-400">•</span><span>Wedding Transportation</span></li>
              <li className="flex items-center space-x-2"><span className="text-amber-400">•</span><span>Corporate Travel</span></li>
              <li className="flex items-center space-x-2"><span className="text-amber-400">•</span><span>School & College Tours</span></li>
              <li className="flex items-center space-x-2"><span className="text-amber-400">•</span><span>Pilgrimage Trips</span></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-teal-700/50 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-teal-200 text-sm mb-4 md:mb-0">
              © {currentYear} SV Travels. All rights reserved.
            </p>
            
            <div className="flex space-x-4">
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 p-3 rounded-full hover:bg-green-700 transition-all hover:scale-110 shadow-lg"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-all hover:scale-110 shadow-lg"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-110 shadow-lg"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 p-3 rounded-full hover:bg-blue-600 transition-all hover:scale-110 shadow-lg"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
