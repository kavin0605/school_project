import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material';
import {
  Visibility,
  Psychology,
  EmojiEvents,
  Groups,
  School,
  StarRate
} from '@mui/icons-material';

const About = () => {
  const values = [
    {
      icon: <School />,
      title: 'Academic Excellence',
      description: 'Commitment to highest standards of teaching and learning'
    },
    {
      icon: <Psychology />,
      title: 'Character Building',
      description: 'Developing moral values and ethical principles'
    },
    {
      icon: <Groups />,
      title: 'Community Spirit',
      description: 'Fostering teamwork and social responsibility'
    },
    {
      icon: <EmojiEvents />,
      title: 'Innovation',
      description: 'Encouraging creativity and forward-thinking'
    }
  ];

  const faculty = [
    {
      name: 'Dr. Rajesh Kumar',
      position: 'Principal',
      qualification: 'Ph.D. in Education, M.Ed.',
      experience: '25 years'
    },
    {
      name: 'Mrs. Priya Sharma',
      position: 'Vice Principal',
      qualification: 'M.A. English, B.Ed.',
      experience: '20 years'
    },
    {
      name: 'Mr. Amit Patel',
      position: 'Academic Coordinator',
      qualification: 'M.Sc. Mathematics, B.Ed.',
      experience: '15 years'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 0.8)), url("/images/about-hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
            About Nalanda School
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Nurturing Excellence Since 1985
          </Typography>
        </Container>
      </Box>

      {/* Vision & Mission */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Visibility sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  Our Vision
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                To be a leading educational institution that nurtures young minds to become 
                confident, responsible, and compassionate global citizens who contribute 
                positively to society while maintaining their cultural roots and values.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Psychology sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  Our Mission
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                To provide quality education that emphasizes academic excellence, character 
                development, and holistic growth through innovative teaching methods, 
                modern facilities, and a supportive learning environment.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* School History */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
            Our Journey
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                Nalanda School was established in 1985 with a vision to create an educational 
                institution that would combine traditional values with modern educational practices. 
                Named after the ancient Nalanda University, a symbol of learning and knowledge, 
                our school has consistently maintained its commitment to academic excellence and 
                character development.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                Over the past four decades, we have grown from a small school with 50 students 
                to a comprehensive educational institution serving over 2000 students from 
                kindergarten through grade 12. Our alumni have gone on to excel in various 
                fields including medicine, engineering, arts, and public service.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Today, Nalanda School stands as a beacon of quality education, continuously 
                evolving to meet the changing needs of the 21st century while staying true 
                to our core values of integrity, excellence, and service.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
                  Key Milestones
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <StarRate sx={{ color: '#ffa726' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="1985 - School Founded"
                      secondary="Started with 50 students"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarRate sx={{ color: '#ffa726' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="1995 - First Batch of Grade 12"
                      secondary="100% pass rate achieved"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarRate sx={{ color: '#ffa726' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="2005 - Digital Infrastructure"
                      secondary="Computer labs and smart classrooms"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarRate sx={{ color: '#ffa726' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="2015 - International Accreditation"
                      secondary="ISO 9001:2015 certified"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <StarRate sx={{ color: '#ffa726' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="2025 - Digital Admission System"
                      secondary="Modern technology integration"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
          Our Core Values
        </Typography>
        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
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
                  {value.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Leadership Team */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
            Leadership Team
          </Typography>
          <Grid container spacing={4}>
            {faculty.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ textAlign: 'center', p: 4 }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 3,
                      backgroundColor: '#1976d2',
                      fontSize: '2rem'
                    }}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
                    {member.position}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Qualification:</strong> {member.qualification}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Experience:</strong> {member.experience}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;