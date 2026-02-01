const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Enquiry = require('../models/Enquiry');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/enquiries
// @desc    Create new enquiry
// @access  Public
router.post('/', [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters')
    .matches(/^[a-zA-Z\s.]+$/).withMessage('Name can only contain letters'),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Invalid phone number format')
    .isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits'),
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('pickupLocation')
    .trim()
    .notEmpty().withMessage('Starting point is required')
    .isLength({ max: 200 }).withMessage('Location name too long'),
  body('dropLocation')
    .trim()
    .notEmpty().withMessage('Ending point is required')
    .isLength({ max: 200 }).withMessage('Location name too long'),
  body('startDate').notEmpty().withMessage('Start date is required'),
  body('numberOfPassengers')
    .isInt({ min: 1, max: 100 }).withMessage('Valid number of passengers is required (1-100)'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Message too long (max 1000 characters)')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! We will contact you soon.',
      enquiry
    });
  } catch (error) {
    console.error('Create enquiry error:', error.message);
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
    
    res.json({
      success: true,
      count: enquiries.length,
      enquiries
    });
  } catch (error) {
    console.error('Get enquiries error:', error.message);
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({ 
        success: false, 
        message: 'Enquiry not found' 
      });
    }

    enquiry.status = req.body.status;
    await enquiry.save();

    res.json({
      success: true,
      message: 'Enquiry updated successfully',
      enquiry
    });
  } catch (error) {
    console.error('Update enquiry error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/enquiries/:id
// @desc    Soft delete enquiry (mark as deleted)
// @access  Private (Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
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

    res.json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    console.error('Delete enquiry error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
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
