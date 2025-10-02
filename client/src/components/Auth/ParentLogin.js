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
import { PersonAdd } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ParentLogin = () => {
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
      const result = await login(formData.identifier, formData.password, 'parent');
      
      if (result.success) {
        // Redirect to parent dashboard
        navigate('/parent-dashboard');
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
          <Avatar sx={{ m: 1, bgcolor: '#ff9800', width: 56, height: 56 }}>
            <PersonAdd fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
            Parent Login
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            Login with your child's roll number and your email address
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
              label="Child's Roll Number"
              name="identifier"
              autoComplete="username"
              autoFocus
              value={formData.identifier}
              onChange={handleInputChange}
              placeholder="e.g., 23bsr021, 123"
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Your Email Address"
              type="email"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="e.g., parent@gmail.com"
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
              sx={{ mt: 3, mb: 2, py: 1.5, bgcolor: '#ff9800', '&:hover': { bgcolor: '#f57c00' } }}
              disabled={loading}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Signing In...
                </Box>
              ) : (
                'Sign In as Parent'
              )}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/admin-login" variant="body2">
                Admin Login
              </Link>
              <Typography variant="body2" component="span" sx={{ mx: 1 }}>
                |
              </Typography>
              <Link component={RouterLink} to="/student-login" variant="body2">
                Student Login
              </Link>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link href="#" variant="body2">
                Forgot Parent ID or Password?
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Quick Info */}
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#ff9800' }}>
          Parent Portal Features:
        </Typography>
        <ul>
          <li>Monitor Child's Academic Progress</li>
          <li>View Attendance & Punctuality Records</li>
          <li>Check Fee Payment Status & History</li>
          <li>Communicate with Teachers & Staff</li>
          <li>Receive School Notifications & Updates</li>
          <li>Schedule Parent-Teacher Meetings</li>
        </ul>
      </Paper>
    </Container>
  );
};

export default ParentLogin;