import React, { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendar, FaPlus, FaTimes } from 'react-icons/fa';
import { enquiryAPI, settingsAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pickupLocation: '',
    dropLocation: '',
    startDate: '',
    endDate: '',
    numberOfPassengers: '',
    message: ''
  });
  const [tourDestinations, setTourDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('917780720178');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.get();
      if (response.data.success && response.data.settings.whatsappNumber) {
        setWhatsappNumber(response.data.settings.whatsappNumber);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Create WhatsApp message
  const createWhatsAppMessage = () => {
    let message = `*New Booking Enquiry*\n\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Phone:* ${formData.phone}\n`;
    if (formData.email) {
      message += `*Email:* ${formData.email}\n`;
    }
    message += `*Starting Point:* ${formData.pickupLocation}\n`;
    message += `*Ending Point:* ${formData.dropLocation}\n`;
    
    if (tourDestinations.length > 0) {
      message += `*Tour Destinations:*\n`;
      tourDestinations.forEach((dest, index) => {
        if (dest.trim()) {
          message += `  ${index + 1}. ${dest}\n`;
        }
      });
    }
    
    message += `*Start Date:* ${formData.startDate}\n`;
    if (formData.endDate) {
      message += `*End Date:* ${formData.endDate}\n`;
    }
    message += `*Number of Passengers:* ${formData.numberOfPassengers}\n`;
    
    if (formData.message) {
      message += `*Additional Message:* ${formData.message}\n`;
    }
    
    return encodeURIComponent(message);
  };

  // Send WhatsApp notification
  const sendToWhatsApp = () => {
    const message = createWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Send Email notification using EmailJS
  const sendEmailNotification = async () => {
    try {
      const templateParams = {
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email || 'Not provided',
        pickup_location: formData.pickupLocation,
        drop_location: formData.dropLocation,
        tour_destinations: tourDestinations.length > 0 
          ? tourDestinations.filter(dest => dest.trim()).join(', ') 
          : 'None',
        start_date: formData.startDate,
        end_date: formData.endDate || 'Not specified',
        number_of_passengers: formData.numberOfPassengers,
        additional_message: formData.message || 'None',
        submission_time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      };

      // Initialize EmailJS (only needs to be done once)
      emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('Email notification sent successfully');
    } catch (error) {
      console.error('Email notification error:', error);
      // Don't show error to user, just log it
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        tourDestinations
      };
      
      console.log('Submitting enquiry data:', submitData);
      const response = await enquiryAPI.create(submitData);
      
      if (response.data.success) {
        // Send email notification
        await sendEmailNotification();
        
        // Send WhatsApp notification
        sendToWhatsApp();
        
        toast.success('Enquiry submitted successfully! Opening WhatsApp...');
        setSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          pickupLocation: '',
          dropLocation: '',
          startDate: '',
          endDate: '',
          numberOfPassengers: '',
          message: ''
        });
        setTourDestinations([]);

        // Reset submitted state after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to submit enquiry. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-4">Book Your Journey</h1>
          <p className="text-xl text-teal-50">Fill out the form below and we'll get back to you shortly</p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-8 animate-fadeIn">
                <p className="font-semibold">✓ Thank you for your enquiry!</p>
                <p className="text-sm mt-1">Email sent to admin & WhatsApp opened. Our team will contact you within 24 hours.</p>
              </div>
            )}

            <div className="card p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-neutral-800 mb-2">Enquiry Form</h2>
                <p className="text-neutral-600">Please provide your travel details</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-4 text-neutral-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field pl-10"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-semibold mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-4 text-neutral-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="input-field pl-10"
                        placeholder="+91-7780720178"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-neutral-700 font-semibold mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-4 text-neutral-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field pl-10"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Starting Point */}
                <div>
                  <label className="block text-neutral-700 font-semibold mb-2">
                    Starting Point <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-4 text-neutral-400" />
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      required
                      className="input-field pl-10"
                      placeholder="Enter starting location"
                    />
                  </div>
                </div>

                {/* Ending Point */}
                <div>
                  <label className="block text-neutral-700 font-semibold mb-2">
                    Ending Point <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-4 text-neutral-400" />
                    <input
                      type="text"
                      name="dropLocation"
                      value={formData.dropLocation}
                      onChange={handleChange}
                      required
                      className="input-field pl-10"
                      placeholder="Enter ending location"
                    />
                  </div>
                </div>

                {/* Tour Destinations */}
                <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-800">Tour Destinations (Optional)</h3>
                      <p className="text-sm text-neutral-600">Add places you want to visit during your journey</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTourDestinations([...tourDestinations, ''])}
                      className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                    >
                      <FaPlus /> Add Destination
                    </button>
                  </div>
                  
                  {tourDestinations.length === 0 ? (
                    <p className="text-neutral-600 text-center py-4">No destinations added. Click "Add Destination" to include places you want to visit.</p>
                  ) : (
                    <div className="space-y-3">
                      {tourDestinations.map((dest, index) => (
                        <div key={index} className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4">
                          <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <input
                            type="text"
                            value={dest}
                            onChange={(e) => {
                              const updated = [...tourDestinations];
                              updated[index] = e.target.value;
                              setTourDestinations(updated);
                            }}
                            className="input-field flex-1"
                            placeholder="Enter destination location"
                          />
                          <button
                            type="button"
                            onClick={() => setTourDestinations(tourDestinations.filter((_, i) => i !== index))}
                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Travel Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-neutral-700 font-semibold mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaCalendar className="absolute left-3 top-4 text-neutral-400" />
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        min={getTodayDate()}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-semibold mb-2">
                      End Date
                    </label>
                    <div className="relative">
                      <FaCalendar className="absolute left-3 top-4 text-neutral-400" />
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        min={formData.startDate || getTodayDate()}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Passengers */}
                <div>
                  <label className="block text-neutral-700 font-semibold mb-2">
                    Number of Passengers <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-4 text-neutral-400" />
                    <input
                      type="number"
                      name="numberOfPassengers"
                      value={formData.numberOfPassengers}
                      onChange={handleChange}
                      required
                      min="1"
                      className="input-field pl-10"
                      placeholder="Number of passengers"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-neutral-700 font-semibold mb-2">
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="input-field resize-none"
                    placeholder="Any special requirements or questions..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn-primary w-full md:w-auto px-12 py-4 text-lg ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Submitting...' : 'Submit Enquiry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-8">What Happens Next?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-2">We Receive Your Enquiry</h3>
                <p className="text-neutral-600">
                  Your enquiry is sent via email & WhatsApp instantly
                </p>
              </div>

              <div className="text-center">
                <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-2">We Contact You</h3>
                <p className="text-neutral-600">
                  Our team will call or message you within 24 hours
                </p>
              </div>

              <div className="text-center">
                <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-2">Confirm & Travel</h3>
                <p className="text-neutral-600">
                  Confirm your booking and enjoy your journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-xl mb-8 text-teal-50">
            Call us directly for instant booking confirmation
          </p>
          <a
            href="/contact"
            className="bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-neutral-100 transition-all duration-300 shadow-xl inline-block"
          >
            View Contact Details
          </a>
        </div>
      </section>
    </div>
  );
};

export default Booking;
