import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
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
  Chip,
  Alert
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel
} from '@mui/icons-material';
import StudentEditForm from './StudentEditForm';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'info' });

  // Fetch all students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/admin/students');
      const data = await response.json();
      if (data.success) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      showAlert('Error fetching students', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = useCallback((message, severity = 'info') => {
    setAlert({ show: true, message, severity });
    setTimeout(() => setAlert({ show: false, message: '', severity: 'info' }), 3000);
  }, []);

  const handleEditStudent = useCallback((student) => {
    setSelectedStudent({ ...student });
    setEditDialogOpen(true);
  }, []);

  const handleSaveStudent = useCallback(async () => {
    try {
      // Remove sensitive fields before sending to server
      const { loginCredentials, _id, __v, createdAt, updatedAt, ...dataToSend } = selectedStudent;
      
      const response = await fetch(`/api/admin/students/${selectedStudent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      if (data.success) {
        showAlert('Student updated successfully!', 'success');
        setEditDialogOpen(false);
        fetchStudents(); // Refresh the list
      } else {
        showAlert(data.message || 'Error updating student', 'error');
      }
    } catch (error) {
      console.error('Error updating student:', error);
      showAlert('Error updating student', 'error');
    }
  }, [selectedStudent, showAlert]);

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
        
        <TableContainer component={Paper} sx={{ mt: 2 }}>
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
                  <TableCell>{student.personalInfo.name}</TableCell>
                  <TableCell>{student.academicInfo.class} - {student.academicInfo.section}</TableCell>
                  <TableCell>
                    <Chip 
                      label={`${student.attendance.percentage}%`}
                      color={student.attendance.percentage >= 90 ? 'success' : 
                             student.attendance.percentage >= 75 ? 'warning' : 'error'}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditStudent(student)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Edit Student Dialog */}
      <Dialog 
        key={selectedStudent?._id || 'empty'}
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit Student: {selectedStudent?.personalInfo?.name}
        </DialogTitle>
        <DialogContent>
          <StudentEditForm 
            student={selectedStudent} 
            onStudentChange={setSelectedStudent}
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button onClick={handleSaveStudent} variant="contained" startIcon={<Save />}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentManagement;