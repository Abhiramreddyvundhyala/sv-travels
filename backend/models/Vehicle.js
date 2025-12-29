const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleName: {
    type: String,
    required: true,
    trim: true
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ['Bus', 'Tempo Traveller'],
    default: 'Bus'
  },
  seatingCapacity: {
    type: Number,
    required: true,
    min: 1
  },
  acType: {
    type: String,
    required: true,
    enum: ['AC', 'Non-AC'],
    default: 'AC'
  },
  features: [{
    type: String,
    trim: true
  }],
  idealFor: [{
    type: String,
    trim: true
  }],
  availability: {
    type: Boolean,
    default: true
  },
  images: [{
    type: String
  }],
  description: {
    type: String,
    trim: true
  },
  pricePerKm: {
    type: Number,
    default: 0
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

// Update timestamp on modification
vehicleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
