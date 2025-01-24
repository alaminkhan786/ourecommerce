import React, { useState, createContext, useMemo } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContextProvider } from './context/ThemeContext';

// Import components
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductManagement from './pages/ProductManagement';
import UserManagement from './pages/UserManagement';
import SalesAnalytics from './pages/SalesAnalytics';
import PaymentManagement from './pages/PaymentManagement';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

// Create Contexts
export const AuthContext = createContext(null);
export const ThemeContext = createContext(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [themeMode, setThemeMode] = useState('light');

  const login = (username, password) => {
    // Implement your login logic here
    if (username === 'admin' && password === 'AudioAdmin2024!') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Create theme based on mode
  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode: themeMode,
        primary: {
          main: themeMode === 'light' ? '#FF5733' : '#FF7B54', // Vibrant orange-red
        },
        secondary: {
          main: themeMode === 'light' ? '#4A90E2' : '#6AB0FF', // Bright blue
        },
        background: {
          default: themeMode === 'light' ? '#F4F6F9' : '#121212',
          paper: themeMode === 'light' ? '#FFFFFF' : '#1E1E1E'
        },
        text: {
          primary: themeMode === 'light' ? '#2C3E50' : '#E0E0E0', // Dark blue-gray or light text
          secondary: themeMode === 'light' ? '#7F8C8D' : '#A0A0A0' // Soft gray
        }
      },
      typography: {
        fontFamily: [
          'Roboto',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Arial',
          'sans-serif'
        ].join(','),
        h4: {
          fontWeight: 600,
          letterSpacing: '0.5px'
        },
        body1: {
          lineHeight: 1.6
        }
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              borderRadius: 8
            }
          }
        }
      }
    }), [themeMode]
  );

  const authContextValue = {
    isAuthenticated,
    login,
    logout
  };

  const themeContextValue = {
    themeMode,
    toggleThemeMode
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <ThemeContextProvider>
        <ThemeContext.Provider value={themeContextValue}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Routes>
                {isAuthenticated ? (
                  <>
                    <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                    <Route path="/products" element={<Layout><ProductManagement /></Layout>} />
                    <Route path="/customers" element={<Layout><UserManagement /></Layout>} />
                    <Route path="/sales" element={<Layout><SalesAnalytics /></Layout>} />
                    <Route path="/payment" element={<Layout><PaymentManagement /></Layout>} />
                    <Route path="/settings" element={<Layout><Settings /></Layout>} />
                    <Route path="/profile" element={<Layout><Profile /></Layout>} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </>
                ) : (
                  <>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                  </>
                )}
              </Routes>
            </Router>
          </ThemeProvider>
        </ThemeContext.Provider>
      </ThemeContextProvider>
    </AuthContext.Provider>
  );
}

export default App;
