import React, { useState, useCallback } from 'react';
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

  // Helper functions using useCallback to prevent re-renders
  const updatePersonalInfo = useCallback((field, value) => {
    onStudentChange(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  }, [onStudentChange]);

  const updateAcademicInfo = useCallback((field, value) => {
    onStudentChange(prev => ({
      ...prev,
      academicInfo: {
        ...prev.academicInfo,
        [field]: value
      }
    }));
  }, [onStudentChange]);

  const updateAttendanceRecord = useCallback((index, field, value) => {
    onStudentChange(prev => {
      const newRecords = [...prev.attendance.records];
      newRecords[index] = { ...newRecords[index], [field]: value };
      return {
        ...prev,
        attendance: { ...prev.attendance, records: newRecords }
      };
    });
  }, [onStudentChange]);

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );

  const handleAddAttendance = useCallback(() => {
    const newRecord = {
      date: new Date().toISOString().split('T')[0],
      status: 'Present',
      subject: 'General',
      period: 1
    };
    
    onStudentChange(prev => ({
      ...prev,
      attendance: {
        ...prev.attendance,
        records: [...prev.attendance.records, newRecord]
      }
    }));
  }, [onStudentChange]);

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
              label="Name"
              value={student?.personalInfo?.name || ''}
              onChange={(e) => updatePersonalInfo('name', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Father's Name"
              value={student?.personalInfo?.fatherName || ''}
              onChange={(e) => updatePersonalInfo('fatherName', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Mother's Name"
              value={student?.personalInfo?.motherName || ''}
              onChange={(e) => updatePersonalInfo('motherName', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              value={student?.personalInfo?.dateOfBirth?.split('T')[0] || ''}
              onChange={(e) => updatePersonalInfo('dateOfBirth', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Address"
              value={student?.personalInfo?.address || ''}
              onChange={(e) => updatePersonalInfo('address', e.target.value)}
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
              value={student?.academicInfo?.class || ''}
              onChange={(e) => updateAcademicInfo('class', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Section"
              value={student?.academicInfo?.section || ''}
              onChange={(e) => updateAcademicInfo('section', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Academic Year"
              value={student?.academicInfo?.academicYear || ''}
              onChange={(e) => updateAcademicInfo('academicYear', e.target.value)}
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
          Current Attendance: {student?.attendance?.percentage}%
        </Typography>
        <Box sx={{ maxHeight: 300, overflow: 'auto', mt: 2 }}>
          {student?.attendance?.records?.map((record, index) => (
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

export default StudentEditForm;