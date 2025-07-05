import React, { useContext, useState } from 'react';
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  Box, 
  Typography, 
  Tooltip, 
  ListItemIcon,
  Fade,
  Divider,
  Paper
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  ColorLens,
  Check
} from '@mui/icons-material';
import { ThemeContext } from '../ThemeContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode, currentTheme, themes, changeTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleThemeChange = (themeId) => {
    changeTheme(themeId);
    handleClose();
  };
  
  // Theme color dots for the menu - with high contrast colors
  const themeColors = {
    DEFAULT: {
      primary: darkMode ? '#64b5f6' : '#1976d2', // Brighter blue for dark mode, darker blue for light mode
      secondary: darkMode ? '#8c9eff' : '#5c6bc0' // Brighter purple for dark mode, darker purple for light mode
    },
    CALM: {
      primary: darkMode ? '#68d391' : '#2e7d32', // Brighter green for dark mode, darker green for light mode
      secondary: darkMode ? '#63b3ed' : '#1565c0' // Brighter blue for dark mode, darker blue for light mode
    },
    SUNSET: {
      primary: darkMode ? '#fc8181' : '#d32f2f', // Brighter red for dark mode, darker red for light mode
      secondary: darkMode ? '#f6ad55' : '#ed6c02' // Brighter orange for dark mode, darker orange for light mode
    }
  };

  return (
    <>
      <Tooltip title="Change appearance">
        <IconButton
          color="inherit"
          onClick={handleClick}
          aria-controls={open ? 'appearance-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{ 
            borderRadius: '12px',
            p: 1,
            '&:hover': {
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'
            },
            transition: 'all 0.2s',
            border: '2px solid',
            borderColor: 'transparent',
            color: open ? 'var(--primary-color)' : 'inherit'
          }}
        >
          <ColorLens />
        </IconButton>
      </Tooltip>
      
      <Menu
        id="appearance-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        MenuListProps={{
          'aria-labelledby': 'appearance-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1.5,
            boxShadow: darkMode 
              ? '0 8px 20px rgba(0, 0, 0, 0.5)' 
              : '0 8px 20px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
            minWidth: '240px',
            overflow: 'visible',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: -5,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'rotate(45deg)',
              zIndex: 0,
            }
          },
        }}
      >
        <Box sx={{ p: 2, pt: 1, pb: 0 }}>
          <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
            Appearance
          </Typography>
        </Box>
        
        <MenuItem 
          onClick={toggleDarkMode}
          sx={{ 
            borderLeft: '3px solid transparent',
            borderColor: 'transparent',
            py: 1.5,
            '&:hover': {
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <ListItemIcon>
            {darkMode ? (
              <Brightness7 sx={{ color: 'orange' }} />
            ) : (
              <Brightness4 sx={{ color: '#1976d2' }} />
            )}
          </ListItemIcon>
          <Typography variant="body2" fontWeight={500}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Typography>
        </MenuItem>
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ p: 2, pt: 1, pb: 0 }}>
          <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
            Color Theme
          </Typography>
        </Box>
        
        {themes.map((theme) => {
          const isSelected = currentTheme === theme.name;
          return (
            <MenuItem 
              key={theme.id} 
              onClick={() => handleThemeChange(theme.id)}
              selected={isSelected}
              sx={{ 
                borderLeft: '3px solid',
                borderColor: isSelected 
                  ? 'var(--primary-color)' 
                  : 'transparent',
                py: 1.5,
                backgroundColor: isSelected 
                  ? darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      width: 28, 
                      height: 28, 
                      mr: 1.5,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      display: 'flex',
                      border: '2px solid',
                      borderColor: isSelected
                        ? 'var(--primary-color)' 
                        : 'transparent',
                      boxShadow: isSelected 
                        ? '0 0 0 2px rgba(0, 0, 0, 0.1)' 
                        : 'none'
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: '50%', 
                        height: '100%', 
                        bgcolor: themeColors[theme.id]?.primary || 'grey.500',
                      }} 
                    />
                    <Box 
                      sx={{ 
                        width: '50%', 
                        height: '100%', 
                        bgcolor: themeColors[theme.id]?.secondary || 'grey.300',
                      }} 
                    />
                  </Paper>
                  <Typography variant="body2" fontWeight={isSelected ? 600 : 400}>
                    {theme.name}
                  </Typography>
                </Box>
                
                {isSelected && (
                  <Check 
                    sx={{ 
                      color: 'var(--primary-color)',
                      fontWeight: 'bold'
                    }} 
                  />
                )}
              </Box>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default DarkModeToggle;
