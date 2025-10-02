// Test script to create sample users in the database
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/nalanda_school', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Create test users
const createTestUsers = async () => {
  try {
    // Admin user
    const adminExists = await User.findOne({ email: 'admin@nalandaschool.edu', role: 'admin' });
    if (!adminExists) {
      const adminUser = new User({
        email: 'admin@nalandaschool.edu',
        password: await bcrypt.hash('admin123', 12),
        role: 'admin',
        profile: {
          firstName: 'System',
          lastName: 'Administrator',
          phone: '+91-9876543210'
        }
      });
      await adminUser.save();
      console.log('✅ Admin user created: admin@nalandaschool.edu / admin123');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Student user
    const studentExists = await User.findOne({ email: 'student@nalandaschool.edu', role: 'student' });
    if (!studentExists) {
      const studentUser = new User({
        email: 'student@nalandaschool.edu',
        password: await bcrypt.hash('student123', 12),
        role: 'student',
        profile: {
          firstName: 'Arjun',
          lastName: 'Sharma',
          phone: '+91-9876543211',
          dateOfBirth: new Date('2008-05-15'),
          address: {
            street: '123 School Street',
            city: 'Delhi',
            state: 'Delhi',
            zipCode: '110001',
            country: 'India'
          }
        },
        studentId: 'NS2025001',
        student: {
          admissionNumber: 'ADM2025001',
          class: '10',
          section: 'A',
          rollNumber: '15',
          admissionDate: new Date('2020-04-01'),
          academicYear: '2024-25',
          guardianInfo: {
            fatherName: 'Rajesh Sharma',
            motherName: 'Priya Sharma',
            guardianPhone: '+91-9876543212',
            guardianEmail: 'parent@email.com'
          }
        }
      });
      await studentUser.save();
      console.log('✅ Student user created: student@nalandaschool.edu / student123');
    } else {
      console.log('ℹ️  Student user already exists');
    }

    // Parent user
    const parentExists = await User.findOne({ email: 'parent@email.com', role: 'parent' });
    if (!parentExists) {
      const parentUser = new User({
        email: 'parent@email.com',
        password: await bcrypt.hash('parent123', 12),
        role: 'parent',
        profile: {
          firstName: 'Rajesh',
          lastName: 'Sharma',
          phone: '+91-9876543212',
          address: {
            street: '123 School Street',
            city: 'Delhi',
            state: 'Delhi',
            zipCode: '110001',
            country: 'India'
          }
        },
        parent: {
          occupation: 'Business Owner',
          children: ['NS2025001'], // Reference to student
          emergencyContact: '+91-9876543213'
        }
      });
      await parentUser.save();
      console.log('✅ Parent user created: parent@email.com / parent123');
    } else {
      console.log('ℹ️  Parent user already exists');
    }

    // Teacher user
    const teacherExists = await User.findOne({ email: 'teacher@nalandaschool.edu', role: 'teacher' });
    if (!teacherExists) {
      const teacherUser = new User({
        email: 'teacher@nalandaschool.edu',
        password: await bcrypt.hash('teacher123', 12),
        role: 'teacher',
        profile: {
          firstName: 'Mrs. Meera',
          lastName: 'Singh',
          phone: '+91-9876543214',
          dateOfBirth: new Date('1985-08-20'),
          address: {
            street: '456 Teacher Lane',
            city: 'Delhi',
            state: 'Delhi',
            zipCode: '110002',
            country: 'India'
          }
        },
        teacher: {
          employeeId: 'EMP001',
          department: 'Mathematics',
          subjects: ['Mathematics', 'Statistics'],
          qualification: 'M.Sc Mathematics, B.Ed',
          experience: 8,
          joinDate: new Date('2016-06-01'),
          salary: 50000,
          classes: ['10A', '10B', '9A']
        }
      });
      await teacherUser.save();
      console.log('✅ Teacher user created: teacher@nalandaschool.edu / teacher123');
    } else {
      console.log('ℹ️  Teacher user already exists');
    }

    console.log('\n🎉 Test users setup completed!');
    console.log('\n📋 Login Credentials:');
    console.log('👔 Admin: admin@nalandaschool.edu / admin123');
    console.log('🎓 Student: student@nalandaschool.edu / student123');
    console.log('👨‍👩‍👧‍👦 Parent: parent@email.com / parent123');
    console.log('🏫 Teacher: teacher@nalandaschool.edu / teacher123');

  } catch (error) {
    console.error('Error creating test users:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the setup
const main = async () => {
  await connectDB();
  await createTestUsers();
};

main();