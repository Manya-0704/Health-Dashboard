import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeContext } from './ThemeContext';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './components/Home';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/dashboard/Profile';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import UploadHistory from './components/dashboard/UploadHistory';
import NotFound from './components/NotFound';

const App = () => {
  const { darkMode, themeColors } = useContext(ThemeContext);

  // Create a theme instance based on dark/light mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: themeColors.primary,
      },
      secondary: {
        main: themeColors.secondary,
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f8',
        paper: darkMode ? '#1e1e1e' : '#fff',
      },
    },
    typography: {
      fontFamily: "'Roboto', 'Segoe UI', 'Helvetica Neue', sans-serif",
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: darkMode 
              ? '0 4px 20px 0 rgba(0, 0, 0, 0.5)'
              : '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
            borderRadius: '12px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: themeColors.primary,
              borderWidth: '1px',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: themeColors.primary,
              borderWidth: '2px',
            },
          },
        },
      },
    },
  });

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    // Check if user data exists in localStorage
    const user = localStorage.getItem('user');
    const isAuthenticated = user !== null;
    
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-history"
            element={
              <ProtectedRoute>
                <UploadHistory />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </MuiThemeProvider>
  );
};

export default App;
