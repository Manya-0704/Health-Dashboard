import React, { useState, useEffect, useContext } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Button, 
  Alert, 
  Card, 
  CardContent, 
  Divider, 
  CircularProgress,
  Snackbar,
  Tooltip,
  IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import FileUpload from '../common/FileUpload';
import { ThemeContext } from '../../ThemeContext';
import { initializeSamplePdfs, resetAndLoadAllSamplePdfs } from '../../utils/samplePdfs';
import { Restore, Add } from '@mui/icons-material';

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [recentUploads, setRecentUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  
  // Load user data and uploaded files
  useEffect(() => {
    // Initialize sample PDFs for demo if needed
    initializeSamplePdfs();
    
    // Load user data and uploads
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const storedUploads = JSON.parse(localStorage.getItem('uploads') || '[]');
    
    setTimeout(() => {
      if (userData && Object.keys(userData).length > 0) {
        setUser(userData);
        
        // Check if the user is newly registered
        const isNewUser = localStorage.getItem('isNewUser') === 'true';
        setShowWelcome(isNewUser);
        if (isNewUser) {
          localStorage.removeItem('isNewUser'); // Clear the flag after showing welcome
        }
        
        // Load uploaded documents from localStorage
        if (storedUploads.length > 0) {
          setUploads(storedUploads);
          setRecentUploads(storedUploads.slice(0, 2));
        } else {
          // Initialize with empty arrays if no uploads found
          setUploads([]);
          setRecentUploads([]);
        }
      }
      
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const handleFileUpload = (fileData) => {
    try {
      // Create a new upload entry
      const newUpload = {
        ...fileData,
        uploadDate: new Date().toISOString()
      };
      
      // Update state with new upload
      const updatedUploads = [newUpload, ...uploads];
      setUploads(updatedUploads);
      setRecentUploads(updatedUploads.slice(0, 2));
      
      // Store in localStorage
      localStorage.setItem('uploads', JSON.stringify(updatedUploads));
      
      // Show success message
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error handling file upload:", error);
    }
  };
  
  const handleCloseSuccessMessage = () => {
    setUploadSuccess(false);
  };
  
  const handleCloseResetMessage = () => {
    setResetMessage('');
  };
  
  // Function to load all sample PDFs
  const loadAllSamplePdfs = () => {
    // Clear local storage first to reset any corrupted data
    localStorage.clear();
    
    // Now load the PDFs
    const allPdfs = resetAndLoadAllSamplePdfs();
    setUploads(allPdfs);
    setRecentUploads(allPdfs.slice(0, 2));
    setResetMessage('Sample PDFs have been loaded successfully!');
    
    // Add dummy user data if missing
    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify({
        id: '123456',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        phone: '555-123-4567',
        dob: '1985-05-12',
        joinDate: '2023-01-01',
        isLoggedIn: true
      }));
    }
  };
  
  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '80vh',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" color="text.secondary">
          Loading your dashboard...
        </Typography>
      </Box>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {showWelcome && (
        <Alert 
          severity="success" 
          sx={{ mb: 4, borderRadius: '12px' }}
          onClose={() => setShowWelcome(false)}
        >
          Welcome to your Health Dashboard! Start by uploading your first health document.
        </Alert>
      )}
      
      <Snackbar
        open={uploadSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSuccessMessage}
        message="File uploaded successfully!"
      />
      
      <Snackbar
        open={!!resetMessage}
        autoHideDuration={5000}
        onClose={handleCloseResetMessage}
        message={resetMessage}
      />
      
      <Grid container spacing={4}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Card elevation={3} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
            <Box 
              sx={{ 
                background: darkMode 
                  ? 'linear-gradient(45deg, rgba(100, 181, 246, 0.8), rgba(140, 158, 255, 0.8))'
                  : 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
                color: '#fff',
                p: { xs: 3, md: 4 }
              }}
            >
              <Typography variant="h4" fontWeight={600} gutterBottom>
                Welcome back, {user?.firstName || 'User'}!
              </Typography>
              <Typography variant="subtitle1">
                Your health dashboard is ready for you. Track, analyze, and manage your health documents all in one place.
              </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Quick Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      component={Link}
                      to="/upload-history"
                    >
                      View Upload History
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      component={Link}
                      to="/profile"
                    >
                      Update Profile
                    </Button>
                    <Tooltip title="Load sample PDFs for demonstration">
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<Restore />}
                        onClick={loadAllSamplePdfs}
                      >
                        Load Sample PDFs
                      </Button>
                    </Tooltip>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" color="text.secondary">
                    Your last login was on {new Date().toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Upload Section */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%', borderRadius: '16px' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Upload Health Document
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <FileUpload onFileUpload={handleFileUpload} />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recent Uploads */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%', borderRadius: '16px' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">
                  Recent Uploads
                </Typography>
                <Tooltip title="View all documents">
                  <IconButton 
                    component={Link}
                    to="/upload-history"
                    color="primary"
                    size="small"
                  >
                    <Add />
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              {recentUploads.length > 0 ? (
                recentUploads.map((upload) => (
                  <Box key={upload.id} sx={{ mb: 2, p: 2, borderRadius: '8px', bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' }}>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {upload.name}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Category: {upload.category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(upload.uploadDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  No recent uploads found. Upload your first document!
                </Typography>
              )}
              
              <Box sx={{ mt: 3, textAlign: 'right' }}>
                <Button 
                  component={Link} 
                  to="/upload-history" 
                  color="primary"
                >
                  View All Documents
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 