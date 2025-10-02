import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  School,
  Groups,
  EmojiEvents,
  MenuBook,
  Science,
  Sports,
  ArrowForward,
  CheckCircle
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };
  const features = [
    {
      icon: <School />,
      title: 'Academic Excellence',
      description: 'Comprehensive curriculum designed to nurture intellectual growth and critical thinking.',
    },
    {
      icon: <Groups />,
      title: 'Holistic Development',
      description: 'Focus on character building, leadership skills, and social responsibility.',
    },
    {
      icon: <EmojiEvents />,
      title: 'Extra-curricular Activities',
      description: 'Wide range of sports, arts, and cultural activities for overall personality development.',
    },
    {
      icon: <Science />,
      title: 'Modern Facilities',
      description: 'State-of-the-art laboratories, library, and technology-enabled classrooms.',
    },
  ];

  const achievements = [
    'Top 10 Schools in Academic Performance',
    '95% College Admission Success Rate',
    'Award-winning Sports Teams',
    'Excellence in Arts and Culture',
    'Outstanding Community Service',
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 0.8)), url("/images/school-hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 12,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Welcome to Nalanda School
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            A Center of Academic Excellence, Discipline, and Holistic Development
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleNavigation('/admission')}
              sx={{
                backgroundColor: 'white',
                color: '#1976d2',
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
              endIcon={<ArrowForward />}
            >
              Apply for Admission
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => handleNavigation('/about')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{ textAlign: 'center', mb: 2, color: '#1976d2', fontWeight: 'bold' }}
        >
          Why Choose Nalanda School?
        </Typography>
        <Typography
          variant="h6"
          sx={{ textAlign: 'center', mb: 6, color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}
        >
          We are committed to nurturing young minds with knowledge, values, and skills for the future.
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 4,
                  },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    borderRadius: '50%',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                component="h2"
                sx={{ mb: 3, color: '#1976d2', fontWeight: 'bold' }}
              >
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}>
                Nalanda School has long been recognized as a center of academic excellence, discipline, 
                and holistic development. Guided by the vision of nurturing young minds with knowledge 
                and values, we provide a supportive learning environment where students are encouraged 
                to excel not only in academics but also in extracurricular and co-curricular activities.
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.7 }}>
                We are dedicated to shaping future leaders who are confident, responsible, and compassionate, 
                ready to make a positive impact on society.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/about"
                size="large"
                endIcon={<ArrowForward />}
              >
                Read More About Us
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
                  Our Achievements
                </Typography>
                <List>
                  {achievements.map((achievement, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: '#4caf50' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={achievement}
                        primaryTypographyProps={{ fontWeight: 'medium' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Quick Access Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}
        >
          Quick Access
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <MenuBook sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Digital Admission
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Apply online for a seamless and efficient admission process.
              </Typography>
              <Button variant="contained" onClick={() => handleNavigation('/admission')} fullWidth>
                Apply Now
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <EmojiEvents sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Events & News
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Stay updated with latest school events and announcements.
              </Typography>
              <Button variant="contained" onClick={() => handleNavigation('/events')} fullWidth>
                View Events
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Sports sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Campus Tour
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Explore our modern facilities and campus infrastructure.
              </Typography>
              <Button variant="contained" onClick={() => handleNavigation('/campus')} fullWidth>
                Explore Campus
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;