import React, { useState, useContext } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Alert,
  Paper,
  CssBaseline,
  Avatar,
  InputAdornment,
  IconButton,
  Grid
} from '@mui/material';
import { 
  LockOutlined as LockIcon, 
  Visibility, 
  VisibilityOff 
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f0b429', // Yellow 500 from Tailwind config
    },
  },
});

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Attempt login using AuthContext login method
    const loginSuccess = login(username, password);
    
    if (loginSuccess) {
      // Navigate to dashboard on successful login
      navigate('/dashboard', { replace: true });
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper 
          elevation={6} 
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
            borderRadius: 2
          }}
        >
          <Avatar 
            sx={{ 
              m: 1, 
              bgcolor: 'primary.main',
              width: 56, 
              height: 56 
            }}
          >
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Dashboard Login
          </Typography>
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ width: '100%', mt: 2 }}
            >
              {error}
            </Alert>
          )}
          
          <Box 
            component="form" 
            onSubmit={handleLogin} 
            sx={{ 
              width: '100%', 
              mt: 1 
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              color="primary"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color="primary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ 
                mt: 3, 
                mb: 2,
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'primary.dark'
                }
              }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
