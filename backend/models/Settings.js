const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  contactPhone: {
    type: String,
    default: '+91-7780720178'
  },
  whatsappNumber: {
    type: String,
    default: '917780720178'
  },
  contactEmail: {
    type: String,
    default: 'info@svtravels.com'
  },
  officeAddress: {
    type: String,
    default: 'Bangalore, Karnataka, India'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Settings', settingsSchema);
