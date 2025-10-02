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
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  AccountBox,
  Assignment,
  Grade,
  Schedule,
  Event,
  LibraryBooks,
  DirectionsBus,
  Payment,
  Notifications,
  CalendarToday,
  TrendingUp,
  Phone,
  Email,
  Person,
  ExpandMore
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      setLoading(true);
      // Use roll number from user or default to sample student
      const rollNumber = user?.email?.split('@')[0] || '15';
      
      const response = await fetch('/api/student/me', {
        headers: {
          'student-roll': rollNumber
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStudentData(data.student);
      } else {
        setError('Failed to load student data');
      }
    } catch (error) {
      console.error('Error loading student data:', error);
      setError('Network error - please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading student data...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!studentData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">No student data found</Alert>
      </Container>
    );
  }

  const quickActions = [
    { title: 'View Timetable', icon: Schedule, color: '#1976d2' },
    { title: 'Submit Assignment', icon: Assignment, color: '#388e3c' },
    { title: 'Check Grades', icon: Grade, color: '#f57c00' },
    { title: 'Library Books', icon: LibraryBooks, color: '#7b1fa2' },
    { title: 'Transport Info', icon: DirectionsBus, color: '#d32f2f' },
    { title: 'Fee Status', icon: Payment, color: '#1976d2' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            Student Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back, {studentData.personalInfo.firstName} {studentData.personalInfo.lastName}! Track your academic progress and stay updated.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: '#4caf50' }}>
            {studentData.personalInfo.firstName.charAt(0)}
          </Avatar>
          <Button variant="outlined" color="primary" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Student Info Card */}
      <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>Student Information</Typography>
            <Typography variant="body1">Student ID: {studentData.admissionNumber}</Typography>
            <Typography variant="body1">Class: {studentData.academicInfo.class} - Section {studentData.academicInfo.section}</Typography>
            <Typography variant="body1">Roll Number: {studentData.rollNumber}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>Attendance Overview</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Present: {studentData.attendance.presentDays} / {studentData.attendance.totalDays} classes
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={studentData.attendance.attendancePercentage} 
              sx={{ height: 8, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.3)' }}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {studentData.attendance.attendancePercentage}% Attendance
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs for different sections */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab label="Overview" />
          <Tab label="Marks & Grades" />
          <Tab label="Timetable" />
          <Tab label="Assignments" />
          <Tab label="Teachers" />
          <Tab label="Fees" />
          <Tab label="Transport" />
          <Tab label="Parent Meetings" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {tabValue === 0 && (
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
          </Grid>

          {/* Sidebar - Recent Assignments */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Recent Assignments
              </Typography>
              <List>
                {studentData.assignments?.slice(0, 3).map((assignment, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Assignment color={assignment.status === 'pending' ? 'warning' : 'success'} />
                    </ListItemIcon>
                    <ListItemText
                      primary={assignment.title}
                      secondary={
                        <Box>
                          <Typography variant="caption" display="block">
                            {assignment.subject}
                          </Typography>
                          <Typography variant="caption" display="block">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </Typography>
                          <Chip 
                            label={assignment.status} 
                            size="small" 
                            color={assignment.status === 'pending' ? 'warning' : 'success'}
                            sx={{ mt: 1 }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Marks & Grades Tab */}
      {tabValue === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Marks & Grades
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="primary">Overall Performance</Typography>
            <Typography variant="body1">Percentage: {studentData.marks?.overallPercentage}%</Typography>
            <Typography variant="body1">Grade: {studentData.marks?.overallGrade}</Typography>
            <Typography variant="body1">Class Rank: {studentData.marks?.rank}</Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Teacher</TableCell>
                  <TableCell>Overall Grade</TableCell>
                  <TableCell>Obtained/Total Marks</TableCell>
                  <TableCell>Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData.marks?.subjects?.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>{subject.teacher}</TableCell>
                    <TableCell>
                      <Chip 
                        label={subject.overallGrade} 
                        color={subject.overallGrade === 'A+' ? 'success' : subject.overallGrade === 'A' ? 'primary' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{subject.obtainedMarks}/{subject.totalMarks}</TableCell>
                    <TableCell>
                      <LinearProgress 
                        variant="determinate" 
                        value={(subject.obtainedMarks / subject.totalMarks) * 100} 
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Timetable Tab */}
      {tabValue === 2 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Weekly Timetable
          </Typography>
          {studentData.timetable?.map((day, dayIndex) => (
            <Accordion key={dayIndex}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                  {day.day}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Period</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Teacher</TableCell>
                        <TableCell>Room</TableCell>
                        <TableCell>Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {day.periods?.map((period, periodIndex) => (
                        <TableRow key={periodIndex}>
                          <TableCell>{period.periodNumber}</TableCell>
                          <TableCell>{period.subject}</TableCell>
                          <TableCell>{period.teacher}</TableCell>
                          <TableCell>{period.room}</TableCell>
                          <TableCell>{period.startTime} - {period.endTime}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      )}

      {/* Assignments Tab */}
      {tabValue === 3 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Assignments
          </Typography>
          <Grid container spacing={2}>
            {studentData.assignments?.map((assignment, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{assignment.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {assignment.subject} - {assignment.teacher}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {assignment.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip 
                        label={assignment.status} 
                        color={assignment.status === 'pending' ? 'warning' : assignment.status === 'submitted' ? 'info' : 'success'}
                        size="small"
                      />
                      <Typography variant="caption">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    {assignment.marks && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Score: {assignment.marks}/{assignment.totalMarks}
                      </Typography>
                    )}
                    {assignment.feedback && (
                      <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                        Feedback: {assignment.feedback}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Teachers Tab */}
      {tabValue === 4 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Teachers
          </Typography>
          <Grid container spacing={3}>
            {studentData.teachers?.map((teacher, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ mr: 2 }}>
                        <Person />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">{teacher.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {teacher.subject}
                        </Typography>
                        {teacher.isClassTeacher && (
                          <Chip label="Class Teacher" size="small" color="primary" sx={{ mt: 1 }} />
                        )}
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Phone sx={{ mr: 1, fontSize: 16 }} />
                      <Typography variant="body2">{teacher.phone}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Email sx={{ mr: 1, fontSize: 16 }} />
                      <Typography variant="body2">{teacher.email}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Fees Tab */}
      {tabValue === 5 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Fee Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Fee Summary</Typography>
                  <Typography variant="body1">Total Fees: ₹{studentData.fees?.totalFees?.toLocaleString()}</Typography>
                  <Typography variant="body1">Paid Fees: ₹{studentData.fees?.paidFees?.toLocaleString()}</Typography>
                  <Typography variant="body1" color={studentData.fees?.pendingFees > 0 ? 'error' : 'success'}>
                    Pending Fees: ₹{studentData.fees?.pendingFees?.toLocaleString()}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(studentData.fees?.paidFees / studentData.fees?.totalFees) * 100} 
                    sx={{ mt: 2, height: 8, borderRadius: 4 }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Payment History</Typography>
                  <List>
                    {studentData.fees?.paymentHistory?.map((payment, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemText
                          primary={`₹${payment.amount?.toLocaleString()}`}
                          secondary={
                            <Box>
                              <Typography variant="caption" display="block">
                                {new Date(payment.date).toLocaleDateString()}
                              </Typography>
                              <Typography variant="caption" display="block">
                                {payment.method} - {payment.receiptNumber}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Transport Tab */}
      {tabValue === 6 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Transport Information
          </Typography>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Bus Details</Typography>
                  <Typography variant="body1">Bus Number: {studentData.transport?.busNumber}</Typography>
                  <Typography variant="body1">Route: {studentData.transport?.route}</Typography>
                  <Typography variant="body1">Stop Name: {studentData.transport?.stopName}</Typography>
                  <Typography variant="body1">Pickup Time: {studentData.transport?.pickupTime}</Typography>
                  <Typography variant="body1">Drop Time: {studentData.transport?.dropTime}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Driver Details</Typography>
                  <Typography variant="body1">Driver Name: {studentData.transport?.driverName}</Typography>
                  <Typography variant="body1">Driver Phone: {studentData.transport?.driverPhone}</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip 
                      label={`Fee Status: ${studentData.transport?.feeStatus}`} 
                      color={studentData.transport?.feeStatus === 'paid' ? 'success' : 'warning'}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      )}

      {/* Parent Meetings Tab */}
      {tabValue === 7 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Parent Meetings
          </Typography>
          <Grid container spacing={2}>
            {studentData.parentMeetings?.map((meeting, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>{meeting.purpose}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      with {meeting.teacher}
                    </Typography>
                    <Typography variant="body2">
                      Date: {new Date(meeting.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">Time: {meeting.time}</Typography>
                    <Typography variant="body2">Attended By: {meeting.attendedBy}</Typography>
                    <Box sx={{ mt: 2 }}>
                      <Chip 
                        label={meeting.status} 
                        color={meeting.status === 'scheduled' ? 'warning' : meeting.status === 'completed' ? 'success' : 'error'}
                        size="small"
                      />
                    </Box>
                    {meeting.notes && (
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        Notes: {meeting.notes}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default StudentDashboard;