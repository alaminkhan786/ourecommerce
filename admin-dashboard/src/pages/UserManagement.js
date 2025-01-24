import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  PeopleOutline as UsersIcon, 
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  BarChart as AnalyticsIcon 
} from '@mui/icons-material';

// Mock data service (replace with actual API calls)
const userAnalyticsService = {
  getDailyUsers: () => {
    // Simulate daily user data
    return [
      { date: '2024-01-20', count: 120 },
      { date: '2024-01-21', count: 145 },
      { date: '2024-01-22', count: 180 },
      { date: '2024-01-23', count: 210 },
      { date: '2024-01-24', count: 250 }
    ];
  },
  getMonthlyUsers: () => {
    // Simulate monthly user data
    return [
      { month: 'January', count: 3500 },
      { month: 'February', count: 4200 }
    ];
  },
  getUserLocations: () => {
    // Simulate user location data
    return [
      { country: 'United States', count: 1200, percentage: 35 },
      { country: 'United Kingdom', count: 800, percentage: 23 },
      { country: 'Canada', count: 500, percentage: 15 },
      { country: 'Australia', count: 300, percentage: 9 },
      { country: 'Others', count: 600, percentage: 18 }
    ];
  }
};

function UserManagement() {
  const [dailyUsers, setDailyUsers] = useState([]);
  const [monthlyUsers, setMonthlyUsers] = useState([]);
  const [userLocations, setUserLocations] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState(null);

  useEffect(() => {
    // Fetch user analytics data
    setDailyUsers(userAnalyticsService.getDailyUsers());
    setMonthlyUsers(userAnalyticsService.getMonthlyUsers());
    setUserLocations(userAnalyticsService.getUserLocations());
  }, []);

  const handleViewTimeframe = (timeframe) => {
    setSelectedTimeframe(timeframe);
  };

  const handleCloseTimeframeDialog = () => {
    setSelectedTimeframe(null);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          mb: 3 
        }}
      >
        <UsersIcon sx={{ mr: 2 }} />
        User Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Daily Users Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader 
              title="Daily Users" 
              avatar={<TimeIcon />}
            />
            <CardContent>
              <Typography variant="h5" color="primary">
                {dailyUsers[dailyUsers.length - 1]?.count || 0}
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => handleViewTimeframe('daily')}
                sx={{ mt: 2 }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Users Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader 
              title="Monthly Users" 
              avatar={<AnalyticsIcon />}
            />
            <CardContent>
              <Typography variant="h5" color="primary">
                {monthlyUsers[monthlyUsers.length - 1]?.count || 0}
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => handleViewTimeframe('monthly')}
                sx={{ mt: 2 }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* User Locations Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader 
              title="User Locations" 
              avatar={<LocationIcon />}
            />
            <CardContent>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Country</TableCell>
                      <TableCell align="right">Users</TableCell>
                      <TableCell align="right">%</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userLocations.map((location) => (
                      <TableRow key={location.country}>
                        <TableCell>{location.country}</TableCell>
                        <TableCell align="right">{location.count}</TableCell>
                        <TableCell align="right">{location.percentage}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Timeframe Details Dialog */}
      <Dialog 
        open={!!selectedTimeframe} 
        onClose={handleCloseTimeframeDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedTimeframe === 'daily' ? 'Daily Users' : 'Monthly Users'} Details
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {selectedTimeframe === 'daily' ? 'Date' : 'Month'}
                  </TableCell>
                  <TableCell align="right">User Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(selectedTimeframe === 'daily' ? dailyUsers : monthlyUsers).map((item) => (
                  <TableRow key={item.date || item.month}>
                    <TableCell>
                      {item.date || item.month}
                    </TableCell>
                    <TableCell align="right">{item.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTimeframeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserManagement;
