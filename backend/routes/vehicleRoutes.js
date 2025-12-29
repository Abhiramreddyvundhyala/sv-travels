const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Vehicle = require('../models/Vehicle');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const path = require('path');
const fs = require('fs');

// @route   GET /api/vehicles
// @desc    Get all vehicles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: vehicles.length,
      vehicles
    });
  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/vehicles/:id
// @desc    Get single vehicle
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vehicle not found' 
      });
    }

    res.json({
      success: true,
      vehicle
    });
  } catch (error) {
    console.error('Get vehicle error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/vehicles
// @desc    Create new vehicle
// @access  Private (Admin)
router.post('/', authMiddleware, upload.array('images', 5), [
  body('vehicleName').trim().notEmpty().withMessage('Vehicle name is required'),
  body('vehicleType').isIn(['Bus', 'Tempo Traveller']).withMessage('Invalid vehicle type'),
  body('seatingCapacity').isInt({ min: 1 }).withMessage('Valid seating capacity is required'),
  body('acType').isIn(['AC', 'Non-AC']).withMessage('Invalid AC type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const vehicleData = {
      vehicleName: req.body.vehicleName,
      vehicleType: req.body.vehicleType,
      seatingCapacity: req.body.seatingCapacity,
      acType: req.body.acType,
      description: req.body.description,
      pricePerKm: req.body.pricePerKm || 0,
      availability: req.body.availability !== 'false'
    };

    // Handle arrays
    if (req.body.features) {
      vehicleData.features = typeof req.body.features === 'string' 
        ? JSON.parse(req.body.features) 
        : req.body.features;
    }

    if (req.body.idealFor) {
      vehicleData.idealFor = typeof req.body.idealFor === 'string' 
        ? JSON.parse(req.body.idealFor) 
        : req.body.idealFor;
    }

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      vehicleData.images = req.files.map(file => `/uploads/vehicles/${file.filename}`);
    }

    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();

    res.status(201).json({
      success: true,
      message: 'Vehicle created successfully',
      vehicle
    });
  } catch (error) {
    console.error('Create vehicle error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/vehicles/:id
// @desc    Update vehicle
// @access  Private (Admin)
router.put('/:id', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    console.log('Update vehicle request for ID:', req.params.id);
    console.log('Admin authenticated:', req.admin.email);
    console.log('Request body:', req.body);
    
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      console.log('Vehicle not found');
      return res.status(404).json({ 
        success: false, 
        message: 'Vehicle not found' 
      });
    }

    // Update fields
    if (req.body.vehicleName) vehicle.vehicleName = req.body.vehicleName;
    if (req.body.vehicleType) vehicle.vehicleType = req.body.vehicleType;
    if (req.body.seatingCapacity) vehicle.seatingCapacity = req.body.seatingCapacity;
    if (req.body.acType) vehicle.acType = req.body.acType;
    if (req.body.description !== undefined) vehicle.description = req.body.description;
    if (req.body.pricePerKm !== undefined) vehicle.pricePerKm = req.body.pricePerKm;
    if (req.body.availability !== undefined) vehicle.availability = req.body.availability !== 'false';

    // Handle arrays
    if (req.body.features) {
      vehicle.features = typeof req.body.features === 'string' 
        ? JSON.parse(req.body.features) 
        : req.body.features;
    }

    if (req.body.idealFor) {
      vehicle.idealFor = typeof req.body.idealFor === 'string' 
        ? JSON.parse(req.body.idealFor) 
        : req.body.idealFor;
    }

    // Handle new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/vehicles/${file.filename}`);
      vehicle.images = [...vehicle.images, ...newImages];
      console.log('Added new images:', newImages);
    }

    await vehicle.save();
    console.log('Vehicle updated successfully');

    res.json({
      success: true,
      message: 'Vehicle updated successfully',
      vehicle
    });
  } catch (error) {
    console.error('Update vehicle error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/vehicles/:id// @route   DELETE /api/vehicles/:id
// @desc    Delete vehicle
// @access  Private (Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    console.log('Delete vehicle request for ID:', req.params.id);
    console.log('Admin authenticated:', req.admin.email);
    
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      console.log('Vehicle not found');
      return res.status(404).json({ 
        success: false, 
        message: 'Vehicle not found' 
      });
    }

    // Delete associated images
    if (vehicle.images && vehicle.images.length > 0) {
      vehicle.images.forEach(imagePath => {
        const fullPath = path.join(__dirname, '..', imagePath);
        if (fs.existsSync(fullPath)) {
          try {
            fs.unlinkSync(fullPath);
            console.log('Deleted image:', fullPath);
          } catch (err) {
            console.log('Error deleting image:', err.message);
          }
        }
      });
    }

    await Vehicle.findByIdAndDelete(req.params.id);
    console.log('Vehicle deleted successfully');

    res.json({
      success: true,
      message: 'Vehicle deleted successfully'
    });
  } catch (error) {
    console.error('Delete vehicle error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/vehicles/:id/images
// @desc    Delete specific vehicle image
// @access  Private (Admin)
router.delete('/:id/images', authMiddleware, async (req, res) => {
  try {
    const { imagePath } = req.body;
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vehicle not found' 
      });
    }

    // Remove image from array
    vehicle.images = vehicle.images.filter(img => img !== imagePath);
    
    // Delete physical file
    const fullPath = path.join(__dirname, '..', imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    await vehicle.save();

    res.json({
      success: true,
      message: 'Image deleted successfully',
      vehicle
    });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
