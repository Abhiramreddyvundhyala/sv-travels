import React, { useState, useEffect } from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaLock } from 'react-icons/fa';
import { settingsAPI, adminAPI } from '../../utils/api';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    contactPhone: '',
    whatsappNumber: '',
    contactEmail: '',
    officeAddress: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(true);

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
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await settingsAPI.update(settings);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      await adminAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      toast.success('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pt-24 bg-neutral-50">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-800 mb-2">Settings</h1>
          <p className="text-neutral-600">Manage your contact information and account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Settings */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-neutral-800 mb-6">Contact Information</h2>
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div>
                <label className="block text-neutral-700 font-semibold mb-2">
                  Contact Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-4 text-neutral-400" />
                  <input
                    type="text"
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleSettingsChange}
                    className="input-field pl-10"
                    placeholder="+91-99631 07531"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  WhatsApp Number
                </label>
                <div className="relative">
                  <FaWhatsapp className="absolute left-3 top-4 text-gray-400" />
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={settings.whatsappNumber}
                    onChange={handleSettingsChange}
                    className="input-field pl-10"
                    placeholder="919963107531"
                  />
                </div>
                <p className="text-sm text-neutral-500 mt-1">Enter with country code (e.g., 919963107531)</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
                  <input
                    type="email"
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleSettingsChange}
                    className="input-field pl-10"
                    placeholder="svtravelsonline@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Office Address
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-400" />
                  <textarea
                    name="officeAddress"
                    value={settings.officeAddress}
                    onChange={handleSettingsChange}
                    rows="3"
                    className="input-field pl-10 resize-none"
                    placeholder="Enter your office address"
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                Save Contact Settings
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-neutral-800 mb-6">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-4 text-gray-400" />
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    className="input-field pl-10"
                    placeholder="Enter current password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  New Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-4 text-gray-400" />
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    className="input-field pl-10"
                    placeholder="Enter new password"
                  />
                </div>
                <p className="text-sm text-neutral-500 mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-4 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    className="input-field pl-10"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                Change Password
              </button>
            </form>
          </div>
        </div>

        {/* Info Section */}
        <div className="card p-8 mt-8 bg-teal-50 border border-teal-200">
          <h3 className="text-xl font-bold text-teal-800 mb-3">Important Notes</h3>
          <ul className="space-y-2 text-teal-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Contact information will be displayed on the public website</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>WhatsApp number should include country code without + symbol (e.g., 919963107531)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Changing your password will log you out. You'll need to login again with the new password</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
