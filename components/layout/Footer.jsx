import React, { useContext } from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { ThemeContext } from '../../ThemeContext.jsx';

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto',
        backgroundColor: darkMode ? 'var(--card-bg)' : '#f5f5f5',
        color: darkMode ? 'var(--text-color)' : 'inherit',
        borderTop: `1px solid ${darkMode ? 'var(--border-color)' : '#e0e0e0'}`
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' '}
            <Link color="inherit" href="/">
              Health Dashboard
            </Link>
            {' - All rights reserved.'}
          </Typography>
          
          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
            <IconButton 
              aria-label="facebook" 
              size="small"
              sx={{ color: darkMode ? 'var(--text-color)' : 'inherit' }}
            >
              <Facebook fontSize="small" />
            </IconButton>
            <IconButton 
              aria-label="twitter" 
              size="small"
              sx={{ color: darkMode ? 'var(--text-color)' : 'inherit' }}
            >
              <Twitter fontSize="small" />
            </IconButton>
            <IconButton 
              aria-label="instagram" 
              size="small"
              sx={{ color: darkMode ? 'var(--text-color)' : 'inherit' }}
            >
              <Instagram fontSize="small" />
            </IconButton>
            <IconButton 
              aria-label="linkedin" 
              size="small"
              sx={{ color: darkMode ? 'var(--text-color)' : 'inherit' }}
            >
              <LinkedIn fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            mt: 2
          }}
        >
          <Link 
            href="#" 
            variant="body2" 
            color="text.secondary" 
            sx={{ mx: 1.5 }}
          >
            Privacy Policy
          </Link>
          <Link 
            href="#" 
            variant="body2" 
            color="text.secondary" 
            sx={{ mx: 1.5 }}
          >
            Terms of Service
          </Link>
          <Link 
            href="#" 
            variant="body2" 
            color="text.secondary" 
            sx={{ mx: 1.5 }}
          >
            Contact Us
          </Link>
          <Link 
            href="#" 
            variant="body2" 
            color="text.secondary" 
            sx={{ mx: 1.5 }}
          >
            Help Center
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 