import React, { useState } from 'react';
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
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab
} from '@mui/material';
import {
  PersonAdd,
  School,
  Grade,
  Payment,
  Event,
  DirectionsBus,
  Message,
  CalendarToday,
  Assignment,
  TrendingUp,
  Schedule,
  Notifications
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const ParentDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedChild, setSelectedChild] = useState(0);

  // Mock data - in real app, this would come from API
  const children = [
    {
      name: 'Arjun Sharma',
      studentId: 'NS2025001',
      class: '10th Grade',
      section: 'A',
      rollNumber: '15',
      attendance: 95.2,
      photo: null
    },
    {
      name: 'Priya Sharma',
      studentId: 'NS2025045',
      class: '7th Grade',
      section: 'B',
      rollNumber: '23',
      attendance: 98.1,
      photo: null
    }
  ];

  const currentChild = children[selectedChild];

  const academicData = [
    { subject: 'Mathematics', grade: 'A+', percentage: 95, teacher: 'Mrs. Singh' },
    { subject: 'Science', grade: 'A', percentage: 89, teacher: 'Mr. Kumar' },
    { subject: 'English', grade: 'A', percentage: 92, teacher: 'Ms. Patel' },
    { subject: 'History', grade: 'B+', percentage: 85, teacher: 'Mr. Gupta' },
  ];

  const upcomingEvents = [
    { title: 'Parent-Teacher Meeting', date: '2025-01-25', type: 'meeting' },
    { title: 'Mathematics Test', date: '2025-01-28', type: 'exam' },
    { title: 'Science Fair', date: '2025-02-01', type: 'event' },
    { title: 'Sports Day', date: '2025-02-05', type: 'sports' },
  ];

  const feeStatus = {
    totalAmount: 25000,
    paidAmount: 15000,
    pendingAmount: 10000,
    dueDate: '2025-01-31',
    status: 'partial'
  };

  const quickActions = [
    { title: 'View Report Card', icon: Grade, color: '#1976d2' },
    { title: 'Fee Payment', icon: Payment, color: '#388e3c' },
    { title: 'Teacher Communication', icon: Message, color: '#f57c00' },
    { title: 'Transport Tracking', icon: DirectionsBus, color: '#7b1fa2' },
    { title: 'Event Calendar', icon: CalendarToday, color: '#d32f2f' },
    { title: 'Download Documents', icon: Assignment, color: '#1976d2' },
  ];

  const notifications = [
    { message: 'Mathematics test scheduled for next week', time: '2 hours ago', type: 'academic' },
    { message: 'Fee payment due in 10 days', time: '1 day ago', type: 'fee' },
    { message: 'Parent-teacher meeting confirmed', time: '2 days ago', type: 'meeting' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            Parent Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Monitor your child's academic progress and school activities.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: '#ff9800' }}>
            <PersonAdd />
          </Avatar>
          <Button variant="outlined" color="primary" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Child Selection Tabs */}
      {children.length > 1 && (
        <Paper sx={{ mb: 4 }}>
          <Tabs 
            value={selectedChild} 
            onChange={(e, newValue) => setSelectedChild(newValue)}
            variant="fullWidth"
          >
            {children.map((child, index) => (
              <Tab 
                key={index}
                label={`${child.name} (${child.class})`}
                sx={{ textTransform: 'none', fontWeight: 'bold' }}
              />
            ))}
          </Tabs>
        </Paper>
      )}

      {/* Student Info Card */}
      <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)', color: 'white' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }}>
                <School fontSize="large" />
              </Avatar>
              <Typography variant="h6">{currentChild.name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h6" sx={{ mb: 2 }}>Student Information</Typography>
            <Typography variant="body1">Student ID: {currentChild.studentId}</Typography>
            <Typography variant="body1">Class: {currentChild.class} - Section {currentChild.section}</Typography>
            <Typography variant="body1">Roll Number: {currentChild.rollNumber}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>Attendance</Typography>
            <LinearProgress 
              variant="determinate" 
              value={currentChild.attendance} 
              sx={{ height: 8, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.3)', mb: 1 }}
            />
            <Typography variant="body1">{currentChild.attendance}% Present</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'translateY(-2px)' }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <action.icon sx={{ fontSize: 40, color: action.color, mb: 2 }} />
                      <Typography variant="body2">{action.title}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Academic Performance */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Academic Performance
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell>Teacher</TableCell>
                    <TableCell>Grade</TableCell>
                    <TableCell>Percentage</TableCell>
                    <TableCell>Progress</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {academicData.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell>{subject.subject}</TableCell>
                      <TableCell>{subject.teacher}</TableCell>
                      <TableCell>
                        <Chip 
                          label={subject.grade} 
                          color={subject.percentage >= 90 ? 'success' : subject.percentage >= 80 ? 'primary' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{subject.percentage}%</TableCell>
                      <TableCell>
                        <LinearProgress 
                          variant="determinate" 
                          value={subject.percentage} 
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Fee Status */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Fee Status
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Total Fee Amount</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>₹{feeStatus.totalAmount.toLocaleString()}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Paid Amount</Typography>
                  <Typography variant="h6" color="success.main">₹{feeStatus.paidAmount.toLocaleString()}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Pending Amount</Typography>
                  <Typography variant="h6" color="error.main">₹{feeStatus.pendingAmount.toLocaleString()}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Payment Progress</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(feeStatus.paidAmount / feeStatus.totalAmount) * 100} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {Math.round((feeStatus.paidAmount / feeStatus.totalAmount) * 100)}% Completed
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">Due Date: {feeStatus.dueDate}</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Pay Now
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Notifications */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Recent Notifications
            </Typography>
            <List>
              {notifications.map((notification, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    {notification.type === 'academic' && <Assignment color="primary" />}
                    {notification.type === 'fee' && <Payment color="warning" />}
                    {notification.type === 'meeting' && <CalendarToday color="info" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={notification.message}
                    secondary={notification.time}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Upcoming Events */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Upcoming Events
            </Typography>
            <List>
              {upcomingEvents.map((event, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    {event.type === 'exam' && <Assignment color="error" />}
                    {event.type === 'event' && <Event color="primary" />}
                    {event.type === 'sports' && <TrendingUp color="success" />}
                    {event.type === 'meeting' && <CalendarToday color="warning" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={event.title}
                    secondary={new Date(event.date).toLocaleDateString()}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ParentDashboard;