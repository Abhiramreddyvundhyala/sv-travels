const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();

// Security Middleware - Helmet (set security headers)
app.use(helmet({
  contentSecurityPolicy: false, // Disable in development, enable in production with proper config
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
}));

// Data Sanitization against NoSQL Injection
app.use(mongoSanitize());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Rate Limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window per IP
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 login attempts
  skipSuccessfulRequests: true,
  message: { success: false, message: 'Too many login attempts. Please try again in 15 minutes.' }
});

const enquiryLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 enquiries per minute
  message: { success: false, message: 'Too many enquiries submitted. Please wait a moment.' }
});

// Apply general rate limiting to all API routes
app.use('/api/', generalLimiter);

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://abhiramreddyvundhyala.github.io',
  'https://svtravels.online',
  'https://www.svtravels.online',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // In production, only allow specific origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else if (!origin && process.env.NODE_ENV === 'development') {
      // Allow no origin only in development (for Postman, etc.)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Limit request body size
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import and create default admin
const createDefaultAdmin = require('./config/createDefaultAdmin');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sv-travels')
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    // Create default admin account
    createDefaultAdmin();
  })
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/admin/login', loginLimiter);
app.use('/api/admin', adminRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/enquiries', enquiryLimiter, enquiryRoutes);
app.use('/api/settings', settingsRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SV Travels API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Internal Server Error' 
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

function gracefulShutdown() {
  console.log('\n⚠️  SIGTERM/SIGINT received, closing server gracefully...');
  server.close(() => {
    console.log('✅ HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB connection closed');
      process.exit(0);
    });
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error('❌ Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
}
