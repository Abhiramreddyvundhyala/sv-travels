import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaCheckCircle, FaUsers, FaRoute, FaClock, FaShieldAlt } from 'react-icons/fa';

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const useCases = [
    {
      icon: <FaUsers className="text-4xl text-amber-600" />,
      title: 'Wedding & Event Transportation (Hyderabad)',
      description: 'Make your special day memorable with our spacious buses for guest transportation from Hyderabad, Mahabubnagar to any venue across India.'
    },
    {
      icon: <FaBus className="text-4xl text-teal-600" />,
      title: 'Corporate Trips & Team Outings',
      description: 'Professional bus and tempo traveller rental for corporate events, conferences, and team outings from Hyderabad to all India destinations.'
    },
    {
      icon: <FaRoute className="text-4xl text-teal-600" />,
      title: 'School & College Educational Tours',
      description: 'Safe and reliable transportation for educational trips, excursions from Telangana to tourist and educational destinations across India.'
    },
    {
      icon: <FaShieldAlt className="text-4xl text-amber-600" />,
      title: 'Pilgrimage Tours (Tirupati, Shirdi, Varanasi)',
      description: 'Comfortable pilgrimage travel from Hyderabad/Mahabubnagar to Tirupati, Shirdi, Varanasi, Puri, and other sacred destinations.'
    },
    {
      icon: <FaUsers className="text-4xl text-teal-600" />,
      title: 'Family Group Travel & Vacations',
      description: 'Perfect for family reunions and group vacations from Hyderabad to Goa, Kerala, Rajasthan, Kashmir, and popular tourist destinations.'
    },
    {
      icon: <FaClock className="text-4xl text-teal-600" />,
      title: 'Long-Distance India Tours',
      description: 'Explore India with our comfortable buses designed for long journeys - North India tours, South India tours, complete India packages.'
    }
  ];

  const features = [
    'Spacious and comfortable seating',
    'AC and Non-AC options available',
    'Clean and well-maintained interiors',
    'Entertainment systems (select vehicles)',
    'Luggage storage space',
    'GPS tracking for safety',
    'Experienced and professional drivers',
    'Regular sanitization',
    'On-time pickup and drop',
    'Flexible booking options',
    'Competitive pricing',
    'Customer support throughout journey'
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-4">Bus & Tempo Traveller Services - Hyderabad & Mahabubnagar</h1>
          <p className="text-xl text-teal-50">Tours & Travels to All India Destinations | Best Rental Rates | 24/7 Service</p>
        </div>
      </section>

      {/* Main Service Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Premium Bus & Tempo Traveller Rental from Hyderabad & Mahabubnagar</h2>
              <div className="w-24 h-1 bg-teal-600 mx-auto mb-6"></div>
              <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
                SV Travels provides spacious and comfortable <strong>buses and tempo travellers from Hyderabad and Mahabubnagar</strong> 
                ideal for group travel, events, tours, and long-distance journeys to <strong>all destinations across India</strong>. 
                Serving Telangana and beyond with professional drivers and well-maintained vehicles.
              </p>
            </div>

            <div className="card overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <img
                  src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800"
                  alt="Bus and Tempo Traveller Rental Service Hyderabad Mahabubnagar"
                  className="w-full h-full object-cover min-h-[300px]"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600?text=Bus+Service';
                  }}
                />
                <div className="p-8 lg:p-12">
                  <h3 className="text-2xl font-bold text-neutral-800 mb-6">
                    Why Choose SV Travels for India Tours?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <FaCheckCircle className="text-teal-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-neutral-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Perfect For Every Occasion</h2>
            <p className="section-subtitle">
              Our vehicles are ideal for various types of group travel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="card p-8 text-center hover:transform hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-neutral-600">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Fleet</h2>
            <p className="section-subtitle">
              Choose from our range of well-maintained vehicles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="card p-8">
              <div className="flex items-center mb-4">
                <FaBus className="text-5xl text-teal-600 mr-4" />
                <h3 className="text-2xl font-bold text-neutral-800">Buses</h3>
              </div>
              <p className="text-neutral-700 mb-4">
                Our spacious buses are perfect for large groups, offering:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-teal-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-neutral-700">Seating capacity: 35-50 passengers</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-teal-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-neutral-700">AC and Non-AC options</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-teal-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-neutral-700">Comfortable push-back seats</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-teal-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-neutral-700">Ample luggage space</span>
                </li>
              </ul>
            </div>

            <div className="card p-8">
              <div className="flex items-center mb-4">
                <FaBus className="text-5xl text-amber-600 mr-4" />
                <h3 className="text-2xl font-bold text-neutral-800">Tempo Travellers</h3>
              </div>
              <p className="text-neutral-700 mb-4">
                Our tempo travellers are ideal for smaller groups, featuring:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-teal-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-neutral-700">Seating capacity: 12-20 passengers</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-teal-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-neutral-700">Luxury AC interiors</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-teal-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-neutral-700">Comfortable reclinable seats</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-teal-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-neutral-700">Perfect for family trips</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/fleet"
              className="btn-primary inline-block"
            >
              View Our Complete Fleet
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Book Your Journey?</h2>
          <p className="text-xl mb-8 text-teal-50">
            Contact us today for competitive quotes and excellent service
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="bg-white text-teal-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-neutral-100 transition-all duration-300 shadow-xl"
            >
              Book Now
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-teal-600 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
