import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [whatsappNumber, setWhatsappNumber] = useState('919963107531');
  const [errors, setErrors] = useState({});

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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must not exceed 100 characters';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s\-\+]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number (starting with 6-9)';
    }

    // Email validation (optional but validate if provided)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      } else if (formData.email.length > 100) {
        newErrors.email = 'Email must not exceed 100 characters';
      }
    }

    // Pickup location validation
    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Starting point is required';
    } else if (formData.pickupLocation.trim().length < 2) {
      newErrors.pickupLocation = 'Starting point must be at least 2 characters';
    } else if (formData.pickupLocation.trim().length > 200) {
      newErrors.pickupLocation = 'Starting point must not exceed 200 characters';
    }

    // Drop location validation
    if (!formData.dropLocation.trim()) {
      newErrors.dropLocation = 'Ending point is required';
    } else if (formData.dropLocation.trim().length < 2) {
      newErrors.dropLocation = 'Ending point must be at least 2 characters';
    } else if (formData.dropLocation.trim().length > 200) {
      newErrors.dropLocation = 'Ending point must not exceed 200 characters';
    }

    // Start date validation
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    } else {
      const selectedDate = new Date(formData.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.startDate = 'Start date cannot be in the past';
      }
    }

    // End date validation (optional but validate if provided)
    if (formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (endDate < startDate) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    // Number of passengers validation
    if (!formData.numberOfPassengers) {
      newErrors.numberOfPassengers = 'Number of passengers is required';
    } else if (parseInt(formData.numberOfPassengers) < 1) {
      newErrors.numberOfPassengers = 'At least 1 passenger is required';
    } else if (parseInt(formData.numberOfPassengers) > 100) {
      newErrors.numberOfPassengers = 'Maximum 100 passengers allowed';
    }

    // Message validation (optional but validate length if provided)
    if (formData.message && formData.message.length > 1000) {
      newErrors.message = 'Message must not exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    
    // Validate form before submission
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
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
        setErrors({});

        // Reset submitted state after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to submit enquiry. Please try again.';
      toast.error(errorMsg);
      
      // If backend returns validation errors, show them
      if (error.response?.data?.errors) {
        const backendErrors = {};
        error.response.data.errors.forEach(err => {
          backendErrors[err.path] = err.msg;
        });
        setErrors(backendErrors);
      }
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
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-12 px-4 sm:py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">Book Your India Tour from Hyderabad</h1>
          <p className="text-base sm:text-lg md:text-xl text-teal-50 px-4">Bus & Tempo Traveller Booking | Hyderabad & Mahabubnagar to All India | Best Rates</p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-12 px-4 sm:py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 sm:px-6 py-3 sm:py-4 rounded-lg mb-6 sm:mb-8 animate-fadeIn">
                <p className="font-semibold text-sm sm:text-base">✓ Thank you for your enquiry!</p>
                <p className="text-xs sm:text-sm mt-1">Email sent to admin & WhatsApp opened. Our team will contact you within 24 hours.</p>
              </div>
            )}

            <div className="card p-5 sm:p-8 md:p-12">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-2">Enquiry Form</h2>
                <p className="text-sm sm:text-base text-neutral-600">Please provide your travel details</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-4 text-neutral-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`input-field pl-10 ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter your name"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                        className={`input-field pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="+91-99631 07531"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-neutral-700 font-semibold mb-2 text-sm sm:text-base">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-4 text-neutral-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Starting Point */}
                <div>
                  <label className="block text-neutral-700 font-semibold mb-2 text-sm sm:text-base">
                    Starting Point <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-4 text-neutral-400" />
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.pickupLocation ? 'border-red-500' : ''}`}
                      placeholder="Enter starting location"
                    />
                  </div>
                  {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>}
                </div>

                {/* Ending Point */}
                <div>
                  <label className="block text-neutral-700 font-semibold mb-2 text-sm sm:text-base">
                    Ending Point <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-4 text-neutral-400" />
                    <input
                      type="text"
                      name="dropLocation"
                      value={formData.dropLocation}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.dropLocation ? 'border-red-500' : ''}`}
                      placeholder="Enter ending location"
                    />
                  </div>
                  {errors.dropLocation && <p className="text-red-500 text-sm mt-1">{errors.dropLocation}</p>}
                </div>

                {/* Tour Destinations */}
                <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-800">Tour Destinations (Optional)</h3>
                      <p className="text-xs sm:text-sm text-neutral-600">Add places you want to visit during your journey</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTourDestinations([...tourDestinations, ''])}
                      className="bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
                    >
                      <FaPlus /> Add Destination
                    </button>
                  </div>
                  
                  {tourDestinations.length === 0 ? (
                    <p className="text-neutral-600 text-center py-4 text-xs sm:text-sm">No destinations added. Click "Add Destination" to include places you want to visit.</p>
                  ) : (
                    <div className="space-y-3">
                      {tourDestinations.map((dest, index) => (
                        <div key={index} className="bg-white rounded-xl p-3 sm:p-4 shadow-md flex items-center gap-3 sm:gap-4">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-neutral-700 font-semibold mb-2 text-sm sm:text-base">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaCalendar className="absolute left-3 top-4 text-neutral-400" />
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        min={getTodayDate()}
                        className={`input-field pl-10 ${errors.startDate ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-semibold mb-2 text-sm sm:text-base">
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
                        className={`input-field pl-10 ${errors.endDate ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                  </div>
                </div>

                {/* Passengers */}
                <div>
                  <label className="block text-neutral-700 font-semibold mb-2 text-sm sm:text-base">
                    Number of Passengers <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-4 text-neutral-400" />
                    <input
                      type="number"
                      name="numberOfPassengers"
                      value={formData.numberOfPassengers}
                      onChange={handleChange}
                      min="1"
                      max="100"
                      className={`input-field pl-10 ${errors.numberOfPassengers ? 'border-red-500' : ''}`}
                      placeholder="Number of passengers"
                    />
                  </div>
                  {errors.numberOfPassengers && <p className="text-red-500 text-sm mt-1">{errors.numberOfPassengers}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-neutral-700 font-semibold mb-2 text-sm sm:text-base">
                    Additional Message {formData.message && <span className="text-xs sm:text-sm text-neutral-500">({formData.message.length}/1000)</span>}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    maxLength="1000"
                    className={`input-field resize-none ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Any special requirements or questions..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn-primary w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg ${
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
      <section className="py-12 px-4 sm:py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center mb-6 sm:mb-8 px-4">What Happens Next?</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="bg-teal-600 text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">
                  1
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-800 mb-2">We Receive Your Enquiry</h3>
                <p className="text-sm sm:text-base text-neutral-600">
                  Your enquiry is sent via email & WhatsApp instantly
                </p>
              </div>

              <div className="text-center">
                <div className="bg-teal-600 text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">
                  2
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-800 mb-2">We Contact You</h3>
                <p className="text-sm sm:text-base text-neutral-600">
                  Our team will call or message you within 24 hours
                </p>
              </div>

              <div className="text-center">
                <div className="bg-teal-600 text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">
                  3
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-800 mb-2">Confirm & Travel</h3>
                <p className="text-sm sm:text-base text-neutral-600">
                  Confirm your booking and enjoy your journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 px-4 sm:py-16 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">Need Immediate Assistance?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-teal-50 px-4">
            Call us directly for instant booking confirmation
          </p>
          <Link
            to="/contact"
            className="bg-white text-teal-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-neutral-100 transition-all duration-300 shadow-xl inline-block"
          >
            View Contact Details
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Booking;
