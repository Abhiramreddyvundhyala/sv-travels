import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaUsers, FaSnowflake, FaCheckCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { vehicleAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const Fleet = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await vehicleAPI.getAll();
      if (response.data.success) {
        const availableVehicles = response.data.vehicles.filter(v => v.availability);
        setVehicles(availableVehicles);
        // Initialize image index for each vehicle
        const initialIndexes = {};
        availableVehicles.forEach(vehicle => {
          initialIndexes[vehicle._id] = 0;
        });
        setCurrentImageIndex(initialIndexes);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast.error('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles = filter === 'All' 
    ? vehicles 
    : vehicles.filter(v => v.vehicleType === filter);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop';
    // If it's already a full URL (Cloudinary or external), return as is
    if (imagePath.startsWith('http')) return imagePath;
    // Legacy support for old local paths
    const baseUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace('/api', '');
    return `${baseUrl}${imagePath}`;
  };

  const handlePrevImage = (vehicleId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [vehicleId]: prev[vehicleId] === 0 ? totalImages - 1 : prev[vehicleId] - 1
    }));
  };

  const handleNextImage = (vehicleId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [vehicleId]: prev[vehicleId] === totalImages - 1 ? 0 : prev[vehicleId] + 1
    }));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-4">Our Bus & Tempo Traveller Fleet - Hyderabad & Mahabubnagar</h1>
          <p className="text-xl text-teal-50">Well-Maintained Vehicles for Tours Across India | Spacious & Comfortable</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-neutral-50">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {['All', 'Bus', 'Tempo Traveller'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  filter === type
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 shadow'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-neutral-600">No vehicles available at the moment.</p>
              <p className="text-neutral-500 mt-2">Please check back later or contact us for availability.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle) => {
                const vehicleImages = vehicle.images && vehicle.images.length > 0 
                  ? vehicle.images 
                  : ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400'];
                const currentIndex = currentImageIndex[vehicle._id] || 0;
                
                return (
                  <div key={vehicle._id} className="card overflow-hidden">
                    {/* Vehicle Image Carousel */}
                    <div className="relative h-64 overflow-hidden group">
                      <img
                        src={getImageUrl(vehicleImages[currentIndex])} 
                        alt={`${vehicle.vehicleName} - Image ${currentIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=Vehicle';
                        }}
                      />
                      
                      {/* Image Navigation Arrows - Only show if multiple images */}
                      {vehicleImages.length > 1 && (
                        <>
                          <button
                            onClick={() => handlePrevImage(vehicle._id, vehicleImages.length)}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-75"
                            aria-label="Previous image"
                          >
                            <FaChevronLeft size={20} />
                          </button>
                          <button
                            onClick={() => handleNextImage(vehicle._id, vehicleImages.length)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-75"
                            aria-label="Next image"
                          >
                            <FaChevronRight size={20} />
                          </button>
                          
                          {/* Image Indicators */}
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                            {vehicleImages.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(prev => ({
                                  ...prev,
                                  [vehicle._id]: index
                                }))}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  index === currentIndex 
                                    ? 'bg-white w-6' 
                                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                                }`}
                                aria-label={`Go to image ${index + 1}`}
                              />
                            ))}
                          </div>
                          
                          {/* Image Counter */}
                          <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                            {currentIndex + 1} / {vehicleImages.length}
                          </div>
                        </>
                      )}
                      
                      <div className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {vehicle.vehicleType}
                      </div>
                    </div>

                  {/* Vehicle Details */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-neutral-800 mb-2">
                      {vehicle.vehicleName}
                    </h3>

                    <div className="flex items-center gap-4 mb-4 text-neutral-600">
                      <div className="flex items-center">
                        <FaUsers className="mr-2 text-teal-600" />
                        <span className="text-sm font-semibold">{vehicle.seatingCapacity} Seats</span>
                      </div>
                      <div className="flex items-center">
                        <FaSnowflake className="mr-2 text-teal-600" />
                        <span className="text-sm font-semibold">{vehicle.acType}</span>
                      </div>
                    </div>

                    {vehicle.description && (
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                        {vehicle.description}
                      </p>
                    )}

                    {/* Features */}
                    {vehicle.features && vehicle.features.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-neutral-800 mb-2 text-sm">Features:</h4>
                        <div className="space-y-1">
                          {vehicle.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-start">
                              <FaCheckCircle className="text-teal-500 mt-1 mr-2 flex-shrink-0 text-xs" />
                              <span className="text-neutral-600 text-xs">{feature}</span>
                            </div>
                          ))}
                          {vehicle.features.length > 3 && (
                            <p className="text-xs text-teal-600 ml-5">+{vehicle.features.length - 3} more</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Ideal For */}
                    {vehicle.idealFor && vehicle.idealFor.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-neutral-800 mb-2 text-sm">Ideal For:</h4>
                        <div className="flex flex-wrap gap-2">
                          {vehicle.idealFor.map((use, index) => (
                            <span
                              key={index}
                              className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs font-medium"
                            >
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link
                      to="/booking"
                      className="block w-full text-center bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors mt-4"
                    >
                      Enquire Now
                    </Link>
                  </div>
                </div>
              );
            })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-xl mb-8 text-teal-50">
            Contact us and we'll help you select the perfect vehicle for your needs
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

export default Fleet;
