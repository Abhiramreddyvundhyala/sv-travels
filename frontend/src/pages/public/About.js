import React, { useEffect } from 'react';
import { FaEye, FaBullseye, FaShieldAlt, FaClock, FaUsers, FaAward } from 'react-icons/fa';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-4">About SV Travels - Hyderabad & Mahabubnagar</h1>
          <p className="text-xl text-teal-50">Sri Venkateshwara Travels - Your Trusted Partner for Tours Across India</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Leading Bus & Tempo Traveller Service in Hyderabad & Mahabubnagar</h2>
              <div className="w-24 h-1 bg-teal-600 mx-auto mb-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600"
                  alt="SV Travels Bus Rental Hyderabad Mahabubnagar"
                  className="rounded-xl shadow-lg w-full"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400?text=SV+Travels';
                  }}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-800 mb-4">
                  SV Travels = Sri Venkateshwara Travels
                </h3>
                <p className="text-neutral-700 mb-4 leading-relaxed">
                  <strong>SV Travels (Sri Venkateshwara Travels)</strong> is the premier bus and tempo traveller rental service 
                  based in <strong>Hyderabad and Mahabubnagar, Telangana</strong>. We specialize in providing comfortable, safe, 
                  and affordable group transportation for tours and travels to <strong>all destinations across India</strong>.
                </p>
                <p className="text-neutral-700 mb-4 leading-relaxed">
                  With over a decade of experience serving customers from Hyderabad, Mahabubnagar, Wanaparthy, and surrounding areas, 
                  we have built a reputation for reliability and excellence. Our modern fleet and professional drivers ensure your 
                  journey is smooth and memorable, whether you're traveling within Telangana or exploring distant states.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  From <strong>wedding transportation and corporate events</strong> to <strong>pilgrimage tours and family vacations</strong>, 
                  SV Travels is your one-stop solution for all group travel needs from Hyderabad and Mahabubnagar to anywhere in India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="card p-8">
              <div className="flex items-center mb-4">
                <FaEye className="text-4xl text-teal-600 mr-4" />
                <h3 className="text-2xl font-bold text-neutral-800">Our Vision</h3>
              </div>
              <p className="text-neutral-700 leading-relaxed">
                To become India's most trusted and preferred bus and tempo traveller service provider from Hyderabad and Mahabubnagar, 
                setting industry standards in safety, comfort, and customer satisfaction for tours across India. We envision 
                a future where every journey with SV Travels is a delightful experience, connecting Telangana with the rest of India.
              </p>
            </div>

            <div className="card p-8">
              <div className="flex items-center mb-4">
                <FaBullseye className="text-4xl text-amber-600 mr-4" />
                <h3 className="text-2xl font-bold text-neutral-800">Our Mission</h3>
              </div>
              <p className="text-neutral-700 leading-relaxed">
                To provide exceptional bus and tempo traveller rental services from Hyderabad and Mahabubnagar through well-maintained vehicles, 
                professional drivers, and customer-centric approach. We are committed to ensuring safe, 
                comfortable, and timely travel for all our customers across India at competitive prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              The principles that drive us forward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center hover:transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <FaShieldAlt className="text-5xl text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">Safety First</h3>
              <p className="text-neutral-600">
                Your safety is our top priority. All our vehicles undergo regular maintenance 
                and safety checks to ensure a secure journey.
              </p>
            </div>

            <div className="card p-8 text-center hover:transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <FaClock className="text-5xl text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">Reliability</h3>
              <p className="text-neutral-600">
                We value your time. Our commitment to punctuality ensures you reach your 
                destination on schedule, every time.
              </p>
            </div>

            <div className="card p-8 text-center hover:transform hover:-translate-y-2">
              <div className="flex justify-center mb-4">
                <FaUsers className="text-5xl text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3">Customer Focus</h3>
              <p className="text-neutral-600">
                Your comfort and satisfaction drive everything we do. We go the extra mile 
                to exceed your expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose SV Travels?</h2>
            <div className="w-24 h-1 bg-teal-600 mx-auto mb-6"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md">
                <FaAward className="text-3xl text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-neutral-800 mb-2">Years of Experience</h4>
                  <p className="text-neutral-600 text-sm">
                    Extensive experience in handling group travel for various occasions and events.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md">
                <FaShieldAlt className="text-3xl text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-neutral-800 mb-2">Safety Standards</h4>
                  <p className="text-neutral-600 text-sm">
                    Highest safety standards with GPS tracking and regular vehicle maintenance.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md">
                <FaUsers className="text-3xl text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-neutral-800 mb-2">Professional Drivers</h4>
                  <p className="text-neutral-600 text-sm">
                    Experienced, courteous, and well-trained drivers for a smooth journey.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md">
                <FaClock className="text-3xl text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-neutral-800 mb-2">24/7 Support</h4>
                  <p className="text-neutral-600 text-sm">
                    Round-the-clock customer support for all your queries and assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Our Commitment to You</h2>
          <p className="text-xl text-teal-50 max-w-3xl mx-auto mb-8">
            At Sri Venkateshwara Travels, we understand that your journey is as important as your destination. 
            That's why we are committed to providing you with the best-in-class transportation services that 
            combine comfort, safety, and affordability.
          </p>
          <p className="text-lg text-teal-100 max-w-3xl mx-auto">
            Whether you're planning a wedding, corporate event, educational tour, or family trip, 
            trust SV Travels to make your journey comfortable, safe, and memorable.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
