import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { settingsAPI } from '../utils/api';

const WhatsAppButton = () => {
  const [settings, setSettings] = useState({
    whatsappNumber: '917780720178'
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

  const whatsappMessage = encodeURIComponent(
    'Hello! I would like to inquire about your bus and tempo traveller services.'
  );

  return (
    <a
      href={`https://wa.me/${settings.whatsappNumber}?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 bg-gradient-to-br from-green-500 to-green-600 text-white p-5 rounded-full shadow-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-110 animate-float border-4 border-white"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={36} />
    </a>
  );
};

export default WhatsAppButton;
