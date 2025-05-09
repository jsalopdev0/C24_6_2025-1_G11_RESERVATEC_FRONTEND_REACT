import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CalendarCard = () => (
  <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Calendario (proximamente)
      </Typography>
      <Typography variant="body2">Aquí se mostrará el calendario de reservas.</Typography>
    </CardContent>
  </Card>
);

export default CalendarCard;
