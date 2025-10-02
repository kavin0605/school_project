const express = require('express');
const { protect, parentOnly } = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// All routes in this file are protected and require parent role
router.use(protect);
router.use(parentOnly);

// @route   GET /api/parents/dashboard
// @desc    Get parent dashboard data
// @access  Private (Parent only)
router.get('/dashboard', async (req, res) => {
  try {
    // Get children information
    const children = await User.find({
      _id: { $in: req.user.children },
      isActive: true
    }).select('-password');

    res.json({
      success: true,
      message: 'Parent dashboard data',
      data: {
        parent: req.user,
        children: children.map(child => ({
          id: child._id,
          name: child.fullName,
          class: child.class,
          section: child.section,
          rollNumber: child.rollNumber,
          studentId: child.studentId,
          // Mock data for demonstration
          attendance: {
            percentage: 88,
            presentDays: 88,
            totalDays: 100
          },
          recentGrades: [
            { subject: 'Mathematics', grade: 'A', marks: 95 },
            { subject: 'Science', grade: 'B+', marks: 88 }
          ],
          upcomingEvents: [
            { title: 'Parent-Teacher Meeting', date: '2025-10-15' },
            { title: 'Annual Sports Day', date: '2025-10-20' }
          ]
        })),
        notifications: [
          {
            title: 'Fee Reminder',
            message: 'Monthly fee payment is due on 10th October',
            type: 'warning',
            date: new Date()
          }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching dashboard data'
    });
  }
});

// @route   GET /api/parents/children
// @desc    Get all children of the parent
// @access  Private (Parent only)
router.get('/children', async (req, res) => {
  try {
    const children = await User.find({
      _id: { $in: req.user.children },
      isActive: true
    }).select('-password');

    res.json({
      success: true,
      data: { children }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching children data'
    });
  }
});

// @route   GET /api/parents/children/:childId/attendance
// @desc    Get attendance data for a specific child
// @access  Private (Parent only)
router.get('/children/:childId/attendance', async (req, res) => {
  try {
    const { childId } = req.params;
    
    // Verify the child belongs to this parent
    if (!req.user.children.includes(childId)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Mock attendance data - replace with actual attendance model
    const attendanceData = {
      totalDays: 100,
      presentDays: 88,
      absentDays: 12,
      percentage: 88,
      monthlyData: [
        { month: 'September', present: 20, absent: 2, total: 22 },
        { month: 'August', present: 23, absent: 1, total: 24 }
      ]
    };

    res.json({
      success: true,
      data: { attendance: attendanceData }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching attendance data'
    });
  }
});

// @route   GET /api/parents/children/:childId/grades
// @desc    Get grades data for a specific child
// @access  Private (Parent only)
router.get('/children/:childId/grades', async (req, res) => {
  try {
    const { childId } = req.params;
    
    // Verify the child belongs to this parent
    if (!req.user.children.includes(childId)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Mock grades data - replace with actual grades model
    const gradesData = {
      currentTerm: 'Term 1 - 2025',
      subjects: [
        {
          name: 'Mathematics',
          teacher: 'Mr. Sharma',
          grades: [
            { type: 'Unit Test 1', marks: 95, maxMarks: 100, grade: 'A' },
            { type: 'Assignment 1', marks: 18, maxMarks: 20, grade: 'A' }
          ],
          average: 94.5
        },
        {
          name: 'Science',
          teacher: 'Ms. Patel',
          grades: [
            { type: 'Unit Test 1', marks: 88, maxMarks: 100, grade: 'B+' },
            { type: 'Lab Report', marks: 16, maxMarks: 20, grade: 'A-' }
          ],
          average: 87
        }
      ]
    };

    res.json({
      success: true,
      data: { grades: gradesData }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching grades data'
    });
  }
});

module.exports = router;