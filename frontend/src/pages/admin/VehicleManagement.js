import React, { useState, useEffect } from 'react';
import { FaBus, FaPlus, FaEdit, FaTrash, FaTimes, FaUsers, FaSnowflake, FaImage, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { vehicleAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [formData, setFormData] = useState({
    vehicleName: '',
    vehicleType: 'Bus',
    seatingCapacity: '',
    acType: 'AC',
    description: '',
    features: '',
    idealFor: '',
    availability: true,
    pricePerKm: ''
  });
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await vehicleAPI.getAll();
      if (response.data.success) {
        setVehicles(response.data.vehicles);
      }
    } catch (error) {
      toast.error('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('vehicleName', formData.vehicleName);
      data.append('vehicleType', formData.vehicleType);
      data.append('seatingCapacity', formData.seatingCapacity);
      data.append('acType', formData.acType);
      data.append('description', formData.description);
      data.append('pricePerKm', formData.pricePerKm || 0);
      data.append('availability', formData.availability);

      // Parse features and idealFor as arrays
      const features = formData.features.split(',').map(f => f.trim()).filter(f => f);
      const idealFor = formData.idealFor.split(',').map(i => i.trim()).filter(i => i);
      data.append('features', JSON.stringify(features));
      data.append('idealFor', JSON.stringify(idealFor));

      // Append images
      imageFiles.forEach(file => {
        data.append('images', file);
      });

      console.log('Submitting vehicle:', editingVehicle ? 'UPDATE' : 'CREATE');
      console.log('Vehicle ID:', editingVehicle?._id);

      if (editingVehicle) {
        const response = await vehicleAPI.update(editingVehicle._id, data);
        console.log('Update response:', response.data);
        toast.success('Vehicle updated successfully');
      } else {
        const response = await vehicleAPI.create(data);
        console.log('Create response:', response.data);
        toast.success('Vehicle added successfully');
      }

      fetchVehicles();
      closeModal();
    } catch (error) {
      console.error('Save vehicle error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to save vehicle');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vehicle) => {
    console.log('Editing vehicle:', vehicle);
    setEditingVehicle(vehicle);
    setFormData({
      vehicleName: vehicle.vehicleName,
      vehicleType: vehicle.vehicleType,
      seatingCapacity: vehicle.seatingCapacity,
      acType: vehicle.acType,
      description: vehicle.description || '',
      features: vehicle.features?.join(', ') || '',
      idealFor: vehicle.idealFor?.join(', ') || '',
      availability: vehicle.availability,
      pricePerKm: vehicle.pricePerKm || ''
    });
    setImageFiles([]); // Reset image files when editing
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        console.log('Deleting vehicle:', id);
        const response = await vehicleAPI.delete(id);
        console.log('Delete response:', response.data);
        toast.success('Vehicle deleted successfully');
        fetchVehicles();
      } catch (error) {
        console.error('Delete vehicle error:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || 'Failed to delete vehicle');
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingVehicle(null);
    setFormData({
      vehicleName: '',
      vehicleType: 'Bus',
      seatingCapacity: '',
      acType: 'AC',
      description: '',
      features: '',
      idealFor: '',
      availability: true,
      pricePerKm: ''
    });
    setImageFiles([]);
  };

  if (loading && vehicles.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pt-24 bg-neutral-50">
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-neutral-800 mb-2">Vehicle Management</h1>
            <p className="text-neutral-600">Manage your fleet of buses and tempo travellers</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <FaPlus /> Add Vehicle
          </button>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map(vehicle => {
            const currentIndex = currentImageIndex[vehicle._id] || 0;
            const totalImages = vehicle.images?.length || 0;
            
            return (
            <div key={vehicle._id} className="card overflow-hidden">
              <div className="relative h-48 bg-gray-200 group">
                {vehicle.images && vehicle.images.length > 0 ? (
                  <>
                    <img
                      src={`${(process.env.REACT_APP_API_URL || 'http://localhost:5000').replace('/api', '')}${vehicle.images[currentIndex]}`}
                      alt={vehicle.vehicleName}
                      className="w-full h-full object-cover transition-all duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                      }}
                    />
                    {/* Image Navigation - Only show if more than 1 image */}
                    {totalImages > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(prev => ({
                              ...prev,
                              [vehicle._id]: currentIndex > 0 ? currentIndex - 1 : totalImages - 1
                            }));
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                        >
                          <FaChevronLeft size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(prev => ({
                              ...prev,
                              [vehicle._id]: currentIndex < totalImages - 1 ? currentIndex + 1 : 0
                            }));
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                        >
                          <FaChevronRight size={14} />
                        </button>
                        {/* Image Counter */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {currentIndex + 1} / {totalImages}
                        </div>
                        {/* Image Dots */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
                          {vehicle.images.slice(0, 5).map((_, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(prev => ({
                                  ...prev,
                                  [vehicle._id]: index
                                }));
                              }}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FaBus className="text-6xl text-gray-400" />
                  </div>
                )}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  vehicle.availability ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {vehicle.availability ? 'Available' : 'Unavailable'}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-800 mb-2">{vehicle.vehicleName}</h3>
                <div className="flex items-center gap-4 mb-4 text-sm text-neutral-600">
                  <span className="flex items-center gap-1">
                    <FaBus className="text-teal-600" />
                    {vehicle.vehicleType}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaUsers className="text-teal-600" />
                    {vehicle.seatingCapacity}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaSnowflake className="text-teal-600" />
                    {vehicle.acType}
                  </span>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {vehicles.length === 0 && (
          <div className="text-center py-16">
            <FaBus className="text-6xl text-neutral-300 mx-auto mb-4" />
            <p className="text-xl text-neutral-600">No vehicles added yet</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full my-8">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-neutral-800">
                {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
              </h2>
              <button onClick={closeModal} className="text-neutral-500 hover:text-neutral-700">
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Vehicle Name *
                  </label>
                  <input
                    type="text"
                    name="vehicleName"
                    value={formData.vehicleName}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g., Luxury AC Bus"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-2">
                    Vehicle Type *
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="Bus">Bus</option>
                    <option value="Tempo Traveller">Tempo Traveller</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Seating Capacity *
                  </label>
                  <input
                    type="number"
                    name="seatingCapacity"
                    value={formData.seatingCapacity}
                    onChange={handleChange}
                    required
                    min="1"
                    className="input-field"
                    placeholder="e.g., 45"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    AC Type *
                  </label>
                  <select
                    name="acType"
                    value={formData.acType}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="AC">AC</option>
                    <option value="Non-AC">Non-AC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="input-field resize-none"
                  placeholder="Brief description of the vehicle"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Features (comma-separated)
                </label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Push-back seats, Music system, Reading lights"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Ideal For (comma-separated)
                </label>
                <input
                  type="text"
                  name="idealFor"
                  value={formData.idealFor}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Weddings, Corporate trips, Tours"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Price Per KM (₹)
                  </label>
                  <input
                    type="number"
                    name="pricePerKm"
                    value={formData.pricePerKm}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="input-field"
                    placeholder="Optional"
                  />
                </div>

                <div className="flex items-center pt-8">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={formData.availability}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label className="ml-2 text-gray-700 font-semibold">
                    Available for booking
                  </label>
                </div>
              </div>

              {/* Show existing images when editing */}
              {editingVehicle && editingVehicle.images && editingVehicle.images.length > 0 && (
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Current Images
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {editingVehicle.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${image}`}
                          alt={`Vehicle ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            if (window.confirm('Delete this image?')) {
                              try {
                                await vehicleAPI.deleteImage(editingVehicle._id, image);
                                toast.success('Image deleted successfully');
                                // Update the editing vehicle to reflect the change
                                const updatedImages = editingVehicle.images.filter((_, i) => i !== index);
                                setEditingVehicle({ ...editingVehicle, images: updatedImages });
                                fetchVehicles();
                              } catch (error) {
                                toast.error('Failed to delete image');
                              }
                            }
                          }}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Click on an image to delete it</p>
                </div>
              )}

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {editingVehicle ? 'Add More Images' : 'Upload Images'}
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="input-field"
                />
                <p className="text-sm text-gray-500 mt-1">You can upload multiple images (max 5 total)</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary"
                >
                  {loading ? 'Saving...' : editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-neutral-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleManagement;
