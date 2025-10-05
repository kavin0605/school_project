import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import {
  SupervisorAccount,
  School,
  People,
  Assessment,
  Event,
  Payment,
  Settings,
  Notifications,
  TrendingUp,
  PersonAdd,
  EventAvailable,
  AttachMoney,
  Edit,
  Delete,
  Visibility,
  CalendarToday,
  AccessTime,
  LocationOn
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import StudentManagement from './StudentManagement';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [openEditEvent, setOpenEditEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [students, setStudents] = useState([]);
  const [admissionApplications, setAdmissionApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [events, setEvents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    rollNumber: '',
    admissionNumber: '',
    class: '',
    parentEmail: '',
    parentPhone: '',
    parentName: ''
  });
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'Other',
    image: '/images/default-event.jpg',
    imageFile: null,
    maxParticipants: 0,
    registrationRequired: false
  });

  // Load students and admission applications
  useEffect(() => {
    loadStudents();
    loadAdmissionApplications();
    loadEvents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await fetch('/api/admin/students', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStudents(data.students || []);
      }
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const loadAdmissionApplications = async () => {
    try {
      const response = await fetch('/api/admissions/applications', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAdmissionApplications(data.data || []);
      }
    } catch (error) {
      console.error('Error loading admission applications:', error);
    }
  };

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data.data || []);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const handleAddStudent = async () => {
    try {
      const response = await fetch('/api/admin/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newStudent)
      });

      const result = await response.json();

      if (response.ok) {
        setOpenAddStudent(false);
        setNewStudent({
          firstName: '',
          lastName: '',
          rollNumber: '',
          admissionNumber: '',
          class: '',
          parentEmail: '',
          parentPhone: '',
          parentName: ''
        });
        // Always reload students list to get latest data
        loadStudents();
        alert('Student added successfully!');
      } else {
        // Even if there's an error, reload the students list in case the student was actually created
        loadStudents();
        
        // Show more detailed error
        if (result.message) {
          alert('Error: ' + result.message);
        } else {
          alert('Error adding student - please check if student was created in the list');
        }
      }
    } catch (error) {
      console.error('Error adding student:', error);
      // Always reload students list in case the student was actually created
      loadStudents();
      alert('Network error - please check if student was created in the list');
    }
  };

  const approveApplication = async (applicationId) => {
    if (!window.confirm('Are you sure you want to approve this application? The applicant will be notified to visit the school with original documents within one week.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admissions/simple-approve/${applicationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        loadAdmissionApplications();
        alert('✅ Application approved successfully!\n\n📧 The applicant has been notified to:\n• Bring original documents\n• Visit school within one week\n• Complete face-to-face admission process');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error approving application:', error);
      alert('Error approving application');
    }
  };

  const [lastUploadError, setLastUploadError] = React.useState(null);

  const handleAddEvent = async () => {
    try {
      let eventData = { ...newEvent };
      
      // If user uploaded a file, handle the file upload
      if (newEvent.imageFile) {
        const formData = new FormData();
        formData.append('image', newEvent.imageFile);
        
        // Upload the image first
        const uploadResponse = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData
        });
        
        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          eventData.image = uploadResult.imageUrl;
        } else {
          const txt = await uploadResponse.text();
          console.error('Image upload failed (add event). Status:', uploadResponse.status, 'Body:', txt);
          setLastUploadError('Image upload failed (add event).');
          alert('Failed to upload image. Using default image.');
          eventData.image = '/images/default-event.jpg';
        }
      }
      
      // Remove imageFile from the data sent to API
      delete eventData.imageFile;

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });

      const result = await response.json();

      if (response.ok) {
        setOpenAddEvent(false);
        setNewEvent({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          category: 'Other',
          image: '/images/default-event.jpg',
          imageFile: null,
          maxParticipants: 0,
          registrationRequired: false
        });
        loadEvents();
        alert('Event created successfully!');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Network error - please try again');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`/api/events/${eventId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          loadEvents();
          alert('Event deleted successfully!');
        } else {
          alert('Error deleting event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Network error - please try again');
      }
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: event.date.split('T')[0], // Convert to YYYY-MM-DD format
      time: event.time,
      location: event.location,
      category: event.category,
      image: event.image,
      imageFile: null,
      maxParticipants: event.maxParticipants || 0,
      registrationRequired: event.registrationRequired || false
    });
    setOpenEditEvent(true);
  };

  const handleUpdateEvent = async () => {
    try {
      let eventData = { ...newEvent };
      
      // If user uploaded a file, handle the file upload
      if (newEvent.imageFile) {
        const formData = new FormData();
        formData.append('image', newEvent.imageFile);
        
        // Upload the image first
        const uploadResponse = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData
        });
        
        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          eventData.image = uploadResult.imageUrl;
        } else {
          const txt = await uploadResponse.text();
          console.error('Image upload failed (update event). Status:', uploadResponse.status, 'Body:', txt);
          setLastUploadError('Image upload failed (update event).');
          alert('Failed to upload image. Keeping existing image.');
        }
      }
      
      // Remove imageFile from the data sent to API
      delete eventData.imageFile;

      const response = await fetch(`/api/events/${editingEvent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });

      const result = await response.json();

      if (response.ok) {
        setOpenEditEvent(false);
        setEditingEvent(null);
        setNewEvent({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          category: 'Other',
          image: '/images/default-event.jpg',
          imageFile: null,
          maxParticipants: 0,
          registrationRequired: false
        });
        loadEvents();
        alert('Event updated successfully!');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Network error - please try again');
    }
  };

  const handleEventInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const statsCards = [
    { title: 'Total Students', count: students.length.toString(), icon: School, color: '#1976d2' },
    { title: 'Total Events', count: events.length.toString(), icon: Event, color: '#388e3c' },
    { title: 'Pending Admissions', count: admissionApplications.filter(app => app.status === 'pending').length.toString(), icon: PersonAdd, color: '#f57c00' },
    { title: 'Upcoming Events', count: events.filter(event => new Date(event.date) > new Date()).length.toString(), icon: EventAvailable, color: '#7b1fa2' },
  ];

  const recentActivities = [
    { action: 'New student admission', time: '2 hours ago', type: 'admission' },
    { action: 'Fee payment received', time: '4 hours ago', type: 'payment' },
    { action: 'Teacher attendance marked', time: '6 hours ago', type: 'attendance' },
    { action: 'Event scheduled', time: '1 day ago', type: 'event' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: '#1976d2' }}>
            <SupervisorAccount />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary">Welcome back,</Typography>
            <Typography variant="h6">{user?.email}</Typography>
          </Box>
          <Button variant="outlined" onClick={logout} sx={{ ml: 2 }}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
          <Tab label="Dashboard" />
          <Tab label="Students" />
          <Tab label="Student Management" />
          <Tab label="Admission Applications" />
        </Tabs>
      </Paper>

      {/* Dashboard Tab */}
      {currentTab === 0 && (
        <>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {statsCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography color="text.secondary" gutterBottom variant="overline">
                          {card.title}
                        </Typography>
                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                          {card.count}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: card.color, width: 56, height: 56 }}>
                        <card.icon fontSize="large" />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            {/* Quick Actions */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card 
                      sx={{ 
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateY(-2px)' }
                      }}
                      onClick={() => setOpenAddStudent(true)}
                    >
                      <CardContent sx={{ textAlign: 'center' }}>
                        <PersonAdd sx={{ fontSize: 40, color: '#1976d2', mb: 2 }} />
                        <Typography variant="body2">Add New Student</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card 
                      sx={{ 
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateY(-2px)' }
                      }}
                      onClick={() => setCurrentTab(3)}
                    >
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Assessment sx={{ fontSize: 40, color: '#1976d2', mb: 2 }} />
                        <Typography variant="body2">Review Applications</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card 
                      sx={{ 
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateY(-2px)' }
                      }}
                      onClick={() => setCurrentTab(2)}
                    >
                      <CardContent sx={{ textAlign: 'center' }}>
                        <School sx={{ fontSize: 40, color: '#1976d2', mb: 2 }} />
                        <Typography variant="body2">Manage Students</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card 
                      sx={{ 
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateY(-2px)' }
                      }}
                      onClick={() => setCurrentTab(3)}
                    >
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Event sx={{ fontSize: 40, color: '#388e3c', mb: 2 }} />
                        <Typography variant="body2">Manage Events</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Recent Activities */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Recent Activities
                </Typography>
                <List>
                  {recentActivities.map((activity, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        {activity.type === 'admission' && <PersonAdd color="primary" />}
                        {activity.type === 'payment' && <AttachMoney color="success" />}
                        {activity.type === 'attendance' && <People color="info" />}
                        {activity.type === 'event' && <EventAvailable color="warning" />}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.action}
                        secondary={activity.time}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}

      {/* Students Tab */}
      {currentTab === 1 && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Student Management
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<PersonAdd />}
              onClick={() => setOpenAddStudent(true)}
            >
              Add New Student
            </Button>
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Admission Number</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Parent</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.rollNumber || student._id}>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.admissionNumber || 'N/A'}</TableCell>
                    <TableCell>{student.personalInfo?.firstName} {student.personalInfo?.lastName}</TableCell>
                    <TableCell>{student.academicInfo?.class}</TableCell>
                    <TableCell>{student.personalInfo?.email}</TableCell>
                    <TableCell>{student.parentInfo?.parentEmail}</TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small" color="secondary">
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {students.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No students found. Add your first student!
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {/* Student Management Tab */}
      {currentTab === 2 && (
        <StudentManagement />
      )}

      {/* Admission Applications Tab */}
      {currentTab === 3 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Admission Applications
          </Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Application ID</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Parent Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admissionApplications.map((application) => (
                  <TableRow key={application._id}>
                    <TableCell>{application.applicationNumber}</TableCell>
                    <TableCell>{application.studentInfo?.firstName} {application.studentInfo?.lastName}</TableCell>
                    <TableCell>{application.studentInfo?.class}</TableCell>
                    <TableCell>{application.parentInfo?.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={application.status} 
                        color={application.status === 'pending' ? 'warning' : application.status === 'approved' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {application.status === 'pending' && (
                        <Button 
                          size="small" 
                          variant="contained" 
                          color="success"
                          onClick={() => approveApplication(application._id)}
                        >
                          Approve
                        </Button>
                      )}
                      <IconButton 
                        size="small" 
                        color="primary" 
                        sx={{ ml: 1 }}
                        onClick={() => setSelectedApplication(application)}
                      >
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {admissionApplications.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No admission applications found.
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {/* Events Management Tab */}
      {currentTab === 3 && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Event Management
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Event />}
              onClick={() => setOpenAddEvent(true)}
            >
              Create Event
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid item xs={12} md={6} lg={4} key={event._id}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={event.image}
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
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarToday sx={{ fontSize: 16, color: '#666' }} />
                        <Typography variant="body2">
                          {new Date(event.date).toLocaleDateString()}
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
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip 
                        label={new Date(event.date) > new Date() ? 'Upcoming' : 'Past'} 
                        size="small"
                        color={new Date(event.date) > new Date() ? 'success' : 'default'}
                      />
                      {event.registrationRequired && (
                        <Chip label="Registration Required" size="small" color="warning" />
                      )}
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        size="small" 
                        color="primary" 
                        startIcon={<Edit />}
                        onClick={() => handleEditEvent(event)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="small" 
                        color="error" 
                        startIcon={<Delete />}
                        onClick={() => handleDeleteEvent(event._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {events.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Event sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No events found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Create your first event to get started
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<Event />}
                onClick={() => setOpenAddEvent(true)}
              >
                Create Event
              </Button>
            </Box>
          )}
        </Paper>
      )}

      {/* Add Student Dialog */}
      <Dialog open={openAddStudent} onClose={() => setOpenAddStudent(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={newStudent.firstName}
                onChange={(e) => setNewStudent({...newStudent, firstName: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={newStudent.lastName}
                onChange={(e) => setNewStudent({...newStudent, lastName: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Roll Number"
                value={newStudent.rollNumber}
                onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Admission Number"
                value={newStudent.admissionNumber}
                onChange={(e) => setNewStudent({...newStudent, admissionNumber: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  value={newStudent.class}
                  label="Class"
                  onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                >
                  <MenuItem value="1">Class 1</MenuItem>
                  <MenuItem value="2">Class 2</MenuItem>
                  <MenuItem value="3">Class 3</MenuItem>
                  <MenuItem value="4">Class 4</MenuItem>
                  <MenuItem value="5">Class 5</MenuItem>
                  <MenuItem value="6">Class 6</MenuItem>
                  <MenuItem value="7">Class 7</MenuItem>
                  <MenuItem value="8">Class 8</MenuItem>
                  <MenuItem value="9">Class 9</MenuItem>
                  <MenuItem value="10">Class 10</MenuItem>
                  <MenuItem value="11">Class 11</MenuItem>
                  <MenuItem value="12">Class 12</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Parent Name"
                value={newStudent.parentName}
                onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Parent Email"
                type="email"
                value={newStudent.parentEmail}
                onChange={(e) => setNewStudent({...newStudent, parentEmail: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Parent Phone"
                value={newStudent.parentPhone}
                onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddStudent(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddStudent}>Add Student</Button>
        </DialogActions>
      </Dialog>

      {/* Add Event Dialog */}
      <Dialog open={openAddEvent} onClose={() => setOpenAddEvent(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Title"
                name="title"
                value={newEvent.title}
                onChange={handleEventInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Description"
                name="description"
                value={newEvent.description}
                onChange={handleEventInputChange}
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Event Date"
                name="date"
                type="date"
                value={newEvent.date}
                onChange={handleEventInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Event Time"
                name="time"
                type="time"
                value={newEvent.time}
                onChange={handleEventInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={newEvent.location}
                onChange={handleEventInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={newEvent.category}
                  label="Category"
                  onChange={handleEventInputChange}
                >
                  <MenuItem value="Academic">Academic</MenuItem>
                  <MenuItem value="Sports">Sports</MenuItem>
                  <MenuItem value="Cultural">Cultural</MenuItem>
                  <MenuItem value="Celebration">Celebration</MenuItem>
                  <MenuItem value="National">National</MenuItem>
                  <MenuItem value="Competition">Competition</MenuItem>
                  <MenuItem value="Workshop">Workshop</MenuItem>
                  <MenuItem value="Meeting">Meeting</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Event Image (Optional)
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{ minWidth: '140px' }}
                  >
                    Choose from Device
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          // Create a temporary URL for preview
                          const imageUrl = URL.createObjectURL(file);
                          setNewEvent({
                            ...newEvent,
                            image: imageUrl,
                            imageFile: file
                          });
                        }
                      }}
                    />
                  </Button>
                  <Typography variant="body2" color="text.secondary">
                    OR
                  </Typography>
                  <FormControl sx={{ minWidth: '200px' }}>
                    <InputLabel>Choose from Gallery</InputLabel>
                    <Select
                      name="image"
                      value={newEvent.imageFile ? '' : newEvent.image}
                      onChange={handleEventInputChange}
                      label="Choose from Gallery"
                      disabled={!!newEvent.imageFile}
                    >
                      <MenuItem value="">No Image</MenuItem>
                      <MenuItem value="/images/sports.jpg">Sports Facilities</MenuItem>
                      <MenuItem value="/images/sciencelab.jpg">Science Laboratory</MenuItem>
                      <MenuItem value="/images/samrt_class.jpg">Smart Classroom</MenuItem>
                      <MenuItem value="/images/computer.jpg">Computer Lab</MenuItem>
                      <MenuItem value="/images/library.jpg">Library</MenuItem>
                      <MenuItem value="/images/caferia.jpg">Cafeteria</MenuItem>
                      <MenuItem value="/images/download.jpg">School Image 1</MenuItem>
                      <MenuItem value="/images/download-1.jpg">School Image 2</MenuItem>
                      <MenuItem value="/images/download-2.jpg">School Image 3</MenuItem>
                      <MenuItem value="/images/download-3.jpg">School Image 4</MenuItem>
                      <MenuItem value="/images/download-4.jpg">School Image 5</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {newEvent.image && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Preview:
                    </Typography>
                    <img
                      src={newEvent.image}
                      alt="Event preview"
                      style={{
                        width: '100px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                      }}
                    />
                    <Button
                      size="small"
                      onClick={() => {
                        setNewEvent({
                          ...newEvent,
                          image: '',
                          imageFile: null
                        });
                      }}
                      sx={{ ml: 1 }}
                    >
                      Remove
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Max Participants (0 = Unlimited)"
                name="maxParticipants"
                type="number"
                value={newEvent.maxParticipants}
                onChange={handleEventInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Registration Required</InputLabel>
                <Select
                  name="registrationRequired"
                  value={newEvent.registrationRequired}
                  label="Registration Required"
                  onChange={handleEventInputChange}
                >
                  <MenuItem value={false}>No</MenuItem>
                  <MenuItem value={true}>Yes</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddEvent(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddEvent}>Create Event</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={openEditEvent} onClose={() => setOpenEditEvent(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Event Title"
                name="title"
                value={newEvent.title}
                onChange={handleEventInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Event Description"
                name="description"
                value={newEvent.description}
                onChange={handleEventInputChange}
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Event Date"
                name="date"
                type="date"
                value={newEvent.date}
                onChange={handleEventInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Event Time"
                name="time"
                type="time"
                value={newEvent.time}
                onChange={handleEventInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={newEvent.location}
                onChange={handleEventInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={newEvent.category}
                  onChange={handleEventInputChange}
                  label="Category"
                >
                  <MenuItem value="Academic">Academic</MenuItem>
                  <MenuItem value="Sports">Sports</MenuItem>
                  <MenuItem value="Cultural">Cultural</MenuItem>
                  <MenuItem value="Festival">Festival</MenuItem>
                  <MenuItem value="Competition">Competition</MenuItem>
                  <MenuItem value="Meeting">Meeting</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Event Image (Optional)
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{ minWidth: '140px' }}
                  >
                    Choose from Device
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const imageUrl = URL.createObjectURL(file);
                          setNewEvent({
                            ...newEvent,
                            image: imageUrl,
                            imageFile: file
                          });
                        }
                      }}
                    />
                  </Button>
                  <Typography variant="body2" color="text.secondary">
                    OR
                  </Typography>
                  <FormControl sx={{ minWidth: '200px' }}>
                    <InputLabel>Choose from Gallery</InputLabel>
                    <Select
                      name="image"
                      value={newEvent.imageFile ? '' : newEvent.image}
                      onChange={handleEventInputChange}
                      label="Choose from Gallery"
                      disabled={!!newEvent.imageFile}
                    >
                      <MenuItem value="">No Image</MenuItem>
                      <MenuItem value="/images/sports.jpg">Sports Facilities</MenuItem>
                      <MenuItem value="/images/sciencelab.jpg">Science Laboratory</MenuItem>
                      <MenuItem value="/images/samrt_class.jpg">Smart Classroom</MenuItem>
                      <MenuItem value="/images/computer.jpg">Computer Lab</MenuItem>
                      <MenuItem value="/images/library.jpg">Library</MenuItem>
                      <MenuItem value="/images/caferia.jpg">Cafeteria</MenuItem>
                      <MenuItem value="/images/download.jpg">School Image 1</MenuItem>
                      <MenuItem value="/images/download-1.jpg">School Image 2</MenuItem>
                      <MenuItem value="/images/download-2.jpg">School Image 3</MenuItem>
                      <MenuItem value="/images/download-3.jpg">School Image 4</MenuItem>
                      <MenuItem value="/images/download-4.jpg">School Image 5</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {newEvent.image && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Preview:
                    </Typography>
                    <img
                      src={newEvent.image}
                      alt="Event preview"
                      style={{
                        width: '100px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                      }}
                    />
                    <Button
                      size="small"
                      onClick={() => {
                        setNewEvent({
                          ...newEvent,
                          image: '',
                          imageFile: null
                        });
                      }}
                      sx={{ ml: 1 }}
                    >
                      Remove
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Max Participants (0 = Unlimited)"
                name="maxParticipants"
                type="number"
                value={newEvent.maxParticipants}
                onChange={handleEventInputChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Registration Required</InputLabel>
                <Select
                  name="registrationRequired"
                  value={newEvent.registrationRequired}
                  onChange={handleEventInputChange}
                  label="Registration Required"
                >
                  <MenuItem value={false}>No</MenuItem>
                  <MenuItem value={true}>Yes</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditEvent(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateEvent}>Update Event</Button>
        </DialogActions>
      </Dialog>

      {/* Application Details Dialog */}
      <Dialog 
        open={!!selectedApplication} 
        onClose={() => setSelectedApplication(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Application Details - {selectedApplication?.applicationNumber}
        </DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                {/* Student Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    Student Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">First Name:</Typography>
                      <Typography variant="body1">{selectedApplication.studentInfo?.firstName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Last Name:</Typography>
                      <Typography variant="body1">{selectedApplication.studentInfo?.lastName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Date of Birth:</Typography>
                      <Typography variant="body1">
                        {selectedApplication.studentInfo?.dateOfBirth ? 
                          new Date(selectedApplication.studentInfo.dateOfBirth).toLocaleDateString() : 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Gender:</Typography>
                      <Typography variant="body1">{selectedApplication.studentInfo?.gender}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Class:</Typography>
                      <Typography variant="body1">{selectedApplication.studentInfo?.class}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Previous School:</Typography>
                      <Typography variant="body1">{selectedApplication.studentInfo?.previousSchool || 'N/A'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">Medical Conditions:</Typography>
                      <Typography variant="body1">{selectedApplication.studentInfo?.medicalConditions || 'None'}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Parent Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    Parent Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Father's Name:</Typography>
                      <Typography variant="body1">{selectedApplication.parentInfo?.fatherName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Mother's Name:</Typography>
                      <Typography variant="body1">{selectedApplication.parentInfo?.motherName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Email:</Typography>
                      <Typography variant="body1">{selectedApplication.parentInfo?.email}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Phone:</Typography>
                      <Typography variant="body1">{selectedApplication.parentInfo?.phone}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">Occupation:</Typography>
                      <Typography variant="body1">{selectedApplication.parentInfo?.occupation || 'N/A'}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Address Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    Address
                  </Typography>
                  <Typography variant="body1">
                    {selectedApplication.parentInfo?.address?.street}<br/>
                    {selectedApplication.parentInfo?.address?.city}, {selectedApplication.parentInfo?.address?.state}<br/>
                    {selectedApplication.parentInfo?.address?.zipCode}, {selectedApplication.parentInfo?.address?.country}
                  </Typography>
                </Grid>

                {/* Application Status */}
                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    Application Status
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Status:</Typography>
                      <Chip 
                        label={selectedApplication.status} 
                        color={selectedApplication.status === 'pending' ? 'warning' : selectedApplication.status === 'approved' ? 'success' : 'error'}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Submission Date:</Typography>
                      <Typography variant="body1">
                        {new Date(selectedApplication.submissionDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    {selectedApplication.assignedRollNumber && (
                      <>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">Assigned Roll Number:</Typography>
                          <Typography variant="body1">{selectedApplication.assignedRollNumber}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">Assigned Class:</Typography>
                          <Typography variant="body1">{selectedApplication.assignedClass}</Typography>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedApplication(null)}>Close</Button>
          {selectedApplication?.status === 'pending' && (
            <Button 
              variant="contained" 
              color="success"
              onClick={() => {
                approveApplication(selectedApplication._id);
                setSelectedApplication(null);
              }}
            >
              Approve Application
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;