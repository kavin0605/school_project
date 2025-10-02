const express = require('express');
const { body, validationResult } = require('express-validator');
const AdmissionApplication = require('../models/AdmissionApplication');
const Student = require('../models/Student');
const Parent = require('../models/Parent');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/documents/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images, PDFs, and Word documents are allowed'));
    }
  }
});

// Configure email transporter
const createEmailTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send notification email
const sendAdmissionNotification = async (applicationData) => {
  try {
    const transporter = createEmailTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'nalandaschool1985@gmail.com',
      subject: `New Admission Application - ${applicationData.applicationNumber}`,
      html: `
        <h2>New Admission Application Received</h2>
        <p><strong>Application Number:</strong> ${applicationData.applicationNumber}</p>
        <p><strong>Student Name:</strong> ${applicationData.studentInfo.firstName} ${applicationData.studentInfo.lastName}</p>
        <p><strong>Class:</strong> ${applicationData.studentInfo.class}</p>
        <p><strong>Date of Birth:</strong> ${new Date(applicationData.studentInfo.dateOfBirth).toLocaleDateString()}</p>
        
        <h3>Parent Information</h3>
        <p><strong>Father:</strong> ${applicationData.parentInfo.fatherName}</p>
        <p><strong>Mother:</strong> ${applicationData.parentInfo.motherName}</p>
        <p><strong>Email:</strong> ${applicationData.parentInfo.email}</p>
        <p><strong>Phone:</strong> ${applicationData.parentInfo.phone}</p>
        
        <h3>Address</h3>
        <p>${applicationData.parentInfo.address.street}, ${applicationData.parentInfo.address.city}</p>
        <p>${applicationData.parentInfo.address.state} - ${applicationData.parentInfo.address.zipCode}</p>
        
        <p><strong>Submitted on:</strong> ${new Date(applicationData.submissionDate).toLocaleString()}</p>
        
        <p>Please log in to the admin portal to review this application.</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Admission notification email sent successfully');
  } catch (error) {
    console.error('Error sending admission notification:', error);
  }
};

// @route   POST /api/admission/apply
// @desc    Submit admission application
// @access  Public
router.post('/apply', [
  body('studentFirstName').trim().notEmpty().withMessage('Student first name is required'),
  body('studentLastName').trim().notEmpty().withMessage('Student last name is required'),
  body('dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Valid gender is required'),
  body('class').trim().notEmpty().withMessage('Class is required'),
  body('fatherName').trim().notEmpty().withMessage('Father name is required'),
  body('motherName').trim().notEmpty().withMessage('Mother name is required'),
  body('parentEmail').isEmail().withMessage('Valid parent email is required'),
  body('parentPhone').trim().notEmpty().withMessage('Parent phone is required'),
  body('address.street').trim().notEmpty().withMessage('Address is required'),
  body('address.city').trim().notEmpty().withMessage('City is required'),
  body('address.state').trim().notEmpty().withMessage('State is required'),
  body('address.zipCode').trim().notEmpty().withMessage('Zip code is required')
], async (req, res) => {
  try {
    console.log('📝 Admission application request received:', req.body);
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Admission validation failed:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    console.log('✅ Admission validation passed, processing application...');

    const {
      studentFirstName,
      studentLastName,
      dateOfBirth,
      gender,
      class: studentClass,
      previousSchool,
      medicalConditions,
      fatherName,
      motherName,
      parentEmail,
      parentPhone,
      occupation,
      address
    } = req.body;

    // Generate unique application number
    const year = new Date().getFullYear();
    const count = await AdmissionApplication.countDocuments();
    const applicationNumber = `ADM${year}${String(count + 1).padStart(4, '0')}`;
    
    console.log('🔢 Generated application number:', applicationNumber);

    // Create admission application
    const application = new AdmissionApplication({
      applicationNumber,
      studentInfo: {
        firstName: studentFirstName,
        lastName: studentLastName,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        class: studentClass,
        previousSchool,
        medicalConditions
      },
      parentInfo: {
        fatherName,
        motherName,
        email: parentEmail.toLowerCase(),
        phone: parentPhone,
        occupation,
        address
      }
    });

    console.log('💾 Saving admission application to database...');
    await application.save();
    console.log('✅ Admission application saved successfully:', application._id);

    // Send email notification (optional - won't fail if email not configured)
    try {
      await sendAdmissionNotification(application);
    } catch (emailError) {
      console.log('Email notification failed (this is optional):', emailError.message);
    }

    console.log('📨 Sending success response to client...');
    res.status(201).json({
      success: true,
      message: 'Admission application submitted successfully',
      data: {
        applicationNumber: application.applicationNumber,
        status: application.status
      }
    });

  } catch (error) {
    console.error('Admission application error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting admission application'
    });
  }
});

// @route   GET /api/admission/applications
// @desc    Get all admission applications (Admin only)
// @access  Private
router.get('/applications', async (req, res) => {
  try {
    const applications = await AdmissionApplication.find()
      .sort({ submissionDate: -1 })
      .populate('reviewedBy', 'profile.firstName profile.lastName');

    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching admission applications'
    });
  }
});

// @route   POST /api/admission/approve/:id
// @desc    Approve admission and create student/parent accounts
// @access  Private (Admin only)
router.post('/approve/:id', [
  body('rollNumber').trim().notEmpty().withMessage('Roll number is required'),
  body('class').trim().notEmpty().withMessage('Class is required'),
  body('section').trim().notEmpty().withMessage('Section is required'),
  body('studentPassword').isLength({ min: 6 }).withMessage('Student password must be at least 6 characters'),
  body('parentPassword').isLength({ min: 6 }).withMessage('Parent password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { rollNumber, class: studentClass, section, studentPassword, parentPassword } = req.body;

    // Find the application
    const application = await AdmissionApplication.findById(id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if roll number already exists
    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Roll number already exists'
      });
    }

    // Create student account in Student collection
    const student = new Student({
      rollNumber,
      personalInfo: {
        firstName: application.studentInfo.firstName,
        lastName: application.studentInfo.lastName,
        email: `${rollNumber}@nalandaschool.edu`,
        dateOfBirth: application.studentInfo.dateOfBirth,
        address: application.parentInfo.address
      },
      academicInfo: {
        class: studentClass,
        section,
        academicYear: '2024-25'
      },
      loginCredentials: {
        password: studentPassword
      },
      parentInfo: {
        fatherName: application.parentInfo.fatherName,
        motherName: application.parentInfo.motherName,
        parentEmail: application.parentInfo.email,
        parentPhone: application.parentInfo.phone
      }
    });

    await student.save();

    // Create or update parent account in Parent collection
    let parent = await Parent.findOne({ 
      'personalInfo.email': application.parentInfo.email
    });

    if (!parent) {
      parent = new Parent({
        personalInfo: {
          firstName: application.parentInfo.fatherName.split(' ')[0],
          lastName: application.parentInfo.fatherName.split(' ').slice(1).join(' ') || application.parentInfo.fatherName,
          email: application.parentInfo.email,
          phone: application.parentInfo.phone,
          address: application.parentInfo.address
        },
        relationship: 'father',
        occupation: application.parentInfo.occupation,
        children: [{
          studentId: student._id,
          rollNumber,
          admissionNumber: student.admissionNumber,
          studentName: `${application.studentInfo.firstName} ${application.studentInfo.lastName}`,
          class: studentClass,
          relationship: 'child'
        }],
        loginCredentials: {
          password: parentPassword
        }
      });
    } else {
      // Add child to existing parent
      parent.children.push({
        studentId: student._id,
        rollNumber,
        admissionNumber: student.admissionNumber,
        studentName: `${application.studentInfo.firstName} ${application.studentInfo.lastName}`,
        class: studentClass,
        relationship: 'child'
      });
    }

    await parent.save();

    // Update student with parent reference
    student.parentInfo.parentId = parent._id;
    await student.save();

    // Update application status
    application.status = 'approved';
    application.assignedRollNumber = rollNumber;
    application.assignedClass = studentClass;
    application.assignedSection = section;
    application.admissionDate = new Date();
    
    await application.save();

    res.json({
      success: true,
      message: 'Admission approved and accounts created successfully',
      data: {
        student: student.toJSON(),
        parent: parent.toJSON(),
        application: application
      }
    });

  } catch (error) {
    console.error('Error approving admission:', error);
    res.status(500).json({
      success: false,
      message: 'Error approving admission'
    });
  }
});

module.exports = router;