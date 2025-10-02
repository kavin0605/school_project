import React, { useState } from 'react';
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
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  CardMedia
} from '@mui/material';
import {
  School,
  Science,
  Computer,
  LocalLibrary,
  SportsBasketball,
  Restaurant,
  DirectionsBus,
  Security,
  Wifi,
  LocalHospital,
  Close,
  ChevronLeft,
  ChevronRight,
  LocationOn
} from '@mui/icons-material';

const Campus = () => {
  const [virtualTourOpen, setVirtualTourOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // School images array
  const schoolImages = [
    {
      src: '/images/download.jpg',
      title: 'School Main Building',
      description: 'Our beautiful main building housing administrative offices and classrooms'
    },
    {
      src: '/images/download-1.jpg',
      title: 'Campus Overview',
      description: 'Aerial view of our spacious campus with modern facilities'
    },
    {
      src: '/images/download-2.jpg',
      title: 'Student Activities',
      description: 'Students engaged in various academic and extracurricular activities'
    },
    {
      src: '/images/download-3.jpg',
      title: 'Learning Environment',
      description: 'Modern classrooms equipped with latest technology'
    },
    {
      src: '/images/download-4.jpg',
      title: 'School Facilities',
      description: 'State-of-the-art facilities for comprehensive education'
    },
    {
      src: '/images/nalandas-school-campus.avif',
      title: 'Nalanda School Campus',
      description: 'Complete view of Nalanda Higher Secondary School campus'
    }
  ];

  const handleVirtualTourOpen = () => {
    setVirtualTourOpen(true);
    setCurrentImage(0);
  };

  const handleVirtualTourClose = () => {
    setVirtualTourOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % schoolImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + schoolImages.length) % schoolImages.length);
  };

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps/place/Nalandas+School/@11.4234429,77.9386195,17z/data=!3m1!4b1!4m6!3m5!1s0x3babdf8fdbe713af:0x9e31a72be2c2f0ba!8m2!3d11.4234429!4d77.9411944!16s%2Fg%2F11dfjpyy3t?entry=ttu&g_ep=EgoyMDI1MDkyOS4wIKXMDSoASAFQAw%3D%3D', '_blank');
  };
  const facilities = [
    {
      icon: <School />,
      title: 'Smart Classrooms',
      description: 'Technology-enabled classrooms with interactive whiteboards and projectors.',
      features: ['Interactive Whiteboards', 'Audio-Visual Systems', 'Air Conditioning', 'Ergonomic Furniture'],
      image: '/images/samrt_class.jpg'
    },
    {
      icon: <Science />,
      title: 'Science Laboratories',
      description: 'Well-equipped labs for Physics, Chemistry, and Biology experiments.',
      features: ['Modern Equipment', 'Safety Protocols', 'Individual Workstations', 'Digital Microscopes'],
      image: '/images/sciencelab.jpg'
    },
    {
      icon: <Computer />,
      title: 'Computer Lab',
      description: 'State-of-the-art computer lab with high-speed internet connectivity.',
      features: ['Latest Computers', 'High-Speed Internet', 'Programming Software', 'Robotics Kit'],
      image: '/images/computer.jpg'
    },
    {
      icon: <LocalLibrary />,
      title: 'Library',
      description: 'Comprehensive library with books, digital resources, and reading spaces.',
      features: ['10,000+ Books', 'Digital Library', 'Study Rooms', 'Online Databases'],
      image: '/images/library.jpg'
    },
    {
      icon: <SportsBasketball />,
      title: 'Sports Facilities',
      description: 'Extensive sports facilities for various indoor and outdoor games.',
      features: ['Football Ground', 'Basketball Court', 'Indoor Games', 'Swimming Pool'],
      image: '/images/sports.jpg'
    },
    {
      icon: <Restaurant />,
      title: 'Cafeteria',
      description: 'Hygienic cafeteria serving nutritious meals and snacks.',
      features: ['Healthy Menu', 'Hygienic Environment', 'Affordable Prices', 'Special Diets'],
      image: '/images/caferia.jpg'
    }
  ];

  const infrastructure = [
    { icon: <Security />, title: 'Security', description: '24/7 security with CCTV monitoring' },
    { icon: <DirectionsBus />, title: 'Transportation', description: 'Safe school bus service to all areas' },
    { icon: <Wifi />, title: 'Wi-Fi Campus', description: 'High-speed internet throughout campus' },
    { icon: <LocalHospital />, title: 'Medical Room', description: 'First-aid facility with qualified nurse' }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 0.8)), url("/images/campus-hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
            Campus & Facilities
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
            Explore Our Modern Infrastructure and World-Class Facilities
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleVirtualTourOpen}
            sx={{
              backgroundColor: 'white',
              color: '#1976d2',
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            Take Virtual Tour
          </Button>
        </Container>
      </Box>

      {/* Main Facilities */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
          Our Facilities
        </Typography>
        <Grid container spacing={4}>
          {facilities.map((facility, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%' }}>
                {/* Facility Image */}
                <CardMedia
                  component="img"
                  height="200"
                  image={facility.image}
                  alt={facility.title}
                  sx={{ objectFit: 'cover' }}
                />
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
                      {facility.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      {facility.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                    {facility.description}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>
                    Key Features:
                  </Typography>
                  <List dense>
                    {facility.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <ListItemText primary={`• ${feature}`} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Infrastructure */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
            Campus Infrastructure
          </Typography>
          <Grid container spacing={4}>
            {infrastructure.map((item, index) => (
              <Grid item xs={12} md={3} key={index}>
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
                    {item.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Campus Statistics */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
          Campus at a Glance
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h3" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}>
                15
              </Typography>
              <Typography variant="h6">
                Acres Campus
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h3" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}>
                50+
              </Typography>
              <Typography variant="h6">
                Classrooms
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h3" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}>
                10
              </Typography>
              <Typography variant="h6">
                Laboratories
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h3" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}>
                2000+
              </Typography>
              <Typography variant="h6">
                Students
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Virtual Tour */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
            Virtual Campus Tour
          </Typography>
          
          {/* Image Gallery Preview */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {schoolImages.slice(0, 3).map((image, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ cursor: 'pointer' }} onClick={handleVirtualTourOpen}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={image.src}
                    alt={image.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {image.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {image.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Explore Our Beautiful Campus
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Take a virtual tour through our modern facilities and see what makes Nalanda School special.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large"
                onClick={handleVirtualTourOpen}
              >
                Start Virtual Tour
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={openGoogleMaps}
                startIcon={<LocationOn />}
              >
                View on Maps
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Location Map Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
          Find Us Here
        </Typography>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Visit Nalanda School
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Located in Tiruchengode, our campus is easily accessible and provides a perfect learning environment for students.
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Address:
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Nalanda Higher Secondary School<br />
                Tiruchengode, Tamil Nadu<br />
                India
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                onClick={openGoogleMaps}
                startIcon={<LocationOn />}
                fullWidth
              >
                Get Directions
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: 400,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={openGoogleMaps}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.1234567890!2d77.9386195!3d11.4234429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babdf8fdbe713af%3A0x9e31a72be2c2f0ba!2sNalandas%20School!5e0!3m2!1sen!2sin!4v1696234567890!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nalanda School Location"
                ></iframe>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Virtual Tour Dialog */}
      <Dialog
        open={virtualTourOpen}
        onClose={handleVirtualTourClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { height: '90vh' }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Virtual Campus Tour - {schoolImages[currentImage]?.title}
          </Typography>
          <IconButton onClick={handleVirtualTourClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <Box sx={{ position: 'relative', height: '100%' }}>
            <img
              src={schoolImages[currentImage]?.src}
              alt={schoolImages[currentImage]?.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
            
            {/* Navigation Buttons */}
            <IconButton
              onClick={prevImage}
              sx={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)'
                }
              }}
            >
              <ChevronLeft />
            </IconButton>
            
            <IconButton
              onClick={nextImage}
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)'
                }
              }}
            >
              <ChevronRight />
            </IconButton>
            
            {/* Image Description */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                p: 3
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                {schoolImages[currentImage]?.title}
              </Typography>
              <Typography variant="body2">
                {schoolImages[currentImage]?.description}
              </Typography>
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                Image {currentImage + 1} of {schoolImages.length}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Campus;