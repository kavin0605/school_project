import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Paper
} from '@mui/material';
import {
  Event,
  CalendarToday,
  LocationOn,
  AccessTime
} from '@mui/icons-material';

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from API first
      try {
        const upcomingResponse = await fetch('/api/events/upcoming');
        if (upcomingResponse.ok) {
          const upcomingData = await upcomingResponse.json();
          setUpcomingEvents(upcomingData.data || []);
        }
        
        const pastResponse = await fetch('/api/events/past');
        if (pastResponse.ok) {
          const pastData = await pastResponse.json();
          setPastEvents(pastData.data || []);
        }
      } catch (apiError) {
        console.log('API not available, using sample data');
      }
      
      // If no past events from API, add sample past events
      if (pastEvents.length === 0) {
        const samplePastEvents = [
          {
            _id: 'sample1',
            title: 'Annual Sports Day 2024',
            description: 'A day filled with exciting sports competitions, showcasing the athletic talents of our students across various games and track events.',
            date: '2024-03-15',
            time: '9:00 AM - 5:00 PM',
            location: 'School Sports Ground',
            category: 'Sports',
            image: '/images/sports.jpg'
          },
          {
            _id: 'sample2', 
            title: 'Science Exhibition 2024',
            description: 'Students presented innovative science projects and experiments, demonstrating their understanding of scientific concepts.',
            date: '2024-02-20',
            time: '10:00 AM - 4:00 PM',
            location: 'Science Laboratory',
            category: 'Academic',
            image: '/images/sciencelab.jpg'
          },
          {
            _id: 'sample3',
            title: 'Smart Classroom Inauguration',
            description: 'Launch of our new digital learning environment with interactive whiteboards and modern technology for enhanced education.',
            date: '2024-01-25',
            time: '6:00 PM - 9:00 PM',
            location: 'Smart Classroom Block',
            category: 'Academic',
            image: '/images/samrt_class.jpg'
          },
          {
            _id: 'sample4',
            title: 'Computer Lab Workshop',
            description: 'An intensive workshop on coding and digital literacy for students to enhance their technical skills.',
            date: '2024-01-10',
            time: '2:00 PM - 6:00 PM',
            location: 'Computer Laboratory',
            category: 'Technical',
            image: '/images/computer.jpg'
          },
          {
            _id: 'sample5',
            title: 'Library Reading Campaign',
            description: 'A month-long reading campaign to encourage students to explore books and develop a love for reading.',
            date: '2023-12-15',
            time: '11:00 AM - 3:00 PM',
            location: 'School Library',
            category: 'Literary',
            image: '/images/library.jpg'
          },
          {
            _id: 'sample6',
            title: 'Cafeteria Food Festival',
            description: 'A special food festival featuring healthy and nutritious meals prepared by our cafeteria team.',
            date: '2023-12-22',
            time: '10:00 AM - 2:00 PM',
            location: 'School Cafeteria',
            category: 'Social',
            image: '/images/caferia.jpg'
          }
        ];
        setPastEvents(samplePastEvents);
      }
      
    } catch (error) {
      console.error('Error loading events:', error);
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          background: 'linear-gradient(rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 0.8)), url("/images/events-hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
            School Events
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Stay Updated with Our Latest Activities and Celebrations
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
          Upcoming Events
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={event._id}>
                  <Card sx={{ height: '100%', maxWidth: 400 }}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={event.image || '/images/default-event.jpg'}
                      alt={event.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                          {event.title}
                        </Typography>
                        <Chip 
                          label={event.category} 
                          size="small" 
                          color="primary"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {event.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarToday sx={{ fontSize: 16, color: '#666' }} />
                          <Typography variant="body2">
                            {new Date(event.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccessTime sx={{ fontSize: 16, color: '#666' }} />
                          <Typography variant="body2">{event.time}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOn sx={{ fontSize: 16, color: '#666' }} />
                          <Typography variant="body2">{event.location}</Typography>
                        </Box>
                      </Box>
                      
                      {event.registrationRequired && (
                        <Box sx={{ mt: 2 }}>
                          <Chip label="Registration Required" size="small" color="warning" />
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Event sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    No upcoming events
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Check back soon for new events and activities!
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Container>

      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
            Past Events
          </Typography>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {pastEvents.length > 0 ? (
                pastEvents.map((event) => (
                  <Grid item xs={12} md={6} key={event._id}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                            {event.title}
                          </Typography>
                          <Chip 
                            label={event.category} 
                            size="small" 
                            color="default"
                            sx={{ ml: 1 }}
                          />
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {event.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarToday sx={{ fontSize: 16, color: '#666' }} />
                          <Typography variant="body2">
                            {new Date(event.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                      No past events to display
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 6, textAlign: 'center', background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)' }}>
          <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
            Stay Updated
          </Typography>
          <Typography variant="h6" sx={{ color: 'white', mb: 4 }}>
            Never miss an event! Get notifications about upcoming school activities.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              backgroundColor: 'white', 
              color: '#1976d2',
              '&:hover': {
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            Subscribe to Notifications
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Events;
