const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const updateAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Delete old admin if exists
    await Admin.deleteMany({});
    console.log('✅ Cleared existing admin accounts');

    // Create new admin with email as login
    const admin = new Admin({
      username: 'admin',
      email: 'svtravelsonline@gmail.com',
      password: 'admin123',
      role: 'admin'
    });

    await admin.save();
    console.log('✅ New admin created successfully');
    console.log('   Email: svtravelsonline@gmail.com');
    console.log('   Password: admin123');
    
    mongoose.connection.close();
    console.log('✅ Done!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

updateAdmin();
