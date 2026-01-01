require('dotenv').config();
const mongoose = require('mongoose');
const Settings = require('./models/Settings');

const updateSettings = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Delete existing settings
    await Settings.deleteMany({});
    console.log('✅ Cleared existing settings');

    // Create new settings with correct phone number
    await Settings.create({
      contactPhone: '+91-99631 07531',
      whatsappNumber: '919963107531',
      contactEmail: 'svtravelsonline@gmail.com',
      officeAddress: 'Kothakotta Kurnool road vishweshwar petrol bunk beside 509381 pincode Wanaparthy district'
    });

    console.log('✅ Settings updated successfully');
    console.log('   Phone: +91-99631 07531');
    console.log('   WhatsApp: 919963107531');
    console.log('✅ Done!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

updateSettings();
