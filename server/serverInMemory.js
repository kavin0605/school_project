const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authInMemory');

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000',
  credentials: true
}));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Nalanda School API is running (In-Memory Mode)',
    testUsers: {
      admin: 'admin@nalandaschool.edu / admin123',
      student: 'student@nalandaschool.edu / student123',
      parent: 'parent@email.com / parent123',
      teacher: 'teacher@nalandaschool.edu / teacher123'
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

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Nalanda School Backend running on port ${PORT}`);
  console.log(`📱 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Authentication ready with test users`);
  console.log(`\n👥 Test Login Credentials:`);
  console.log(`👔 Admin: admin@nalandaschool.edu / admin123`);
  console.log(`🎓 Student: student@nalandaschool.edu / student123`);
  console.log(`👨‍👩‍👧‍👦 Parent: parent@email.com / parent123`);
  console.log(`🏫 Teacher: teacher@nalandaschool.edu / teacher123`);
});