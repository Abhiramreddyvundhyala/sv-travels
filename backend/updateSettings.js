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
      contactPhone: '+91-7780720178',
      whatsappNumber: '917780720178',
      contactEmail: 'info@svtravels.com',
      officeAddress: 'Bangalore, Karnataka, India'
    });

    console.log('✅ Settings updated successfully');
    console.log('   Phone: +91-7780720178');
    console.log('   WhatsApp: 917780720178');
    console.log('✅ Done!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

updateSettings();
