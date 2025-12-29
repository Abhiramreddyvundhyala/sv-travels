const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Enquiry = require('../models/Enquiry');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/enquiries
// @desc    Create new enquiry
// @access  Public
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('pickupLocation').trim().notEmpty().withMessage('Starting point is required'),
  body('dropLocation').trim().notEmpty().withMessage('Ending point is required'),
  body('startDate').notEmpty().withMessage('Start date is required'),
  body('numberOfPassengers').isInt({ min: 1 }).withMessage('Valid number of passengers is required')
], async (req, res) => {
  try {
    console.log('Received enquiry data:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const enquiry = new Enquiry({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      pickupLocation: req.body.pickupLocation,
      dropLocation: req.body.dropLocation,
      tourDestinations: req.body.tourDestinations || [],
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      numberOfPassengers: req.body.numberOfPassengers,
      message: req.body.message
    });

    await enquiry.save();
    console.log('Enquiry saved successfully:', enquiry);

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! We will contact you soon.',
      enquiry
    });
  } catch (error) {
    console.error('Create enquiry error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/enquiries/stats/dashboard
// @desc    Get enquiry statistics for dashboard
// @access  Private (Admin)
router.get('/stats/dashboard', authMiddleware, async (req, res) => {
  try {
    const totalEnquiries = await Enquiry.countDocuments({ deleted: false });
    const newEnquiries = await Enquiry.countDocuments({ status: 'New', deleted: false });
    const contactedEnquiries = await Enquiry.countDocuments({ status: 'Contacted', deleted: false });
    const confirmedEnquiries = await Enquiry.countDocuments({ status: 'Confirmed', deleted: false });

    res.json({
      success: true,
      stats: {
        total: totalEnquiries,
        new: newEnquiries,
        contacted: contactedEnquiries,
        confirmed: confirmedEnquiries
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/enquiries/deleted/all
// @desc    Get all deleted enquiries
// @access  Private (Admin)
router.get('/deleted/all', authMiddleware, async (req, res) => {
  try {
    const deletedEnquiries = await Enquiry.find({ deleted: true })
      .populate('deletedBy', 'name email')
      .sort({ deletedAt: -1 })
      .lean();
    
    res.json({
      success: true,
      count: deletedEnquiries.length,
      enquiries: deletedEnquiries
    });
  } catch (error) {
    console.error('Get deleted enquiries error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/enquiries
// @desc    Get all enquiries
// @access  Private (Admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status, deleted: false } : { deleted: false };
    
    const enquiries = await Enquiry.find(filter)
      .select('+dropLocation +numberOfPassengers')
      .sort({ createdAt: -1 })
      .lean();
    
    console.log('Fetched enquiries count:', enquiries.length);
    if (enquiries.length > 0) {
      console.log('Sample enquiry data:', JSON.stringify(enquiries[0], null, 2));
      console.log('Sample enquiry dropLocation:', enquiries[0].dropLocation);
      console.log('Sample enquiry numberOfPassengers:', enquiries[0].numberOfPassengers);
    }
    
    res.json({
      success: true,
      count: enquiries.length,
      enquiries
    });
  } catch (error) {
    console.error('Get enquiries error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/enquiries/:id
// @desc    Get single enquiry
// @access  Private (Admin)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({ 
        success: false, 
        message: 'Enquiry not found' 
      });
    }

    res.json({
      success: true,
      enquiry
    });
  } catch (error) {
    console.error('Get enquiry error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/enquiries/:id
// @desc    Update enquiry status
// @access  Private (Admin)
router.put('/:id', authMiddleware, [
  body('status').isIn(['New', 'Contacted', 'Confirmed', 'Cancelled']).withMessage('Invalid status')
], async (req, res) => {
  try {
    console.log('Update enquiry request for ID:', req.params.id);
    console.log('Admin authenticated:', req.admin.email);
    console.log('New status:', req.body.status);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
      console.log('Enquiry not found');
      return res.status(404).json({ 
        success: false, 
        message: 'Enquiry not found' 
      });
    }

    enquiry.status = req.body.status;
    await enquiry.save();
    console.log('Enquiry updated successfully');

    res.json({
      success: true,
      message: 'Enquiry updated successfully',
      enquiry
    });
  } catch (error) {
    console.error('Update enquiry error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/enquiries/:id
// @desc    Soft delete enquiry (mark as deleted)
// @access  Private (Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    console.log('Delete enquiry request for ID:', req.params.id);
    console.log('Admin authenticated:', req.admin.email);
    
    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
      console.log('Enquiry not found');
      return res.status(404).json({ 
        success: false, 
        message: 'Enquiry not found' 
      });
    }

    if (enquiry.deleted) {
      return res.status(400).json({
        success: false,
        message: 'Enquiry already deleted'
      });
    }

    // Soft delete - mark as deleted
    enquiry.deleted = true;
    enquiry.deletedAt = new Date();
    enquiry.deletedBy = req.admin._id;
    await enquiry.save();
    
    console.log('Enquiry soft deleted successfully');

    res.json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    console.error('Delete enquiry error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/enquiries/:id/restore
// @desc    Restore a deleted enquiry
// @access  Private (Admin)
router.put('/:id/restore', authMiddleware, async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({ 
        success: false, 
        message: 'Enquiry not found' 
      });
    }

    if (!enquiry.deleted) {
      return res.status(400).json({
        success: false,
        message: 'Enquiry is not deleted'
      });
    }

    enquiry.deleted = false;
    enquiry.deletedAt = undefined;
    enquiry.deletedBy = undefined;
    await enquiry.save();

    res.json({
      success: true,
      message: 'Enquiry restored successfully',
      enquiry
    });
  } catch (error) {
    console.error('Restore enquiry error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/enquiries/:id/permanent
// @desc    Permanently delete an enquiry
// @access  Private (Admin)
router.delete('/:id/permanent', authMiddleware, async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({ 
        success: false, 
        message: 'Enquiry not found' 
      });
    }

    await Enquiry.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Enquiry permanently deleted'
    });
  } catch (error) {
    console.error('Permanent delete enquiry error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
