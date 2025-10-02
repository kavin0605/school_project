const express = require('express');
const { body, validationResult } = require('express-validator');
const Event = require('../models/Event');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { status, category, limit } = req.query;
    
    let query = {};
    
    // Filter by status if provided
    if (status) {
      query.status = status;
    }
    
    // Filter by category if provided
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Auto-update status based on current date
    const now = new Date();
    await Event.updateMany(
      { date: { $lt: now }, status: 'upcoming' },
      { status: 'completed' }
    );
    
    let eventsQuery = Event.find(query).sort({ date: 1 });
    
    // Limit results if specified
    if (limit) {
      eventsQuery = eventsQuery.limit(parseInt(limit));
    }
    
    const events = await eventsQuery;
    
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching events'
    });
  }
});

// @route   GET /api/events/upcoming
// @desc    Get upcoming events
// @access  Public
router.get('/upcoming', async (req, res) => {
  try {
    const events = await Event.find({
      date: { $gte: new Date() },
      status: { $in: ['upcoming', 'ongoing'] }
    }).sort({ date: 1 });
    
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching upcoming events'
    });
  }
});

// @route   GET /api/events/past
// @desc    Get past events
// @access  Public
router.get('/past', async (req, res) => {
  try {
    const events = await Event.find({
      $or: [
        { date: { $lt: new Date() } },
        { status: 'completed' }
      ]
    }).sort({ date: -1 }).limit(10);
    
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Error fetching past events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching past events'
    });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching event'
    });
  }
});

// @route   POST /api/events
// @desc    Create new event (Admin only)
// @access  Private
router.post('/', [
  body('title').trim().notEmpty().withMessage('Event title is required'),
  body('description').trim().notEmpty().withMessage('Event description is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').trim().notEmpty().withMessage('Event time is required'),
  body('location').trim().notEmpty().withMessage('Event location is required'),
  body('category').optional().isIn(['Academic', 'Sports', 'Cultural', 'Celebration', 'National', 'Competition', 'Workshop', 'Meeting', 'Other']).withMessage('Invalid category')
], async (req, res) => {
  try {
    console.log('📅 Creating new event:', req.body);
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Event validation failed:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const {
      title,
      description,
      date,
      time,
      location,
      category,
      image,
      maxParticipants,
      registrationRequired
    } = req.body;
    
    // Create new event
    const event = new Event({
      title,
      description,
      date: new Date(date),
      time,
      location,
      category: category || 'Other',
      image: image || '/images/default-event.jpg',
      maxParticipants: maxParticipants || 0,
      registrationRequired: registrationRequired || false,
      createdBy: 'Admin'
    });
    
    const savedEvent = await event.save();
    console.log('✅ Event created successfully:', savedEvent._id);
    
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: savedEvent
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating event'
    });
  }
});

// @route   PUT /api/events/:id
// @desc    Update event (Admin only)
// @access  Private
router.put('/:id', [
  body('title').optional().trim().notEmpty().withMessage('Event title cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Event description cannot be empty'),
  body('date').optional().isISO8601().withMessage('Valid date is required'),
  body('time').optional().trim().notEmpty().withMessage('Event time cannot be empty'),
  body('location').optional().trim().notEmpty().withMessage('Event location cannot be empty'),
  body('category').optional().isIn(['Academic', 'Sports', 'Cultural', 'Celebration', 'National', 'Competition', 'Workshop', 'Meeting', 'Other']).withMessage('Invalid category')
], async (req, res) => {
  try {
    console.log('📝 Updating event:', req.params.id);
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Update fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        if (key === 'date') {
          event[key] = new Date(req.body[key]);
        } else {
          event[key] = req.body[key];
        }
      }
    });
    
    const updatedEvent = await event.save();
    console.log('✅ Event updated successfully');
    
    res.json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating event'
    });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event (Admin only)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    console.log('🗑️ Deleting event:', req.params.id);
    
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    await Event.findByIdAndDelete(req.params.id);
    console.log('✅ Event deleted successfully');
    
    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting event'
    });
  }
});

// @route   GET /api/events/categories
// @desc    Get event categories
// @access  Public
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = ['Academic', 'Sports', 'Cultural', 'Celebration', 'National', 'Competition', 'Workshop', 'Meeting', 'Other'];
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories'
    });
  }
});

module.exports = router;