import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Paper, 
  InputAdornment, 
  IconButton,
  Grid,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person, Phone, CalendarToday } from '@mui/icons-material';
import { ThemeContext } from '../../ThemeContext.jsx';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupError, setSignupError] = useState('');
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    dob: Yup.string().required('Date of birth is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Clear any previous error
    setSignupError('');
    
    // Simulate signup process
    setTimeout(() => {
      try {
        // In a real app, you would make an API call here
        
        // Create user object
        const user = {
          id: Math.random().toString(36).substr(2, 9), // Generate a random ID
          name: `${values.firstName} ${values.lastName}`,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          dob: values.dob,
          joinDate: new Date().toISOString().split('T')[0], // Current date
          isLoggedIn: true
        };
        
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        // Navigate to dashboard
        navigate('/dashboard');
      } catch (error) {
        setSignupError('An error occurred during signup. Please try again.');
        console.error('Signup error:', error);
      }
      
      setSubmitting(false);
    }, 1000);
  };

  // Get text field styling for dark mode
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
    }
  });

  return (
    <Box 
      className="auth-container" 
      sx={{
        maxWidth: { xs: '95%', sm: '600px' },
        margin: '0 auto',
        py: { xs: 2, sm: 4 }
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          padding: { xs: 2, sm: 4 }, 
          backgroundColor: darkMode ? 'var(--card-bg)' : '#fff',
          color: darkMode ? 'var(--text-color)' : 'inherit',
          boxShadow: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.5)' : '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontSize: { xs: '1.8rem', sm: '2.125rem' } }}>
          Sign Up
        </Typography>
        
        {signupError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {signupError}
          </Alert>
        )}
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Field name="firstName">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="First Name"
                          variant="outlined"
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
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Field name="lastName">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Last Name"
                          variant="outlined"
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
                  </Box>
                </Grid>
              </Grid>
              
              <Box mb={2}>
                <Field name="email">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      variant="outlined"
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
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Field name="phone">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Phone Number"
                          variant="outlined"
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
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Field name="dob">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Date of Birth"
                          type="date"
                          InputLabelProps={{ 
                            shrink: true 
                          }}
                          variant="outlined"
                          error={touched.dob && Boolean(errors.dob)}
                          helperText={touched.dob && errors.dob}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarToday color={darkMode ? "primary" : "action"} />
                              </InputAdornment>
                            ),
                          }}
                          sx={getTextFieldSx()}
                        />
                      )}
                    </Field>
                  </Box>
                </Grid>
              </Grid>
              
              <Box mb={2}>
                <Field name="password">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Password"
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
              </Box>
              
              <Box mb={3}>
                <Field name="confirmPassword">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Confirm Password"
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color={darkMode ? "primary" : "action"} />
                          </InputAdornment>
                        ),
                      }}
                      sx={getTextFieldSx()}
                    />
                  )}
                </Field>
              </Box>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ 
                  mb: 2,
                  py: { xs: 1.2, sm: 1 },
                  fontSize: { xs: '0.9rem', sm: '0.875rem' }
                }}
              >
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </Button>
              
              <Typography align="center" sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem' } }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'var(--primary-color)' }}>
                  Login
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Signup; 