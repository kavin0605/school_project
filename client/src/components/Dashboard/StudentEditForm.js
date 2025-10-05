import React, { useState, useCallback, memo, useEffect } from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Add,
  Delete,
  ExpandMore,
  Person,
  School,
  Assignment,
  Schedule,
  DirectionsBus,
  Payment,
  People,
  Assessment
} from '@mui/icons-material';

const StudentEditForm = ({ student, onStudentChange }) => {
  const [tabValue, setTabValue] = useState(0);
  
  // Completely isolated form state - ZERO parent updates during typing
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      fatherName: '',
      motherName: '',
      dateOfBirth: '',
      address: ''
    },
    academicInfo: {
      class: '',
      section: '',
      academicYear: ''
    },
    attendance: {
      records: [],
      percentage: 0
    }
  });

  // Initialize form data ONLY when student ID changes
  useEffect(() => {
    if (student) {
      setFormData({
        personalInfo: {
          firstName: student.personalInfo?.firstName || '',
          lastName: student.personalInfo?.lastName || '',
          fatherName: student.personalInfo?.fatherName || '',
          motherName: student.personalInfo?.motherName || '',
          dateOfBirth: student.personalInfo?.dateOfBirth?.split('T')[0] || '',
          address: student.personalInfo?.address || ''
        },
        academicInfo: {
          class: student.academicInfo?.class || '',
          section: student.academicInfo?.section || '',
          academicYear: student.academicInfo?.academicYear || ''
        },
        attendance: {
          records: student.attendance?.records || [],
          percentage: student.attendance?.percentage || 0
        }
      });
    }
  }, [student?._id]); // Only when student changes, not on every render

  // Simple local update functions - NEVER call parent
  const updatePersonalField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  }, []);

  const updateAcademicField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      academicInfo: {
        ...prev.academicInfo,
        [field]: value
      }
    }));
  }, []);

  // Function to update attendance records locally - NO parent updates
  const updateAttendanceRecord = useCallback((index, field, value) => {
    setFormData(prev => {
      const newRecords = [...prev.attendance.records];
      newRecords[index] = { ...newRecords[index], [field]: value };
      return {
        ...prev,
        attendance: {
          ...prev.attendance,
          records: newRecords
        }
      };
    });
  }, []);

  // Function to add attendance record locally - NO parent updates
  const handleAddAttendance = useCallback(() => {
    const newRecord = {
      date: new Date().toISOString().split('T')[0],
      status: 'Present',
      subject: 'General',
      period: 1
    };
    
    setFormData(prev => ({
      ...prev,
      attendance: {
        ...prev.attendance,
        records: [...prev.attendance.records, newRecord]
      }
    }));
  }, []);

  // Only update parent when explicitly called (e.g., on Save button)
  const saveChanges = useCallback(() => {
    if (student) {
      const updatedStudent = {
        ...student,
        personalInfo: {
          ...student.personalInfo,
          ...formData.personalInfo
        },
        academicInfo: {
          ...student.academicInfo,
          ...formData.academicInfo
        },
        attendance: {
          ...student.attendance,
          ...formData.attendance
        }
      };
      onStudentChange(updatedStudent);
    }
  }, [formData, student, onStudentChange]);

  // Expose saveChanges function to parent
  useEffect(() => {
    window.saveStudentChanges = saveChanges;
    
    // Cleanup on unmount
    return () => {
      window.saveStudentChanges = null;
    };
  }, [saveChanges]);

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );

  return (
    <>
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
        <Tab label="Personal Info" icon={<Person />} />
        <Tab label="Academic Info" icon={<School />} />
        <Tab label="Attendance" icon={<Assignment />} />
        <Tab label="Marks & Grades" icon={<Assessment />} />
        <Tab label="Assignments" icon={<Assignment />} />
        <Tab label="Timetable" icon={<Schedule />} />
        <Tab label="Transport" icon={<DirectionsBus />} />
        <Tab label="Fees" icon={<Payment />} />
      </Tabs>

      {/* Personal Info Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              value={formData.personalInfo.firstName}
              onChange={(e) => updatePersonalField('firstName', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={formData.personalInfo.lastName}
              onChange={(e) => updatePersonalField('lastName', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Father's Name"
              value={formData.personalInfo.fatherName}
              onChange={(e) => updatePersonalField('fatherName', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Mother's Name"
              value={formData.personalInfo.motherName}
              onChange={(e) => updatePersonalField('motherName', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              value={formData.personalInfo.dateOfBirth}
              onChange={(e) => updatePersonalField('dateOfBirth', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Address"
              value={formData.personalInfo.address}
              onChange={(e) => updatePersonalField('address', e.target.value)}
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
              label="Class"
              value={formData.academicInfo.class}
              onChange={(e) => updateAcademicField('class', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Section"
              value={formData.academicInfo.section}
              onChange={(e) => updateAcademicField('section', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Academic Year"
              value={formData.academicInfo.academicYear}
              onChange={(e) => updateAcademicField('academicYear', e.target.value)}
            />
          </Grid>
        </Grid>
      </TabPanel>

      {/* Attendance Tab */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={handleAddAttendance} startIcon={<Add />}>
            Add Attendance Record
          </Button>
        </Box>
        <Typography variant="h6">
          Current Attendance: {formData.attendance.percentage}%
        </Typography>
        <Box sx={{ maxHeight: 300, overflow: 'auto', mt: 2 }}>
          {formData.attendance.records?.map((record, index) => (
            <Card key={`attendance-${index}`} sx={{ mb: 1 }}>
              <CardContent sx={{ py: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      value={record.date || ''}
                      onChange={(e) => updateAttendanceRecord(index, 'date', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth size="small">
                      <Select
                        value={record.status || 'Present'}
                        onChange={(e) => updateAttendanceRecord(index, 'status', e.target.value)}
                      >
                        <MenuItem value="Present">Present</MenuItem>
                        <MenuItem value="Absent">Absent</MenuItem>
                        <MenuItem value="Late">Late</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Subject"
                      value={record.subject || ''}
                      onChange={(e) => updateAttendanceRecord(index, 'subject', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      label="Period"
                      value={record.period || ''}
                      onChange={(e) => updateAttendanceRecord(index, 'period', parseInt(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton 
                      size="small"
                      onClick={() => {
                        onStudentChange(prev => ({
                          ...prev,
                          attendance: {
                            ...prev.attendance,
                            records: prev.attendance.records.filter((_, i) => i !== index)
                          }
                        }));
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>
      </TabPanel>

      {/* Other tabs placeholders */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h6">Marks & Grades Management</Typography>
        <Typography variant="body2" color="text.secondary">
          Marks management interface will be implemented here.
        </Typography>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Typography variant="h6">Assignments Management</Typography>
        <Typography variant="body2" color="text.secondary">
          Assignment management interface will be implemented here.
        </Typography>
      </TabPanel>

      <TabPanel value={tabValue} index={5}>
        <Typography variant="h6">Timetable Management</Typography>
        <Typography variant="body2" color="text.secondary">
          Timetable management interface will be implemented here.
        </Typography>
      </TabPanel>

      <TabPanel value={tabValue} index={6}>
        <Typography variant="h6">Transport Management</Typography>
        <Typography variant="body2" color="text.secondary">
          Transport management interface will be implemented here.
        </Typography>
      </TabPanel>

      <TabPanel value={tabValue} index={7}>
        <Typography variant="h6">Fees Management</Typography>
        <Typography variant="body2" color="text.secondary">
          Fee management interface will be implemented here.
        </Typography>
      </TabPanel>
    </>
  );
};

export default memo(StudentEditForm);