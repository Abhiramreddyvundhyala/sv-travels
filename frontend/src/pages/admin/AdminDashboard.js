import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaEnvelope, FaCheckCircle, FaClock, FaTimes, FaChartLine } from 'react-icons/fa';
import { vehicleAPI, enquiryAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    availableVehicles: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    contactedEnquiries: 0,
    confirmedEnquiries: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [vehiclesRes, enquiriesRes, statsRes] = await Promise.all([
        vehicleAPI.getAll(),
        enquiryAPI.getAll(),
        enquiryAPI.getStats()
      ]);

      if (vehiclesRes.data.success) {
        const vehicles = vehiclesRes.data.vehicles;
        setStats(prev => ({
          ...prev,
          totalVehicles: vehicles.length,
          availableVehicles: vehicles.filter(v => v.availability).length
        }));
      }

      if (enquiriesRes.data.success) {
        console.log('Dashboard - All enquiries:', enquiriesRes.data.enquiries);
        const recent = enquiriesRes.data.enquiries.slice(0, 5);
        console.log('Dashboard - Recent 5 enquiries:', recent);
        setRecentEnquiries(recent);
      }

      if (statsRes.data.success) {
        setStats(prev => ({
          ...prev,
          totalEnquiries: statsRes.data.stats.total,
          newEnquiries: statsRes.data.stats.new,
          contactedEnquiries: statsRes.data.stats.contacted,
          confirmedEnquiries: statsRes.data.stats.confirmed
        }));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

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
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pt-24 bg-neutral-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-800 mb-2">Admin Dashboard</h1>
          <p className="text-neutral-600">Welcome back! Here's an overview of your business.</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Vehicles</h3>
              <FaBus className="text-3xl opacity-80" />
            </div>
            <p className="text-4xl font-bold">{stats.totalVehicles}</p>
            <p className="text-teal-100 text-sm mt-2">
              {stats.availableVehicles} Available
            </p>
          </div>

          <div className="card p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Enquiries</h3>
              <FaEnvelope className="text-3xl opacity-80" />
            </div>
            <p className="text-4xl font-bold">{stats.totalEnquiries}</p>
            <p className="text-amber-100 text-sm mt-2">All time</p>
          </div>

          <div className="card p-6 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">New Enquiries</h3>
              <FaClock className="text-3xl opacity-80" />
            </div>
            <p className="text-4xl font-bold">{stats.newEnquiries}</p>
            <p className="text-teal-100 text-sm mt-2">Pending action</p>
          </div>

          <div className="card p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Confirmed</h3>
              <FaCheckCircle className="text-3xl opacity-80" />
            </div>
            <p className="text-4xl font-bold">{stats.confirmedEnquiries}</p>
            <p className="text-amber-100 text-sm mt-2">Bookings confirmed</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              to="/admin/vehicles"
              className="bg-teal-600 text-white p-4 rounded-lg text-center font-semibold hover:bg-teal-700 transition-colors"
            >
              Manage Vehicles
            </Link>
            <Link
              to="/admin/enquiries"
              className="bg-amber-600 text-white p-4 rounded-lg text-center font-semibold hover:bg-amber-700 transition-colors"
            >
              View Enquiries
            </Link>
            <Link
              to="/admin/settings"
              className="bg-teal-600 text-white p-4 rounded-lg text-center font-semibold hover:bg-teal-700 transition-colors"
            >
              Settings
            </Link>
            <Link
              to="/"
              className="bg-neutral-600 text-white p-4 rounded-lg text-center font-semibold hover:bg-neutral-700 transition-colors"
            >
              View Website
            </Link>
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-800">Recent Enquiries</h2>
            <Link
              to="/admin/enquiries"
              className="text-teal-600 hover:text-teal-700 font-semibold"
            >
              View All →
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <p className="text-neutral-500 text-center py-8">No enquiries yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b">
                  <tr>
                    <th className="text-left p-3 font-semibold text-neutral-700">Name</th>
                    <th className="text-left p-3 font-semibold text-neutral-700">Phone</th>
                    <th className="text-left p-3 font-semibold text-neutral-700">Route</th>
                    <th className="text-left p-3 font-semibold text-neutral-700">Start Date</th>
                    <th className="text-left p-3 font-semibold text-neutral-700">Passengers</th>
                    <th className="text-left p-3 font-semibold text-neutral-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="border-b hover:bg-neutral-50">
                      <td className="p-3 text-neutral-800">{enquiry.name}</td>
                      <td className="p-3 text-neutral-600">{enquiry.phone}</td>
                      <td className="p-3 text-neutral-600 text-sm">
                        {enquiry.pickupLocation} → {enquiry.dropLocation}
                      </td>
                      <td className="p-3 text-neutral-600">{formatDate(enquiry.startDate)}</td>
                      <td className="p-3 text-neutral-600">{enquiry.numberOfPassengers}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(enquiry.status)}`}>
                          {enquiry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
