const express = require('express');
const { protect, studentOnly } = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// All routes in this file are protected and require student role
router.use(protect);
router.use(studentOnly);

// @route   GET /api/students/dashboard
// @desc    Get student dashboard data
// @access  Private (Student only)
router.get('/dashboard', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Student dashboard data',
      data: {
        student: req.user,
        // Add dashboard-specific data here
        announcements: [],
        upcomingEvents: [],
        attendance: {
          totalDays: 100,
          presentDays: 85,
          percentage: 85
        },
        grades: {
          subjects: [
            { name: 'Mathematics', grade: 'A', marks: 95 },
            { name: 'Science', grade: 'B+', marks: 88 },
            { name: 'English', grade: 'A-', marks: 91 }
          ]
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching dashboard data'
    });
  }
});

// @route   GET /api/students/profile
// @desc    Get student profile
// @access  Private (Student only)
router.get('/profile', async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        student: req.user
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching profile'
    });
  }
});

// @route   PUT /api/students/profile
// @desc    Update student profile
// @access  Private (Student only)
router.put('/profile', async (req, res) => {
  try {
    const { phone, address, emergencyContact } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { phone, address, emergencyContact },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        student: updatedUser
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating profile'
    });
  }
});

module.exports = router;