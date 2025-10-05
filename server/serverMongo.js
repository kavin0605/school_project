const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
// const authRoutes = require('./routes/authMongo'); // COMPLETELY DISABLED
const admissionRoutes = require('./routes/admission');
const eventRoutes = require('./routes/events');
const uploadRoutes = require('./routes/upload');

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Quick fix: serve client public images (including uploaded ones) so /images/filename works after refresh
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Try to connect to MongoDB Atlas first, then local MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nalanda_school';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    
    // Create admin user if it doesn't exist
    await createDefaultAdmin();
    
    // Create sample students if they don't exist
    await createSampleStudents();
    
    // Create sample admission applications if they don't exist
    await createSampleAdmissionApplications();
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('\n💡 MongoDB Setup Instructions:');
    console.log('1. Install MongoDB Community Server: https://www.mongodb.com/try/download/community');
    console.log('2. Start MongoDB service:');
    console.log('   - Windows: Run "mongod" in command prompt');
    console.log('   - Or use MongoDB Compass for GUI');
    console.log('3. Alternative: Use MongoDB Atlas (cloud): https://www.mongodb.com/atlas');
    console.log('4. Update MONGODB_URI in .env file if using custom connection');
    
    process.exit(1);
  }
};

// Create default admin user
const createDefaultAdmin = async () => {
  try {
    const User = require('./models/UserMongo');
    
    // Check if admin already exists
    const adminExists = await User.findOne({ 
      email: 'nalandaschool1985@gmail.com', 
      role: 'admin' 
    });
    
    if (!adminExists) {
      const adminUser = new User({
        email: 'nalandaschool1985@gmail.com',
        password: 'nalanda1985',
        role: 'admin',
        profile: {
          firstName: 'Nalanda',
          lastName: 'Administrator',
          phone: '+91-9876543210'
        }
      });
      
      await adminUser.save();
      console.log('✅ Default admin user created successfully');
      console.log('📧 Email: nalandaschool1985@gmail.com');
      console.log('🔐 Password: nalanda1985');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating default admin:', error.message);
  }
};

// Create sample students with comprehensive data
const createSampleStudents = async () => {
  try {
    const Student = require('./models/Student');
    
    // Sample Student 1: Kavin Kumar
    const student1Exists = await Student.findOne({ rollNumber: '15' });
    if (!student1Exists) {
      const student1 = new Student({
        rollNumber: '15',
        admissionNumber: 'NS2025001',
        personalInfo: {
          firstName: 'Kavin',
          lastName: 'Kumar',
          dateOfBirth: new Date('2008-05-15'),
          gender: 'male',
          email: '15@nalandaschool.edu',
          phone: '9876543201',
          address: {
            street: '123 Student Street',
            city: 'Chennai',
            state: 'Tamil Nadu',
            zipCode: '600001',
            country: 'India'
          }
        },
        academicInfo: {
          class: '10th Grade',
          section: 'A',
          academicYear: '2025-2026',
          admissionDate: new Date('2025-06-01')
        },
        loginCredentials: {
          password: 'NS2025001',
          isActive: true
        },
        parentInfo: {
          fatherName: 'Raj Kumar',
          motherName: 'Priya Kumar',
          parentEmail: 'raj.kumar@email.com',
          parentPhone: '9876543200'
        },
        fees: {
          totalFees: 50000,
          paidFees: 40000,
          pendingFees: 10000,
          paymentHistory: [
            {
              amount: 25000,
              date: new Date('2025-06-01'),
              method: 'online',
              receiptNumber: 'REC001'
            },
            {
              amount: 15000,
              date: new Date('2025-09-01'),
              method: 'cheque',
              receiptNumber: 'REC002'
            }
          ]
        },
        attendance: {
          totalDays: 120,
          presentDays: 114,
          attendancePercentage: 95.2,
          records: [
            { date: new Date('2025-10-01'), status: 'present' },
            { date: new Date('2025-10-02'), status: 'present' }
          ]
        },
        marks: {
          subjects: [
            {
              name: 'Mathematics',
              code: 'MATH10',
              teacher: 'Dr. Sharma',
              exams: [
                { examType: 'unit-test', marks: 85, totalMarks: 100, grade: 'A', date: new Date('2025-08-15') },
                { examType: 'mid-term', marks: 88, totalMarks: 100, grade: 'A', date: new Date('2025-09-15') }
              ],
              overallGrade: 'A',
              totalMarks: 200,
              obtainedMarks: 173
            },
            {
              name: 'Science',
              code: 'SCI10',
              teacher: 'Prof. Reddy',
              exams: [
                { examType: 'unit-test', marks: 82, totalMarks: 100, grade: 'A', date: new Date('2025-08-16') },
                { examType: 'mid-term', marks: 85, totalMarks: 100, grade: 'A', date: new Date('2025-09-16') }
              ],
              overallGrade: 'A',
              totalMarks: 200,
              obtainedMarks: 167
            },
            {
              name: 'English',
              code: 'ENG10',
              teacher: 'Ms. Priya',
              exams: [
                { examType: 'unit-test', marks: 78, totalMarks: 100, grade: 'B+', date: new Date('2025-08-17') },
                { examType: 'mid-term', marks: 80, totalMarks: 100, grade: 'A', date: new Date('2025-09-17') }
              ],
              overallGrade: 'A',
              totalMarks: 200,
              obtainedMarks: 158
            }
          ],
          overallPercentage: 86.5,
          overallGrade: 'A',
          rank: 5
        },
        timetable: [
          {
            day: 'monday',
            periods: [
              { periodNumber: 1, subject: 'Mathematics', teacher: 'Dr. Sharma', room: 'R101', startTime: '08:00', endTime: '08:45' },
              { periodNumber: 2, subject: 'Science', teacher: 'Prof. Reddy', room: 'R102', startTime: '08:45', endTime: '09:30' },
              { periodNumber: 3, subject: 'English', teacher: 'Ms. Priya', room: 'R103', startTime: '10:00', endTime: '10:45' }
            ]
          },
          {
            day: 'tuesday',
            periods: [
              { periodNumber: 1, subject: 'Science', teacher: 'Prof. Reddy', room: 'R102', startTime: '08:00', endTime: '08:45' },
              { periodNumber: 2, subject: 'Mathematics', teacher: 'Dr. Sharma', room: 'R101', startTime: '08:45', endTime: '09:30' },
              { periodNumber: 3, subject: 'Social Studies', teacher: 'Mr. Gupta', room: 'R104', startTime: '10:00', endTime: '10:45' }
            ]
          }
        ],
        teachers: [
          { name: 'Dr. Sharma', subject: 'Mathematics', phone: '9876543301', email: 'sharma@nalandaschool.edu', isClassTeacher: true },
          { name: 'Prof. Reddy', subject: 'Science', phone: '9876543302', email: 'reddy@nalandaschool.edu', isClassTeacher: false },
          { name: 'Ms. Priya', subject: 'English', phone: '9876543303', email: 'priya@nalandaschool.edu', isClassTeacher: false }
        ],
        assignments: [
          {
            title: 'Algebra Practice',
            subject: 'Mathematics',
            description: 'Complete exercises 1-20 from Chapter 5',
            dueDate: new Date('2025-10-15'),
            status: 'pending',
            totalMarks: 20,
            teacher: 'Dr. Sharma'
          },
          {
            title: 'Science Project',
            subject: 'Science',
            description: 'Solar System Model',
            dueDate: new Date('2025-10-20'),
            status: 'submitted',
            submittedDate: new Date('2025-10-18'),
            marks: 18,
            totalMarks: 20,
            feedback: 'Excellent work!',
            teacher: 'Prof. Reddy'
          }
        ],
        parentMeetings: [
          {
            date: new Date('2025-11-05'),
            time: '10:00 AM',
            purpose: 'Academic Progress Discussion',
            teacher: 'Dr. Sharma',
            status: 'scheduled',
            attendedBy: 'Both Parents'
          }
        ],
        transport: {
          busNumber: 'BUS-07',
          route: 'Route A - Chennai North',
          stopName: 'Anna Nagar Stop',
          pickupTime: '07:30 AM',
          dropTime: '04:00 PM',
          driverName: 'Raman',
          driverPhone: '9876543400',
          feeStatus: 'paid'
        }
      });
      
      await student1.save();
      console.log('✅ Sample Student 1 (Kavin Kumar) created successfully');
    }

    // Sample Student 2: Ananya Patel
    const student2Exists = await Student.findOne({ rollNumber: '22' });
    if (!student2Exists) {
      const student2 = new Student({
        rollNumber: '22',
        admissionNumber: 'NS2025002',
        personalInfo: {
          firstName: 'Ananya',
          lastName: 'Patel',
          dateOfBirth: new Date('2007-08-22'),
          gender: 'female',
          email: '22@nalandaschool.edu',
          phone: '9876543202',
          address: {
            street: '456 Scholar Avenue',
            city: 'Chennai',
            state: 'Tamil Nadu',
            zipCode: '600002',
            country: 'India'
          }
        },
        academicInfo: {
          class: '11th Grade',
          section: 'B',
          academicYear: '2025-2026',
          admissionDate: new Date('2025-06-01')
        },
        loginCredentials: {
          password: 'NS2025002',
          isActive: true
        },
        parentInfo: {
          fatherName: 'Vikram Patel',
          motherName: 'Meera Patel',
          parentEmail: 'vikram.patel@email.com',
          parentPhone: '9876543203'
        },
        fees: {
          totalFees: 55000,
          paidFees: 55000,
          pendingFees: 0,
          paymentHistory: [
            {
              amount: 55000,
              date: new Date('2025-06-01'),
              method: 'online',
              receiptNumber: 'REC003'
            }
          ]
        },
        attendance: {
          totalDays: 120,
          presentDays: 118,
          attendancePercentage: 98.3,
          records: [
            { date: new Date('2025-10-01'), status: 'present' },
            { date: new Date('2025-10-02'), status: 'present' }
          ]
        },
        marks: {
          subjects: [
            {
              name: 'Physics',
              code: 'PHY11',
              teacher: 'Dr. Iyer',
              exams: [
                { examType: 'unit-test', marks: 92, totalMarks: 100, grade: 'A+', date: new Date('2025-08-15') },
                { examType: 'mid-term', marks: 95, totalMarks: 100, grade: 'A+', date: new Date('2025-09-15') }
              ],
              overallGrade: 'A+',
              totalMarks: 200,
              obtainedMarks: 187
            },
            {
              name: 'Chemistry',
              code: 'CHE11',
              teacher: 'Prof. Nair',
              exams: [
                { examType: 'unit-test', marks: 88, totalMarks: 100, grade: 'A', date: new Date('2025-08-16') },
                { examType: 'mid-term', marks: 90, totalMarks: 100, grade: 'A+', date: new Date('2025-09-16') }
              ],
              overallGrade: 'A',
              totalMarks: 200,
              obtainedMarks: 178
            },
            {
              name: 'Mathematics',
              code: 'MATH11',
              teacher: 'Dr. Singh',
              exams: [
                { examType: 'unit-test', marks: 94, totalMarks: 100, grade: 'A+', date: new Date('2025-08-17') },
                { examType: 'mid-term', marks: 96, totalMarks: 100, grade: 'A+', date: new Date('2025-09-17') }
              ],
              overallGrade: 'A+',
              totalMarks: 200,
              obtainedMarks: 190
            }
          ],
          overallPercentage: 92.5,
          overallGrade: 'A+',
          rank: 1
        },
        timetable: [
          {
            day: 'monday',
            periods: [
              { periodNumber: 1, subject: 'Physics', teacher: 'Dr. Iyer', room: 'R201', startTime: '08:00', endTime: '08:45' },
              { periodNumber: 2, subject: 'Chemistry', teacher: 'Prof. Nair', room: 'R202', startTime: '08:45', endTime: '09:30' },
              { periodNumber: 3, subject: 'Mathematics', teacher: 'Dr. Singh', room: 'R203', startTime: '10:00', endTime: '10:45' }
            ]
          },
          {
            day: 'tuesday',
            periods: [
              { periodNumber: 1, subject: 'Chemistry', teacher: 'Prof. Nair', room: 'R202', startTime: '08:00', endTime: '08:45' },
              { periodNumber: 2, subject: 'Physics', teacher: 'Dr. Iyer', room: 'R201', startTime: '08:45', endTime: '09:30' },
              { periodNumber: 3, subject: 'Computer Science', teacher: 'Mr. Raj', room: 'R204', startTime: '10:00', endTime: '10:45' }
            ]
          }
        ],
        teachers: [
          { name: 'Dr. Iyer', subject: 'Physics', phone: '9876543311', email: 'iyer@nalandaschool.edu', isClassTeacher: true },
          { name: 'Prof. Nair', subject: 'Chemistry', phone: '9876543312', email: 'nair@nalandaschool.edu', isClassTeacher: false },
          { name: 'Dr. Singh', subject: 'Mathematics', phone: '9876543313', email: 'singh@nalandaschool.edu', isClassTeacher: false }
        ],
        assignments: [
          {
            title: 'Physics Lab Report',
            subject: 'Physics',
            description: 'Write a detailed report on the pendulum experiment',
            dueDate: new Date('2025-10-12'),
            status: 'submitted',
            submittedDate: new Date('2025-10-10'),
            marks: 19,
            totalMarks: 20,
            feedback: 'Outstanding analysis!',
            teacher: 'Dr. Iyer'
          },
          {
            title: 'Chemical Bonding',
            subject: 'Chemistry',
            description: 'Create a presentation on ionic and covalent bonds',
            dueDate: new Date('2025-10-18'),
            status: 'pending',
            totalMarks: 25,
            teacher: 'Prof. Nair'
          }
        ],
        parentMeetings: [
          {
            date: new Date('2025-10-28'),
            time: '02:00 PM',
            purpose: 'Career Guidance Discussion',
            teacher: 'Dr. Iyer',
            status: 'scheduled',
            attendedBy: 'Father'
          }
        ],
        transport: {
          busNumber: 'BUS-12',
          route: 'Route B - Chennai South',
          stopName: 'T. Nagar Stop',
          pickupTime: '07:45 AM',
          dropTime: '04:15 PM',
          driverName: 'Kumar',
          driverPhone: '9876543401',
          feeStatus: 'paid'
        }
      });
      
      await student2.save();
      console.log('✅ Sample Student 2 (Ananya Patel) created successfully');
    }
    
  } catch (error) {
    console.error('Error creating sample students:', error.message);
  }
};

// Function to create sample admission applications
const createSampleAdmissionApplications = async () => {
  try {
    const AdmissionApplication = require('./models/AdmissionApplication');
    
    // Check if sample applications already exist
    const existingCount = await AdmissionApplication.countDocuments();
    if (existingCount > 0) {
      console.log('📝 Sample admission applications already exist, skipping creation');
      return;
    }

    console.log('📝 Creating sample admission applications...');

    // Sample Application 1
    const application1 = new AdmissionApplication({
      applicationNumber: 'ADM20250001',
      studentInfo: {
        firstName: 'Rahul',
        lastName: 'Sharma',
        dateOfBirth: new Date('2010-03-15'),
        gender: 'male',
        class: '9th Grade',
        previousSchool: 'ABC Public School',
        medicalConditions: 'None'
      },
      parentInfo: {
        fatherName: 'Rajesh Sharma',
        motherName: 'Sunita Sharma',
        email: 'rajesh.sharma@email.com',
        phone: '9876543210',
        occupation: 'Software Engineer',
        address: {
          street: '123 MG Road',
          city: 'Chennai',
          state: 'Tamil Nadu',
          zipCode: '600002',
          country: 'India'
        }
      },
      status: 'pending'
    });

    // Sample Application 2
    const application2 = new AdmissionApplication({
      applicationNumber: 'ADM20250002',
      studentInfo: {
        firstName: 'Priya',
        lastName: 'Kumar',
        dateOfBirth: new Date('2009-07-22'),
        gender: 'female',
        class: '10th Grade',
        previousSchool: 'St. Mary\'s School',
        medicalConditions: 'Mild asthma'
      },
      parentInfo: {
        fatherName: 'Suresh Kumar',
        motherName: 'Lakshmi Kumar',
        email: 'suresh.kumar@email.com',
        phone: '9876543211',
        occupation: 'Doctor',
        address: {
          street: '456 Anna Nagar',
          city: 'Chennai',
          state: 'Tamil Nadu',
          zipCode: '600040',
          country: 'India'
        }
      },
      status: 'pending'
    });

    await application1.save();
    await application2.save();
    
    console.log('✅ Sample admission applications created successfully');
    
  } catch (error) {
    console.error('Error creating sample admission applications:', error.message);
  }
};

// Initialize database connection
connectDB();

// Routes
// app.use('/api/auth', authRoutes); // DISABLED - using new login endpoint below
app.use('/api/admissions', admissionRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/upload', uploadRoutes);

// New login endpoint for separate collections
app.post('/api/login', async (req, res) => {
  console.log('🚀🚀🚀 NEW LOGIN ENDPOINT HIT 🚀🚀🚀');
  try {
    const { email, password } = req.body;
    console.log('📝 NEW ENDPOINT Login attempt for:', email);
    console.log('🔐 Password received:', password ? 'Yes' : 'No');

    let user = null;
    let userType = null;

    // Check admin login first
    console.log('🔍 Checking admin credentials...');
    console.log('Email comparison:', email, '===', 'nalandaschool1985@gmail.com', '?', email === 'nalandaschool1985@gmail.com');
    console.log('Password comparison:', password, '===', 'nalanda1985', '?', password === 'nalanda1985');
    
    if (email === 'nalandaschool1985@gmail.com' && password === 'nalanda1985') {
      user = {
        _id: 'admin_id',
        email: 'nalandaschool1985@gmail.com',
        role: 'admin',
        profile: { firstName: 'Admin', lastName: 'Nalanda School' }
      };
      userType = 'admin';
      console.log('✅ Admin login successful');
    } else {
      const Student = require('./models/Student');
      const Parent = require('./models/Parent');
      const bcrypt = require('bcryptjs');

      // Check Student collection - can login with roll number using admission number as password
      console.log('🔍 NEW LOGIC: Checking for student with roll number:', email);
      const student = await Student.findOne({ rollNumber: email });
      
      if (student) {
        console.log('✅ NEW LOGIC: Found student with roll number:', email);
        console.log('🔍 NEW LOGIC: Student admission number:', student.admissionNumber);
        console.log('🔍 NEW LOGIC: Password provided:', password);
        
        // Check if password matches admission number (student login)
        if (password === student.admissionNumber) {
          user = student;
          userType = 'student';
          console.log('✅ NEW LOGIC: Student login successful with roll number and admission number');
        } else {
          // Password doesn't match admission number, check if it's a parent login attempt
          console.log('🔍 NEW LOGIC: Not student login, checking if parent login with same roll number...');
          
          // Find parent who has a child with this roll number
          const parent = await Parent.findOne({ 
            'children.rollNumber': email  // Look for roll number in children array
          });
          
          if (parent) {
            console.log('✅ NEW LOGIC: Found parent with child roll number:', email);
            console.log('🔍 NEW LOGIC: Parent email:', parent.personalInfo.email);
            
            // Check if password matches parent's email
            if (password === parent.personalInfo.email) {
              user = parent;
              userType = 'parent';
              console.log('✅ NEW LOGIC: Parent login successful with child roll number and parent email');
            } else {
              console.log('❌ NEW LOGIC: Invalid email for parent');
              return res.status(401).json({ success: false, message: 'Invalid roll number or email/admission number' });
            }
          } else {
            console.log('❌ NEW LOGIC: No parent found for this roll number');
            return res.status(401).json({ success: false, message: 'Invalid roll number or admission number' });
          }
        }
      } else {
        // Student not found with this roll number
        console.log('❌ NEW LOGIC: Student not found with roll number:', email);
        return res.status(401).json({ success: false, message: 'Invalid roll number or admission number' });
      }
    }

    console.log('🔎 Final user check - user:', user ? 'Found' : 'Not found');
    console.log('🔎 Final userType:', userType);

    if (!user) {
      console.log('❌ User not found in any collection');
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: email,
        role: userType 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Prepare user data for response (remove password)
    const userData = {
      _id: user._id,
      email: email,
      role: userType,
      profile: userType === 'admin' ? user.profile : user.personalInfo
    };

    console.log('✅ Login successful for:', userType);
    res.json({
      success: true,
      token,
      user: userData
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// Admin routes for student management
app.get('/api/admin/students', async (req, res) => {
  try {
    const Student = require('./models/Student');
    const students = await Student.find({})
      .select('-loginCredentials.password')
      .populate('parentInfo.parentId', 'personalInfo.firstName personalInfo.lastName personalInfo.email personalInfo.phone')
      .sort({ createdAt: -1 });

    console.log('📊 Fetched students from Student collection:', students.length);

    res.json({
      success: true,
      students: students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching students'
    });
  }
});

app.post('/api/admin/students', async (req, res) => {
  try {
    console.log('📝 Student creation request received:', req.body);
    
    const Student = require('./models/Student');
    const Parent = require('./models/Parent');
    const {
      firstName,
      lastName,
      rollNumber,
      admissionNumber,
      class: studentClass,
      parentEmail,
      parentPhone,
      parentName
    } = req.body;

    console.log('🔍 Extracted data:', { firstName, lastName, rollNumber, admissionNumber, studentClass, parentEmail });

    // Validate required fields
    if (!firstName || !lastName || !rollNumber || !studentClass || !parentEmail) {
      console.log('❌ Validation failed - missing required fields');
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Check if roll number already exists in Student collection
    const existingRollNumber = await Student.findOne({ rollNumber });
    if (existingRollNumber) {
      console.log('❌ Roll number already exists:', rollNumber);
      return res.status(400).json({
        success: false,
        message: 'Roll number already exists'
      });
    }

    // Check if admission number already exists (if provided)
    if (admissionNumber) {
      const existingAdmissionNumber = await Student.findOne({ admissionNumber });
      if (existingAdmissionNumber) {
        console.log('❌ Admission number already exists:', admissionNumber);
        return res.status(400).json({
          success: false,
          message: 'Admission number already exists'
        });
      }
    }

    console.log('✅ Roll number and admission number are unique, creating student...');

    // Generate unique student email and default password
    const studentEmail = `${rollNumber}@nalandaschool.edu`;
    const defaultPassword = `student${rollNumber}`;

    // Create student account in Student collection
    const student = new Student({
      rollNumber,
      admissionNumber: admissionNumber || undefined, // Let the model generate if not provided
      personalInfo: {
        firstName,
        lastName,
        email: studentEmail
      },
      academicInfo: {
        class: studentClass
      },
      loginCredentials: {
        password: defaultPassword
      },
      parentInfo: {
        fatherName: parentName || 'Parent',
        parentEmail,
        parentPhone
      }
    });

    await student.save();
    console.log('✅ Student saved successfully in Student collection:', student._id);

    // Check if parent account exists in Parent collection
    let parent = await Parent.findOne({ 'personalInfo.email': parentEmail });
    console.log('🔍 Parent lookup result:', parent ? 'Found existing parent' : 'Parent not found');
    
    let parentPassword;
    
    if (!parent) {
      try {
        // Create parent account with default password
        parentPassword = `parent${rollNumber}`;
        
        const parentData = {
          personalInfo: {
            firstName: parentName || 'Parent',
            lastName: lastName || 'Family',
            email: parentEmail,
            phone: parentPhone || '0000000000'
          },
          relationship: 'father',
          children: [],
          loginCredentials: {
            password: parentPassword
          }
        };
        
        console.log('🔍 Creating parent with simplified data:', JSON.stringify(parentData, null, 2));
        parent = new Parent(parentData);

        await parent.save();
        console.log('✅ Parent created successfully in Parent collection:', parent._id);
        
        // Now add the child after parent is created
        parent.children.push({
          studentId: student._id,
          rollNumber: student.rollNumber,
          admissionNumber: student.admissionNumber,
          studentName: `${firstName} ${lastName}`,
          class: studentClass,
          relationship: 'child'
        });
        
        await parent.save();
        console.log('✅ Child added to parent successfully');
        
      } catch (parentError) {
        console.error('❌ Detailed parent creation error:', parentError);
        console.error('❌ Parent validation errors:', parentError.errors);
        throw parentError;
      }
    } else {
      // Add student to existing parent's children list
      parentPassword = 'existing'; // Set password indicator for existing parent
      const existingChild = parent.children.find(child => 
        child.studentId.toString() === student._id.toString()
      );
      
      if (!existingChild) {
        parent.children.push({
          studentId: student._id,
          rollNumber: student.rollNumber,
          admissionNumber: student.admissionNumber,
          studentName: `${firstName} ${lastName}`,
          class: studentClass,
          relationship: 'child'
        });
        await parent.save();
        console.log('✅ Student added to existing parent');
      }
    }

    // Update student with parent reference
    student.parentInfo.parentId = parent._id;
    await student.save();

    // Remove password from response
    const studentResponse = student.toObject();
    delete studentResponse.loginCredentials.password;

    res.status(201).json({
      success: true,
      message: `Student created successfully! Student login: Roll Number ${rollNumber} / Admission Number ${student.admissionNumber}. Parent login: Roll Number ${rollNumber} / Email ${parentEmail}`,
      student: studentResponse,
      credentials: {
        student: {
          rollNumber: rollNumber,
          admissionNumber: student.admissionNumber
        },
        parent: {
          childRollNumber: rollNumber,
          parentEmail: parentEmail
        },
        studentEmail: studentEmail
      }
    });

  } catch (error) {
    console.error('❌❌ FULL ERROR creating student:', error);
    
    // Handle duplicate key errors specifically
    if (error.code === 11000) {
      let duplicateField = 'field';
      let duplicateValue = 'value';
      
      if (error.keyValue) {
        duplicateField = Object.keys(error.keyValue)[0];
        duplicateValue = Object.values(error.keyValue)[0];
      }
      
      const message = `${duplicateField === 'admissionNumber' ? 'Admission number' : 
                      duplicateField === 'rollNumber' ? 'Roll number' : 
                      duplicateField} "${duplicateValue}" already exists. Please use a different ${duplicateField}.`;
      
      return res.status(400).json({
        success: false,
        message: message
      });
    }
    
    // Still send success if student was created (check if we have student._id)
    if (error.message && error.message.includes('Parent') && student && student._id) {
      console.log('🔄 Student was created successfully, sending success response despite parent error');
      const studentResponse = student.toObject();
      delete studentResponse.loginCredentials.password;
      
      return res.status(201).json({
        success: true,
        message: `Student created successfully! (Parent account may need manual setup)`,
        student: studentResponse,
        credentials: {
          studentEmail: `${rollNumber}@nalandaschool.edu`,
          studentPassword: `student${rollNumber}`,
          parentEmail: parentEmail,
          parentPassword: 'To be set manually',
          admissionNumber: student.admissionNumber
        }
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating student account: ' + error.message
    });
  }
});

// GET student details by ID
app.get('/api/students/:id', async (req, res) => {
  try {
    const Student = require('./models/Student');
    const student = await Student.findById(req.params.id).select('-loginCredentials.password');
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.json({
      success: true,
      student: student
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student details'
    });
  }
});

// GET current student details (for logged-in student)
app.get('/api/student/me', async (req, res) => {
  try {
    const Student = require('./models/Student');
    // Extract student ID from token or session - simplified for demo
    const rollNumber = req.headers['student-roll'] || '15'; // Default to first sample student
    
    const student = await Student.findOne({ rollNumber }).select('-loginCredentials.password');
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.json({
      success: true,
      student: student
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student details'
    });
  }
});

// PUT update student details (for admin)
app.put('/api/admin/students/:id', async (req, res) => {
  try {
    const Student = require('./models/Student');
    const studentId = req.params.id;
    const updateData = req.body;
    
    console.log('Admin updating student:', studentId, 'with data:', updateData);
    
    // Remove loginCredentials from updateData to avoid validation issues
    // We don't want to update the password through this endpoint
    const { loginCredentials, ...dataToUpdate } = updateData;
    
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      dataToUpdate,
      { new: true, runValidators: true }
    ).select('-loginCredentials.password');
    
    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Student updated successfully',
      student: updatedStudent
    });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating student details',
      error: error.message
    });
  }
});

// PUT update student attendance (for admin)
app.put('/api/admin/students/:id/attendance', async (req, res) => {
  try {
    const Student = require('./models/Student');
    const studentId = req.params.id;
    const { attendanceRecord } = req.body;
    
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Add new attendance record
    student.attendance.records.push(attendanceRecord);
    
    // Recalculate attendance percentage
    const totalRecords = student.attendance.records.length;
    const presentCount = student.attendance.records.filter(record => record.status === 'Present').length;
    student.attendance.percentage = ((presentCount / totalRecords) * 100).toFixed(1);
    
    await student.save();
    
    res.json({
      success: true,
      message: 'Attendance updated successfully',
      attendance: student.attendance
    });
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating attendance',
      error: error.message
    });
  }
});

// PUT update student marks (for admin)
app.put('/api/admin/students/:id/marks', async (req, res) => {
  try {
    const Student = require('./models/Student');
    const studentId = req.params.id;
    const { subject, examType, marks, maxMarks } = req.body;
    
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Find or create subject
    let subjectMarks = student.academicRecords.marksAndGrades.find(s => s.subject === subject);
    if (!subjectMarks) {
      subjectMarks = { subject, exams: [] };
      student.academicRecords.marksAndGrades.push(subjectMarks);
    }
    
    // Find or create exam
    let exam = subjectMarks.exams.find(e => e.examType === examType);
    if (!exam) {
      exam = { examType, marks: 0, maxMarks: 0, grade: '', percentage: 0 };
      subjectMarks.exams.push(exam);
    }
    
    // Update marks
    exam.marks = marks;
    exam.maxMarks = maxMarks;
    exam.percentage = ((marks / maxMarks) * 100).toFixed(1);
    
    // Calculate grade
    const percentage = exam.percentage;
    if (percentage >= 90) exam.grade = 'A+';
    else if (percentage >= 80) exam.grade = 'A';
    else if (percentage >= 70) exam.grade = 'B+';
    else if (percentage >= 60) exam.grade = 'B';
    else if (percentage >= 50) exam.grade = 'C';
    else if (percentage >= 40) exam.grade = 'D';
    else exam.grade = 'F';
    
    await student.save();
    
    res.json({
      success: true,
      message: 'Marks updated successfully',
      marks: student.academicRecords.marksAndGrades
    });
  } catch (error) {
    console.error('Error updating marks:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating marks',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Nalanda School API is running (MongoDB Mode)',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    adminLogin: {
      email: 'nalandaschool1985@gmail.com',
      password: 'nalanda1985'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Nalanda School API Server running on port ${PORT}`);
  console.log(`📱 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🔐 MongoDB Authentication ready`);
  console.log(`\n👔 Admin Login Credentials:`);
  console.log(`📧 Email: nalandaschool1985@gmail.com`);
  console.log(`🔐 Password: nalanda1985`);
  console.log(`\n🌐 Frontend: http://localhost:3000`);
});