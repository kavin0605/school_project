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
import { SupervisorAccount, LockOutlined } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    identifier: '',
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
      const result = await login(formData.identifier, formData.password, 'admin');
      
      if (result.success) {
        // Redirect to admin dashboard
        navigate('/admin-dashboard');
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
          <Avatar sx={{ m: 1, bgcolor: '#1976d2', width: 56, height: 56 }}>
            <SupervisorAccount fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
            Admin Login
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            Access the administrative dashboard to manage school operations
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
              label="Admin Email"
              name="identifier"
              autoComplete="email"
              autoFocus
              value={formData.identifier}
              onChange={handleInputChange}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
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
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Signing In...
                </Box>
              ) : (
                'Sign In as Admin'
              )}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/student-login" variant="body2">
                Student Login
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
                Forgot password?
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Quick Info */}
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>
          Admin Dashboard Features:
        </Typography>
        <ul>
          <li>Student Management & Enrollment</li>
          <li>Staff Management & Payroll</li>
          <li>Academic Records & Reports</li>
          <li>Fee Management & Financial Reports</li>
          <li>Event Management & Announcements</li>
          <li>System Configuration & Settings</li>
        </ul>
      </Paper>
    </Container>
  );
};

export default AdminLogin;