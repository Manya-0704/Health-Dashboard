import React, { createContext, useState, useEffect } from 'react';

// Define available themes with higher contrast
const THEMES = {
  DEFAULT: {
    name: 'Default',
    primary: '#1976d2', // darker blue for better contrast
    secondary: '#5c6bc0', // darker purple for better contrast
    primaryDark: '#64b5f6', // bright blue for dark mode
    secondaryDark: '#8c9eff', // bright purple for dark mode
    accentLight: 'rgba(25, 118, 210, 0.15)', // more visible accent color
    accentDark: 'rgba(100, 181, 246, 0.25)', // more visible accent color for dark
    textLight: '#212121', // dark text for light mode
    textDark: '#f5f5f5', // light text for dark mode
  },
  CALM: {
    name: 'Calm',
    primary: '#2e7d32', // darker green for better contrast
    secondary: '#1565c0', // darker blue for better contrast
    primaryDark: '#68d391', // bright green for dark mode
    secondaryDark: '#63b3ed', // bright blue for dark mode
    accentLight: 'rgba(46, 125, 50, 0.15)',
    accentDark: 'rgba(104, 211, 145, 0.25)',
    textLight: '#212121',
    textDark: '#f5f5f5',
  },
  SUNSET: {
    name: 'Sunset',
    primary: '#d32f2f', // darker red for better contrast
    secondary: '#ed6c02', // darker orange for better contrast
    primaryDark: '#fc8181', // bright red for dark mode
    secondaryDark: '#f6ad55', // bright orange for dark mode
    accentLight: 'rgba(211, 47, 47, 0.15)',
    accentDark: 'rgba(252, 129, 129, 0.25)',
    textLight: '#212121',
    textDark: '#f5f5f5',
  }
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(THEMES.DEFAULT);
  const [themeTransition, setThemeTransition] = useState(false);

  useEffect(() => {
    // Check local storage for saved preferences
    const savedMode = localStorage.getItem('darkMode');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    } else {
      // Check if user prefers dark mode at OS level
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
    }
    
    if (savedTheme && THEMES[savedTheme]) {
      setCurrentTheme(THEMES[savedTheme]);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // Save preference to local storage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  
  useEffect(() => {
    // Update CSS variables for theme colors
    const root = document.documentElement;
    
    // Start transition effect
    if (themeTransition) {
      root.style.setProperty('--theme-transition', 'all 0.5s ease');
      document.body.classList.add('theme-transition-active');
    }
    
    // Set theme colors as CSS variables with higher specificity
    const primaryColor = darkMode ? currentTheme.primaryDark : currentTheme.primary;
    const secondaryColor = darkMode ? currentTheme.secondaryDark : currentTheme.secondary;
    const accentBg = darkMode ? currentTheme.accentDark : currentTheme.accentLight;
    const textColor = darkMode ? currentTheme.textDark : currentTheme.textLight;
    
    root.style.setProperty('--primary-color', primaryColor);
    root.style.setProperty('--secondary-color', secondaryColor);
    root.style.setProperty('--accent-bg', accentBg);
    
    // Force update MUI components by adding custom attributes
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    document.body.setAttribute('data-theme-name', currentTheme.name.toLowerCase());
    
    // Set theme colors directly on body for easier debugging
    document.body.style.setProperty('--primary-color-active', primaryColor);
    document.body.style.setProperty('--secondary-color-active', secondaryColor);
    document.body.style.setProperty('--text-color-active', textColor);
    
    // Save theme preference
    for (const key in THEMES) {
      if (THEMES[key].name === currentTheme.name) {
        localStorage.setItem('theme', key);
        break;
      }
    }
    
    // End transition effect after changes
    if (themeTransition) {
      const timer = setTimeout(() => {
        root.style.setProperty('--theme-transition', 'none');
        document.body.classList.remove('theme-transition-active');
        setThemeTransition(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [currentTheme, darkMode, themeTransition]);

  const toggleDarkMode = () => {
    setThemeTransition(true);
    setDarkMode(!darkMode);
  };
  
  const changeTheme = (theme) => {
    if (THEMES[theme]) {
      setThemeTransition(true);
      setCurrentTheme(THEMES[theme]);
    }
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        darkMode, 
        toggleDarkMode, 
        currentTheme: currentTheme.name, 
        themes: Object.keys(THEMES).map(key => ({
          id: key,
          name: THEMES[key].name
        })), 
        changeTheme,
        themeColors: {
          primary: darkMode ? currentTheme.primaryDark : currentTheme.primary,
          secondary: darkMode ? currentTheme.secondaryDark : currentTheme.secondary,
        }
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}; 