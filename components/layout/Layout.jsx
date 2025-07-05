import React, { useContext } from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { ThemeContext } from '../../ThemeContext';

const Layout = ({ children }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.default',
        color: 'text.primary',
        transition: 'all 0.3s ease'
      }}
    >
      <Header />
      <Container 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: '100%',
          py: { xs: 2, sm: 4 },
          px: { xs: 2, sm: 3 }
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout; 