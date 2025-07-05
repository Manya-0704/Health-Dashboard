import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { ThemeContext } from '../../ThemeContext.jsx';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Pre-fill email field for development convenience
  const initialValues = {
    email: 'user@example.com',
    password: ''
  };

  // Clear any existing login state when the login page is loaded
  useEffect(() => {
    // Only clear if we're not coming from signup
    if (!location.state?.fromSignup) {
      // Instead of removing, just reset the isLoggedIn flag
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      if (userData.id) {
        userData.isLoggedIn = false;
        localStorage.setItem('user', JSON.stringify(userData));
      }
    }
    
    // Clear any error message when component mounts
    setLoginError('');
  }, [location]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Clear any previous error
    setLoginError('');
    
    // Simulate login process
    setTimeout(() => {
      // In a real app, you would make an API call here
      if (values.email === 'user@example.com' && values.password === 'password123') {
        // Check if we have existing user data
        const existingUserData = JSON.parse(localStorage.getItem('user') || '{}');
        
        // If we have existing data, just set isLoggedIn to true
        if (existingUserData.id) {
          existingUserData.isLoggedIn = true;
          localStorage.setItem('user', JSON.stringify(existingUserData));
        } else {
          // Otherwise create new user data
          localStorage.setItem('user', JSON.stringify({
            id: '123',
            name: 'John Doe',
            firstName: 'John',
            lastName: 'Doe',
            email: values.email,
            phone: '1234567890',
            dob: '1990-01-01',
            joinDate: '2023-01-01',
            isLoggedIn: true
          }));
        }
        
        navigate('/dashboard');
      } else {
        setLoginError('Invalid email or password. Try user@example.com / password123');
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
        maxWidth: { xs: '95%', sm: '400px' },
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
          Login
        </Typography>
        
        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {loginError}
          </Alert>
        )}
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Box mb={3}>
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
              
              <Box mb={3}>
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
              
              <Typography 
                variant="body2" 
                color="textSecondary" 
                sx={{ 
                  mb: 2, 
                  textAlign: 'center',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  border: '1px dashed',
                  borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.02)'
                }}
              >
                Demo credentials: user@example.com / password123
              </Typography>
              
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
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
              
              <Typography align="center" sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem' } }}>
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: 'var(--primary-color)' }}>
                  Sign up
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Login; 