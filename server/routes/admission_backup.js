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
    });s
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

// Send approval notification email to parent
const sendApprovalNotification = async (applicationData, studentData) => {
  try {
    // Check if email configuration exists
    if (!process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'your_16_character_app_password_here') {
      console.log('⚠️ Email not configured. Here\'s what would be sent:');
      console.log('📧 TO:', applicationData.parentInfo.email);
      console.log('📧 SUBJECT: 🎉 Admission Approved - Welcome to Nalanda School!');
      console.log('📧 MESSAGE: Admission approved for', applicationData.studentInfo.firstName, applicationData.studentInfo.lastName);
      console.log('📧 Instructions: Please visit school within one week with original documents');
      return;
    }

    const transporter = createEmailTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: applicationData.parentInfo.email,
      subject: `🎉 Admission Approved - Welcome to Nalanda School!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2e7d32; margin-bottom: 10px;">🎉 Congratulations!</h1>
            <h2 style="color: #1976d2; margin: 0;">Admission Approved</h2>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Student Details:</h3>
            <p><strong>Name:</strong> ${applicationData.studentInfo.firstName} ${applicationData.studentInfo.lastName}</p>
            <p><strong>Application Number:</strong> ${applicationData.applicationNumber}</p>
            <p><strong>Applied for Class:</strong> ${applicationData.studentInfo.class}</p>
            ${studentData ? `
            <p><strong>Roll Number:</strong> ${studentData.rollNumber}</p>
            <p><strong>Assigned Class:</strong> ${studentData.academicInfo.class}</p>
            <p><strong>Section:</strong> ${studentData.academicInfo.section}</p>
            <p><strong>Admission Number:</strong> ${studentData.admissionNumber}</p>
            ` : '<p><em>Roll number and section will be assigned during document verification.</em></p>'}
          </div>
          
          <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; border-left: 4px solid #ff9800; margin-bottom: 20px;">
            <h3 style="color: #e65100; margin-top: 0;">📋 Important Instructions:</h3>
            <ol style="line-height: 1.8;">
              <li><strong>Document Submission:</strong> Please bring all original documents for verification within <strong>one week</strong> from today.</li>
              <li><strong>Required Documents:</strong>
                <ul style="margin: 10px 0;">
                  <li>Birth Certificate (Original + Copy)</li>
                  <li>Previous School Transfer Certificate</li>
                  <li>Mark Sheets of Previous Classes</li>
                  <li>Aadhar Card (Student & Parent)</li>
                  <li>Passport Size Photos (4 copies)</li>
                  <li>Medical Certificate</li>
                </ul>
              </li>
              <li><strong>Fee Payment:</strong> Complete the admission fee payment during document verification.</li>
              <li><strong>Meeting Schedule:</strong> Visit the school office between 9:00 AM - 4:00 PM on working days.</li>
            </ol>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #2e7d32; margin-top: 0;">📞 Contact Information:</h3>
            <p><strong>School Address:</strong> Nalanda School, Education Street, Chennai</p>
            <p><strong>Phone:</strong> +91 44 1234 5678</p>
            <p><strong>Email:</strong> nalandaschool1985@gmail.com</p>
            <p><strong>Office Hours:</strong> Monday to Friday, 9:00 AM - 4:00 PM</p>
          </div>
          
          <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1976d2; margin-top: 0;">🔐 Login Credentials:</h3>
            <p>Student and parent login accounts have been created. You will receive login details during document verification.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f0f0f0; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Deadline Reminder:</strong> Please complete document verification within 7 days to secure your admission.
            </p>
            <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">
              We look forward to welcoming you to the Nalanda School family! 🎓
            </p>
          </div>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('✅ Approval notification email sent successfully to:', applicationData.parentInfo.email);
  } catch (error) {
    console.error('❌ Error sending approval notification:', error.message);
    throw error;
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
    
    // Find the highest existing application number for this year
    const existingApplications = await AdmissionApplication.find({
      applicationNumber: { $regex: `^ADM${year}` }
    }).sort({ applicationNumber: -1 }).limit(1);
    
    let nextNumber = 1;
    if (existingApplications.length > 0) {
      const lastAppNumber = existingApplications[0].applicationNumber;
      const lastNumber = parseInt(lastAppNumber.slice(-4)); // Extract last 4 digits
      nextNumber = lastNumber + 1;
    }
    
    const applicationNumber = `ADM${year}${String(nextNumber).padStart(4, '0')}`;
    
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

    // Send approval notification email to parent
    try {
      await sendApprovalNotification(application, student);
    } catch (emailError) {
      console.log('Email notification failed (this is optional):', emailError.message);
    }

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

// @route   POST /api/admissions/simple-approve/:id
// @desc    Simple approve admission (just change status and send email)
// @access  Private (Admin only)
router.post('/simple-approve/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the application
    const application = await AdmissionApplication.findById(id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (application.status === 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Application is already approved'
      });
    }

    // Update application status
    application.status = 'approved';
    application.reviewDate = new Date();
    application.remarks = 'Approved - Please visit school with original documents within one week';
    
    await application.save();

    // Send approval notification email
    try {
      // For simple approval, we don't create student record yet, so pass null for studentData
      // The email template will handle the case when studentData is null
      await sendApprovalNotification(application, null);
      console.log('✅ Approval notification email sent successfully');
    } catch (emailError) {
      console.log('📧 Email notification failed (this is optional):', emailError.message);
      // Log the notification details to console as backup
      console.log('\n📋 APPROVAL NOTIFICATION (Email failed, showing in console):');
      console.log(`To: ${application.parentInfo.email}`);
      console.log(`Student: ${application.studentInfo.firstName} ${application.studentInfo.lastName}`);
      console.log(`Application: ${application.applicationNumber}`);
      console.log('Message: Please bring original documents and visit school within one week');
    }

    res.json({
      success: true,
      message: 'Application approved successfully and notification sent',
      data: { application }
    });

  } catch (error) {
    console.error('Error approving application:', error);
    res.status(500).json({
      success: false,
      message: 'Error approving application'
    });
  }
});

module.exports = router;