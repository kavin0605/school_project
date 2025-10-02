import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Phone,
  Email,
  LocationOn,
  School
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2',
        color: 'white',
        mt: 'auto',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* School Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <School sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                Nalanda School
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              A center of academic excellence, discipline, and holistic development. 
              Nurturing young minds with knowledge and values for a better tomorrow.
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="YouTube">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/about" color="inherit" underline="hover">
                About Us
              </Link>
              <Link href="/admission" color="inherit" underline="hover">
                Admission
              </Link>
              <Link href="/campus" color="inherit" underline="hover">
                Campus
              </Link>
              <Link href="/events" color="inherit" underline="hover">
                Events
              </Link>
              <Link href="/assistance" color="inherit" underline="hover">
                Assistance
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Contact Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn />
                <Typography variant="body2">
                  123 Education Street, Knowledge City, Learning State 12345
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone />
                <Typography variant="body2">
                  +91 9876543210
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email />
                <Typography variant="body2">
                  info@nalandaschool.edu.in
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, backgroundColor: 'rgba(255,255,255,0.2)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Nalanda School. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Designed with ♥ for quality education
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;