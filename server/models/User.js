const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false // Don't include password in queries by default
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'parent', 'teacher'],
    required: true
  },
  
  // Profile Information
  profilePicture: {
    type: String,
    default: null
  },
  dateOfBirth: {
    type: Date,
    required: function() {
      return this.role === 'student';
    }
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: function() {
      return this.role === 'student';
    }
  },
  address: {
    street: String,
    city: String,
    state: String,
    pinCode: String,
    country: { type: String, default: 'India' }
  },

  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: null
  },

  // Role-specific fields
  studentId: {
    type: String,
    unique: true,
    sparse: true,
    required: function() {
      return this.role === 'student';
    }
  },
  employeeId: {
    type: String,
    unique: true,
    sparse: true,
    required: function() {
      return this.role === 'admin' || this.role === 'teacher';
    }
  },
  
  // Parent-specific fields
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Student-specific fields
  class: {
    type: String,
    required: function() {
      return this.role === 'student';
    }
  },
  section: {
    type: String,
    required: function() {
      return this.role === 'student';
    }
  },
  rollNumber: {
    type: String,
    required: function() {
      return this.role === 'student';
    }
  },
  admissionDate: {
    type: Date,
    required: function() {
      return this.role === 'student';
    }
  },
  parents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Emergency Contact
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },

  // Reset password fields
  passwordResetToken: String,
  passwordResetExpire: Date

}, {
  timestamps: true
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ studentId: 1 });
userSchema.index({ employeeId: 1 });

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate student ID
userSchema.pre('save', function(next) {
  if (this.role === 'student' && !this.studentId) {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.studentId = `NS${year}${random}`;
  }
  
  if ((this.role === 'admin' || this.role === 'teacher') && !this.employeeId) {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const prefix = this.role === 'admin' ? 'ADM' : 'TCH';
    this.employeeId = `${prefix}${year}${random}`;
  }
  
  next();
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialised
userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpire;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);