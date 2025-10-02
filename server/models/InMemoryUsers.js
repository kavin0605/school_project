// In-memory user store for demonstration (without MongoDB)
const bcrypt = require('bcryptjs');

// Sample users data
const users = [
  {
    id: 1,
    email: 'admin@nalandaschool.edu',
    password: '$2a$12$8MT0ppFMCMB6rSHsS2ZRVO2rLSNkMGzp0vq9Vlp6bjThuTc5XDxWm', // admin123
    role: 'admin',
    profile: {
      firstName: 'System',
      lastName: 'Administrator',
      phone: '+91-9876543210'
    }
  },
  {
    id: 2,
    email: 'student@nalandaschool.edu',
    password: '$2a$12$p2bjkNn2mu7jqfhkQycukOTCq7CgqbW3V5GTZqxCXA9.OLEf7dySq', // student123
    role: 'student',
    profile: {
      firstName: 'Arjun',
      lastName: 'Sharma',
      phone: '+91-9876543211'
    },
    studentId: 'NS2025001',
    student: {
      admissionNumber: 'ADM2025001',
      class: '10',
      section: 'A',
      rollNumber: '15',
      academicYear: '2024-25'
    }
  },
  {
    id: 3,
    email: 'parent@email.com',
    password: '$2a$12$OYc3WN9l8qhc9JBNziNagupM8uTEDDcblF69KBlRAK8GG4cXmhNae', // parent123
    role: 'parent',
    profile: {
      firstName: 'Rajesh',
      lastName: 'Sharma',
      phone: '+91-9876543212'
    },
    parent: {
      occupation: 'Business Owner',
      children: ['NS2025001']
    }
  },
  {
    id: 4,
    email: 'teacher@nalandaschool.edu',
    password: '$2a$12$p2bjkNn2mu7jqfhkQycukOTCq7CgqbW3V5GTZqxCXA9.OLEf7dySq', // teacher123
    role: 'teacher',
    profile: {
      firstName: 'Mrs. Meera',
      lastName: 'Singh',
      phone: '+91-9876543214'
    },
    teacher: {
      employeeId: 'EMP001',
      department: 'Mathematics',
      subjects: ['Mathematics', 'Statistics'],
      experience: 8
    }
  }
];

// Hash a new password (helper function)
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

// Find user by email and role
const findUserByEmailAndRole = (email, role) => {
  return users.find(user => user.email === email && user.role === role);
};

// Find user by email only
const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

// Find user by ID
const findUserById = (id) => {
  return users.find(user => user.id === id);
};

// Validate password
const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Create new user (for registration)
const createUser = async (userData) => {
  const newUser = {
    id: users.length + 1,
    ...userData,
    password: await hashPassword(userData.password)
  };
  users.push(newUser);
  return newUser;
};

module.exports = {
  users,
  hashPassword,
  findUserByEmailAndRole,
  findUserByEmail,
  findUserById,
  validatePassword,
  createUser
};