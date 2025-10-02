import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  FormControlLabel,
  Checkbox,
  Link,
  Alert,
  CircularProgress
} from '@mui/material';
import { AccountBox } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    identifier: '', // Can be email or roll number
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.identifier || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await login(formData.identifier, formData.password, 'student');
      
      if (result.success) {
        // Redirect to student dashboard
        navigate('/student-dashboard');
      } else {
        setError(result.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={6} sx={{ p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#4caf50', width: 56, height: 56 }}>
            <AccountBox fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
            Student Login
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            Login with your roll number and admission number
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="identifier"
              label="Roll Number"
              name="identifier"
              autoComplete="username"
              autoFocus
              value={formData.identifier}
              onChange={handleInputChange}
              placeholder="e.g., 123, 23bsr021"
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Admission Number"
              type="text"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="e.g., 111, 102"
              disabled={loading}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  value="remember" 
                  color="primary"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5, bgcolor: '#4caf50', '&:hover': { bgcolor: '#45a049' } }}
              disabled={loading}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Signing In...
                </Box>
              ) : (
                'Sign In as Student'
              )}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/admin-login" variant="body2">
                Admin Login
              </Link>
              <Typography variant="body2" component="span" sx={{ mx: 1 }}>
                |
              </Typography>
              <Link component={RouterLink} to="/parent-login" variant="body2">
                Parent Login
              </Link>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link href="#" variant="body2">
                Forgot Student ID or Password?
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Quick Info */}
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#4caf50' }}>
          Student Portal Features:
        </Typography>
        <ul>
          <li>View Academic Progress & Grades</li>
          <li>Access Assignments & Homework</li>
          <li>Check Attendance Records</li>
          <li>View Exam Schedules & Results</li>
          <li>Download Study Materials</li>
          <li>Communicate with Teachers</li>
        </ul>
      </Paper>
    </Container>
  );
};

export default StudentLogin;