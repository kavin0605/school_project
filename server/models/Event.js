const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  time: {
    type: String,
    required: [true, 'Event time is required']
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['Academic', 'Sports', 'Cultural', 'Celebration', 'National', 'Competition', 'Workshop', 'Meeting', 'Other'],
    default: 'Other'
  },
  image: {
    type: String,
    default: '/images/default-event.jpg'
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  createdBy: {
    type: String,
    required: true,
    default: 'Admin'
  },
  maxParticipants: {
    type: Number,
    default: 0 // 0 means unlimited
  },
  registrationRequired: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update the updatedAt field before saving
eventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for formatted date
eventSchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual to check if event is past
eventSchema.virtual('isPast').get(function() {
  return new Date() > this.date;
});

// Virtual to check if event is today
eventSchema.virtual('isToday').get(function() {
  const today = new Date();
  const eventDate = new Date(this.date);
  return today.toDateString() === eventDate.toDateString();
});

// Virtual to check if event is upcoming
eventSchema.virtual('isUpcoming').get(function() {
  return new Date() < this.date;
});

// Ensure virtual fields are serialized
eventSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Event', eventSchema);