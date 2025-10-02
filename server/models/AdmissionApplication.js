const mongoose = require('mongoose');

const admissionApplicationSchema = new mongoose.Schema({
  applicationNumber: {
    type: String,
    unique: true,
    required: true
  },
  studentInfo: {
    firstName: {
      type: String,
      required: [true, 'Student first name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Student last name is required'],
      trim: true
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['male', 'female', 'other']
    },
    class: {
      type: String,
      required: [true, 'Class is required']
    },
    previousSchool: String,
    medicalConditions: String
  },
  parentInfo: {
    fatherName: {
      type: String,
      required: [true, 'Father name is required'],
      trim: true
    },
    motherName: {
      type: String,
      required: [true, 'Mother name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Parent email is required'],
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Parent phone is required']
    },
    occupation: String,
    address: {
      street: {
        type: String,
        required: [true, 'Address is required']
      },
      city: {
        type: String,
        required: [true, 'City is required']
      },
      state: {
        type: String,
        required: [true, 'State is required']
      },
      zipCode: {
        type: String,
        required: [true, 'Zip code is required']
      },
      country: {
        type: String,
        default: 'India'
      }
    }
  },
  documents: [{
    name: String,
    filename: String,
    path: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'under_review', 'approved', 'rejected'],
    default: 'pending'
  },
  submissionDate: {
    type: Date,
    default: Date.now
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewDate: Date,
  remarks: String,
  assignedRollNumber: String,
  assignedClass: String,
  assignedSection: String,
  admissionDate: Date
}, {
  timestamps: true
});

// Generate application number
admissionApplicationSchema.pre('save', async function(next) {
  if (!this.applicationNumber) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments();
    this.applicationNumber = `ADM${year}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('AdmissionApplication', admissionApplicationSchema);