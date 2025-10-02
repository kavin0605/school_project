import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  School,
  Menu as MenuIcon,
  PersonAdd,
  AccountBox,
  SupervisorAccount
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [loginAnchorEl, setLoginAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleLoginClick = (event) => {
    setLoginAnchorEl(event.currentTarget);
  };

  const handleLoginClose = () => {
    setLoginAnchorEl(null);
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Campus', path: '/campus' },
    { name: 'Admission', path: '/admission' },
    { name: 'Events', path: '/events' },
    { name: 'Assistance', path: '/assistance' },
    { name: 'Contact', path: '/contact' },
  ];

  const loginOptions = [
    { name: 'Admin Login', path: '/admin-login', icon: <SupervisorAccount /> },
    { name: 'Student Login', path: '/student-login', icon: <AccountBox /> },
    { name: 'Parent Login', path: '/parent-login', icon: <PersonAdd /> },
  ];

  const drawer = (
    <Box onClick={handleMobileToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Nalanda School
      </Typography>
      <List>
        {navigationItems.map((item) => (
          <ListItem 
            key={item.name} 
            component={Link} 
            to={item.path}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        {loginOptions.map((option) => (
          <ListItem 
            key={option.name} 
            component={Link} 
            to={option.path}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ListItemText primary={option.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Mobile menu button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleMobileToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo and School Name */}
            <School sx={{ display: 'flex', mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                flexGrow: isMobile ? 1 : 0,
              }}
            >
              NALANDA SCHOOL
            </Typography>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex', ml: 4 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.name}
                    component={Link}
                    to={item.path}
                    sx={{ 
                      my: 2, 
                      color: 'white', 
                      display: 'block',
                      mx: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            )}

            {/* Login Menu */}
            {!isMobile && (
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  onClick={handleLoginClick}
                  sx={{ 
                    my: 2, 
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)'
                    }
                  }}
                  startIcon={<AccountBox />}
                >
                  Login
                </Button>
                <Menu
                  anchorEl={loginAnchorEl}
                  open={Boolean(loginAnchorEl)}
                  onClose={handleLoginClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  {loginOptions.map((option) => (
                    <MenuItem
                      key={option.name}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        navigate(option.path);
                        handleLoginClose();
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {option.icon}
                        {option.name}
                      </Box>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleMobileToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;