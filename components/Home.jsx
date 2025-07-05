import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Container,
  useMediaQuery,
  useTheme,
  Paper,
  Avatar,
  Divider,
  Chip,
  Fade,
  Slide,
  Zoom,
  IconButton,
  Tabs,
  Tab,
  Rating
} from '@mui/material';
import { 
  Security, 
  CloudUpload, 
  Dashboard as DashboardIcon, 
  AccessibilityNew,
  ArrowForward,
  KeyboardArrowDown,
  ArrowDownward,
  CheckCircle,
  Star,
  FormatQuote,
  ChevronLeft,
  ChevronRight,
  HealthAndSafety,
  Analytics,
  Storage,
  Speed,
  DeviceHub
} from '@mui/icons-material';
import { ThemeContext } from '../ThemeContext.jsx';

const Home = () => {
  const { darkMode } = useContext(ThemeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [animatedElements, setAnimatedElements] = useState({
    hero: true,
    features: false,
    testimonials: false,
    cta: false
  });
  
  // Handle scroll animations with fixed content
  useEffect(() => {
    // Trigger initial animations
    setTimeout(() => {
      setAnimatedElements({
        hero: true,
        features: true,
        testimonials: true,
        cta: true
      });
    }, 300);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Make sure elements are visible when scrolling
      const updatedElements = {
        hero: true, // Always keep hero visible
        features: scrollPosition > windowHeight * 0.1,
        testimonials: scrollPosition > windowHeight * 0.3,
        cta: scrollPosition > windowHeight * 0.5
      };
      
      setAnimatedElements(updatedElements);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const features = [
    {
      icon: <HealthAndSafety fontSize="large" color="primary" />,
      title: 'Health Monitoring',
      description: 'Track and analyze your health metrics over time with comprehensive visualization tools.'
    },
    {
      icon: <Analytics fontSize="large" color="primary" />,
      title: 'Data Analysis',
      description: 'Advanced analytics to help you understand trends and patterns in your health data.'
    },
    {
      icon: <Storage fontSize="large" color="primary" />,
      title: 'Secure Storage',
      description: 'Your health records are encrypted and stored securely with industry-leading protection.'
    },
    {
      icon: <Security fontSize="large" color="primary" />,
      title: 'Privacy First',
      description: 'Complete control over your data with granular privacy settings and data sharing options.'
    },
    {
      icon: <Speed fontSize="large" color="primary" />,
      title: 'Fast Results',
      description: 'Get instant insights from your uploaded health documents with our AI processing.'
    },
    {
      icon: <DeviceHub fontSize="large" color="primary" />,
      title: 'Multi-platform',
      description: 'Access your health dashboard from any device, anywhere with our responsive platform.'
    }
  ];

  const tabContent = [
    {
      title: "For Individuals",
      content: "Keep your medical history organized, access health records from anywhere, and share securely with healthcare providers when needed."
    },
    {
      title: "For Families",
      content: "Manage health records for all family members in one place. Perfect for parents tracking children's vaccinations and medical history."
    },
    {
      title: "For Seniors",
      content: "Simplified interface to track medications, doctor visits, and test results. Easy to share with caregivers and family members."
    }
  ];
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent of 3",
      image: null, // No image, will use avatar
      rating: 5,
      text: "This app has been a lifesaver for managing my children's medical records. No more searching through file cabinets before doctor appointments!"
    },
    {
      name: "Robert Chen",
      role: "Frequent Traveler",
      image: null,
      rating: 5,
      text: "I travel internationally for work, and having my medical records accessible from anywhere gives me peace of mind. The interface is intuitive and secure."
    },
    {
      name: "Maria Garcia",
      role: "Healthcare Professional",
      image: null,
      rating: 4,
      text: "As a nurse, I recommend this platform to my patients. It helps them keep track of their health information and makes our job easier when they have their history organized."
    }
  ];

  const handleNextTestimonial = () => {
    setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box>
      {/* Hero Section with Animation */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          background: darkMode 
            ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%)'
            : 'linear-gradient(135deg, rgba(74, 144, 226, 0.1) 0%, rgba(108, 99, 255, 0.05) 100%)',
          borderRadius: 2,
          mb: 6,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="md">
          <Fade in={animatedElements.hero} timeout={1000}>
            <Box>
              <Typography 
                variant={isMobile ? 'h4' : 'h2'} 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  background: darkMode 
                    ? 'linear-gradient(45deg, #64b5f6 30%, #8c9eff 90%)'
                    : 'linear-gradient(45deg, #4a90e2 30%, #6c63ff 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3
                }}
              >
                Your Health Records in One Secure Place
              </Typography>
              <Typography 
                variant="h6" 
                component="p" 
                color="textSecondary" 
                sx={{ 
                  mb: 4, 
                  maxWidth: '800px', 
                  mx: 'auto',
                  opacity: 0.9 
                }}
              >
                Securely store, manage, and access your health documents anytime, anywhere.
                Our platform makes it easy to keep track of your medical history.
              </Typography>
              
              {/* User type tabs */}
              <Paper 
                elevation={darkMode ? 1 : 0} 
                sx={{ 
                  mb: 5,
                  maxWidth: '500px',
                  mx: 'auto',
                  backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange} 
                  centered 
                  variant={isMobile ? "fullWidth" : "standard"}
                  sx={{ mb: 2 }}
                >
                  <Tab label="For Individuals" />
                  <Tab label="For Families" />
                  <Tab label="For Seniors" />
                </Tabs>
                <Box sx={{ p: 2, minHeight: '80px' }}>
                  <Typography variant="body1" align="center">
                    {tabContent[activeTab].content}
                  </Typography>
                </Box>
              </Paper>
              
              <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  component={RouterLink}
                  to="/signup"
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: '30px',
                    boxShadow: '0 4px 14px 0 rgba(74, 144, 226, 0.39)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 6px 20px 0 rgba(74, 144, 226, 0.6)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  endIcon={<ArrowForward />}
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/login"
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: '30px',
                    borderWidth: '2px',
                    '&:hover': {
                      borderWidth: '2px',
                      backgroundColor: darkMode ? 'rgba(100, 181, 246, 0.08)' : 'rgba(74, 144, 226, 0.08)'
                    }
                  }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Fade>
          
          <Box sx={{ position: 'absolute', bottom: 20, width: '100%', textAlign: 'center', left: 0 }}>
            <IconButton 
              onClick={handleScrollToFeatures}
              sx={{ 
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 20%, 50%, 80%, 100%': {
                    transform: 'translateY(0)'
                  },
                  '40%': {
                    transform: 'translateY(-20px)'
                  },
                  '60%': {
                    transform: 'translateY(-10px)'
                  }
                }
              }}
            >
              <KeyboardArrowDown />
            </IconButton>
          </Box>
        </Container>
      </Box>
      
      {/* Features Section with Animations */}
      <Box sx={{ mb: 8 }} id="features-section">
        <Fade in={animatedElements.features} timeout={1000}>
          <Box>
            <Typography 
              variant="h4" 
              component="h2" 
              align="center" 
              gutterBottom
              sx={{ 
                mb: 1,
                fontWeight: 600
              }}
            >
              Powerful Features
            </Typography>
            <Typography 
              variant="subtitle1" 
              component="p" 
              align="center" 
              color="textSecondary" 
              sx={{ mb: 5, maxWidth: '700px', mx: 'auto' }}
            >
              Everything you need to manage your health records efficiently and securely
            </Typography>
          </Box>
        </Fade>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Zoom in={animatedElements.features} style={{ transitionDelay: `${index * 150}ms` }}>
                <Card 
                  elevation={darkMode ? 4 : 2} 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: darkMode ? 'var(--card-bg)' : '#fff',
                    color: darkMode ? 'var(--text-color)' : 'inherit',
                    transition: 'all 0.3s ease',
                    borderRadius: 3,
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: darkMode ? '0 12px 20px -10px rgba(0,0,0,0.3)' : '0 12px 20px -10px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      background: darkMode 
                        ? 'linear-gradient(135deg, rgba(100, 181, 246, 0.1) 0%, rgba(140, 158, 255, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(74, 144, 226, 0.05) 0%, rgba(108, 99, 255, 0.05) 100%)',
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 60, 
                        height: 60, 
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : '#f0f7ff',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        margin: '0 auto 16px',
                        p: 1.5
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" component="h3" align="center" gutterBottom fontWeight="600">
                      {feature.title}
                    </Typography>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                    <Typography variant="body2" color="textSecondary" align="center" paragraph>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Testimonials Section */}
      <Box 
        sx={{ 
          py: 6, 
          mb: 6,
          backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(74, 144, 226, 0.05)',
          borderRadius: 2,
          position: 'relative'
        }}
      >
        <Fade in={animatedElements.testimonials} timeout={1000}>
          <Container maxWidth="md">
            <Typography 
              variant="h4" 
              component="h2" 
              align="center" 
              gutterBottom
              sx={{ fontWeight: 600, mb: 1 }}
            >
              What Our Users Say
            </Typography>
            <Typography 
              variant="subtitle1" 
              component="p" 
              align="center" 
              color="textSecondary" 
              sx={{ mb: 5 }}
            >
              Join thousands of satisfied users managing their health records
            </Typography>
            
            <Box 
              sx={{ 
                position: 'relative',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Paper
                elevation={darkMode ? 4 : 2}
                sx={{
                  p: 4,
                  backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 3,
                  maxWidth: '700px',
                  position: 'relative',
                  mx: 'auto',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <FormatQuote 
                  sx={{ 
                    position: 'absolute',
                    top: -20,
                    left: 20,
                    fontSize: '4rem',
                    opacity: 0.2,
                    color: darkMode ? 'var(--primary-color)' : 'var(--secondary-color)'
                  }} 
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
                  <Avatar 
                    sx={{ 
                      width: 60, 
                      height: 60, 
                      backgroundColor: darkMode ? 'var(--primary-color)' : 'var(--secondary-color)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                      mr: 2
                    }}
                  >
                    {testimonials[testimonialIndex].name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="p">
                      {testimonials[testimonialIndex].name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {testimonials[testimonialIndex].role}
                    </Typography>
                    <Rating 
                      value={testimonials[testimonialIndex].rating} 
                      readOnly 
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>
                
                <Typography variant="body1" align="center" paragraph>
                  {testimonials[testimonialIndex].text}
                </Typography>
              </Paper>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
                <IconButton 
                  onClick={handlePrevTestimonial}
                  sx={{
                    border: '1px solid',
                    borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
                  }}
                >
                  <ChevronLeft />
                </IconButton>
                {testimonials.map((_, idx) => (
                  <Box 
                    key={idx}
                    component="span"
                    onClick={() => setTestimonialIndex(idx)}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: idx === testimonialIndex 
                        ? 'var(--primary-color)' 
                        : darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
                      display: 'inline-block',
                      margin: '0 4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
                <IconButton 
                  onClick={handleNextTestimonial}
                  sx={{
                    border: '1px solid',
                    borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
                  }}
                >
                  <ChevronRight />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </Fade>
      </Box>
      
      {/* Call to Action */}
      <Slide direction="up" in={animatedElements.cta} timeout={1000}>
        <Box 
          sx={{ 
            py: 8, 
            textAlign: 'center',
            background: darkMode 
              ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(20, 20, 20, 0.8) 100%)'
              : 'linear-gradient(135deg, rgba(74, 144, 226, 0.1) 0%, rgba(108, 99, 255, 0.15) 100%)',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Ready to Manage Your Health Records?
            </Typography>
            <Typography 
              variant="body1" 
              color="textSecondary" 
              sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
            >
              Join thousands of users who trust our platform to securely store their health documents.
              Sign up today and take control of your health information.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              component={RouterLink}
              to="/signup"
              sx={{ 
                px: 4, 
                py: 1.5,
                borderRadius: '30px',
                boxShadow: '0 4px 14px 0 rgba(74, 144, 226, 0.39)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 20px 0 rgba(74, 144, 226, 0.6)'
                },
                transition: 'all 0.3s ease'
              }}
              endIcon={<ArrowForward />}
            >
              Create Free Account
            </Button>
            <Typography variant="body2" sx={{ mt: 2, opacity: 0.7 }}>
              No credit card required • Free forever
            </Typography>
          </Container>
        </Box>
      </Slide>
    </Box>
  );
};

export default Home; 