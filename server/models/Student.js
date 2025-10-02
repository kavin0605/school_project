const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Student Schema
const studentSchema = new mongoose.Schema({
  admissionNumber: {
    type: String,
    unique: true,
    required: true
  },
  rollNumber: {
    type: String,
    unique: true,
    required: true
  },
  personalInfo: {
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
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: 'India'
      }
    }
  },
  academicInfo: {
    class: {
      type: String,
      required: [true, 'Class is required']
    },
    section: String,
    academicYear: {
      type: String,
      default: () => {
        const currentYear = new Date().getFullYear();
        return `${currentYear}-${currentYear + 1}`;
      }
    },
    admissionDate: {
      type: Date,
      default: Date.now
    },
    previousSchool: String,
    medicalConditions: String
  },
  loginCredentials: {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6
    },
    lastLogin: Date,
    isActive: {
      type: Boolean,
      default: true
    }
  },
  parentInfo: {
    fatherName: String,
    motherName: String,
    parentEmail: String,
    parentPhone: String,
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parent'
    }
  },
  fees: {
    totalFees: Number,
    paidFees: Number,
    pendingFees: Number,
    paymentHistory: [{
      amount: Number,
      date: Date,
      method: String,
      receiptNumber: String
    }]
  },
  attendance: {
    totalDays: {
      type: Number,
      default: 0
    },
    presentDays: {
      type: Number,
      default: 0
    },
    attendancePercentage: {
      type: Number,
      default: 0
    },
    records: [{
      date: {
        type: Date,
        required: true
      },
      status: {
        type: String,
        enum: ['present', 'absent', 'late', 'half-day'],
        required: true
      },
      remarks: String
    }]
  },
  marks: {
    subjects: [{
      name: String,
      code: String,
      teacher: String,
      exams: [{
        examType: {
          type: String,
          enum: ['unit-test', 'mid-term', 'final', 'assignment', 'project']
        },
        marks: Number,
        totalMarks: Number,
        grade: String,
        date: Date,
        remarks: String
      }],
      overallGrade: String,
      totalMarks: Number,
      obtainedMarks: Number
    }],
    overallPercentage: Number,
    overallGrade: String,
    rank: Number
  },
  timetable: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    },
    periods: [{
      periodNumber: Number,
      subject: String,
      teacher: String,
      room: String,
      startTime: String,
      endTime: String
    }]
  }],
  teachers: [{
    name: String,
    subject: String,
    phone: String,
    email: String,
    isClassTeacher: {
      type: Boolean,
      default: false
    }
  }],
  assignments: [{
    title: String,
    subject: String,
    description: String,
    dueDate: Date,
    status: {
      type: String,
      enum: ['pending', 'submitted', 'late', 'evaluated'],
      default: 'pending'
    },
    submittedDate: Date,
    marks: Number,
    totalMarks: Number,
    feedback: String,
    teacher: String
  }],
  parentMeetings: [{
    date: Date,
    time: String,
    purpose: String,
    teacher: String,
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    notes: String,
    attendedBy: String
  }],
  transport: {
    busNumber: String,
    route: String,
    stopName: String,
    pickupTime: String,
    dropTime: String,
    driverName: String,
    driverPhone: String,
    feeStatus: {
      type: String,
      enum: ['paid', 'pending', 'overdue'],
      default: 'pending'
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated', 'transferred'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Hash password before saving
studentSchema.pre('save', async function(next) {
  if (!this.isModified('loginCredentials.password')) return next();
  
  this.loginCredentials.password = await bcrypt.hash(this.loginCredentials.password, 12);
  next();
});

// Generate admission number
studentSchema.pre('save', async function(next) {
  if (!this.admissionNumber) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments();
    this.admissionNumber = `ADM${year}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Compare password method
studentSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.loginCredentials.password);
};

module.exports = mongoose.model('Student', studentSchema);