const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const createDefaultAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@svtravels.com' });
    
    if (!existingAdmin) {
      const defaultAdmin = new Admin({
        username: 'admin',
        email: 'admin@svtravels.com',
        password: 'admin123',
        role: 'admin'
      });
      
      await defaultAdmin.save();
      console.log('✅ Default admin created successfully');
      console.log('   Email: admin@svtravels.com');
      console.log('   Password: admin123');
    } else {
      console.log('✅ Admin account already exists');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
  }
};

module.exports = createDefaultAdmin;
