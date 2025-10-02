import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { School, Person, ContactMail, Send } from '@mui/icons-material';

const AdmissionForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [applicationNumber, setApplicationNumber] = useState('');

  const [formData, setFormData] = useState({
    // Student Information
    studentFirstName: '',
    studentLastName: '',
    dateOfBirth: '',
    gender: '',
    class: '',
    previousSchool: '',
    medicalConditions: '',
    
    // Parent Information
    fatherName: '',
    motherName: '',
    parentEmail: '',
    parentPhone: '',
    occupation: '',
    
    // Address Information
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    }
  });

  const steps = ['Student Details', 'Parent Details', 'Address & Submit'];

  const classes = [
    'Pre-KG', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', 
    '6th', '7th', '8th', '9th', '10th', '11th', '12th'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep = (step) => {
    switch (step) {
      case 0: // Student Details
        return formData.studentFirstName && formData.studentLastName && 
               formData.dateOfBirth && formData.gender && formData.class;
      case 1: // Parent Details
        return formData.fatherName && formData.motherName && 
               formData.parentEmail && validateEmail(formData.parentEmail) && formData.parentPhone;
      case 2: // Address
        return formData.address.street && formData.address.city && 
               formData.address.state && formData.address.zipCode;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setError('');
    } else {
      // Show specific validation errors
      if (activeStep === 1 && formData.parentEmail && !validateEmail(formData.parentEmail)) {
        setError('Please enter a valid email address (check for typos like commas instead of dots)');
      } else {
        setError('Please fill in all required fields');
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError('');
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) {
      setError('Please fill in all required fields');
      return;
    }

    if (!validateEmail(formData.parentEmail)) {
      setError('Please enter a valid email address (check for typos like commas instead of dots)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admissions/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setApplicationNumber(data.data.applicationNumber);
        setError('');
      } else {
        // Handle validation errors
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map(err => `${err.path}: ${err.msg}`).join('\n');
          setError(`Validation errors:\n${errorMessages}`);
        } else {
          setError(data.message || 'Failed to submit application');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <School sx={{ mr: 1 }} />
                Student Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="studentFirstName"
                value={formData.studentFirstName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="studentLastName"
                value={formData.studentLastName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Class Applying For</InputLabel>
                <Select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  label="Class Applying For"
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Previous School (Optional)"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medical Conditions (Optional)"
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleInputChange}
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Person sx={{ mr: 1 }} />
                Parent/Guardian Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father's Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mother's Name"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="parentEmail"
                type="email"
                value={formData.parentEmail}
                onChange={handleInputChange}
                required
                error={formData.parentEmail && !validateEmail(formData.parentEmail)}
                helperText={formData.parentEmail && !validateEmail(formData.parentEmail) ? 
                  "Please enter a valid email address (e.g., name@domain.com)" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Occupation (Optional)"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <ContactMail sx={{ mr: 1 }} />
                Address Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="address.state"
                value={formData.address.state}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Zip Code"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="address.country"
                value={formData.address.country}
                onChange={handleInputChange}
                disabled
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  if (success) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ mb: 3 }}>
            <Send sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" color="success.main" sx={{ mb: 2 }}>
              Application Submitted Successfully!
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Application Number: <strong>{applicationNumber}</strong>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Thank you for applying to Nalanda School. Your application has been received and 
              an email notification has been sent to the admissions office. You will receive 
              an update on your application status within 3-5 business days.
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.location.href = '/';
            }}
            sx={{ mt: 2 }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, textAlign: 'center', fontWeight: 'bold' }}>
          Online Admission Application
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
          Nalanda School - Academic Year 2024-25
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            variant="outlined"
          >
            Back
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Send />}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AdmissionForm;