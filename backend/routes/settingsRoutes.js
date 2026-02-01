const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/settings
// @desc    Get settings
// @access  Public
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    // Create default settings if none exist
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }

    res.json({
      success: true,
      settings
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/settings
// @desc    Update settings
// @access  Private (Admin)
router.put('/', authMiddleware, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings();
    }

    // Update fields
    if (req.body.contactPhone !== undefined) settings.contactPhone = req.body.contactPhone;
    if (req.body.whatsappNumber !== undefined) settings.whatsappNumber = req.body.whatsappNumber;
    if (req.body.contactEmail !== undefined) settings.contactEmail = req.body.contactEmail;
    if (req.body.officeAddress !== undefined) settings.officeAddress = req.body.officeAddress;

    settings.updatedAt = Date.now();
    await settings.save();

    res.json({
      success: true,
      message: 'Settings updated successfully',
      settings
    });
  } catch (error) {
    console.error('Update settings error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
