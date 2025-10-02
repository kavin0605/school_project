import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import {
  School,
  Assignment,
  CheckCircle,
  Schedule,
  AttachMoney,
  Description,
  PersonAdd,
  CloudUpload,
  PlayArrow
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Admission = () => {
  const navigate = useNavigate();

  const handleStartApplication = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/admission-form');
  };
  const admissionSteps = [
    'Online Application',
    'Document Submission',
    'Entrance Test/Interview',
    'Fee Payment',
    'Admission Confirmation'
  ];

  const requiredDocuments = [
    'Birth Certificate',
    'Previous School Leaving Certificate',
    'Academic Transcripts/Report Cards',
    'Medical Certificate',
    'Passport Size Photographs',
    'Address Proof',
    'Caste Certificate (if applicable)',
    'Income Certificate (for fee concession)'
  ];

  const feeStructure = [
    { grade: 'Kindergarten (K1-K2)', admissionFee: '₹15,000', tuitionFee: '₹3,500/month', totalAnnual: '₹57,000' },
    { grade: 'Primary (1st-5th)', admissionFee: '₹20,000', tuitionFee: '₹4,000/month', totalAnnual: '₹68,000' },
    { grade: 'Middle (6th-8th)', admissionFee: '₹25,000', tuitionFee: '₹4,500/month', totalAnnual: '₹79,000' },
    { grade: 'High School (9th-10th)', admissionFee: '₹30,000', tuitionFee: '₹5,000/month', totalAnnual: '₹90,000' },
    { grade: 'Senior Secondary (11th-12th)', admissionFee: '₹35,000', tuitionFee: '₹5,500/month', totalAnnual: '₹101,000' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 0.8)), url("/images/admission-hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
            Admission Process
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
            Join Our Academic Excellence Journey - Digital Admission Process
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'white',
              color: '#1976d2',
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
            startIcon={<PlayArrow />}
            onClick={handleStartApplication}
          >
            Start Online Application
          </Button>
        </Container>
      </Box>

      {/* Admission Process Steps */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
          Admission Process
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Stepper orientation="vertical">
            {admissionSteps.map((step, index) => (
              <Step key={index} active={true}>
                <StepLabel>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Step {index + 1}: {step}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <Assignment sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Online Application
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Fill out the digital application form with student and parent details.
              </Typography>
              <Button variant="contained" fullWidth onClick={handleStartApplication}>
                Apply Now
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <CloudUpload sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Document Upload
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Upload all required documents through our secure portal.
              </Typography>
              <Button variant="outlined" fullWidth>
                View Requirements
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <CheckCircle sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Confirmation
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Receive admission confirmation and welcome to Nalanda School.
              </Typography>
              <Button variant="outlined" fullWidth>
                Track Status
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Required Documents */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
            Required Documents
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
                  Document Checklist
                </Typography>
                <List>
                  {requiredDocuments.map((document, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Description sx={{ color: '#1976d2' }} />
                      </ListItemIcon>
                      <ListItemText primary={document} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
                  Important Dates
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Schedule sx={{ color: '#4caf50' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Application Opens"
                      secondary="December 1, 2025"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Schedule sx={{ color: '#ff9800' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Application Deadline"
                      secondary="February 28, 2026"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Schedule sx={{ color: '#2196f3' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Entrance Test"
                      secondary="March 15-20, 2026"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Schedule sx={{ color: '#9c27b0' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Results Declaration"
                      secondary="March 30, 2026"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Schedule sx={{ color: '#f44336' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Admission Confirmation"
                      secondary="April 15, 2026"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Fee Structure */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, color: '#1976d2', fontWeight: 'bold' }}>
          Fee Structure
        </Typography>
        
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Grade</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Admission Fee</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Monthly Tuition</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Total Annual Fee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeStructure.map((fee, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{fee.grade}</TableCell>
                  <TableCell>{fee.admissionFee}</TableCell>
                  <TableCell>{fee.tuitionFee}</TableCell>
                  <TableCell>
                    <Chip 
                      label={fee.totalAnnual} 
                      color="primary" 
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 4, p: 3, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>
            Additional Information:
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Fee concessions available for economically disadvantaged students
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Scholarship programs for meritorious students
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Sibling discount: 10% on tuition fee for second child
          </Typography>
          <Typography variant="body2">
            • Fee payment can be made in quarterly installments
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Admission;