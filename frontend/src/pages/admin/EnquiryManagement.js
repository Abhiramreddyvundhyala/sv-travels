import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaUsers, FaTrash, FaEye, FaTrashRestore, FaHistory } from 'react-icons/fa';
import { enquiryAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const EnquiryManagement = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [deletedEnquiries, setDeletedEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [viewMode, setViewMode] = useState('active'); // 'active' or 'deleted'

  useEffect(() => {
    fetchEnquiries();
    fetchDeletedEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await enquiryAPI.getAll();
      console.log('Enquiries response:', response.data);
      if (response.data.success) {
        console.log('Enquiries data:', response.data.enquiries);
        if (response.data.enquiries.length > 0) {
          console.log('Sample enquiry:', response.data.enquiries[0]);
        }
        setEnquiries(response.data.enquiries);
      }
    } catch (error) {
      console.error('Fetch enquiries error:', error);
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  const fetchDeletedEnquiries = async () => {
    try {
      const response = await enquiryAPI.getDeleted();
      if (response.data.success) {
        setDeletedEnquiries(response.data.enquiries);
      }
    } catch (error) {
      console.error('Fetch deleted enquiries error:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      console.log('Updating enquiry status:', { id, newStatus });
      const response = await enquiryAPI.update(id, { status: newStatus });
      console.log('Status update response:', response.data);
      toast.success('Status updated successfully');
      fetchEnquiries();
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
    } catch (error) {
      console.error('Status update error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry? You can restore it later.')) {
      try {
        console.log('Deleting enquiry:', id);
        const response = await enquiryAPI.delete(id);
        console.log('Delete response:', response.data);
        toast.success('Enquiry moved to deleted');
        fetchEnquiries();
        fetchDeletedEnquiries();
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry(null);
        }
      } catch (error) {
        console.error('Delete enquiry error:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || 'Failed to delete enquiry');
      }
    }
  };

  const handleRestore = async (id) => {
    if (window.confirm('Are you sure you want to restore this enquiry?')) {
      try {
        const response = await enquiryAPI.restore(id);
        toast.success('Enquiry restored successfully');
        fetchEnquiries();
        fetchDeletedEnquiries();
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry(null);
        }
      } catch (error) {
        console.error('Restore enquiry error:', error);
        toast.error('Failed to restore enquiry');
      }
    }
  };

  const handlePermanentDelete = async (id) => {
    if (window.confirm('Are you sure you want to PERMANENTLY delete this enquiry? This action cannot be undone!')) {
      try {
        const response = await enquiryAPI.permanentDelete(id);
        toast.success('Enquiry permanently deleted');
        fetchDeletedEnquiries();
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry(null);
        }
      } catch (error) {
        console.error('Permanent delete error:', error);
        toast.error('Failed to permanently delete enquiry');
      }
    }
  };

  const filteredEnquiries = filter === 'All' 
    ? enquiries 
    : enquiries.filter(e => e.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-700';
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-700';
      case 'Confirmed':
        return 'bg-green-100 text-green-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const formatDateTime = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pt-24 bg-neutral-50">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-800 mb-2">Enquiry Management</h1>
          <p className="text-neutral-600">Manage and track customer enquiries</p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setViewMode('active')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              viewMode === 'active'
                ? 'bg-teal-600 text-white shadow-lg'
                : 'bg-white text-neutral-700 hover:bg-neutral-100 shadow'
            }`}
          >
            <FaEnvelope />
            Active Enquiries ({enquiries.length})
          </button>
          <button
            onClick={() => setViewMode('deleted')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              viewMode === 'deleted'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white text-neutral-700 hover:bg-neutral-100 shadow'
            }`}
          >
            <FaHistory />
            Deleted Enquiries ({deletedEnquiries.length})
          </button>
        </div>

        {/* Filter Tabs - Only show for active enquiries */}
        {viewMode === 'active' && (
          <div className="flex flex-wrap gap-4 mb-8">
            {['All', 'New', 'Contacted', 'Confirmed', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  filter === status
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 shadow'
                }`}
              >
                {status} ({enquiries.filter(e => status === 'All' || e.status === status).length})
              </button>
            ))}
          </div>
        )}

        {/* Enquiries Table */}
        <div className="card overflow-hidden">
          {viewMode === 'active' ? (
            // Active Enquiries Table
            filteredEnquiries.length === 0 ? (
              <div className="text-center py-16">
                <FaEnvelope className="text-6xl text-neutral-300 mx-auto mb-4" />
                <p className="text-xl text-neutral-600">No enquiries found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold text-neutral-700">Customer</th>
                      <th className="text-left p-4 font-semibold text-neutral-700">Contact</th>
                      <th className="text-left p-4 font-semibold text-neutral-700">Journey</th>
                      <th className="text-left p-4 font-semibold text-neutral-700">Start Date</th>
                      <th className="text-left p-4 font-semibold text-neutral-700">Passengers</th>
                      <th className="text-left p-4 font-semibold text-neutral-700">Status</th>
                      <th className="text-left p-4 font-semibold text-neutral-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnquiries.map((enquiry) => (
                      <tr key={enquiry._id} className="border-b hover:bg-neutral-50">
                        <td className="p-4">
                          <div className="font-semibold text-neutral-800">{enquiry.name}</div>
                          <div className="text-sm text-neutral-500">{formatDateTime(enquiry.createdAt)}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-neutral-700 mb-1">
                            <FaPhone className="text-teal-600 text-xs" />
                            <a href={`tel:${enquiry.phone}`} className="hover:text-teal-600">
                              {enquiry.phone}
                            </a>
                          </div>
                          {enquiry.email && (
                            <div className="flex items-center gap-2 text-neutral-700 text-sm">
                              <FaEnvelope className="text-teal-600 text-xs" />
                              <a href={`mailto:${enquiry.email}`} className="hover:text-teal-600">
                                {enquiry.email}
                              </a>
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-sm">
                          <div className="text-neutral-700">{enquiry.pickupLocation}</div>
                          <div className="text-neutral-500">↓</div>
                          <div className="text-neutral-700">{enquiry.dropLocation}</div>
                        </td>
                        <td className="p-4 text-neutral-700">{formatDate(enquiry.startDate)}</td>
                        <td className="p-4 text-neutral-700">{enquiry.numberOfPassengers}</td>
                        <td className="p-4">
                          <select
                            value={enquiry.status}
                            onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(enquiry.status)} cursor-pointer border-none`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedEnquiry(enquiry)}
                              className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition-colors"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => handleDelete(enquiry._id)}
                              className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            // Deleted Enquiries Table
            deletedEnquiries.length === 0 ? (
              <div className="text-center py-16">
                <FaTrash className="text-6xl text-neutral-300 mx-auto mb-4" />
                <p className="text-xl text-neutral-600">No deleted enquiries</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold text-neutral-700">Customer</th>
                      <th className="text-left p-4 font-semibold text-neutral-700">Contact</th>
                      <th className="text-left p-4 font-semibold text-neutral-700">Journey</th>
                      <th className="text-left p-4 font-semibold text-neutral-700">Deleted At</th>
                      <th className="text-left p-4 font-semibold text-neutral-700">Deleted By</th>
                      <th className="text-left p-4 font-semibold text-neutral-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deletedEnquiries.map((enquiry) => (
                      <tr key={enquiry._id} className="border-b hover:bg-neutral-50">
                        <td className="p-4">
                          <div className="font-semibold text-neutral-800">{enquiry.name}</div>
                          <div className="text-sm text-neutral-500">Created: {formatDateTime(enquiry.createdAt)}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-neutral-700 mb-1">
                            <FaPhone className="text-teal-600 text-xs" />
                            <a href={`tel:${enquiry.phone}`} className="hover:text-teal-600">
                              {enquiry.phone}
                            </a>
                          </div>
                          {enquiry.email && (
                            <div className="flex items-center gap-2 text-neutral-700 text-sm">
                              <FaEnvelope className="text-teal-600 text-xs" />
                              <a href={`mailto:${enquiry.email}`} className="hover:text-teal-600">
                                {enquiry.email}
                              </a>
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-sm">
                          <div className="text-neutral-700">{enquiry.pickupLocation}</div>
                          <div className="text-neutral-500">↓</div>
                          <div className="text-neutral-700">{enquiry.dropLocation}</div>
                        </td>
                        <td className="p-4 text-neutral-700">{formatDateTime(enquiry.deletedAt)}</td>
                        <td className="p-4 text-neutral-700">
                          {enquiry.deletedBy ? enquiry.deletedBy.name || enquiry.deletedBy.email : 'Unknown'}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedEnquiry(enquiry)}
                              className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition-colors"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => handleRestore(enquiry._id)}
                              className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
                              title="Restore"
                            >
                              <FaTrashRestore />
                            </button>
                            <button
                              onClick={() => handlePermanentDelete(enquiry._id)}
                              className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                              title="Permanently Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-neutral-800">Enquiry Details</h2>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-neutral-500 hover:text-neutral-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-600 text-sm font-semibold mb-1">Customer Name</label>
                  <p className="text-neutral-800 font-medium">{selectedEnquiry.name}</p>
                </div>

                <div>
                  <label className="block text-neutral-600 text-sm font-semibold mb-1">Phone Number</label>
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-teal-600 hover:underline font-medium">
                    {selectedEnquiry.phone}
                  </a>
                </div>

                {selectedEnquiry.email && (
                  <div>
                    <label className="block text-gray-600 text-sm font-semibold mb-1">Email</label>
                    <a href={`mailto:${selectedEnquiry.email}`} className="text-blue-600 hover:underline">
                      {selectedEnquiry.email}
                    </a>
                  </div>
                )}

                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">
                    Number of Passengers
                  </label>
                  <p className="text-gray-800 font-medium">{selectedEnquiry.numberOfPassengers}</p>
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">
                    Starting Point
                  </label>
                  <p className="text-gray-800">{selectedEnquiry.pickupLocation}</p>
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">
                    Ending Point
                  </label>
                  <p className="text-gray-800">{selectedEnquiry.dropLocation}</p>
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">
                    Start Date
                  </label>
                  <p className="text-gray-800 font-medium">{formatDate(selectedEnquiry.startDate)}</p>
                </div>

                {selectedEnquiry.endDate && (
                  <div>
                    <label className="block text-gray-600 text-sm font-semibold mb-1">
                      End Date
                    </label>
                    <p className="text-gray-800 font-medium">{formatDate(selectedEnquiry.endDate)}</p>
                  </div>
                )}

                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">Enquiry Date</label>
                  <p className="text-gray-800">{formatDateTime(selectedEnquiry.createdAt)}</p>
                </div>

                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedEnquiry.status)}`}>
                    {selectedEnquiry.status}
                  </span>
                </div>
              </div>

              {/* Tour Destinations Section */}
              {selectedEnquiry.tourDestinations && selectedEnquiry.tourDestinations.length > 0 && (
                <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4">
                  <h3 className="font-bold text-neutral-800 mb-3">Tour Destinations - {selectedEnquiry.tourDestinations.length} Stops</h3>
                  <div className="space-y-2">
                    {selectedEnquiry.tourDestinations.map((destination, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-3">
                        <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <p className="font-semibold text-neutral-800">{destination}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedEnquiry.message && (
                <div>
                  <label className="block text-gray-600 text-sm font-semibold mb-1">Message</label>
                  <p className="text-gray-800 bg-gray-50 p-4 rounded-lg">{selectedEnquiry.message}</p>
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t">
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="flex-1 bg-neutral-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-600 transition-colors"
                >
                  Close
                </button>
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
                >
                  WhatsApp Customer
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryManagement;
