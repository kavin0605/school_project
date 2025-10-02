import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Schedule,
  Send,
  School
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create email content
    const subject = encodeURIComponent(formData.subject || 'Contact Form Submission');
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `Message:\n${formData.message}`
    );
    
    // Create mailto link and open it
    const mailtoLink = `mailto:nalandaschool1985@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Optional: Show success message and reset form after a short delay
    setTimeout(() => {
      alert('Email client should open. Please send the email from your email application.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 0.8)), url("/images/contact-hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
            Contact Us
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Get in Touch with Nalanda School
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" sx={{ mb: 4, color: '#1976d2', fontWeight: 'bold' }}>
              Contact Information
            </Typography>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn sx={{ color: '#1976d2', mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Address</Typography>
                </Box>
                <Typography variant="body1">
                  123 Education Street<br />
                  Knowledge City, Learning State<br />
                  PIN: 123456<br />
                  India
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ color: '#1976d2', mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Phone</Typography>
                </Box>
                <Typography variant="body1">
                  Main Office: <a href="tel:+918754343962" style={{ color: '#1976d2', textDecoration: 'none' }}>+91 8754343962</a><br />
                  Admission: <a href="tel:+918754343963" style={{ color: '#1976d2', textDecoration: 'none' }}>+91 8754343963</a><br />
                  Principal: <a href="tel:+918754343964" style={{ color: '#1976d2', textDecoration: 'none' }}>+91 8754343964</a>
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email sx={{ color: '#1976d2', mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Email</Typography>
                </Box>
                <Typography variant="body1">
                  <a href="mailto:nalandaschool1985@gmail.com" style={{ color: '#1976d2', textDecoration: 'none' }}>nalandaschool1985@gmail.com</a><br />
                  <a href="mailto:admission@nalandaschool1985@gmail.com" style={{ color: '#1976d2', textDecoration: 'none' }}>admission@nalandaschool1985@gmail.com</a><br />
                  <a href="mailto:principal@nalandaschool1985@gmail.com" style={{ color: '#1976d2', textDecoration: 'none' }}>principal@nalandaschool1985@gmail.com</a>
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Schedule sx={{ color: '#1976d2', mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Office Hours</Typography>
                </Box>
                <Typography variant="body1">
                  Monday - Friday: 8:00 AM - 4:00 PM<br />
                  Saturday: 8:00 AM - 12:00 PM<br />
                  Sunday: Closed
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ mb: 4, color: '#1976d2', fontWeight: 'bold' }}>
                Send us a Message
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<Send />}
                      sx={{ px: 4 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>

        {/* Map Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: '#1976d2', fontWeight: 'bold' }}>
            Find Us Here
          </Typography>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Interactive Map Coming Soon
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We are working on integrating an interactive map to help you locate our campus easily.
            </Typography>
            <Box
              sx={{
                height: 300,
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #ddd',
                borderRadius: 2,
                mt: 3
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Map Placeholder
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;