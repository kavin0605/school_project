const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['admin', 'student', 'parent', 'teacher'],
    default: 'student'
  },
  profile: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    dateOfBirth: Date,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },
  // Student specific fields
  studentInfo: {
    rollNumber: {
      type: String,
      unique: true,
      sparse: true
    },
    class: String,
    section: String,
    admissionDate: {
      type: Date,
      default: Date.now
    },
    academicYear: String,
    parentEmail: String, // Link to parent account
    fatherName: String,
    motherName: String,
    guardianPhone: String
  },
  // Parent specific fields
  parentInfo: {
    children: [{
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      rollNumber: String,
      name: String
    }],
    occupation: String,
    relationship: {
      type: String,
      enum: ['father', 'mother', 'guardian'],
      default: 'father'
    }
  },
  isActive: {
    type: Boolean,
    default: true
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

// Index for efficient queries
userSchema.index({ email: 1, role: 1 });
userSchema.index({ 'studentInfo.rollNumber': 1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get user without password
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);