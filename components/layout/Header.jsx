import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem,
  useMediaQuery,
  useTheme,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  AccountCircle, 
  Dashboard, 
  ExitToApp, 
  Person, 
  LocalHospital,
  Home,
  Brightness4,
  Brightness7,
  ChevronRight
} from '@mui/icons-material';
import DarkModeToggle from '../DarkModeToggle';
import { ThemeContext } from '../../ThemeContext.jsx';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = user.isLoggedIn;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    if (isTablet) {
      setDrawerOpen(true);
    } else {
      setMobileMenuAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchorEl(null);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    // Clear all user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.id) {
      userData.isLoggedIn = false;
      localStorage.setItem('user', JSON.stringify(userData));
    }
    
    // Close the menu
    handleMenuClose();
    
    // Redirect to login page
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleNavigation('/dashboard')}>
        <Dashboard fontSize="small" sx={{ mr: 1 }} /> Dashboard
      </MenuItem>
      <MenuItem onClick={() => handleNavigation('/profile')}>
        <Person fontSize="small" sx={{ mr: 1 }} /> Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ExitToApp fontSize="small" sx={{ mr: 1 }} /> Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(mobileMenuAnchorEl)}
      onClose={handleMenuClose}
    >
      {isLoggedIn ? (
        [
          <MenuItem key="dashboard" onClick={() => handleNavigation('/dashboard')}>
            <Dashboard fontSize="small" sx={{ mr: 1 }} /> Dashboard
          </MenuItem>,
          <MenuItem key="profile" onClick={() => handleNavigation('/profile')}>
            <Person fontSize="small" sx={{ mr: 1 }} /> Profile
          </MenuItem>,
          <MenuItem key="logout" onClick={handleLogout}>
            <ExitToApp fontSize="small" sx={{ mr: 1 }} /> Logout
          </MenuItem>
        ]
      ) : (
        [
          <MenuItem key="login" onClick={() => handleNavigation('/login')}>
            <Person fontSize="small" sx={{ mr: 1 }} /> Login
          </MenuItem>,
          <MenuItem key="signup" onClick={() => handleNavigation('/signup')}>
            <Person fontSize="small" sx={{ mr: 1 }} /> Sign Up
          </MenuItem>
        ]
      )}
    </Menu>
  );

  // Drawer for mobile
  const renderDrawer = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: 240,
          backgroundColor: darkMode ? 'var(--card-bg)' : '#fff',
          color: darkMode ? 'var(--text-color)' : 'inherit'
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Menu</Typography>
          <IconButton onClick={() => setDrawerOpen(false)} edge="end">
            <ChevronRight />
          </IconButton>
        </Box>
        
        {isLoggedIn && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  mr: 1,
                  bgcolor: 'var(--primary-color)'
                }}
              >
                {user.firstName ? user.firstName[0] : 'U'}
              </Avatar>
              <Typography variant="body1">{user.name || 'User'}</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
          </>
        )}
        
        <List>
          <ListItem button onClick={() => handleNavigation('/')}>
            <ListItemIcon>
              <Home color={darkMode ? "primary" : "action"} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          
          {isLoggedIn ? (
            <>
              <ListItem button onClick={() => handleNavigation('/dashboard')}>
                <ListItemIcon>
                  <Dashboard color={darkMode ? "primary" : "action"} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              
              <ListItem button onClick={() => handleNavigation('/profile')}>
                <ListItemIcon>
                  <Person color={darkMode ? "primary" : "action"} />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToApp color={darkMode ? "primary" : "action"} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={() => handleNavigation('/login')}>
                <ListItemIcon>
                  <Person color={darkMode ? "primary" : "action"} />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              
              <ListItem button onClick={() => handleNavigation('/signup')}>
                <ListItemIcon>
                  <Person color={darkMode ? "primary" : "action"} />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </>
          )}
          
          <Divider sx={{ my: 2 }} />
          
          <ListItem button onClick={toggleDarkMode}>
            <ListItemIcon>
              {darkMode ? (
                <Brightness7 color="primary" />
              ) : (
                <Brightness4 color="action" />
              )}
            </ListItemIcon>
            <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: darkMode ? '#1a1a1a' : 'var(--primary-color)',
        boxShadow: darkMode 
          ? '0 2px 10px rgba(0,0,0,0.5)' 
          : '0 2px 10px rgba(0,0,0,0.1)',
        borderBottom: darkMode ? '1px solid rgba(255,255,255,0.1)' : 'none'
      }}
    >
      <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
        <LocalHospital sx={{ mr: 1, color: darkMode ? '#64b5f6' : 'inherit' }} />
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
            flexGrow: 1,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Health Dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isTablet && <DarkModeToggle />}
          
          {isTablet ? (
            <IconButton
              size="large"
              edge="end"
              aria-label="menu"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {isLoggedIn ? (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  {user.avatar ? (
                    <Avatar 
                      alt={user.name} 
                      src={user.avatar} 
                      sx={{ width: 32, height: 32 }} 
                    />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              ) : (
                <>
                  <Button 
                    color="inherit" 
                    component={Link} 
                    to="/login"
                    sx={{ 
                      ml: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    color="inherit" 
                    component={Link} 
                    to="/signup"
                    variant="outlined"
                    sx={{ 
                      ml: 1, 
                      borderColor: 'rgba(255,255,255,0.5)',
                      '&:hover': {
                        borderColor: 'rgba(255,255,255,0.8)',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </>
          )}
        </Box>
      </Toolbar>
      {!isTablet && renderMobileMenu}
      {renderMenu}
      {isTablet && renderDrawer}
    </AppBar>
  );
};

export default Header; 