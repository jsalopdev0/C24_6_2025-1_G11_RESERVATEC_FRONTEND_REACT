import React from 'react';
import { Grid, Box } from '@mui/material';
import StatsCards from './StatsCards';
import ReservationsChart from './ReservationsChart';
import CalendarCard from './CalendarCard';

const Dashboard = () => {
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StatsCards />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReservationsChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <CalendarCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
