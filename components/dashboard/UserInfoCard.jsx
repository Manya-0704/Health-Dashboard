import React, { useContext } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Box, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Button
} from '@mui/material';
import { 
  Person, 
  Email, 
  Phone, 
  CalendarToday, 
  Edit 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContext.jsx';

const UserInfoCard = ({ user }) => {
  const { darkMode } = useContext(ThemeContext);
  
  // If no user is provided, use default data
  const userData = user || {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    joinDate: '2023-01-15',
    avatar: null
  };
  
  // Format date of birth if it exists
  let formattedDob = 'Not provided';
  if (userData.dob) {
    try {
      const dobDate = new Date(userData.dob);
      if (!isNaN(dobDate.getTime())) {
        formattedDob = dobDate.toLocaleDateString();
      }
    } catch (e) {
      formattedDob = 'Not provided';
    }
  }
  
  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <Card 
      elevation={2} 
      sx={{ 
        height: '100%',
        backgroundColor: darkMode ? 'var(--card-bg)' : '#fff',
        color: darkMode ? 'var(--text-color)' : 'inherit'
      }}
    >
      <CardContent>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Avatar 
            src={userData.avatar} 
            alt={userData.name}
            sx={{ 
              width: 80, 
              height: 80, 
              mb: 2,
              bgcolor: 'var(--primary-color)',
              fontSize: '2rem'
            }}
          >
            {!userData.avatar && getInitials(userData.name)}
          </Avatar>
          <Typography variant="h5" component="h2" gutterBottom>
            {userData.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="textSecondary" 
            gutterBottom
          >
            Member since {new Date(userData.joinDate).toLocaleDateString()}
          </Typography>
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<Edit />}
            sx={{ mt: 1 }}
            component={Link}
            to="/profile"
          >
            Edit Profile
          </Button>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <List dense>
          <ListItem>
            <ListItemIcon>
              <Email color="action" />
            </ListItemIcon>
            <ListItemText 
              primary="Email" 
              secondary={userData.email} 
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ 
                sx: { 
                  wordBreak: 'break-all',
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'inherit'
                } 
              }}
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <Phone color="action" />
            </ListItemIcon>
            <ListItemText 
              primary="Phone" 
              secondary={userData.phone} 
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ 
                sx: { color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'inherit' } 
              }}
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <CalendarToday color="action" />
            </ListItemIcon>
            <ListItemText 
              primary="Date of Birth" 
              secondary={formattedDob} 
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ 
                sx: { color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'inherit' } 
              }}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard; 