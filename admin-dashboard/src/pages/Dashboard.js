import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Box,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  AddCircle as AddIcon,
  ShoppingCart as ProductIcon,
  People as CustomerIcon,
  AttachMoney as SalesIcon,
  Notifications as NotificationIcon,
  TrendingUp as TrendIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';
import ProductUploadModal from '../components/ProductUploadModal';

const DashboardCard = ({ children }) => {
  const theme = useTheme();
  return (
    <Card 
      variant="outlined"
      sx={{ 
        height: '100%',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)'
        },
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.grey[800] 
          : theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      {children}
    </Card>
  );
};

function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [openProductUpload, setOpenProductUpload] = useState(false);

  const dashboardStats = [
    {
      icon: <ProductIcon color="primary" />,
      title: 'Total Products',
      value: '128',
      color: 'primary',
      trend: '+12%'
    },
    {
      icon: <CustomerIcon color="secondary" />,
      title: 'Active Customers',
      value: '3,456',
      color: 'secondary',
      trend: '+8%'
    },
    {
      icon: <SalesIcon color="success" />,
      title: 'Monthly Sales',
      value: '$45,230',
      color: 'success',
      trend: '+15%'
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      message: 'New order #1234 received',
      time: '2 mins ago',
      icon: <ProductIcon color="primary" />
    },
    {
      id: 2,
      message: 'Low stock for Wireless Headphones',
      time: '15 mins ago',
      icon: <AnalyticsIcon color="warning" />
    },
    {
      id: 3,
      message: 'Customer review for AudioPro X1',
      time: '1 hour ago',
      icon: <CustomerIcon color="secondary" />
    }
  ];

  const handleProductUpload = (formData) => {
    // TODO: Implement actual product upload logic
    console.log('Product Upload Data:', formData);
    alert('Product uploaded successfully!');
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      p: isMobile ? 1 : 3,
      backgroundColor: theme.palette.background.default
    }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: 3, 
          fontWeight: 600,
          color: theme.palette.text.primary 
        }}
      >
        Dashboard Overview
      </Typography>

      <Grid container spacing={isMobile ? 1 : 3}>
        {/* Quick Stats */}
        {dashboardStats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <DashboardCard>
              <CardContent 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  gap: 2,
                  height: '100%'
                }}
              >
                <Box>
                  <Typography 
                    variant="subtitle1" 
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    color={`${stat.color}.main`}
                    sx={{ fontWeight: 600 }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="success.main"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <TrendIcon fontSize="small" sx={{ mr: 0.5 }} />
                    {stat.trend}
                  </Typography>
                </Box>
                {React.cloneElement(stat.icon, { 
                  sx: { 
                    fontSize: 48, 
                    color: theme.palette[stat.color].light 
                  } 
                })}
              </CardContent>
            </DashboardCard>
          </Grid>
        ))}

        {/* Product Management Section */}
        <Grid item xs={12} md={8} sx={{ mt: 3 }}>
          <Card variant="outlined">
            <CardContent>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 2 
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Product Management
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenProductUpload(true)}
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: 2
                  }}
                >
                  Add Product
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Quickly add new products to your catalog or manage existing inventory.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={4} sx={{ mt: 3 }}>
          <Card variant="outlined">
            <CardContent>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 2 
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Notifications
                </Typography>
                <Tooltip title="Mark all as read">
                  <IconButton size="small">
                    <NotificationIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {recentNotifications.map((notification) => (
                <Box 
                  key={notification.id}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    py: 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  {notification.icon}
                  <Box sx={{ ml: 2, flex: 1 }}>
                    <Typography variant="body2">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Product Upload Modal */}
      <ProductUploadModal
        open={openProductUpload}
        onClose={() => setOpenProductUpload(false)}
        onUpload={handleProductUpload}
      />
    </Box>
  );
}

export default Dashboard;
