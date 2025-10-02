import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ExpandMore,
  Help,
  Support,
  Phone,
  Email,
  LiveHelp,
  School,
  Assignment,
  Payment,
  DirectionsBus,
  Restaurant,
  LocalHospital
} from '@mui/icons-material';

const Assistance = () => {
  const faqs = [
    {
      question: 'How can I apply for admission online?',
      answer: 'You can apply for admission by visiting our Admission page and clicking on "Start Online Application". Fill out the form with required details and upload necessary documents.'
    },
    {
      question: 'What documents are required for admission?',
      answer: 'Required documents include birth certificate, previous school leaving certificate, academic transcripts, medical certificate, passport size photographs, and address proof.'
    },
    {
      question: 'Is transportation facility available?',
      answer: 'Yes, we provide safe and reliable school bus service covering major areas of the city. Transportation fee is separate from tuition fee.'
    },
    {
      question: 'What are the school timings?',
      answer: 'School timings are from 8:00 AM to 3:30 PM from Monday to Friday. Saturday is a half day from 8:00 AM to 12:30 PM.'
    },
    {
      question: 'Do you offer scholarships?',
      answer: 'Yes, we offer merit-based scholarships and need-based financial assistance. Applications are reviewed annually.'
    },
    {
      question: 'What is the student-teacher ratio?',
      answer: 'We maintain a healthy student-teacher ratio of 25:1 to ensure personalized attention to each student.'
    },
    {
      question: 'Are there any extracurricular activities?',
      answer: 'Yes, we offer a wide range of extracurricular activities including sports, music, dance, art, drama, debates, and various clubs.'
    },
    {
      question: 'How can parents track their child\'s progress?',
      answer: 'Parents can access the parent portal to view their child\'s academic progress, attendance, assignments, and communicate with teachers.'
    }
  ];

  const supportServices = [
    {
      icon: <Payment />,
      title: 'Fee & Payment',
      description: 'Fee structure information, payment options, and receipts',
      contact: 'accounts@nalandaschool.edu.in'
    },
    {
      icon: <DirectionsBus />,
      title: 'Transportation',
      description: 'Bus routes, timings, and transportation-related queries',
      contact: 'transport@nalandaschool.edu.in'
    },
    {
      icon: <Restaurant />,
      title: 'Cafeteria Services',
      description: 'Meal plans, menu information, and dietary requirements',
      contact: 'cafeteria@nalandaschool.edu.in'
    },
    {
      icon: <LocalHospital />,
      title: 'Health & Medical',
      description: 'Medical emergencies, health records, and wellness programs',
      contact: 'medical@nalandaschool.edu.in'
    },
    {
      icon: <School />,
      title: 'General Inquiries',
      description: 'General information, campus tours, and other queries',
      contact: 'info@nalandaschool.edu.in'
    }
  ];

  const helpResources = [
    'Student Handbook',
    'Parent Guidelines',
    'Academic Calendar',
    'Fee Payment Guide',
    'Transportation Routes',
    'Uniform Guidelines',
    'Emergency Contacts',
    'School Policies'
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 0.8)), url("/images/assistance-hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
            Assistance & Support
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', mx: 'auto' }}>
            We're Here to Help You Every Step of the Way
          </Typography>
        </Container>
      </Box>

      {/* Quick Help */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
          How Can We Help You?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <Phone sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Call Us
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Speak directly with our support team for immediate assistance.
              </Typography>
              <Typography variant="h6" sx={{ color: '#1976d2', mb: 2 }}>
                <a href="tel:+918754343962" style={{ color: '#1976d2', textDecoration: 'none' }}>
                  +91 8754343962
                </a>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mon-Fri: 8:00 AM - 4:00 PM
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <Email sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Email Support
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Send us your queries and we'll respond within 24 hours.
              </Typography>
              <Typography variant="h6" sx={{ color: '#1976d2', mb: 2 }}>
                <a href="mailto:nalandaschool1985@gmail.com" style={{ color: '#1976d2', textDecoration: 'none' }}>
                  nalandaschool1985@gmail.com
                </a>
              </Typography>
              {/* Replaced multiple buttons with a single concise Open Mail button */}
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => {
                  const to = 'nalandaschool1985@gmail.com';
                  const subject = 'Support Request from Website';
                  const rawBody = [
                    'Dear Nalanda School Support Team,',
                    '',
                    'I would like assistance with the following:',
                    'Issue / Question: ________________________________',
                    'Name: ____________________________________________',
                    'Contact Number: __________________________________',
                    'Preferred Time to Reach Me: ______________________',
                    '',
                    'Additional Details:',
                    '_______________________________________________',
                    '',
                    'Thank you.'
                  ].join('\r\n'); // Use CRLF for better Windows client compatibility

                  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(rawBody)}`;

                  // Create a temporary anchor to avoid any React Router or synthetic event interference.
                  const a = document.createElement('a');
                  a.href = mailto;
                  a.style.display = 'none';
                  a.setAttribute('target', '_self');
                  a.setAttribute('rel', 'noopener noreferrer');
                  document.body.appendChild(a);
                  a.click();
                  // Cleanup shortly after
                  setTimeout(() => {
                    if (a && a.parentNode) a.parentNode.removeChild(a);
                  }, 100);

                  // Offer Gmail fallback after delay if still visible
                  setTimeout(() => {
                    if (document.visibilityState === 'visible') {
                      const proceed = window.confirm('If your email compose window did not open, press OK to use Gmail instead.');
                      if (proceed) {
                        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(rawBody)}`;
                        window.open(gmailUrl, '_blank', 'noopener');
                      }
                    }
                  }, 1600);
                }}
              >
                Open Mail
              </Button>
              <Button 
                variant="text" 
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => {
                  navigator.clipboard.writeText('nalandaschool1985@gmail.com');
                  alert('Email copied: nalandaschool1985@gmail.com');
                }}
              >
                Copy Email Address
              </Button>
              {/* Caption removed as per request */}
            </Card>
          </Grid>
          {/* Live Chat card removed as per request */}
        </Grid>
      </Container>

      {/* Support Services */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
            Support Services
          </Typography>
          <Grid container spacing={4}>
            {supportServices.map((service, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          backgroundColor: '#1976d2',
                          color: 'white',
                          borderRadius: '50%',
                          width: 60,
                          height: 60,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                        }}
                      >
                        {service.icon}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {service.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                      {service.description}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      Contact: {service.contact}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      {/* Help Resources */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
            Help Resources
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
                  Quick Links
                </Typography>
                <List>
                  {helpResources.map((resource, index) => (
                    <ListItem key={index} button>
                      <ListItemIcon>
                        <Help sx={{ color: '#1976d2' }} />
                      </ListItemIcon>
                      <ListItemText primary={resource} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
                  Emergency Contacts
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Phone sx={{ color: '#f44336' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Emergency Helpline"
                      secondary="+91 9876543299 (24/7)"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocalHospital sx={{ color: '#f44336' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Medical Emergency"
                      secondary="+91 9876543298"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DirectionsBus sx={{ color: '#f44336' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Transport Emergency"
                      secondary="+91 9876543297"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Support sx={{ color: '#f44336' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Security Desk"
                      secondary="+91 9876543296"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Assistance;