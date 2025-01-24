import { createTheme } from '@mui/material/styles';

// Custom color palette with #FF5733 as primary
const palette = {
  primary: {
    main: '#FF5733',     // Vibrant orange-red
    light: '#FF8A65',    // Lighter shade
    dark: '#D32F2F',     // Darker shade
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#4CAF50',     // Green for secondary actions
    light: '#81C784',
    dark: '#388E3C',
    contrastText: '#FFFFFF'
  },
  background: {
    default: '#F4F4F4',  // Light gray background
    paper: '#FFFFFF'     // White paper background
  },
  text: {
    primary: '#333333',  // Dark gray for primary text
    secondary: '#666666' // Lighter gray for secondary text
  },
  error: {
    main: '#FF1744'      // Bright red for errors
  }
};

// Typography configuration
const typography = {
  fontFamily: [
    'Inter', 
    '-apple-system', 
    'BlinkMacSystemFont', 
    '"Segoe UI"', 
    'Roboto', 
    'Arial', 
    'sans-serif'
  ].join(','),
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.4
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.5
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5
  }
};

// Component-specific overrides
const components = {
  MuiCssBaseline: {
    styleOverrides: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      html, body {
        height: 100%;
        margin: 0;
        scroll-behavior: smooth;
      }
    `
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: 8,
        fontWeight: 600,
        transition: 'all 0.3s ease'
      },
      containedPrimary: {
        backgroundColor: palette.primary.main,
        '&:hover': {
          backgroundColor: palette.primary.dark
        }
      },
      outlinedPrimary: {
        borderColor: palette.primary.main,
        color: palette.primary.main
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
      }
    }
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        width: 240,
        backgroundColor: '#FFFFFF',
        borderRight: `1px solid ${palette.background.default}`
      }
    }
  }
};

// Create the theme
const theme = createTheme({
  palette,
  typography,
  components,
  breakpoints: {
    values: {
      xs: 0,    // Mobile
      sm: 600,  // Tablet
      md: 960,  // Small desktop
      lg: 1280, // Desktop
      xl: 1920  // Large desktop
    }
  },
  shape: {
    borderRadius: 8
  }
});

export default theme;
