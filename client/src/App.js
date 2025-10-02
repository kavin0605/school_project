import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Context Providers
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Common Components
import ScrollToTop from './components/Common/ScrollToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Admission from './pages/Admission';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Campus from './pages/Campus';
import Assistance from './pages/Assistance';

// Auth Pages
import AdminLogin from './components/Auth/AdminLogin';
import StudentLogin from './components/Auth/StudentLogin';
import ParentLogin from './components/Auth/ParentLogin';

// Forms
import AdmissionForm from './components/Admission/AdmissionForm';

// Dashboard Components (to be created)
import AdminDashboard from './components/Dashboard/AdminDashboard';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import ParentDashboard from './components/Dashboard/ParentDashboard';

import './App.css';

// Create a theme for the school
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue color scheme
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/admission" element={<Admission />} />
                <Route path="/admission-form" element={<AdmissionForm />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/events" element={<Events />} />
                <Route path="/campus" element={<Campus />} />
                {/* Academics route removed */}
                <Route path="/assistance" element={<Assistance />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/student-login" element={<StudentLogin />} />
                <Route path="/parent-login" element={<ParentLogin />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/parent-dashboard" element={<ParentDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
