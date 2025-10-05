import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Chip,
  Alert,
  Box,
  Tabs,
  Tab,
  Tooltip,
  DialogContentText
} from '@mui/material';
import {
  Visibility,
  Delete,
  Cancel,
  Person,
  School,
  Email,
  Phone,
  Home
} from '@mui/icons-material';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'info' });
  const [tabValue, setTabValue] = useState(0);

  const fetchStudents = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/students', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setStudents(data.data || []);
      } else {
        showAlert('Error loading students', 'error');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      showAlert('Error loading students', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const showAlert = useCallback((message, severity = 'info') => {
    setAlert({ show: true, message, severity });
    setTimeout(() => setAlert({ show: false, message: '', severity: 'info' }), 3000);
  }, []);

  const handleViewStudent = useCallback((student) => {
    setSelectedStudent(student);
    setViewDialogOpen(true);
    setTabValue(0); // Reset to first tab
  }, []);

  const handleDeleteStudent = useCallback((student) => {
    setSelectedStudent(student);
    setDeleteDialogOpen(true);
  }, []);

  const confirmDeleteStudent = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/students/${selectedStudent._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      if (data.success) {
        showAlert('Student deleted successfully!', 'success');
        setDeleteDialogOpen(false);
        fetchStudents(); // Refresh the list
      } else {
        showAlert(data.message || 'Error deleting student', 'error');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      showAlert('Error deleting student', 'error');
    }
  }, [selectedStudent, showAlert, fetchStudents]);

  const handleCloseViewDialog = useCallback(() => {
    setViewDialogOpen(false);
    setSelectedStudent(null);
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
    setSelectedStudent(null);
  }, []);

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );

  if (loading) {
    return (
      <Container>
        <Typography>Loading students...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {alert.show && (
        <Alert severity={alert.severity} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Student Management
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Attendance</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>
                    {student.personalInfo?.firstName} {student.personalInfo?.lastName}
                  </TableCell>
                  <TableCell>
                    {student.academicInfo?.class} - {student.academicInfo?.section}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${student.attendance?.attendancePercentage || 0}%`}
                      color={
                        (student.attendance?.attendancePercentage || 0) >= 90 ? 'success' : 
                        (student.attendance?.attendancePercentage || 0) >= 75 ? 'warning' : 'error'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Student Details">
                      <IconButton onClick={() => handleViewStudent(student)} color="primary">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Student">
                      <IconButton onClick={() => handleDeleteStudent(student)} color="error">
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* View Student Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={handleCloseViewDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Student Details: {selectedStudent?.personalInfo?.firstName} {selectedStudent?.personalInfo?.lastName}
        </DialogTitle>
        <DialogContent>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
            <Tab label="Personal Info" icon={<Person />} />
            <Tab label="Academic Info" icon={<School />} />
            <Tab label="Contact Info" icon={<Email />} />
          </Tabs>

          {/* Personal Info Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={selectedStudent?.personalInfo?.firstName || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={selectedStudent?.personalInfo?.lastName || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Father Name"
                  value={selectedStudent?.personalInfo?.fatherName || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Mother Name"
                  value={selectedStudent?.personalInfo?.motherName || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  value={selectedStudent?.personalInfo?.dateOfBirth?.split('T')[0] || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Address"
                  value={selectedStudent?.personalInfo?.address || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Academic Info Tab */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Roll Number"
                  value={selectedStudent?.rollNumber || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Class"
                  value={selectedStudent?.academicInfo?.class || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Section"
                  value={selectedStudent?.academicInfo?.section || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Academic Year"
                  value={selectedStudent?.academicInfo?.academicYear || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Attendance"
                  value={`${selectedStudent?.attendance?.attendancePercentage || 0}%`}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </TabPanel>

          {/* Contact Info Tab */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Student Email"
                  value={selectedStudent?.loginCredentials?.email || ''}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={selectedStudent?.personalInfo?.phoneNumber || 'Not Available'}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Emergency Contact"
                  value={selectedStudent?.personalInfo?.emergencyContact || 'Not Available'}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </TabPanel>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseViewDialog} startIcon={<Cancel />} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={handleCloseDeleteDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Confirm Delete Student
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the student <strong>{selectedStudent?.personalInfo?.firstName} {selectedStudent?.personalInfo?.lastName}</strong>?
            <br />
            <br />
            This action cannot be undone and will permanently remove all student data including:
            <br />
            • Personal information
            <br />
            • Academic records
            <br />
            • Attendance records
            <br />
            • Assignment submissions
          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button onClick={confirmDeleteStudent} variant="contained" color="error" startIcon={<Delete />}>
            Delete Student
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentManagement;