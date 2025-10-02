import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Academics = () => {
  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 4, color: '#1976d2' }}>
          Academics Page
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          Academic programs and curriculum information coming soon...
        </Typography>
      </Container>
    </Box>
  );
};

export default Academics;