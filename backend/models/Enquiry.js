const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  pickupLocation: {
    type: String,
    required: true,
    trim: true
  },
  dropLocation: {
    type: String,
    required: true,
    trim: true
  },
  // Array of destination locations
  tourDestinations: [{
    type: String,
    trim: true
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  numberOfPassengers: {
    type: Number,
    required: true,
    min: 1
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Confirmed', 'Cancelled'],
    default: 'New'
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better query performance
enquirySchema.index({ status: 1, deleted: 1 });
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ deleted: 1, deletedAt: -1 });

// Update timestamp on modification
enquirySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure all fields are included in JSON output
enquirySchema.set('toJSON', { 
  virtuals: false,
  transform: function(doc, ret) {
    return ret;
  }
});

module.exports = mongoose.model('Enquiry', enquirySchema);
