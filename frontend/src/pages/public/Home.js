import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaUsers, FaClock, FaShieldAlt, FaMoneyBillWave, FaCheckCircle, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { settingsAPI } from '../../utils/api';
import SEO from '../../components/SEO';

const Home = () => {
  const [settings, setSettings] = useState({
    contactPhone: '+91-99631 07531',
    whatsappNumber: '919963107531'
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

  const features = [
    {
      icon: <FaBus className="text-4xl text-teal-600" />,
      title: 'Well-Maintained Vehicles',
      description: 'Modern, clean, and regularly serviced buses and tempo travellers'
    },
    {
      icon: <FaUsers className="text-4xl text-teal-600" />,
      title: 'Experienced Drivers',
      description: 'Professional and courteous drivers with years of experience'
    },
    {
      icon: <FaShieldAlt className="text-4xl text-amber-600" />,
      title: 'Safety First',
      description: 'Your safety is our priority with GPS tracking and safety measures'
    },
    {
      icon: <FaClock className="text-4xl text-teal-600" />,
      title: 'On-Time Service',
      description: 'Punctual pickup and drop services for all your travel needs'
    },
    {
      icon: <FaMoneyBillWave className="text-4xl text-amber-600" />,
      title: 'Affordable Pricing',
      description: 'Competitive rates with transparent pricing and no hidden charges'
    },
    {
      icon: <FaCheckCircle className="text-4xl text-teal-600" />,
      title: 'Comfortable Seating',
      description: 'Spacious and comfortable seating for a pleasant journey'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="SV Travels Hyderabad - Bus & Tempo Traveller Rental | Tours Across India"
        description="Best bus and tempo traveller rental from Hyderabad & Mahabubnagar. Tour packages to all India destinations - Weddings, Corporate, Pilgrimage. 24/7 Service. Call +91-99631 07531"
        keywords="bus rental Hyderabad, tempo traveller Mahabubnagar, Hyderabad to India tours, bus booking Hyderabad, wedding bus Hyderabad, corporate travel Telangana, Tirupati tour from Hyderabad, Goa tour from Hyderabad, SV Travels Hyderabad"
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 to-teal-800 text-white pt-32 pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                SV Travels
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-teal-100">
                Sri Venkateshwara Travels
              </h2>
              <p className="text-xl md:text-2xl mb-6 text-amber-100">
                Hyderabad • Mahabubnagar • All India Tours
              </p>
              <p className="text-lg mb-8 text-teal-50">
                Premium Bus & Tempo Traveller Services
              </p>
              <p className="text-neutral-100 mb-8 leading-relaxed">
                Leading bus and tempo traveller rental service from <strong>Hyderabad and Mahabubnagar</strong> for tours and travels across India. 
                Perfect for weddings, corporate events, pilgrimages, family tours, and all your group transportation needs. 
                24/7 service with well-maintained vehicles and experienced drivers.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-neutral-100 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Enquire Now
                </Link>
                <a
                  href={`tel:${settings.contactPhone}`}
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2"
                >
                  <FaPhone /> Call Now
                </a>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
              </div>
            </div>

            <div className="hidden lg:block animate-fadeIn">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <img
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800"
                  alt="Luxury Bus"
                  className="rounded-xl shadow-2xl w-full"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600?text=Bus+Service';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose SV Travels for Tours from Hyderabad & Mahabubnagar?</h2>
            <p className="section-subtitle">
              Your trusted partner for comfortable and reliable group transportation across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-8 text-center hover:transform hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Services - Tours & Travels Across India</h2>
            <p className="section-subtitle">
              Premium bus and tempo traveller rental from Hyderabad & Mahabubnagar
            </p>
          </div>

          <div className="card overflow-hidden max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <img
                src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600"
                alt="Bus and Tempo Traveller Rental Hyderabad Mahabubnagar"
                className="w-full h-64 md:h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Our+Vehicles';
                }}
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-neutral-800 mb-4">
                  Bus & Tempo Traveller Rental Services
                </h3>
                <p className="text-neutral-600 mb-6">
                  Based in <strong>Hyderabad and Mahabubnagar</strong>, we provide spacious and comfortable buses and tempo travellers 
                  for tours and travels to <strong>all destinations across India</strong>. Expert drivers, GPS-enabled vehicles, and 24/7 support.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <FaCheckCircle className="text-teal-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700"><strong>Wedding & Event Transportation</strong> - Hyderabad to anywhere in India</span>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-teal-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700"><strong>Corporate Trips</strong> - Team outings, conferences, employee transport</span>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-teal-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700"><strong>Educational Tours</strong> - School, college trips from Telangana</span>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-teal-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700"><strong>Pilgrimage Packages</strong> - Tirupati, Shirdi, Varanasi, Kashi tours</span>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-teal-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700"><strong>Family Vacations</strong> - Goa, Kerala, Rajasthan, North India tours</span>
                  </div>
                </div>
                <Link
                  to="/services"
                  className="btn-primary inline-block"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Book Your India Tour from Hyderabad?</h2>
          <p className="text-xl mb-8 text-teal-50">
            Best bus and tempo traveller rental rates in Hyderabad & Mahabubnagar | 24/7 Service | All India Tours
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-neutral-100 transition-all duration-300 shadow-xl"
            >
              Book Your Tour Now
            </Link>
            <Link
              to="/fleet"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-teal-600 transition-all duration-300"
            >
              View Our Fleet
            </Link>
          </div>
        </div>
      </section>

      {/* Location & Service Area Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Service Area - Tours Across India</h2>
            <p className="section-subtitle">Based in Hyderabad & Mahabubnagar, Serving All of India</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-teal-600 mb-4">📍 Our Base Locations</h3>
                <ul className="space-y-3 text-neutral-700">
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span><strong>Hyderabad</strong> - Serving all areas of Hyderabad and surrounding districts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span><strong>Mahabubnagar</strong> - Complete coverage of Mahabubnagar district and Telangana</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">✓</span>
                    <span><strong>Wanaparthy</strong> - Local pickup and drop services available</span>
                  </li>
                </ul>
              </div>

              <div className="card p-8">
                <h3 className="text-2xl font-bold text-amber-600 mb-4">🗺️ Popular Tour Destinations</h3>
                <ul className="space-y-3 text-neutral-700">
                  <li className="flex items-start">
                    <span className="text-amber-600 font-bold mr-2">✓</span>
                    <span><strong>South India:</strong> Tirupati, Chennai, Bangalore, Kerala, Goa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 font-bold mr-2">✓</span>
                    <span><strong>North India:</strong> Delhi, Agra, Jaipur, Shimla, Kashmir</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 font-bold mr-2">✓</span>
                    <span><strong>Pilgrimage:</strong> Shirdi, Varanasi, Haridwar, Rishikesh, Puri</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 font-bold mr-2">✓</span>
                    <span><strong>Custom Tours:</strong> Any destination across India as per your plan</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card p-8 bg-teal-50 border-2 border-teal-200">
              <h3 className="text-2xl font-bold text-neutral-800 mb-4 text-center">Why Choose SV Travels for India Tours?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">10+</div>
                  <p className="text-neutral-700">Years of Experience</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">5000+</div>
                  <p className="text-neutral-700">Happy Customers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">24/7</div>
                  <p className="text-neutral-700">Service Available</p>
                </div>
              </div>
              <p className="text-center text-neutral-700 mt-6 text-lg">
                <strong>Serving Hyderabad, Mahabubnagar, Telangana & All India</strong> with premium bus and tempo traveller services
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
