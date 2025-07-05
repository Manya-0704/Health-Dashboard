import React, { useState, useEffect, useContext } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  TextField, 
  Button, 
  Grid, 
  Divider, 
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import { 
  Save, 
  Edit, 
  Person, 
  Email, 
  Phone, 
  CalendarToday,
  Visibility,
  VisibilityOff,
  Lock
} from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ThemeContext } from '../../ThemeContext.jsx';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  // Text field styling for dark mode
  const getTextFieldSx = () => ({
    "& .MuiInputBase-input": {
      color: darkMode ? 'rgba(255, 255, 255, 0.9)' : 'inherit',
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: darkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
    },
    "& .MuiInputLabel-root": {
      color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
    },
    "& .MuiFormHelperText-root": {
      color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'inherit',
    },
    "& .MuiIconButton-root": {
      color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
    }
  });
  
  useEffect(() => {
    // Load user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.isLoggedIn) {
      setUser(userData);
    } else {
      // If not logged in, redirect to login
      navigate('/login');
    }
  }, [navigate]);
  
  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    dob: Yup.date().nullable().required('Date of birth is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
  });
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setSaveError('');
  };
  
  const handleSave = (values, { setSubmitting }) => {
    try {
      console.log("Saving profile with values:", values);
      
      // In a real app, you would make an API call here
      const updatedUser = {
        ...user,
        name: `${values.firstName} ${values.lastName}`,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        dob: values.dob ? values.dob.toISOString().split('T')[0] : null
      };
      
      if (values.password) {
        updatedUser.password = values.password;
      }
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      setSaveSuccess(true);
      setSaveError('');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaveError('An error occurred while saving your profile. Please try again.');
      setSaveSuccess(false);
    }
    
    setSubmitting(false);
  };
  
  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography>Loading profile...</Typography>
      </Box>
    );
  }
  
  // Parse date of birth if it exists
  let dobDate = null;
  if (user.dob) {
    try {
      dobDate = new Date(user.dob);
      if (isNaN(dobDate.getTime())) {
        dobDate = null;
      }
    } catch (e) {
      dobDate = null;
    }
  }
  
  const initialValues = {
    firstName: user.firstName || user.name?.split(' ')[0] || '',
    lastName: user.lastName || (user.name?.split(' ').length > 1 ? user.name?.split(' ').slice(1).join(' ') : ''),
    email: user.email || '',
    phone: user.phone || '',
    dob: dobDate,
    password: '',
    confirmPassword: ''
  };
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>
      
      <Paper 
        elevation={2}
        sx={{ 
          p: 3, 
          mt: 2,
          backgroundColor: darkMode ? 'var(--card-bg)' : '#fff',
          color: darkMode ? 'var(--text-color)' : 'inherit',
          boxShadow: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.5)' : '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        {saveSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Profile updated successfully!
          </Alert>
        )}
        
        {saveError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {saveError}
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              src={user.avatar} 
              alt={user.name}
              sx={{ 
                width: 80, 
                height: 80, 
                mr: 2,
                bgcolor: 'var(--primary-color)',
                fontSize: '2rem'
              }}
            >
              {!user.avatar && getInitials(user.name)}
            </Avatar>
            <Box>
              <Typography variant="h5" gutterBottom>
                {user.name}
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'inherit' }}
              >
                Member since {new Date(user.joinDate || Date.now()).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          
          {!isEditing && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          )}
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
          enableReinitialize
        >
          {({ isSubmitting, errors, touched, values, setFieldValue, handleSubmit }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field name="firstName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        disabled={!isEditing}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person color={darkMode ? "primary" : "action"} />
                            </InputAdornment>
                          ),
                        }}
                        sx={getTextFieldSx()}
                      />
                    )}
                  </Field>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Field name="lastName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        disabled={!isEditing}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person color={darkMode ? "primary" : "action"} />
                            </InputAdornment>
                          ),
                        }}
                        sx={getTextFieldSx()}
                      />
                    )}
                  </Field>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Field name="email">
                    {({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Email"
                        variant="outlined"
                        disabled={!isEditing}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email color={darkMode ? "primary" : "action"} />
                            </InputAdornment>
                          ),
                        }}
                        sx={getTextFieldSx()}
                      />
                    )}
                  </Field>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Field name="phone">
                    {({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        disabled={!isEditing}
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone && errors.phone}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone color={darkMode ? "primary" : "action"} />
                            </InputAdornment>
                          ),
                        }}
                        sx={getTextFieldSx()}
                      />
                    )}
                  </Field>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date of Birth"
                      value={values.dob}
                      onChange={(newValue) => {
                        setFieldValue('dob', newValue);
                      }}
                      disabled={!isEditing}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: touched.dob && Boolean(errors.dob),
                          helperText: touched.dob && errors.dob,
                          InputProps: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarToday color={darkMode ? "primary" : "action"} />
                              </InputAdornment>
                            ),
                          },
                          sx: getTextFieldSx()
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                
                {isEditing && (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Change Password
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="textSecondary" 
                        gutterBottom
                        sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'inherit' }}
                      >
                        Leave blank if you don't want to change your password
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Field name="password">
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="New Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Lock color={darkMode ? "primary" : "action"} />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'inherit' }}
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                            sx={getTextFieldSx()}
                          />
                        )}
                      </Field>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Field name="confirmPassword">
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Confirm New Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                            helperText={touched.confirmPassword && errors.confirmPassword}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Lock color={darkMode ? "primary" : "action"} />
                                </InputAdornment>
                              )
                            }}
                            sx={getTextFieldSx()}
                          />
                        )}
                      </Field>
                    </Grid>
                  </>
                )}
              </Grid>
              
              {isEditing && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                    sx={{ mr: 2 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              )}
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Profile; 