const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  contactPhone: {
    type: String,
    default: '+91-99631 07531'
  },
  whatsappNumber: {
    type: String,
    default: '919963107531'
  },
  contactEmail: {
    type: String,
    default: 'svtravelsonline@gmail.com'
  },
  officeAddress: {
    type: String,
    default: 'Kothakotta Kurnool road vishweshwar petrol bunk beside 509381 pincode Wanaparthy district'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Settings', settingsSchema);
